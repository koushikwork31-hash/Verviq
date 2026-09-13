import Reveal from "./ui/Reveal";
import SectionTag from "./ui/SectionTag";

const weeks = [
  {
    week: "WEEK 01",
    title: "Break the Ice",
    focus: "Communication + confidence",
    emoji: "🧊",
    accent: "volt" as const,
  },
  {
    week: "WEEK 02",
    title: "Find Your Voice",
    focus: "Speaking + storytelling + body language",
    emoji: "🎙️",
    accent: "sky" as const,
  },
  {
    week: "WEEK 03",
    title: "Enter the Interview",
    focus: "HR + GD + situational questions",
    emoji: "🚪",
    accent: "flame" as const,
  },
  {
    week: "WEEK 04",
    title: "The Final Round",
    focus: "Full mock recruitment simulation",
    emoji: "🏆",
    accent: "mint" as const,
  },
];

const accents = {
  volt: { text: "text-volt", soft: "bg-volt/10", border: "border-volt/25" },
  sky: { text: "text-volt", soft: "bg-volt/10", border: "border-volt/25" },
  flame: { text: "text-flame", soft: "bg-flame/10", border: "border-flame/25" },
  mint: { text: "text-mint", soft: "bg-mint/10", border: "border-mint/25" },
};

export default function Program() {
  return (
    <section id="program" className="section-pad bg-cream">
      <div className="wrap">
        <Reveal className="mx-auto max-w-3xl text-center">
          <SectionTag>The program</SectionTag>
          <h2 className="mt-5 font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">
            The Verviq <span className="gradient-text">Placement Sprint</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-ink/60">
            Four weeks. Four levels. One transformation — from nervous to interview-ready.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {weeks.map((w, i) => {
            const a = accents[w.accent];
            return (
              <Reveal key={w.week} delay={i * 100}>
                <div
                  className={`card-lift relative h-full rounded-3xl border bg-white p-6 shadow-[0_2px_16px_rgba(10,15,44,0.05)] hover:shadow-[0_18px_44px_-12px_rgba(10,15,44,0.18)] ${a.border} ${
                    i === 3 ? "md:col-span-2 lg:col-span-1" : ""
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`rounded-md px-2 py-0.5 font-mono text-[10px] font-bold ${a.soft} ${a.text}`}>
                      {w.week}
                    </span>
                    <span className="text-3xl">{w.emoji}</span>
                  </div>
                  <h3 className="mt-5 font-display text-xl font-bold text-ink">{w.title}</h3>
                  <p className="mt-2 text-sm text-ink/55">{w.focus}</p>
                  <div className="mt-6 flex items-center gap-1.5">
                    {[0, 1, 2, 3].map((d) => (
                      <span
                        key={d}
                        className={`h-1.5 flex-1 rounded-full ${
                          d <= i ? (w.accent === "mint" ? "bg-mint" : w.accent === "flame" ? "bg-flame" : "bg-volt") : "bg-ink/10"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={180} className="mt-12 flex justify-center">
          <div className="relative inline-flex items-center gap-3 rounded-2xl bg-ink px-8 py-5 shadow-[0_20px_50px_-12px_rgba(10,15,44,0.5)]">
            <svg width="44" height="44" viewBox="0 0 48 48" aria-hidden="true">
              <circle cx="24" cy="24" r="21" fill="none" stroke="#FBBF24" strokeWidth="2.5" />
              <circle cx="24" cy="24" r="17" fill="none" stroke="#FBBF24" strokeWidth="1" opacity="0.4" />
              <path d="M15 24l6 6 12-12" stroke="#FBBF24" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold">Badge unlocked</p>
              <p className="font-display text-xl font-bold text-white">Interview Ready</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
