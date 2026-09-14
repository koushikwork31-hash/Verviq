import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Voices from "@/components/Voices";
import { XpProvider } from "@/components/games/XpContext";

export const metadata: Metadata = {
  title: "Voices — Verviq",
  description:
    "Get paired with a student from another Verviq partner campus — one Telugu college, one Tamil college — and practice speaking by voice. Audio-only, peer-to-peer, nothing recorded.",
};

export default function VoicesPage() {
  return (
    <XpProvider>
      <Navbar />
      <main className="pt-16">
        <section className="section-pad relative overflow-hidden bg-ink text-white">
          <div className="web-grid absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_65%_60%_at_50%_25%,black,transparent)]" />
          <div className="animate-blob absolute -left-24 top-10 h-80 w-80 rounded-full bg-volt/15 blur-[120px]" />
          <div className="animate-blob absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-flame/15 blur-[120px] [animation-delay:2s]" />

          <div className="wrap relative">
            <div className="mx-auto max-w-3xl text-center">
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-volt">voices · live practice</p>
              <h1 className="mt-5 font-display text-4xl font-bold tracking-tight sm:text-6xl">
                Talk to a <span className="gradient-text">stranger</span> who&apos;s just as nervous.
              </h1>
              <p className="mx-auto mt-5 max-w-xl text-lg text-white/55">
                Verviq pairs students across partner campuses — one Telugu college, one Tamil college —
                for a 5-minute voice call. No video, no names, no recording. Just real conversation
                practice with someone completely new.
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-2 font-mono text-[10px] uppercase tracking-wider text-white/40">
                <span className="rounded-full border border-white/12 bg-white/5 px-3 py-1">🎙️ audio only</span>
                <span className="rounded-full border border-white/12 bg-white/5 px-3 py-1">peer-to-peer</span>
                <span className="rounded-full border border-white/12 bg-white/5 px-3 py-1">+50 XP per call</span>
                <span className="rounded-full border border-white/12 bg-white/5 px-3 py-1">nothing recorded</span>
              </div>
            </div>

            <div className="mt-12">
              <Voices />
            </div>

            {/* how it works */}
            <div className="mx-auto mt-16 grid max-w-3xl gap-4 sm:grid-cols-3">
              {[
                { n: "01", t: "Pick your college", d: "So we know which campus you're representing." },
                { n: "02", t: "Get paired", d: "We match you with a student from another partner campus." },
                { n: "03", t: "Talk for 5 minutes", d: "Use the starter prompt. Be kind — it's their first time too." },
              ].map((s) => (
                <div key={s.n} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur">
                  <p className="font-mono text-xs text-volt">{s.n}</p>
                  <p className="mt-2 font-display font-bold">{s.t}</p>
                  <p className="mt-1 text-sm text-white/50">{s.d}</p>
                </div>
              ))}
            </div>

            <p className="mx-auto mt-10 max-w-2xl text-center font-mono text-[10px] uppercase leading-relaxed tracking-[0.25em] text-white/30">
              currently in pilot · open to students of verviq partner campuses
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </XpProvider>
  );
}
