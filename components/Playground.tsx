"use client";

import Link from "next/link";
import { useState } from "react";
import SectionTag from "./ui/SectionTag";
import Reveal from "./ui/Reveal";
import { useXp } from "./games/XpContext";
import HotSeat from "./games/HotSeat";
import SixtySeconds from "./games/SixtySeconds";
import StarBuilder from "./games/StarBuilder";

const GAMES = [
  { id: "hotseat", tab: "🔥 HR Hot Seat", blurb: "Rapid-fire quiz" },
  { id: "sixty", tab: "⚡ 60 Seconds", blurb: "Timed speaking" },
  { id: "star", tab: "🧩 STAR Builder", blurb: "Structure puzzle" },
] as const;

export const PLAY_TEASER_ID = "playground";

type GameId = (typeof GAMES)[number]["id"];

function XpHeader() {
  const { xp, level, nextLevel, progress, achievements } = useXp();
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-white/12 bg-white/[0.05] p-5 backdrop-blur sm:flex-row sm:items-center">
      <div className="flex items-center gap-3">
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold/15 text-2xl">🎮</span>
        <div>
          <p className="font-mono text-[10px] uppercase tracking-widest text-white/45">your xp</p>
          <p className="font-display text-xl font-extrabold text-gold">{xp} XP</p>
        </div>
        <div className="ml-2 hidden sm:block">
          <p className="font-mono text-[10px] uppercase tracking-widest text-white/45">level</p>
          <p className="font-display text-sm font-bold text-white">{level.name}</p>
        </div>
      </div>

      <div className="flex-1 sm:px-4">
        <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-white/40">
          <span>{level.name}</span>
          <span>{nextLevel ? `${nextLevel.min - xp} XP → ${nextLevel.name}` : "max level 👑"}</span>
        </div>
        <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-gradient-to-r from-flame via-gold to-mint transition-all duration-700"
            style={{ width: `${Math.max(progress * 100, 3)}%` }}
          />
        </div>
      </div>

      <div className="flex items-center gap-1.5">
        {achievements.length === 0 ? (
          <span className="font-mono text-[10px] uppercase tracking-wider text-white/35">no badges yet — go play</span>
        ) : (
          <span className="rounded-full border border-gold/40 bg-gold/10 px-3 py-1 font-mono text-[10px] font-bold text-gold">
            🏆 {achievements.length} badge{achievements.length > 1 ? "s" : ""}
          </span>
        )}
      </div>
    </div>
  );
}

