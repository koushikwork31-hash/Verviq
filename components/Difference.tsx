"use client";

import { useState } from "react";
import Reveal from "./ui/Reveal";
import SectionTag from "./ui/SectionTag";

const panels = {
  traditional: {
    label: "Traditional Training",
    emoji: "💤",
    accent: "text-ink/50",
    chip: "bg-ink/5 text-ink/60 border-ink/10",
    items: ["PPT lectures", "Notes", "Memorized answers", "Passive participation", "Generic exercises"],
    footer: "Students learn *about* interviews.",
  },
  verviq: {
    label: "Verviq",
    emoji: "🔥",
    accent: "text-flame",
    chip: "bg-flame/10 text-flame border-flame/20",
    items: [
      "Live simulations",
      "Games",
      "Peer challenges",
      "Real interview scenarios",
      "Instant feedback",
      "Repeated practice",
    ],
    footer: "Students practice *the interview itself*.",
  },
};

export default function Difference() {
  const [mode, setMode] = useState<"traditional" | "verviq">("traditional");
  const panel = panels[mode];

  return (
    <section className="section-pad relative overflow-hidden bg-ink text-white">
      <div className="web-grid absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,black,transparent)]" />
      <div className="animate-blob absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-volt/20 blur-[120px]" />

      <div className="wrap relative">
        <Reveal className="mx-auto max-w-3xl text-center">
          <SectionTag dark>The Verviq difference</SectionTag>
          <h2 className="mt-5 font-display text-4xl font-bold tracking-tight sm:text-5xl">
            No boring soft-skills lectures.
          </h2>
          <p className="mt-5 font-display text-2xl font-semibold sm:text-3xl">
            We make students <span className="gradient-text">DO</span> the interview.
          </p>
          <p className="mx-auto mt-4 max-w-xl text-white/55">
            Traditional training often teaches students what to say. Verviq makes them practice
            saying it.
          </p>
        </Reveal>

        <Reveal delay={150} className="mx-auto mt-12 max-w-3xl">
          {/* toggle */}
          <div className="mx-auto flex w-fit rounded-full border border-white/15 bg-white/5 p-1.5 backdrop-blur">
            <button
              type="button"
              onClick={() => setMode("traditional")}
              className={`rounded-full px-5 py-2 font-display text-sm font-semibold transition-all duration-300 ${
                mode === "traditional" ? "bg-white/15 text-white shadow" : "text-white/50 hover:text-white/80"
              }`}
            >
              💤 Traditional
            </button>
            <button
              type="button"
              onClick={() => setMode("verviq")}
              className={`rounded-full px-5 py-2 font-display text-sm font-semibold transition-all duration-300 ${
                mode === "verviq" ? "bg-flame text-white shadow-[0_4px_16px_rgba(255,61,61,0.45)]" : "text-white/50 hover:text-white/80"
              }`}
            >
              🔥 Verviq
            </button>
          </div>

          {/* panel */}
          <div className="relative mt-8 rounded-3xl border border-white/12 bg-ink-2/80 p-8 backdrop-blur sm:p-10">
            <span
              className={`absolute -top-4 right-8 rounded-full border px-4 py-1 font-mono text-[10px] uppercase tracking-wider transition-colors duration-300 ${panel.chip}`}
            >
              {mode === "traditional" ? "legacy_mode" : "verviq_mode"}
            </span>

            <div key={mode} className="animate-pop">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{panel.emoji}</span>
                <h3 className={`font-display text-2xl font-bold ${panel.accent}`}>{panel.label}</h3>
              </div>

              <ul className="mt-7 space-y-3.5">
                {panel.items.map((item) => (
                  <li key={item} className="flex items-center gap-3.5">
                    <span
                      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                        mode === "verviq" ? "bg-flame/20 text-flame" : "bg-white/10 text-white/40"
                      }`}
                    >
                      {mode === "verviq" ? "✓" : "–"}
                    </span>
                    <span
                      className={`font-display text-base font-medium sm:text-lg ${
                        mode === "verviq" ? "text-white" : "text-white/45 line-through decoration-white/20"
                      }`}
                    >
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              <p className="mt-8 border-t border-white/10 pt-5 font-display text-sm italic text-white/50">
                {mode === "traditional" ? (
                  <>
                    Students learn <em className="text-white/70 not-italic">about</em> interviews.
                  </>
                ) : (
                  <>
                    Students practice <em className="text-flame not-italic font-semibold">the interview itself.</em>
                  </>
                )}
              </p>
            </div>

            {/* VS badge */}
            <span className="absolute -bottom-5 left-1/2 flex h-11 w-11 -translate-x-1/2 items-center justify-center rounded-full border border-white/20 bg-ink font-display text-sm font-extrabold tracking-wide shadow-lg">
              VS
            </span>
          </div>

          <p className="mt-10 text-center font-mono text-xs uppercase tracking-[0.25em] text-white/30">
            tap the toggle — feel the difference
          </p>
        </Reveal>
      </div>
    </section>
  );
}
