import Reveal from "./ui/Reveal";
import SectionTag from "./ui/SectionTag";

const slots = [1, 2, 3];

export default function SocialProof() {
  return (
    <section className="section-pad relative bg-cream-2">
      <div className="wrap">
        <Reveal className="mx-auto max-w-3xl text-center">
          <SectionTag>Success stories</SectionTag>
          <h2 className="mt-5 font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">
            &ldquo;Your students could be our{" "}
            <span className="gradient-text">next success story.</span>&rdquo;
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-ink/60">
            We don&apos;t invent testimonials. Our first campus pilots are starting — this space
            will feature real student stories and college partnerships.
          </p>
        </Reveal>

        <div className="mx-auto mt-12 grid max-w-4xl gap-5 sm:grid-cols-3">
          {slots.map((n, i) => (
            <Reveal key={n} delay={i * 100}>
              <div className="flex h-36 flex-col items-center justify-center gap-3 rounded-3xl border-2 border-dashed border-ink/15 bg-white/60 p-6 text-center transition-colors hover:border-volt/50">
                <svg width="34" height="34" viewBox="0 0 34 34" aria-hidden="true" className="text-ink/30">
                  <path
                    d="M5 29V9l8-4v24M13 29V13l9-3v19M22 29V15l7 2v12M3 29h28"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/40">
                  College Partner Logo
                </p>
                <span className="rounded-full bg-ink/5 px-2.5 py-0.5 font-mono text-[9px] text-ink/35">
                  slot 0{n}
                </span>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200} className="mt-10 text-center">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-ink/35">
            real pilots. real stories. coming soon.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