export default function Playground({ full = true }: { full?: boolean }) {
  const [tab, setTab] = useState<GameId>("hotseat");
  const [remount, setRemount] = useState(0);
  const { xp } = useXp();

  return (
    <section id="playground" className="section-pad relative overflow-hidden bg-ink text-white">
      <div className="web-grid absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_65%_60%_at_50%_30%,black,transparent)]" />
      <div className="animate-blob absolute -right-24 top-1/3 h-80 w-80 rounded-full bg-flame/15 blur-[120px]" />
      <div className="animate-blob absolute -left-24 bottom-0 h-80 w-80 rounded-full bg-volt/20 blur-[120px] [animation-delay:2s]" />

      <div className="wrap relative">
        <Reveal className="mx-auto max-w-3xl text-center">
          <SectionTag dark>The playground</SectionTag>
          <h2 className="mt-5 font-display text-4xl font-bold tracking-tight sm:text-5xl">
            Don&apos;t just read. <span className="gradient-text">Play.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-white/55">
            Three quick interview challenges. Real XP. Zero PPTs. Your score saves on this device —
            try to reach <span className="font-semibold text-white">Interview Ready</span>.
          </p>
        </Reveal>

        <Reveal delay={140} className="mx-auto mt-10 max-w-3xl">
          <XpHeader />
        </Reveal>

        {/* tabs */}
        <Reveal delay={200} className="mx-auto mt-8 max-w-3xl">
          <div className="flex flex-wrap justify-center gap-2" role="tablist" aria-label="Games">
            {GAMES.map((g) => (
              <button
                key={g.id}
                type="button"
                role="tab"
                aria-selected={tab === g.id}
                onClick={() => setTab(g.id)}
                className={`rounded-full px-4 py-2.5 font-display text-sm font-semibold transition-all sm:px-5 ${
                  tab === g.id
                    ? "bg-white text-ink shadow-[0_6px_20px_rgba(255,255,255,0.15)]"
                    : "border border-white/15 bg-white/5 text-white/60 hover:border-white/35 hover:text-white"
                }`}
              >
                {g.tab}
                <span className={`ml-2 hidden font-mono text-[9px] uppercase tracking-wider sm:inline ${tab === g.id ? "text-ink/45" : "text-white/35"}`}>
                  {g.blurb}
                </span>
              </button>
            ))}
          </div>
        </Reveal>

        {/* game stage */}
        {full ? (
          <>
            {/* tabs */}
            <Reveal delay={200} className="mx-auto mt-8 max-w-3xl">
              <div className="flex flex-wrap justify-center gap-2" role="tablist" aria-label="Games">
                {GAMES.map((g) => (
                  <button
                    key={g.id}
                    type="button"
                    role="tab"
                    aria-selected={tab === g.id}
                    onClick={() => setTab(g.id)}
                    className={`rounded-full px-4 py-2.5 font-display text-sm font-semibold transition-all sm:px-5 ${
                      tab === g.id
                        ? "bg-white text-ink shadow-[0_6px_20px_rgba(255,255,255,0.15)]"
                        : "border border-white/15 bg-white/5 text-white/60 hover:border-white/35 hover:text-white"
                    }`}
                  >
                    {g.tab}
                    <span className={`ml-2 hidden font-mono text-[9px] uppercase tracking-wider sm:inline ${tab === g.id ? "text-ink/45" : "text-white/35"}`}>
                      {g.blurb}
                    </span>
                  </button>
                ))}
              </div>
            </Reveal>

            {/* game stage */}
            <Reveal delay={260} className="mx-auto mt-8 max-w-2xl">
              <div key={`${tab}-${remount}`}>
                {tab === "hotseat" && <HotSeat onExit={() => setRemount((n) => n + 1)} />}
                {tab === "sixty" && <SixtySeconds onExit={() => setRemount((n) => n + 1)} />}
                {tab === "star" && <StarBuilder onExit={() => setRemount((n) => n + 1)} />}
              </div>
              <p className="mt-6 text-center font-mono text-[10px] uppercase tracking-[0.25em] text-white/30">
                practice here · perform in the arena
              </p>
            </Reveal>
          </>
        ) : (
          <Reveal delay={200} className="mx-auto mt-10 max-w-2xl">
            <div className="relative overflow-hidden rounded-3xl border border-white/12 bg-white/[0.04] p-8 text-center backdrop-blur">
              <div className="animate-blob absolute -right-16 -top-16 h-40 w-40 rounded-full bg-flame/20 blur-[80px]" />
              <div className="relative">
                <div className="flex flex-wrap justify-center gap-2">
                  {GAMES.map((g) => (
                    <span key={g.id} className="rounded-full border border-white/15 bg-white/5 px-4 py-1.5 font-display text-sm font-semibold text-white/80">
                      {g.tab}
                    </span>
                  ))}
                </div>
                <p className="mx-auto mt-4 max-w-md text-white/55">
                  {xp > 0 ? "Your XP and badges are waiting." : "Real questions, real timer, real XP — saved on your device."} You&rsquo;re one click away.
                </p>
                <Link href="/play" className="btn btn-primary mt-6 !px-7 !py-3">
                  Enter the Playground →
                </Link>
                <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.25em] text-white/30">
                  free · no signup · saves on this device
                </p>
              </div>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
