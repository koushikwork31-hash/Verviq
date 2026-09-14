"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type Peer from "peerjs";
import type { DataConnection, MediaConnection } from "peerjs";
import { useXp } from "./games/XpContext";

/**
 * Voices — cross-college voice pairing (Omegle-style, audio only).
 *
 * Zero backend: matchmaking rides PeerJS's free public signaling cloud
 * (only used to exchange WebRTC offers — audio itself flows peer-to-peer).
 *
 * How pairing works: two well-known lobby peer IDs are the "open lanes"
 * (verviq-voices-a / verviq-voices-b). The first student to claim a free
 * lane becomes the HOST — their peer is reachable under the lobby id and
 * waits alone. The next student connects to that lobby id (GUEST), they
 * say hello over a data channel, the host accepts, and the host places
 * the WebRTC call. If both lanes are busy, later students sit in a queue
 * that sweeps for a free lane every few seconds.
 */

type CallState = "idle" | "connecting" | "waiting" | "ringing" | "in-call" | "ended" | "error";

const LOBBY_A = "verviq-voices-a";
const LOBBY_B = "verviq-voices-b";
const GUEST_SWEEP_MS = 4000;

const XP_FIRST_CALL = 50;
const XP_PER_MINUTE = 10;

const CONVO_STARTERS = [
  "Sell me your city in 60 seconds.",
  "Convince me to watch your favourite movie.",
  "Explain your final-year project to a 10-year-old.",
  "You have ₹5000 and one weekend — plan it out loud.",
  "Tell me about a failure that taught you something.",
  "Pitch your dream startup in 3 sentences.",
];

const TIPS = [
  "Smile while you talk — they can hear it",
  "Start strong: your first sentence sets the vibe",
  "Ask them one question back — conversations beat monologues",
  "Slow down 10%: confidence sounds unhurried",
  "End with energy — leave them wanting the next round",
];

const COLLEGES = [
  { value: "", label: "Select your college" },
  { value: "Karunya University", label: "Karunya University" },
  { value: "PSG Tech", label: "PSG Tech" },
  { value: "Amrita", label: "Amrita" },
  { value: "Anna University", label: "Anna University" },
  { value: "SRM", label: "SRM" },
  { value: "VIT", label: "VIT" },
  { value: "Other college", label: "Other college" },
] as const;

function pick<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

/** Open a Peer, resolving once its id is known (or rejecting on error/timeout). */
function openPeer(factory: () => Peer, timeoutMs = 15000): Promise<Peer> {
  return new Promise((resolve, reject) => {
    let peer: Peer;
    const t = setTimeout(() => reject(new Error("timeout")), timeoutMs);
    try {
      peer = factory();
    } catch (e) {
      clearTimeout(t);
      reject(e);
      return;
    }
    peer.on("open", () => { clearTimeout(t); resolve(peer); });
    peer.on("error", (err) => { clearTimeout(t); reject(err); });
  });
}

/** Try to open a data connection to a lobby id; null if nobody's home. */
function connectToLobby(peer: Peer, lobbyId: string, timeoutMs = 5000): Promise<DataConnection | null> {
  return new Promise((resolve) => {
    const t = setTimeout(() => resolve(null), timeoutMs);
    try {
      const c = peer.connect(lobbyId, { reliable: true });
      c.on("open", () => { clearTimeout(t); resolve(c); });
      c.on("error", () => { clearTimeout(t); resolve(null); });
    } catch {
      clearTimeout(t);
      resolve(null);
    }
  });
}

