import Reveal from "./ui/Reveal";

export default function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-ink py-24 text-white sm:py-32">
      <div className="web-grid absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_60%_70%_at_50%_50%,black,transparent)]" />
      <div className="animate-blob absolute left-1/4 top-0 h-96 w-96 rounded-full bg-flame/20 blur-[140px]" />
      <div className="animate-blob absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-volt/25 blur-[140px] [animation-delay:2s]" />

      <div className="wrap relative text-center">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-sky">next step</p>
          <h2 className="mx-auto mt-5 max-w-3xl font-display text-4xl font-bold leading-tight tracking-tight sm:text-6xl">
            Your students have the <span className="gradient-text">potential.</span>
          </h2>
          <p className="mt-4 font-display text-2xl font-semibold text-white/90 sm:text-3xl">
            Let&apos;s give them the practice.
          </p>
          <p className="mx-auto mt-5 max-w-xl text-white/55">
            Bring Verviq&apos;s interactive interview-readiness experience to your campus.
          </p>
        </Reveal>

        <Reveal delay={150}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a href="#contact" className="btn btn-primary !px-8 !py-3.5 !text-base">
              Partner With Verviq
            </a>
            <a href="#contact" className="btn btn-outline !px-8 !py-3.5 !text-base">
              Book a Demo
            </a>
          </div>
        </Reveal>

        <Reveal delay={250}>
          <p className="mt-12 font-display text-sm italic text-white/40">
            &ldquo;With great communication comes great opportunities.&rdquo;
          </p>
        </Reveal>
      </div>
    </section>
  );
}
