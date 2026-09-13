"use client";

import { useEffect, useState } from "react";
import Logo from "./Logo";

const links = [
  { label: "Home", href: "#home" },
  { label: "Why Verviq", href: "#why" },
  { label: "Play", href: "#playground" },
  { label: "Programs", href: "#program" },
  { label: "For Colleges", href: "#colleges" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-white/10 bg-ink/85 shadow-[0_8px_32px_rgba(10,15,44,0.35)] backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="wrap flex h-16 items-center justify-between">
        <Logo dark />

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-white/70 transition-colors hover:text-white"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a href="#playground" className="btn btn-outline !py-2 !text-[13px]">
            Join the Next Challenge
          </a>
          <a href="#colleges" className="btn btn-primary !py-2 !text-[13px]">
            Partner With Us
          </a>
        </div>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="relative z-50 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white lg:hidden"
        >
          <span className="relative block h-3.5 w-5">
            <span
              className={`absolute left-0 top-0 h-0.5 w-5 rounded bg-current transition-all duration-300 ${
                open ? "top-1/2 -translate-y-1/2 rotate-45" : ""
              }`}
            />
            <span
              className={`absolute left-0 top-1/2 h-0.5 w-5 -translate-y-1/2 rounded bg-current transition-all duration-300 ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`absolute left-0 bottom-0 h-0.5 w-5 rounded bg-current transition-all duration-300 ${
                open ? "bottom-1/2 translate-y-1/2 -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>

      <div
        className={`fixed inset-0 z-40 flex flex-col bg-ink/[0.985] px-8 pb-10 pt-24 backdrop-blur-2xl transition-all duration-300 lg:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <nav className="flex flex-col gap-1" aria-label="Mobile">
          {links.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              style={{ transitionDelay: open ? `${i * 40}ms` : "0ms" }}
              className={`rounded-2xl px-4 py-3.5 font-display text-2xl font-semibold text-white/85 transition-all duration-300 hover:bg-white/5 hover:text-white ${
                open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
              }`}
            >
              {l.label}
            </a>
          ))}
        </nav>
        <div className="mt-auto flex flex-col gap-3 pt-8">
          <a href="#playground" onClick={() => setOpen(false)} className="btn btn-outline w-full">
            Join the Next Challenge
          </a>
          <a href="#colleges" onClick={() => setOpen(false)} className="btn btn-primary w-full">
            Partner With Us
          </a>
        </div>
      </div>
    </header>
  );
}
