import Reveal from "./ui/Reveal";

const journey = ["Student", "Interviewer", "Feedback", "Improvement", "Opportunity"];

const marqueeItems = [
  "PPTs don't get you hired. Practice does.",
  "Your interviewer has entered the chat.",
  "Welcome to the hot seat.",
  "Confidence.exe has stopped working.",
  "Skill unlocked.",
  "Next challenge.",
];

function FloatChip({
  label,
  className,
  animateClass,
  delay,
}: {
  label: string;
  className: string;
  animateClass: string;
  delay: string;
}) {
  return (
    <div
      className={`absolute z-20 rounded-2xl border px-3.5 py-2 font-display text-xs font-bold shadow-[0_10px_30px_rgba(10,15,44,0.45)] ${animateClass} ${className}`}
      style={{ animationDelay: delay }}
    >
      {label}
    </div>
  );
}

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden bg-ink text-white">
      {/* backdrop layers */}
      <div className="web-grid animate-drift absolute inset-0 [mask-image:radial-gradient(ellipse_75%_65%_at_50%_35%,black,transparent)]" />
      <div className="animate-blob absolute -top-32 left-[8%] h-96 w-96 rounded-full bg-volt/25 blur-[130px]" />
      <div className="animate-blob absolute right-[4%] top-1/3 h-[26rem] w-[26rem] rounded-full bg-flame/20 blur-[140px] [animation-delay:2.5s]" />

      <div className="wrap relative grid items-center gap-14 pb-10 pt-32 lg:grid-cols-[1.02fr_0.98fr] lg:gap-10 lg:pb-16 lg:pt-40">
        {/* ── Copy ── */}
        <div>
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-[13px] font-medium text-sky backdrop-blur">
              <span className="animate-pulse-soft h-1.5 w-1.5 rounded-full bg-mint" />
              Built for students who know the answers but struggle to say them.
            </span>
          </Reveal>

          <Reveal delay={90}>
            <h1 className="mt-6 font-display text-[2.6rem] font-bold leading-[1.04] tracking-tight sm:text-6xl lg:text-[4.1rem]">
              Great students shouldn&apos;t lose opportunities because of a{" "}
              <span className="gradient-text">bad interview.</span>
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="mt-5 font-display text-xl font-semibold text-white sm:text-2xl">
              We help them get better at the conversation.
            </p>
          </Reveal>

          <Reveal delay={210}>
            <p className="mt-4 border-l-2 border-flame pl-4 font-display text-base italic text-white/80 sm:text-lg">
              &ldquo;With great communication comes great opportunities.&rdquo;
            </p>
          </Reveal>

          <Reveal delay={260}>
            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-white/60 sm:text-base">
              Verviq helps Tier-2 and Tier-3 college students build communication, confidence and
              interview skills through real-world simulations, games and mock interviews.
            </p>
          </Reveal>

          <Reveal delay={320}>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a href="#colleges" className="btn btn-primary">
                Bring Verviq to Your College
              </a>
              <a href="#how-it-works" className="btn btn-outline group">
                See How It Works
                <span className="inline-block transition-transform duration-300 group-hover:translate-y-0.5">↓</span>
              </a>
            </div>
          </Reveal>
        </div>

        {/* ── Visual ── */}
        <Reveal delay={200} className="relative">
          <div className="relative mx-auto w-full max-w-[540px]">
            {/* floating chips */}
            <FloatChip
              label="↑ Confidence +12"
              className="-left-2 top-6 border-mint/40 bg-ink-3 text-mint sm:-left-8"
              animateClass="animate-float"
              delay="0.4s"
            />
            <FloatChip
              label="Communication ↑"
              className="-right-2 top-[38%] border-volt/50 bg-ink-3 text-sky sm:-right-6"
              animateClass="animate-float-slow"
              delay="1.1s"
            />
            <FloatChip
              label="✓ Interview Ready"
              className="-left-3 bottom-[22%] border-flame/50 bg-ink-3 text-flame sm:-left-10"
              animateClass="animate-float-slow"
              delay="1.8s"
            />
            <FloatChip
              label="Next Round!"
              className="-right-1 bottom-8 border-gold/40 bg-ink-3 text-gold sm:-right-5"
              animateClass="animate-float"
              delay="0.9s"
            />

            {/* stage card */}
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-ink-2/90 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)] backdrop-blur">
              <div className="flex items-center gap-1.5 border-b border-white/10 px-5 py-3">
                <span className="h-2.5 w-2.5 rounded-full bg-flame/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-gold/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-mint/80" />
                <span className="ml-3 font-mono text-[11px] text-white/40">
                  mock-interview — live session
                </span>
                <span className="ml-auto flex items-center gap-1.5 rounded-full bg-flame/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-flame">
                  <span className="animate-pulse-soft h-1.5 w-1.5 rounded-full bg-flame" />
                  REC
                </span>
              </div>

              <svg viewBox="0 0 520 300" className="block w-full" role="img" aria-label="Animated mock interview scene">
                {/* lamps */}
                <g stroke="#2A3160" strokeWidth="3" strokeLinecap="round">
                  <line x1="60" y1="252" x2="48" y2="196" />
                  <line x1="460" y1="252" x2="472" y2="196" />
                </g>
                <path d="M34 196h28l-6-16h-16z" fill="#2A3160" />
                <path d="M458 196h28l-6-16h-16z" fill="#2A3160" />
                <ellipse cx="48" cy="180" rx="9" ry="4" fill="#FBBF24" opacity="0.85" />
                <ellipse cx="472" cy="180" rx="9" ry="4" fill="#FBBF24" opacity="0.85" />

                {/* desk */}
                <path d="M84 252h352l-26 26H110z" fill="#1B2450" stroke="#2A3160" strokeWidth="1.5" />

                {/* interviewer */}
                <g>
                  <circle cx="150" cy="158" r="24" fill="#F2C29B" />
                  <path d="M108 252c0-26 19-42 42-42s42 16 42 42z" fill="#3B6BFF" />
                  <circle cx="142" cy="156" r="2.6" fill="#0A0F2C" />
                  <circle cx="158" cy="156" r="2.6" fill="#0A0F2C" />
                  <path d="M144 168q6 5 12 0" stroke="#0A0F2C" strokeWidth="2" fill="none" strokeLinecap="round" />
                  <path d="M128 150a10 10 0 0 1 14-6M158 144a10 10 0 0 1 14 6" stroke="#0A0F2C" strokeWidth="2" fill="none" strokeLinecap="round" />
                </g>

                {/* candidate */}
                <g>
                  <circle cx="372" cy="166" r="22" fill="#E8B48A" />
                  <path d="M332 252c0-24 18-38 40-38s40 14 40 38z" fill="#FF3D3D" />
                  <circle cx="365" cy="164" r="2.4" fill="#0A0F2C" />
                  <circle cx="379" cy="164" r="2.4" fill="#0A0F2C" />
                  <path d="M367 175q5 4 10 0" stroke="#0A0F2C" strokeWidth="2" fill="none" strokeLinecap="round" />
                </g>

                {/* interviewer bubble */}
                <g>
                  <rect x="196" y="64" width="130" height="52" rx="14" fill="#FFFFFF" />
                  <path d="M226 116l-8 14 20-14z" fill="#FFFFFF" />
                  <text x="212" y="86" fontSize="14" fontWeight="700" fill="#0A0F2C" fontFamily="inherit">Tell me about</text>
                  <text x="212" y="104" fontSize="14" fontWeight="700" fill="#0A0F2C" fontFamily="inherit">yourself.</text>
                </g>

                {/* candidate bubble */}
                <g className="animate-pulse-soft">
                  <rect x="300" y="112" width="150" height="46" rx="14" fill="#EDF1FF" opacity="0.95" />
                  <path d="M356 158l6 12 10-12z" fill="#EDF1FF" opacity="0.95" />
                  <text x="314" y="140" fontSize="13" fontWeight="600" fill="#3B6BFF" fontFamily="inherit">Here&apos;s what I built…</text>
                </g>

                {/* feedback card */}
                <g>
                  <rect x="330" y="216" width="150" height="58" rx="12" fill="#FFFFFF" />
                  <text x="342" y="236" fontSize="10" fontWeight="700" fill="#0A0F2C" fontFamily="inherit" letterSpacing="1">FEEDBACK</text>
                  <text x="342" y="252" fontSize="9" fill="#5A607A" fontFamily="inherit">Clarity</text>
                  <rect x="384" y="245" width="70" height="6" rx="3" fill="#EDEDE6" />
                  <rect x="384" y="245" width="52" height="6" rx="3" fill="#3B6BFF" />
                  <text x="342" y="266" fontSize="9" fill="#5A607A" fontFamily="inherit">Energy</text>
                  <rect x="384" y="259" width="70" height="6" rx="3" fill="#EDEDE6" />
                  <rect x="384" y="259" width="62" height="6" rx="3" fill="#FF3D3D" />
                </g>

                {/* mic */}
                <g>
                  <rect x="252" y="222" width="10" height="22" rx="5" fill="#7FA3FF" />
                  <path d="M247 236a10 10 0 0 0 20 0" stroke="#7FA3FF" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                  <line x1="257" y1="246" x2="257" y2="252" stroke="#7FA3FF" strokeWidth="2.5" strokeLinecap="round" />
                </g>

                {/* timer chip */}
                <g>
                  <rect x="40" y="40" width="76" height="30" rx="15" fill="#1B2450" stroke="#2A3160" />
                  <circle cx="58" cy="55" r="8" stroke="#FBBF24" strokeWidth="2" fill="none" />
                  <path d="M58 51v4l3 2" stroke="#FBBF24" strokeWidth="2" fill="none" strokeLinecap="round" />
                  <text x="74" y="59" fontSize="11" fontWeight="700" fill="#FBBF24" fontFamily="inherit">07:42</text>
                </g>
              </svg>
            </div>

            {/* journey loop */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-2 gap-y-2.5">
              {journey.map((step, i) => (
                <span key={step} className="flex items-center gap-2">
                  <span
                    className={`rounded-full border px-3 py-1.5 font-display text-[11px] font-semibold tracking-wide ${
                      i === journey.length - 1
                        ? "animate-pulse-soft border-flame/60 bg-flame/15 text-flame"
                        : "border-white/15 bg-white/5 text-white/75"
                    }`}
                  >
                    {step}
                  </span>
                  {i < journey.length - 1 && (
                    <span aria-hidden="true" className="text-sm text-flame">→</span>
                  )}
                </span>
              ))}
              <span aria-hidden="true" className="text-sm text-sky">↺</span>
            </div>
          </div>
        </Reveal>
      </div>

      {/* marquee */}
      <div className="relative border-t border-white/10 bg-white/[0.03] py-4">
        <div className="flex w-max animate-marquee gap-10 whitespace-nowrap">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className="flex items-center gap-10 font-display text-sm font-medium text-white/45">
              {item}
              <span aria-hidden="true" className="text-flame">✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
