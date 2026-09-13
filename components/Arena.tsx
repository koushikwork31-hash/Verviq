"use client";

import { useState } from "react";
import Reveal from "./ui/Reveal";
import SectionTag from "./ui/SectionTag";

const challenges = [
  {
    emoji: "🎯",
    title: "The Two-Ball Interview",
    chip: "both_sides_of_the_table",
    accent: "volt" as const,
    front:
      "The trainer throws two balls to two students. Whoever catches the ball becomes the interviewer — and must conduct a quick mock interview with another student.",
    frontNote: "Flip the card to see the takeaway →",
    back: "Every student experiences BOTH sides of the interview table. You learn what interviewers look for by becoming one.",
    cta: "See the Challenge",
  },
  {
    emoji: "🔥",
    title: "HR Hot Seat",
    chip: "rapid_fire_round",
    accent: "flame" as const,
    front:
      "One student sits in the hot seat. The HR fires rapid questions. The student has limited time to respond while the room watches, learns and scores.",
    frontNote: "Flip the card to see the takeaway →",
    back: "Pressure becomes familiar. Students learn to think on their feet — and the room learns from every answer.",
    cta: "Enter the Hot Seat",
  },
  {
    emoji: "⚡",
    title: "60-Second Challenge",
    chip: "think_fast_speak_faster",
    accent: "gold" as const,
    front:
      "Students get a random topic, 60 seconds to think, then they speak. Topics range from \"Convince me to buy this water bottle\" to \"Explain AI to your grandmother.\"",
    frontNote: "Flip the card to see the takeaway →",
    back: "Structured thinking under time pressure. Students learn to organize thoughts fast and speak with clarity.",
    cta: "Take the Challenge",
  },
  {
    emoji: "🧠",
    title: "GD Battle",
    chip: "team_vs_team",
    accent: "mint" as const,
    front:
      "Teams compete in group discussions. Students are scored on Communication, Logic, Listening, Leadership, Confidence and Teamwork.",
    frontNote: "Flip the card to see the scoring →",
    back: "Live scoring makes every GD feel like a match. Teams fight for the top of the leaderboard.",
    cta: "Join the Battle",
    scores: [
      { label: "Communication", value: 88 },
      { label: "Logic", value: 92 },
      { label: "Listening", value: 76 },
      { label: "Leadership", value: 70 },
      { label: "Confidence", value: 84 },
      { label: "Teamwork", value: 90 },
    ],
  },
];

const accentStyles = {
  volt: { text: "text-volt", bg: "bg-volt", soft: "bg-volt/10", border: "border-volt/40", bar: "bg-volt" },
  flame: { text: "text-flame", bg: "bg-flame", soft: "bg-flame/10", border: "border-flame/40", bar: "bg-flame" },
  gold: { text: "text-gold", bg: "bg-gold", soft: "bg-gold/10", border: "border-gold/40", bar: "bg-gold" },
  mint: { text: "text-mint", bg: "bg-mint", soft: "bg-mint/10", border: "border-mint/40", bar: "bg-mint" },
};

function ChallengeCard({ challenge, index }: { challenge: (typeof challenges)[number]; index: number }) {
  const [flipped, setFlipped] = useState(false);
  const a = accentStyles[challenge.accent];

  return (
    <Reveal delay={index * 100} className="[perspective:1200px]">
      <button
        type="button"
        onClick={() => setFlipped((v) => !v)}
        aria-pressed={flipped}
        className={`card-lift relative block h-full min-h-[380px] w-full rounded-3xl border border-ink/8 bg-white p-7 text-left shadow-[0_2px_16px_rgba(10,15,44,0.05)] transition-transform duration-500 [transform-style:preserve-3d] hover:shadow-[0_18px_44px_-12px_rgba(10,15,44,0.18)] ${
          flipped ? "[transform:rotateY(180deg)]" : ""
        }`}
      >
        {/* ── Front ── */}
        <span
          className="absolute inset-0 [backface-visibility:hidden]"
          aria-hidden={flipped}
        >
          <span className={`inline-block rounded-md px-2 py-0.5 font-mono text-[10px] ${a.soft} ${a.text}`}>
            {challenge.chip}
          </span>
          <span className="mt-4 flex items-start gap-3">
            <span className="text-4xl leading-none">{challenge.emoji}</span>
            <span className="font-display text-xl font-bold leading-snug text-ink">{challenge.title}</span>
          </span>
          <span className="mt-4 block text-sm leading-relaxed text-ink/60">{challenge.front}</span>
          <span className="absolute bottom-6 left-7 right-7 flex items-center justify-between">
            <span className={`font-display text-sm font-semibold ${a.text}`}>{challenge.frontNote}</span>
            <span
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-lg ${a.soft} ${a.text}`}
            >
              ↻
            </span>
          </span>
        </span>

        {/* ── Back ── */}
        <span
          className={`absolute inset-0 overflow-hidden rounded-3xl p-7 [backface-visibility:hidden] [transform:rotateY(180deg)] ${
            challenge.accent === "gold" || challenge.accent === "mint" ? "bg-ink text-white" : "bg-ink-2 text-white"
          }`}
        >
          <span className={`inline-block rounded-md px-2 py-0.5 font-mono text-[10px] ${a.soft} ${a.text}`}>
            {challenge.accent === "mint" ? "live_scoreboard" : "skill_unlocked"}
          </span>
          <span className="mt-4 flex items-start gap-3">
            <span className="text-3xl leading-none">{challenge.emoji}</span>
            <span className="font-display text-xl font-bold">{challenge.title}</span>
          </span>

          {challenge.scores ? (
            <span className="mt-5 block space-y-2.5">
              {challenge.scores.map((s) => (
                <span key={s.label} className="flex items-center gap-3">
                  <span className="w-24 shrink-0 text-xs font-medium text-white/70">{s.label}</span>
                  <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
                    <span
                      className={`animate-bar block h-full rounded-full ${a.bar}`}
                      style={{ width: `${s.value}%`, animationDelay: "0.2s" }}
                    />
                  </span>
                  <span className={`w-8 text-right font-display text-xs font-bold ${a.text}`}>{s.value}</span>
                </span>
              ))}
            </span>
            ) : (
            <span className="mt-5 block text-sm leading-relaxed text-white/75">{challenge.back}</span>
          )}

          <span className="absolute bottom-6 left-7 right-7 flex items-center justify-between">
            <span className="font-display text-sm font-semibold text-white/90">{challenge.cta} →</span>
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 text-lg">
              ↺
            </span>
          </span>
        </span>
      </button>
    </Reveal>
  );
}

export default function Arena() {
  return (
    <section id="arena" className="section-pad relative bg-cream-2">
      <div className="wrap">
        <Reveal className="mx-auto max-w-3xl text-center">
          <SectionTag>Signature experience</SectionTag>
          <h2 className="mt-5 font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">
            Welcome to the Verviq <span className="gradient-text">Arena.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-ink/60">
            Every session feels less like a class and more like a challenge.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2">
          {challenges.map((c, i) => (
            <ChallengeCard key={c.title} challenge={c} index={i} />
          ))}
        </div>

        <Reveal delay={150} className="mt-10 text-center">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-ink/40">
            tap a card to flip it — every challenge works both ways
          </p>
        </Reveal>
      </div>
 </section>
  );
}
