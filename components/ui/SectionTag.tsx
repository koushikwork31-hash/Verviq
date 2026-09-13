import type { ReactNode } from "react";

export default function SectionTag({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 font-display text-xs font-semibold uppercase tracking-[0.18em] ${
        dark
          ? "border border-white/15 bg-white/5 text-sky"
          : "border border-ink/10 bg-white text-ink/70 shadow-sm"
      }`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-flame" aria-hidden="true" />
      {children}
    </span>
  );
}
