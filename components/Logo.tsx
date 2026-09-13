import Link from "next/link";

export function LogoMark({ size = 34 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
      <rect width="64" height="64" rx="14" fill="#0A0F2C" />
      <path d="M12 12 L28 28" stroke="#FF3D3D" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
      <path d="M12 24 L24 36 M24 12 L12 24" stroke="#FF3D3D" strokeWidth="1.5" strokeLinecap="round" opacity="0.35" />
      <path
        d="M20 18a6 6 0 0 1 6-6h12a6 6 0 0 1 6 6v10a6 6 0 0 1-6 6h-7l-7 6v-6h-4a6 6 0 0 1-6-6V18z"
        fill="#3B6BFF"
      />
      <circle cx="26.5" cy="23.5" r="2.4" fill="#fff" />
      <circle cx="34" cy="23.5" r="2.4" fill="#fff" />
      <circle cx="41.5" cy="23.5" r="2.4" fill="#fff" opacity="0.75" />
      <path
        d="M23 36h10a6 6 0 0 1 6 6v2a6 6 0 0 1-6 6h-3l-6 5v-5h-1a6 6 0 0 1-6-6v-2a6 6 0 0 1 6-6z"
        fill="#FF3D3D"
      />
    </svg>
  );
}

export default function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <Link href="#home" className="flex items-center gap-2.5">
      <LogoMark />
      <span className={`font-display text-xl font-bold tracking-tight ${dark ? "text-cream" : "text-ink"}`}>
        Ver<span className="text-flame">viq</span>
      </span>
    </Link>
  );
}
