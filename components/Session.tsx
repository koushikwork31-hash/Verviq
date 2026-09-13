import Reveal from "./ui/Reveal";
import SectionTag from "./ui/SectionTag";

const stops = [
  { time: "00:00", label: "Warm-up", desc: "Fun communication challenge.", color: "bg-sky", width: "12%", offset: "0%" },
  { time: "00:15", label: "Game", desc: "Team-based communication activity.", color: "bg-volt", width: "25%", offset: "12%" },
  { time: "00:45", label: "Learn", desc: "One practical interview concept.", color: "bg-gold", width: "13%", offset: "37%" },
  { time: "01:00", label: "Simulate", desc: "Real interview / GD / HR scenario.", color: "bg-flame", width: "34%", offset: "50%" },
  { time: "01:40", label: "Feedback", desc: "Students learn what they did right and wrong.", color: "bg-mint", width: "12%", offset: "84%" },
  { time: "01:55", label: "Final Challenge", desc: "Fast closing challenge.", color: "bg-ink", width: "4%", offset: "96%" },
];

export default function Session() {
  return (
    <section id="session" className="section-pad relative overflow-hidden bg-ink text-white">
      <div className="web-grid absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,black,transparent)]" />
      <div className="animate-blob absolute -left-24 top-1/4 h-80 w-80 rounded-full bg-flame/15 blur-[120px]" />

      <div className="wrap relative">
        <Reveal className="mx-auto max-w-3xl text-center">
          <SectionTag dark>The 2-hour session</SectionTag>
          <h2 className="mt-5 font-display text-4xl font-bold tracking-tight sm:text-5xl">
            120 minutes. <span className="gradient-text">Zero boredom.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-white/55">
            One session, six moves. Every minute has a job.
          </p>
        </Reveal>

        <Reveal delay={150} className="mx-auto mt-14 max-w-4xl">
          {/* progress bar */}
          <div className="relative h-3 w-full rounded-full bg-white/8">
            <div className="flex h-full w-full gap-1 overflow-hidden rounded-full">
              {stops.map((s) => (
                <div key={s.label} className={`h-full ${s.color} opacity-80`} style={{ width: s.width }} />
              ))}
            </div>
            {stops.map((s) => (
              <span
                key={s.label}
                className="absolute top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-ink bg-white shadow"
                style={{ left: s.offset }}
              />
            ))}
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {stops.map((s) => (
              <div
                key={s.label}
                className="card-lift rounded-2xl border border-white/10 bg-white/[0.04] p-5 hover:border-white/25"
              >
                <div className="flex items-center gap-3">
                  <span className={`h-2.5 w-2.5 rounded-full ${s.color}`} />
                  <span className="font-mono text-sm font-bold text-white/90">{s.time}</span>
                  <span className="font-display text-base font-bold">{s.label}</span>
                </div>
                <p className="mt-2.5 pl-[22px] text-sm text-white/55">{s.desc}</p>
              </div>
            ))}
          </div>

          <p className="mt-12 text-center font-display text-xl font-semibold text-white/85">
            No notebooks required. <span className="text-white/40">Ever.</span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
