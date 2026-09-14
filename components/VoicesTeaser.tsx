"use client";

import Link from "next/link";
import Reveal from "./ui/Reveal";
import SectionTag from "./ui/SectionTag";

export default function VoicesTeaser() {
  return (
    <section id="voices" className="section-pad relative overflow-hidden bg-ink text-white">
      <div className="web-grid absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_40%,black,transparent)]" />
      <div className="animate-blob absolute -left-24 top-1/4 h-80 w-80 rounded-full bg-mint/10 blur-[120px]" />

      <div className="wrap relative">
        <div className="mx-auto grid max-w-5xl items-center gap-10 lg:grid-cols-2">
          <Reveal>
            <SectionTag dark>voices · coming to your campus</SectionTag>
            <h2 className="mt-5 font-display text-4xl font-bold tracking-tight sm:text-5xl">
              A Telugu campus meets a <span className="gradient-text">Tamil campus.</span>
            </h2>
            <p className="mt-4 max-w-lg text-lg text-white/55">
              When two partner colleges go live, Verviq pairs their students for 5-minute
              voice calls — like Omegle, but voice-only, college-verified, and built for
              practice. Talk to a stranger who&apos;s just as nervous as you.
            </p>

            <div className="mt-6 flex flex-wrap gap-2 font-mono text-[10px] uppercase tracking-wider text-white/40">
              <span className="rounded-full border border-white/12 bg-white/5 px-3 py-1">🎙️ audio only</span>
              <span className="rounded-full border border-white/12 bg-white/5 px-3 py-1">+50 XP per call</span>
              <span className="rounded-full border border-white/12 bg-white/5 px-3 py-1">nothing recorded</span>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/voices" className="btn btn-primary !px-7 !py-3">
                Try Voices →
              </Link>
              <a href="#colleges" className="btn btn-outline !px-7 !py-3">
                Bring it to your college
              </a>
            </div>
          </Reveal>

          {/* visual: two campus nodes linking by voice */}
          <Reveal delay={150}>
            <div className="relative mx-auto max-w-sm">
              <div className="animate-blob absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-volt/20 blur-[90px]" />
              <div className="relative rounded-3xl border border-white/12 bg-white/[0.04] p-6 backdrop-blur">
                <div className="flex items-center justify-between">
                  <div className="rounded-2xl border border-volt/40 bg-volt/10 px-4 py-3">
                    <p className="font-mono text-[9px] uppercase tracking-widest text-volt">telugu campus</p>
                    <p className="mt-1 font-display text-sm font-bold">Student A</p>
                  </div>
                  <div className="flex-1 px-2">
                    <div className="h-px w-full bg-gradient-to-r from-volt via-gold to-flame" />
                    <p className="mt-1 text-center text-xs">🎙️</p>
                    <p className="text-center font-mono text-[8px] uppercase tracking-widest text-white/35">live call</p>
                  </div>
                  <div className="rounded-2xl border border-flame/40 bg-flame/10 px-4 py-3">
                    <p className="font-mono text-[9px] uppercase tracking-widest text-flame">tamil campus</p>
                    <p className="mt-1 font-display text-sm font-bold">Student B</p>
                  </div>
                </div>

                <div className="mt-5 rounded-2xl border border-white/10 bg-ink/50 p-4">
                  <p className="font-mono text-[9px] uppercase tracking-widest text-white/40">starter prompt</p>
                  <p className="mt-1 font-display text-sm font-semibold text-white/85">
                    &ldquo;Sell me your city in 60 seconds.&rdquo;
                  </p>
                </div>

                <div className="mt-4 flex items-center justify-center gap-2">
                  <span className="h-2 w-2 animate-ping rounded-full bg-mint" />
                  <p className="font-mono text-[9px] uppercase tracking-widest text-mint">pairing engine live</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
