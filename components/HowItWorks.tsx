import Reveal from "./ui/Reveal";
import SectionTag from "./ui/SectionTag";

const steps = [
  {
    num: "01",
    title: "Diagnose",
    text: "We identify communication and interview weaknesses through an initial assessment.",
    emoji: "🔍",
    accent: "text-volt",
    dot: "bg-volt",
  },
  {
    num: "02",
    title: "Practice",
    text: "Students participate in interactive challenges and mock interviews.",
    emoji: "🎮",
    accent: "text-flame",
    dot: "bg-flame",
  },
  {
    num: "03",
    title: "Feedback",
    text: "Students receive practical feedback instead of generic advice.",
    emoji: "💬",
    accent: "text-gold",
    dot: "bg-gold",
  },
  {
    num: "04",
    title: "Repeat",
    text: "They practice again until the behaviour becomes natural.",
    emoji: "🔁",
    accent: "text-mint",
    dot: "bg-mint",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="section-pad bg-cream">
      <div className="wrap">
        <Reveal className="mx-auto max-w-3xl text-center">
          <SectionTag>How it works</SectionTag>
          <h2 className="mt-5 font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">
            Learn <span className="text-volt">→</span> Play <span className="text-flame">→</span>{" "}
            Practice <span className="text-gold">→</span> Improve
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-ink/60">
            One loop. Every session. Until it sticks.
          </p>
        </Reveal>

        <div className="relative mt-16">
          {/* connector line */}
          <div
            aria-hidden="true"
            className="absolute left-[27px] top-2 bottom-2 w-px bg-gradient-to-b from-volt/50 via-flame/50 to-mint/50 lg:left-0 lg:right-0 lg:top-[27px] lg:h-px lg:w-auto lg:bg-gradient-to-r"
          />

          <ol className="grid gap-10 lg:grid-cols-4 lg:gap-6">
            {steps.map((s, i) => (
              <Reveal key={s.num} delay={i * 110} as="li">
                <div className="flex gap-5 lg:block">
                  <div
                    className={`relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border-4 border-cream bg-white shadow-md ${s.dot ? "" : ""}`}
                  >
                    <span className="text-xl">{s.emoji}</span>
                    <span
                      className={`absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full font-mono text-[9px] font-bold text-white ${s.dot}`}
                    >
                      {i + 1}
                    </span>
                  </div>
                  <div className="lg:mt-5">
                    <p className="font-mono text-[11px] uppercase tracking-widest text-ink/35">
                      step {s.num}
                    </p>
                    <h3 className={`mt-1 font-display text-xl font-bold ${s.accent}`}>{s.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink/55">{s.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>

        <Reveal delay={200} className="mt-16 text-center">
          <p className="font-display text-2xl font-semibold text-ink sm:text-3xl">
            Because confidence isn&apos;t <span className="line-through decoration-flame decoration-2">taught</span>.
          </p>
          <p className="mt-1 font-display text-2xl font-semibold sm:text-3xl">
            It&apos;s <span className="gradient-text">practiced.</span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
