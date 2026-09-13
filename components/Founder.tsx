import Reveal from "./ui/Reveal";
import SectionTag from "./ui/SectionTag";

export default function Founder() {
  return (
    <section id="about" className="section-pad relative bg-cream">
      <div className="wrap">
        <Reveal className="mx-auto max-w-3xl text-center">
          <SectionTag>The founder story</SectionTag>
          <h2 className="mt-5 font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">
            It started with <span className="gradient-text">500 interviews.</span>
          </h2>
        </Reveal>

        <div className="mx-auto mt-14 grid max-w-4xl items-center gap-10 md:grid-cols-[280px_1fr]">
          {/* photo placeholder */}
          <Reveal delay={100}>
            <div className="relative mx-auto w-full max-w-[280px]">
              <div className="card-lift overflow-hidden rounded-3xl border border-ink/10 bg-gradient-to-br from-ink-2 to-ink-soft shadow-[0_20px_50px_-15px_rgba(10,15,44,0.4)]">
                <svg viewBox="0 0 280 300" className="block w-full" role="img" aria-label="Founder photo placeholder">
                  <circle cx="140" cy="105" r="46" fill="#3B6BFF" opacity="0.9" />
                  <path d="M62 300c0-52 34-84 78-84s78 32 78 84z" fill="#FF3D3D" opacity="0.9" />
                  <circle cx="124" cy="100" r="4" fill="#0A0F2C" />
                  <circle cx="156" cy="100" r="4" fill="#0A0F2C" />
                  <path d="M130 118q10 8 20 0" stroke="#0A0F2C" strokeWidth="3" fill="none" strokeLinecap="round" />
                  <g stroke="#7FA3FF" strokeWidth="2" opacity="0.5">
                    <path d="M20 40l40 40M40 20l40 40" />
                  </g>
                  <g stroke="#7FA3FF" strokeWidth="2" opacity="0.5">
                    <path d="M260 220l-40 40M240 260l-40-40" />
                  </g>
                </svg>
                <p className="border-t border-white/10 py-3 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
                  founder photo · placeholder
                </p>
              </div>
              <div className="animate-float absolute -right-4 -top-4 rounded-2xl border border-white/10 bg-ink px-3.5 py-2 shadow-lg">
                <p className="font-mono text-[9px] uppercase tracking-wider text-white/50">week one</p>
                <p className="font-display text-sm font-bold text-flame">500 interviews</p>
              </div>
            </div>
          </Reveal>

          {/* story */}
          <Reveal delay={200}>
            <figure>
              <blockquote className="space-y-5 text-[17px] leading-relaxed text-ink/70">
                <p>
                  &ldquo;I spent a week on the other side of the interview table, conducting around{" "}
                  <strong className="font-semibold text-ink">500 candidate interviews</strong>.
                </p>
                <p>And I noticed something.</p>
                <p>
                  A lot of students weren&apos;t failing because they lacked technical ability.{" "}
                  <strong className="font-semibold text-ink">
                    They were struggling to communicate what they knew.
                  </strong>
                </p>
                <p>
                  That observation became Verviq.&rdquo;
                </p>
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-ink font-display text-sm font-bold text-white">
                  HL
                </span>
                <div>
                  <p className="font-display text-sm font-bold text-ink">Founder, Verviq</p>
                  <p className="text-xs text-ink/50">Ex-interviewer. Full-time believer in practice.</p>
                </div>
              </figcaption>
            </figure>

            <div className="mt-6 flex items-center gap-3 rounded-2xl border border-ink/10 bg-white px-5 py-4">
              <span aria-hidden="true" className="text-xl">🎓</span>
              <p className="text-sm text-ink/70">
                <span className="font-semibold text-ink">Computer Engineering</span> — specialization in{" "}
                <span className="font-semibold text-ink">Cybersecurity</span>, Karunya University
              </p>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3 rounded-2xl border border-ink/10 bg-white px-5 py-4">
              <span className="font-display text-sm font-semibold text-ink/70">From interviewing students</span>
              <span aria-hidden="true" className="font-display text-lg text-flame">→</span>
              <span className="font-display text-sm font-bold text-ink">
                to helping students <span className="gradient-text">interview better.</span>
              </span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
