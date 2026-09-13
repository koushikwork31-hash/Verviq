import Reveal from "./ui/Reveal";
import SectionTag from "./ui/SectionTag";

const cards = [
  {
    num: "01",
    quote: "I know it… but I can't explain it.",
    text: "Students struggle to communicate technical knowledge clearly.",
    accent: "border-t-flame",
    chip: "bg-flame/10 text-flame",
    chipText: "communication_gap",
  },
  {
    num: "02",
    quote: "Tell me about yourself.",
    text: "Students memorize answers instead of having genuine conversations.",
    accent: "border-t-volt",
    chip: "bg-volt/10 text-volt",
    chipText: "rehearsed_answers",
  },
  {
    num: "03",
    quote: "What happens in an interview?",
    text: "Many students have very little experience being interviewed.",
    accent: "border-t-gold",
    chip: "bg-gold/10 text-gold",
    chipText: "no_exposure",
  },
  {
    num: "04",
    quote: "Confidence.exe has stopped working.",
    text: "Nervousness, hesitation, poor body language and lack of practice affect performance.",
    accent: "border-t-ink",
    chip: "bg-ink/10 text-ink",
    chipText: "panic_at_recursion",
  },
];

export default function Problem() {
  return (
    <section id="why" className="section-pad relative bg-cream">
      <div className="wrap">
        <Reveal className="mx-auto max-w-3xl text-center">
          <SectionTag>The problem</SectionTag>
          <h2 className="mt-5 font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">
            The problem isn&apos;t always the skill.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-ink/60">
            Sometimes students know the answer. They just don&apos;t know how to present it.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((c, i) => (
            <Reveal key={c.num} delay={i * 90}>
              <div
                className={`card-lift group h-full rounded-3xl border border-ink/8 border-t-4 bg-white p-6 shadow-[0_2px_16px_rgba(10,15,44,0.05)] hover:shadow-[0_18px_44px_-12px_rgba(10,15,44,0.18)] ${c.accent}`}
              >
                <span className={`inline-block rounded-md px-2 py-0.5 font-mono text-[10px] ${c.chip}`}>
                  {c.chipText}
                </span>
                <p className="mt-4 font-display text-lg font-bold leading-snug text-ink">
                  &ldquo;{c.quote}&rdquo;
                </p>
                <p className="mt-3 text-sm leading-relaxed text-ink/55">{c.text}</p>
                <div className="mt-6 flex items-center justify-between border-t border-ink/8 pt-4">
                  <span className="font-display text-3xl font-bold text-ink/12">{c.num}</span>
                  <span
                    className="font-mono text-[10px] uppercase tracking-wider text-ink/30 transition-colors group-hover:text-flame"
                  >
                    err_
                    {c.num}
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200} className="mt-10 text-center">
          <span className="inline-flex items-center gap-2 rounded-lg bg-ink px-4 py-2 font-mono text-xs text-white/80">
            <span className="animate-blink text-flame">▊</span> 404: Confidence Not Found
          </span>
        </Reveal>
      </div>
 </section>
  );
}
