import Reveal from "./ui/Reveal";
import SectionTag from "./ui/SectionTag";

const benefits = [
  { icon: "⚡", text: "Interactive student engagement" },
  { icon: "🎤", text: "Practical interview exposure" },
  { icon: "🧑‍💼", text: "Mock HR simulations" },
  { icon: "📊", text: "Communication assessment" },
  { icon: "📈", text: "Student performance tracking" },
  { icon: "🧩", text: "Custom programs for each college" },
  { icon: "🕐", text: "Minimal disruption to academic schedules" },
];

export default function ForColleges() {
  return (
    <section id="colleges" className="section-pad relative overflow-hidden bg-ink text-white">
      <div className="web-grid absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)]" />
      <div className="animate-blob absolute -left-32 bottom-0 h-96 w-96 rounded-full bg-volt/20 blur-[130px]" />

      <div className="wrap relative">
        <Reveal className="mx-auto max-w-3xl text-center">
          <SectionTag dark>For colleges &amp; TPOs</SectionTag>
          <h2 className="mt-5 font-display text-4xl font-bold tracking-tight sm:text-5xl">
            TPOs, this one&apos;s <span className="gradient-text">for you.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-white/60">
            Your students don&apos;t need another lecture. They need more opportunities to{" "}
            <span className="font-semibold text-white">practice</span>.
          </p>
          <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-white/50">
            Verviq works directly with colleges to deliver structured, measurable
            interview-readiness programs — designed around your academic calendar, not against it.
          </p>
        </Reveal>

        <Reveal delay={140}>
          <ul className="mx-auto mt-12 grid max-w-4xl gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((b) => (
              <li
                key={b.text}
                className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-sm text-white/80 transition-colors hover:border-white/25"
              >
                <span aria-hidden="true">{b.icon}</span>
                {b.text}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={200}>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
            <a href="#contact" className="btn btn-primary">
              Partner With Verviq
            </a>
            <a href="#contact" className="btn btn-outline">
              Request a Campus Demo
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