export default function Voices() {
  const { addXp, unlock, hasAchievement } = useXp();
  const [college, setCollege] = useState("");
  const [state, setState] = useState<CallState>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [micLevel, setMicLevel] = useState(0);
  const [remoteLevel, setRemoteLevel] = useState(0);
  const [muted, setMuted] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [starter, setStarter] = useState<string | null>(null);
  const [tip] = useState(() => pick(TIPS));
  const [remount, setRemount] = useState(0);

  // refs (mutable call machinery — never trigger re-renders)
  const peerRef = useRef<Peer | null>(null);
  const connRef = useRef<DataConnection | null>(null);
  const callRef = useRef<MediaConnection | null>(null);
  const localStreamRef = useRef<MediaStream | null>(null);
  const remoteStreamRef = useRef<MediaStream | null>(null);
  const audioElRef = useRef<HTMLAudioElement | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const sweepRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const stopMicMeterRef = useRef<(() => void) | null>(null);
  const stopRemoteMeterRef = useRef<(() => void) | null>(null);
  const callStartRef = useRef(0);
  const xpMinutesRef = useRef(0);
  const idRef = useRef(0); // session guard: invalidates stale async callbacks
  const liveRef = useRef(false); // guards goLive against double-fire
  const peerModRef = useRef<typeof import("peerjs") | null>(null);

  const stopAllTimers = useCallback(() => {
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
    if (sweepRef.current) { clearInterval(sweepRef.current); sweepRef.current = null; }
  }, []);

  const teardown = useCallback((stopMic: boolean) => {
    try { connRef.current?.close(); } catch { /* already gone */ }
    try { callRef.current?.close(); } catch { /* already gone */ }
    try { peerRef.current?.destroy(); } catch { /* already gone */ }
    if (stopMic) localStreamRef.current?.getTracks().forEach((t) => t.stop());
    if (audioElRef.current) audioElRef.current.srcObject = null;
    remoteStreamRef.current = null;
    connRef.current = null;
    callRef.current = null;
    peerRef.current = null;
    stopAllTimers();
  }, [stopAllTimers]);

  const fullCleanup = useCallback((resetUi: boolean) => {
    teardown(true);
    stopMicMeterRef.current?.();
    stopMicMeterRef.current = null;
    stopRemoteMeterRef.current?.();
    stopRemoteMeterRef.current = null;
    if (resetUi) {
      setState("idle");
      setMuted(false);
      setElapsed(0);
      setStarter(null);
      setMicLevel(0);
      setRemoteLevel(0);
    }
  }, [teardown]);

  const cleanupRef = useRef(fullCleanup);
  cleanupRef.current = fullCleanup;
  useEffect(() => () => { cleanupRef.current(false); }, []);

  // ── audio metering ───────────────────────────────────────────────
  const meter = useCallback((stream: MediaStream, setter: (v: number) => void) => {
    try {
      const Ctx = window.AudioContext ?? (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new Ctx();
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 256;
      ctx.createMediaStreamSource(stream).connect(analyser);
      const data = new Uint8Array(analyser.frequencyBinCount);
      const iv = setInterval(() => {
        analyser.getByteFrequencyData(data);
        let sum = 0;
        for (let i = 0; i < data.length; i++) sum += data[i] * data[i];
        setter(Math.min(Math.sqrt(sum / data.length) / 40, 1));
      }, 120);
      return () => { clearInterval(iv); ctx.close().catch(() => {}); };
    } catch {
      return () => {};
    }
  }, []);

  // ── one shared "go live" path (awarded exactly once, on stream arrival) ──
  const goLive = useCallback(() => {
    if (liveRef.current) return;
    liveRef.current = true;
    setState("in-call");
    setStarter(pick(CONVO_STARTERS));
    callStartRef.current = Date.now();
    xpMinutesRef.current = 0;
    setElapsed(0);
    addXp(XP_FIRST_CALL, "First voice call +50 XP");
    if (!hasAchievement("voices-first-call")) unlock("voices-first-call", "🎙️ First Voice Call", 25);
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      const secs = Math.floor((Date.now() - callStartRef.current) / 1000);
      setElapsed(secs);
      const mins = Math.floor(secs / 60);
      if (mins > xpMinutesRef.current) {
        xpMinutesRef.current = mins;
        addXp(XP_PER_MINUTE, `${mins} min of practice +10 XP`);
      }
    }, 1000);
  }, [addXp, hasAchievement, unlock]);

  // ── remote audio wiring (both host & guest land here) ────────────
  const wireRemote = useCallback((mc: MediaConnection, myId: number) => {
    mc.on("stream", (remote) => {
      if (idRef.current !== myId) return; // user already cancelled/restarted
      remoteStreamRef.current = remote;
      if (audioElRef.current) {
        audioElRef.current.srcObject = remote;
        audioElRef.current.play().catch(() => {});
      }
      stopRemoteMeterRef.current?.();
      stopRemoteMeterRef.current = meter(remote, setRemoteLevel);
      goLive();
    });
    mc.on("close", () => { if (idRef.current === myId) endCallRef.current(); });
  }, [goLive, meter]);

  // ── lobby host: wait alone under the well-known id ───────────────
  const hostLane = useCallback(async (lobbyId: string, myId: number) => {
    const host = await openPeer(() => {
      const { default: PeerCtor } = peerModRef.current!;
      return new PeerCtor(lobbyId, { debug: 0 });
    });
    if (idRef.current !== myId) { host.destroy(); return; }
    teardown(false);
    peerRef.current = host;
    setState("waiting");

    host.on("connection", (c) => {
      if (connRef.current) { try { c.close(); } catch {} return; } // one at a time
      connRef.current = c;
      c.on("open", () => {
        if (idRef.current !== myId) return;
        setState("ringing");
        c.send({ t: "hello", college });
      });
      c.on("data", (raw) => {
        const msg = raw as { t: string };
        if (msg.t === "accept" && idRef.current === myId) {
          // Guest accepted — place the audio call.
          try {
            const mc = host.call(c.peer, localStreamRef.current!);
            callRef.current = mc;
            wireRemote(mc, myId);
          } catch { /* guest vanished; connection close will handle it */ }
        }
      });
      c.on("close", () => {
        if (idRef.current === myId && !callRef.current) {
          // Guest left while ringing — go back to waiting.
          connRef.current = null;
          setState("waiting");
        }
      });
    });

    host.on("error", () => { if (idRef.current === myId) { endCallRef.current(); } });
  }, [college, teardown, wireRemote]);

  // ── guest: keep sweeping lanes until a waiting host answers ──────
  const guestSweep = useCallback((myId: number) => {
    let active = false; // fence: never run two sweep passes concurrently
    const sweepOnce = async () => {
      if (idRef.current !== myId || connRef.current || callRef.current) return;
      const { default: PeerCtor } = peerModRef.current!;
      for (const lobbyId of [LOBBY_A, LOBBY_B]) {
        if (idRef.current !== myId || connRef.current || callRef.current) return;
        let guest: Peer | null = null;
        try {
          guest = await openPeer(() => new PeerCtor({ debug: 0 }), 8000);
        } catch {
          continue; // signaling hiccup — next sweep will retry
        }
        if (idRef.current !== myId) { guest.destroy(); return; }
        teardown(false);
        peerRef.current = guest;
        const c = await connectToLobby(guest, lobbyId);
        if (idRef.current !== myId) return;
        if (!c) { try { guest.destroy(); } catch {} peerRef.current = null; continue; }
        // A waiting host took our call.
        if (sweepRef.current) { clearInterval(sweepRef.current); sweepRef.current = null; }
        connRef.current = c;
        setState("ringing");
        c.send({ t: "hello", college });
        c.on("data", (raw) => {
          const msg = raw as { t: string };
          if (msg.t === "hello" && idRef.current === myId) {
            // Host is waiting alone → confirm, so it places the audio call.
            // Our `call` handler below answers; goLive() fires on stream arrival.
            try { c.send({ t: "accept" }); } catch {}
          }
        });
        c.on("close", () => { if (idRef.current === myId) endCallRef.current(); });
        guest.on("call", (mc) => {
          if (callRef.current) { try { mc.close(); } catch {} return; }
          callRef.current = mc;
          try { mc.answer(localStreamRef.current!); } catch {}
          wireRemote(mc, myId);
        });
        return;
      }
    };
    const sweep = () => {
      if (active) return;
      active = true;
      void sweepOnce().finally(() => { active = false; });
    };
    void sweep();
    sweepRef.current = setInterval(sweep, GUEST_SWEEP_MS);
  }, [college, goLive, teardown, wireRemote]);

  // ── start pairing ────────────────────────────────────────────────
  const start = useCallback(async () => {
    if (!college) return;
    const myId = ++idRef.current;
    setState("connecting");
    setErrorMsg("");

    // Load peerjs lazily (client-only) so the static export never SSRs it.
    if (!peerModRef.current) {
      try {
        peerModRef.current = await import("peerjs");
      } catch {
        setState("error");
        setErrorMsg("Couldn't load the voice engine. Check your connection and refresh.");
        return;
      }
    }
    if (idRef.current !== myId) return;

    let stream: MediaStream;
    try {
      stream = await navigator.mediaDevices.getUserMedia({
        audio: { echoCancellation: true, noiseSuppression: true },
      });
    } catch {
      if (idRef.current !== myId) return;
      setState("error");
      setErrorMsg("Microphone access was blocked. Allow the mic in your browser settings and try again.");
      return;
    }
    if (idRef.current !== myId) { stream.getTracks().forEach((t) => t.stop()); return; }
    localStreamRef.current = stream;
    stopMicMeterRef.current?.();
    stopMicMeterRef.current = meter(stream, setMicLevel);

    // Scout both lanes with a throwaway peer: find one that's free.
    let freeLane: string | null = null;
    try {
      const scout = await openPeer(() => {
        const { default: PeerCtor } = peerModRef.current!;
        return new PeerCtor({ debug: 0 });
      }, 12000);
      if (idRef.current !== myId) { scout.destroy(); return; }
      for (const lobbyId of [LOBBY_A, LOBBY_B]) {
        const probe = await connectToLobby(scout, lobbyId, 4000);
        if (probe) { try { probe.close(); } catch {} } // taken → host waiting there
        else { freeLane = lobbyId; break; }            // nobody home → free
      }
      try { scout.destroy(); } catch {}
    } catch {
      // Scout peer failed entirely (network). Fall through: try lane A as host.
      freeLane = LOBBY_A;
    }
    if (idRef.current !== myId) return;

    if (freeLane) {
      try {
        await hostLane(freeLane, myId);
      } catch {
        // Lost the race for the lane (or a signaling hiccup) — just queue up
        // as a guest instead of showing an error.
        if (idRef.current !== myId) return;
        setState("waiting");
        guestSweep(myId);
      }
    } else {
      // Both lanes busy → queue up and sweep until someone frees a lane.
      setState("waiting");
      guestSweep(myId);
    }
  }, [college, fullCleanup, guestSweep, hostLane, meter]);

  // ── call end ─────────────────────────────────────────────────────
  const endCall = useCallback(() => {
    stopAllTimers();
    const talkedMs = Date.now() - callStartRef.current;
    liveRef.current = false;
    teardown(true);
    stopMicMeterRef.current?.();
    stopMicMeterRef.current = null;
    stopRemoteMeterRef.current?.();
    stopRemoteMeterRef.current = null;
    setMuted(false);
    setMicLevel(0);
    setRemoteLevel(0);
    setStarter(null);
    if (talkedMs > 15_000) setState("ended");
    else setState("idle");
  }, [stopAllTimers, teardown]);

  const endCallRef = useRef(endCall);
  endCallRef.current = endCall;

  const hangUp = useCallback(() => {
    try { connRef.current?.send({ t: "bye" }); } catch {}
    endCall();
  }, [endCall]);

  const toggleMute = useCallback(() => {
    const track = localStreamRef.current?.getAudioTracks()[0];
    if (!track) return;
    track.enabled = !track.enabled;
    setMuted(!track.enabled);
  }, []);

  const reset = useCallback(() => {
    idRef.current++; // invalidate any in-flight async steps
    fullCleanup(true);
  }, [fullCleanup]);

  // ── derived ──────────────────────────────────────────────────────
  const mm = String(Math.floor(elapsed / 60)).padStart(2, "0");
  const ss = String(elapsed % 60).padStart(2, "0");

  return (
    <div className="mx-auto max-w-2xl" key={remount}>
      <audio ref={audioElRef} autoPlay className="hidden" />

      {/* ── IDLE: the setup card ── */}
      {state === "idle" && (
        <div className="relative overflow-hidden rounded-3xl border border-white/12 bg-white/[0.04] p-6 backdrop-blur sm:p-8">
          <div className="animate-blob absolute -right-16 -top-16 h-40 w-40 rounded-full bg-volt/20 blur-[80px]" />
          <div className="relative">
            <h3 className="font-display text-2xl font-bold">Find your voice partner</h3>
            <p className="mt-2 text-white/55">
              Voice-only, ≈5 minutes, totally free. Verviq pairs students across partner campuses —
              a Telugu college with a Tamil one — so you practice with someone completely new.
            </p>

            <label className="mt-6 block">
              <span className="font-mono text-[10px] uppercase tracking-widest text-white/45">Your college</span>
              <select
                value={college}
                onChange={(e) => setCollege(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-white/15 bg-ink/60 px-4 py-2.5 text-sm text-white outline-none focus:border-volt"
              >
                {COLLEGES.map((c) => (
                  <option key={c.value} value={c.value} disabled={c.value === ""} className="bg-ink">
                    {c.label}
                  </option>
                ))}
              </select>
            </label>

            <button
              type="button"
              disabled={!college}
              onClick={start}
              className="btn btn-primary mt-6 w-full !py-3.5 !text-base disabled:cursor-not-allowed disabled:opacity-40"
            >
              🎙️ Pair me with a voice partner
            </button>
            <p className="mt-3 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">
              peer-to-peer · audio only · nothing is recorded
            </p>
          </div>
        </div>
      )}

      {/* ── CONNECTING ── */}
      {state === "connecting" && (
        <div className="rounded-3xl border border-white/12 bg-white/[0.04] p-10 text-center backdrop-blur">
          <div className="mx-auto h-14 w-14 animate-spin rounded-full border-4 border-white/15 border-t-volt" />
          <p className="mt-6 font-display text-lg font-semibold">Connecting to the matchmaking network…</p>
          <p className="mt-1 text-sm text-white/45">Checking open voice lanes</p>
          <button type="button" onClick={reset} className="btn btn-outline mt-6 !py-2 !text-sm">
            Cancel
          </button>
        </div>
      )}

      {/* ── WAITING ── */}
      {state === "waiting" && (
        <div className="rounded-3xl border border-white/12 bg-white/[0.04] p-8 text-center backdrop-blur">
          <div className="relative mx-auto flex h-24 w-24 items-center justify-center">
            <span className="absolute inset-0 animate-ping rounded-full bg-volt/20" />
            <span className="absolute inset-2 animate-ping rounded-full bg-volt/15 [animation-delay:0.4s]" />
            <span className="relative text-4xl">🎙️</span>
          </div>
          <p className="mt-6 font-display text-xl font-bold">Waiting for a partner…</p>
          <p className="mx-auto mt-2 max-w-sm text-sm text-white/50">
            You&apos;re in the queue. While you wait — {tip.toLowerCase()}.
          </p>
          <button type="button" onClick={reset} className="btn btn-outline mt-6 !py-2 !text-sm">
            Cancel
          </button>
        </div>
      )}

      {/* ── RINGING ── */}
      {state === "ringing" && (
        <div className="rounded-3xl border border-gold/40 bg-gold/10 p-8 text-center backdrop-blur">
          <p className="text-4xl">🔔</p>
          <p className="mt-4 font-display text-xl font-bold text-gold">Partner found!</p>
          <p className="mt-2 text-sm text-white/70">
            Someone from another Verviq campus just joined — connecting audio…
          </p>
          <div className="mt-5 flex items-center justify-center gap-1.5">
            {[0, 1, 2].map((i) => (
              <span key={i} className="h-2 w-2 animate-bounce rounded-full bg-gold" style={{ animationDelay: `${i * 0.15}s` }} />
            ))}
          </div>
        </div>
      )}

      {/* ── IN CALL ── */}
      {state === "in-call" && (
        <div className="relative overflow-hidden rounded-3xl border border-mint/30 bg-mint/[0.06] p-6 backdrop-blur sm:p-8">
          <div className="animate-blob absolute -bottom-16 -left-16 h-40 w-40 rounded-full bg-mint/15 blur-[80px]" />
          <div className="relative text-center">
            <div className="flex items-center justify-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-mint">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mint opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-mint" />
              </span>
              live · {mm}:{ss}
            </div>

            <p className="mt-6 font-mono text-[10px] uppercase tracking-widest text-white/45">conversation starter</p>
            <p className="mx-auto mt-2 max-w-md font-display text-2xl font-bold leading-snug text-white">
              &ldquo;{starter}&rdquo;
            </p>

            {/* live meters */}
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                <p className="font-mono text-[9px] uppercase tracking-widest text-white/40">you</p>
                <div className="mt-2 flex h-2 overflow-hidden rounded-full bg-white/10">
                  <div className="h-full rounded-full bg-volt transition-all duration-150" style={{ width: `${Math.max(micLevel * 100, 3)}%` }} />
                </div>
                <p className="mt-2 text-[11px] text-white/40">{muted ? "muted" : micLevel > 0.05 ? "they can hear you" : "say something…"}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                <p className="font-mono text-[9px] uppercase tracking-widest text-white/40">them</p>
                <div className="mt-2 flex h-2 overflow-hidden rounded-full bg-white/10">
                  <div className="h-full rounded-full bg-flame transition-all duration-150" style={{ width: `${Math.max(remoteLevel * 100, 3)}%` }} />
                </div>
                <p className="mt-2 text-[11px] text-white/40">{remoteLevel > 0.05 ? "partner speaking" : "listening…"}</p>
              </div>
            </div>

            {/* controls */}
            <div className="mt-8 flex items-center justify-center gap-3">
              <button type="button" onClick={toggleMute} aria-label={muted ? "Unmute" : "Mute"} className={`flex h-12 w-12 items-center justify-center rounded-full border text-lg transition-colors ${muted ? "border-flame bg-flame/20 text-flame" : "border-white/20 bg-white/5 text-white hover:bg-white/10"}`}>
                {muted ? "🔇" : "🎙️"}
              </button>
              <button type="button" onClick={hangUp} className="flex h-14 items-center gap-2 rounded-full bg-flame px-7 font-display text-sm font-bold text-white transition-transform hover:scale-105">
                <span aria-hidden>📞</span> End call
              </button>
              <button type="button" onClick={() => setStarter(pick(CONVO_STARTERS))} aria-label="New conversation starter" className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/5 text-lg text-white transition-colors hover:bg-white/10">
                🔄
              </button>
            </div>
            <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">
              be kind · this is someone&apos;s first interview practice
            </p>
          </div>
        </div>
      )}

      {/* ── ENDED ── */}
      {state === "ended" && (
        <div className="rounded-3xl border border-white/12 bg-white/[0.04] p-8 text-center backdrop-blur">
          <p className="text-4xl">🙌</p>
          <p className="mt-4 font-display text-2xl font-bold">Call ended</p>
          <p className="mx-auto mt-2 max-w-sm text-sm text-white/55">
            You talked for {mm}:{ss} and earned real XP. That was the hardest part — starting. Want another round?
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <button type="button" onClick={reset} className="btn btn-primary !px-6">
              Pair me again
            </button>
            <a href="/play" className="btn btn-outline !px-6">Back to games</a>
          </div>
        </div>
      )}

      {/* ── ERROR ── */}
      {state === "error" && (
        <div className="rounded-3xl border border-flame/40 bg-flame/10 p-8 text-center backdrop-blur">
          <p className="text-4xl">😕</p>
          <p className="mt-4 font-display text-xl font-bold text-flame">Something went wrong</p>
          <p className="mx-auto mt-2 max-w-sm text-sm text-white/60">{errorMsg}</p>
          <button type="button" onClick={reset} className="btn btn-outline mt-6 !px-6">
            Try again
          </button>
        </div>
      )}
    </div>
  );
}
