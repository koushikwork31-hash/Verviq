"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useXp } from "./XpContext";

const TOPICS = [
  "Convince me to buy this water bottle.",
  "Explain AI to your grandmother.",
  "Sell me your college in 60 seconds.",
  "Why is teamwork overrated… and then underrated?",
  "Persuade me that Mondays are the best day.",
  "Explain your final-year project to a 10-year-old.",
  "Make a case for public transport over private cars.",
  "Your friend wants to quit college for a startup. Talk them through it.",
  "Convince me that reading fiction makes better engineers.",
  "Pitch an app that solves a daily campus problem.",
];

const CHECKPOINTS = [
  { id: "hook", label: "Strong hook in the first 5 seconds" },
  { id: "structure", label: "2–3 clear points (not one rambling sentence)" },
  { id: "example", label: "At least one example or story" },
  { id: "close", label: "A confident closing line" },
  { id: "fillers", label: "Minimal \"umm\", \"like\", \"actually\"" },
];

const THINK_SECONDS = 10;
const SPEAK_SECONDS = 60;

export default function SixtySeconds({ onExit }: { onExit?: () => void }) {
  const { addXp, unlock } = useXp();
  const [stage, setStage] = useState<"intro" | "think" | "speak" | "score">("intro");
  const [topic, setTopic] = useState("");
  const [time, setTime] = useState(0);
  const [checked, setChecked] = useState<string[]>([]);
  const [earned, setEarned] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = null;
  };
  useEffect(() => clearTimer, []);

  const startTimer = useCallback((seconds: number, onEnd: () => void) => {
    clearTimer();
    setTime(seconds);
    timerRef.current = setInterval(() => {
      setTime((t) => {
        if (t <= 1) {
          clearTimer();
          onEnd();
          return 0;
        }
        return t - 1;
      });
    }, 1000);
  }, []);

  const begin = () => {
    const t = TOPICS[Math.floor(Math.random() * TOPICS.length)];
    setTopic(t);
    setChecked([]);
    setStage("think");
    startTimer(THINK_SECONDS, () => {
      setStage("speak");
      startTimer(SPEAK_SECONDS, () => setStage("score"));
    });
  };

  const toggle = (id: string) =>
    setChecked((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const submit = () => {
    clearTimer();
    setStage("score");
    const xp = 20 + checked.length * 15;
    setEarned(xp);
    addXp(xp, "60-Second Challenge complete");
    if (checked.length >= 4) unlock("structured-speaker", "Structured Speaker · 4+ checkpoints", 30);
    if (checked.length === CHECKPOINTS.length) unlock("perfectionist", "Perfect Structure · all 5", 40);
  };

  const timePct = stage === "think" ? (time / THINK_SECONDS) * 100 : (time / SPEAK_SECONDS) * 100;

  /* ── Intro ── */
  if (stage === "intro") {
    return (
      <div className="flex min-h-[420px] flex-col items-center justify-center rounded-3xl border border-ink/10 bg-gradient-to-b from-volt/5 to-white p-8 text-center">
        <span className="text-5xl">⚡</span>
        <h3 className="mt-4 font-display text-2xl font-bold text-ink">60-Second Challenge</h3>
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-ink/60">
          You get a random topic. {THINK_SECONDS} seconds to think. {SPEAK_SECONDS} seconds to speak
          out loud. Then honestly check what you did — honesty is the game.
        </p>
        <button type="button" onClick={begin} className="btn btn-blue mt-7">
          Give me a topic →
        </button>
        <p className="mt-4 font-mono text-[10px] uppercase tracking-widest text-ink/35">
          think fast · speak faster
        </p>
      </div>
    );
  }

  /* ── Scoring ── */
  if (stage === "score") {
    return (
      <div className="animate-pop rounded-3xl border border-ink/10 bg-white p-6 sm:p-8">
        <div className="text-center">
          <span className="text-5xl">{checked.length >= 4 ? "🎯" : checked.length >= 2 ? "👏" : "🌱"}</span>
          <h3 className="mt-3 font-display text-2xl font-bold text-ink">
            {checked.length}/{CHECKPOINTS.length} checkpoints hit
          </h3>
          <p className="mt-1 text-sm text-ink/55">Topic: &ldquo;{topic}&rdquo;</p>
          <p className="mt-4 font-display text-3xl font-extrabold text-gold">+{earned} XP</p>
        </div>

        <div className="mt-6 rounded-2xl border border-ink/10 bg-cream p-4">
          <p className="font-display text-xs font-bold uppercase tracking-wider text-ink/50">
            Next time, try the sandwich:
          </p>
          <p className="mt-2 text-sm leading-relaxed text-ink/70">
            <strong>Hook</strong> → grab attention → <strong>2 points + 1 example</strong> →{" "}
            <strong>Close</strong> → land the final line. Sixty seconds is a structure game, not a
            speed game.
          </p>
        </div>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button type="button" onClick={begin} className="btn btn-ghost">New topic</button>
          <button type="button" onClick={onExit} className="btn btn-primary">Back to challenges</button>
        </div>
      </div>
    );
  }

  /* ── Think / Speak ── */
  return (
    <div className="rounded-3xl border border-ink/10 bg-white p-6 sm:p-8">
      <div className="flex items-center justify-between">
        <span className={`rounded-md px-2 py-0.5 font-mono text-[10px] font-bold ${stage === "think" ? "bg-gold/15 text-gold" : "bg-flame/10 text-flame"}`}>
          {stage === "think" ? "THINK" : "SPEAK"}
        </span>
        <span className={`font-display text-2xl font-extrabold tabular-nums ${time <= 5 ? "text-flame" : "text-ink"}`}>
          {time}s
        </span>
      </div>

      <div className="mt-3 h-2 overflow-hidden rounded-full bg-ink/8">
        <div
          className={`h-full rounded-full transition-all duration-1000 ease-linear ${stage === "think" ? "bg-gold" : time <= 10 ? "bg-flame" : "bg-volt"}`}
          style={{ width: `${timePct}%` }}
        />
      </div>

      <div className="mt-6 rounded-2xl bg-ink p-6 text-center">
        <p className="font-mono text-[10px] uppercase tracking-widest text-sky">your topic</p>
        <p className="mt-2 font-display text-xl font-bold leading-snug text-white sm:text-2xl">
          &ldquo;{topic}&rdquo;
        </p>
      </div>

      {stage === "think" ? (
        <div className="mt-6 text-center">
          <p className="animate-pulse-soft font-display text-sm font-semibold text-ink/60">
            Plan your hook, your points, your close…
          </p>
          <button
            type="button"
            onClick={() => {
              clearTimer();
              setStage("speak");
              startTimer(SPEAK_SECONDS, () => setStage("score"));
            }}
            className="btn btn-blue mt-5"
          >
            I&apos;m ready — start speaking ⏱
          </button>
        </div>
      ) : (
        <div className="mt-6">
          <p className="font-display text-xs font-bold uppercase tracking-wider text-ink/50">
            Speaking out loud? Tick these as you go:
          </p>
          <div className="mt-3 space-y-2">
            {CHECKPOINTS.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => toggle(c.id)}
                className={`flex w-full items-center gap-3 rounded-xl border px-4 py-2.5 text-left text-sm transition-all ${
                  checked.includes(c.id)
                    ? "border-mint bg-mint/10 text-ink"
                    : "border-ink/15 text-ink/60 hover:border-volt"
                }`}
              >
                <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md text-[11px] font-bold ${checked.includes(c.id) ? "bg-mint text-white" : "bg-ink/8 text-ink/40"}`}>
                  {checked.includes(c.id) ? "✓" : ""}
                </span>
                {c.label}
              </button>
            ))}
          </div>
          <button type="button" onClick={submit} className="btn btn-primary mt-5 w-full !py-3">
            Done — score me →
          </button>
        </div>
      )}
    </div>
  );
}
