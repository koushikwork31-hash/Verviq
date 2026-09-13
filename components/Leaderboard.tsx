"use client";

import Reveal from "./ui/Reveal";
import SectionTag from "./ui/SectionTag";
import { useXp } from "./games/XpContext";

const SAMPLES = [
  { name: "Student A", xp: 920 },
  { name: "Student B", xp: 870 },
  { name: "Student C", xp: 810 },
];

const MEDALS = ["🥇", "🥈", "🥉"];

const categories = ["Communication", "Confidence", "Leadership", "Interview Skills", "Participation"];

export default function Leaderboard() {
  const { xp: youXp, level } = useXp();

  const merged = [
    ...SAMPLES.map((s) => ({ ...s, you: false })),
    { name: "YOU", xp: youXp, you: true },
  ].sort((a, b) => b.xp - a.xp);

  const podium = merged.slice(0, 3);

  return (
    <section id="leaderboard" className="section-pad relative overflow-hidden bg-ink text-white">
      <div className="web-grid absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_65%_60%_at_50%_40%,black,transparent)]" />
      <div className="animate-blob absolute -right-24 top-10 h-80 w-80 rounded-full bg-gold/10 blur-[120px]" />

      <div className="wrap relative">
        <Reveal className="mx-auto max-w-3xl text-center">
          <SectionTag dark>Gamified learning</SectionTag>
          <h2 className="mt-5 font-display text-4xl font-bold tracking-tight sm:text-5xl">
            Make learning <span className="gradient-text">competitive.</span>
          </h2>
          <p className="mt-4 font-display text-lg font-medium text-white/70">
            &ldquo;Who said soft skills couldn&apos;t have a leaderboard?&rdquo;
          </p>
        </Reveal>

        {/* podium */}
        <Reveal delay={150} className="mx-auto mt-14 max-w-3xl">
          <div className="grid gap-4 sm:grid-cols-3">
            {podium.map((p, i) => (
              <div
                key={p.name}
                className={`card-lift relative rounded-3xl border p-6 text-center backdrop-blur ${
                  p.you
                    ? "border-gold/70 bg-gold/10 shadow-[0_24px_60px_-18px_rgba(251,191,36,0.4)]"
                    : i === 0
                      ? "border-gold/60 bg-gold/10"
                      : i === 1
                        ? "border-white/20 bg-white/5"
                        : "border-orange-400/40 bg-orange-400/10"
                } ${i === 0 ? "sm:-translate-y-4" : ""}`}
              >
                {i === 0 && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gold px-3 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider text-ink">
                    top of the arena
                  </span>
                )}
                <p className="text-4xl">{MEDALS[i]}</p>
                <p className="mt-2 font-mono text-[10px] uppercase tracking-widest text-white/40">
                  rank 0{i + 1}
                </p>
                <p className={`mt-1 font-display text-lg font-bold ${p.you ? "text-gold" : ""}`}>
                  {p.name}
                </p>
                <p className="mt-3 font-display text-2xl font-extrabold text-gold">
                  {p.xp.toLocaleString("en-IN")}{" "}
                  <span className="text-sm font-semibold text-white/50">XP</span>
                </p>
                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="animate-bar h-full rounded-full bg-gradient-to-r from-flame to-gold"
                    style={{ width: `${(p.xp / Math.max(merged[0].xp, 1)) * 100}%`, animationDelay: `${i * 0.15}s` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* full table */}
          <div className="mt-6 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]">
            {merged.map((p, i) => (
              <div
                key={p.name}
                className={`flex items-center gap-4 px-5 py-4 ${
                  p.you
                    ? "border-y border-gold/30 bg-gold/10"
                    : i < merged.length - 1
                      ? "border-b border-white/8"
                      : ""
                }`}
              >
                <span className="w-8 text-center text-xl">{MEDALS[i] ?? "🎯"}</span>
                <span className="font-mono text-xs text-white/40">{String(i + 1).padStart(2, "0")}</span>
                <span className={`font-display text-sm font-semibold ${p.you ? "text-gold" : "text-white/90"}`}>
                  {p.name}
                  {p.you && (
                    <span className="ml-2 rounded-full bg-gold/20 px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider text-gold">
                      {level.name}
                    </span>
                  )}
                </span>
                <span className={`ml-auto font-display text-sm font-bold ${p.you ? "text-gold" : "text-gold/80"}`}>
                  {p.xp.toLocaleString("en-IN")} XP
                </span>
              </div>
            ))}
          </div>

          {/* categories */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5">
            {categories.map((c) => (
              <span
                key={c}
                className="rounded-full border border-white/12 bg-white/5 px-4 py-1.5 font-display text-xs font-semibold text-white/70 transition-colors hover:border-flame/50 hover:text-white"
              >
                {c}
              </span>
            ))}
          </div>

          <p className="mt-8 text-center font-mono text-xs uppercase tracking-[0.25em] text-white/30">
            sample students + your live score · play in the playground to climb
          </p>
        </Reveal>
      </div>
    </section>
  );
}
