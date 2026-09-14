import Link from "next/link";

export function LogoMark({ size = 34 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
      <rect width="64" height="64" rx="16" fill="#0A0F2C" />
      <g
        stroke="#FF3D3D"
        strokeWidth="1.6"
        strokeLinecap="round"
        opacity="0.85"
        fill="none"
      >
        <path d="M0 0 L24 0 M0 0 L17 17 M0 0 L0 24" />
        <path d="M12 0 A12 12 0 0 1 0 12" />
        <path d="M21 0 A21 21 0 0 1 0 21" />
      </g>
      <rect x="12" y="9" width="40" height="31" rx="15.5" fill="#FF3D3D" />
      <path d="M22 38 L20 51 L33 39 Z" fill="#FF3D3D" />
      <g transform="rotate(-16 25.6 24)">
        <ellipse className="logo-eye-l" cx="25.6" cy="24" rx="4.9" ry="4.2" fill="#ffffff" />
      </g>
      <g transform="rotate(16 38.4 24)">
        <ellipse className="logo-eye-r" cx="38.4" cy="24" rx="4.9" ry="4.2" fill="#ffffff" />
      </g>
      <path
        d="M54 7 L55.6 10.6 L59 12 L55.6 13.4 L54 17 L52.4 13.4 L49 12 L52.4 10.6 Z"
        fill="#FFC940"
      />
    </svg>
  );
}

export default function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <Link href="#home" className="group flex items-center gap-2.5">
      <LogoMark />
      <span
        className={`font-display text-xl font-bold tracking-tight ${
          dark ? "text-cream" : "text-ink"
        }`}
      >
        Ver<span className="text-flame">viq</span>
      </span>
      <span
        aria-hidden="true"
        className="logo-sparkle inline-block select-none text-[13px] leading-none"
      >
        ✦
      </span>
    </Link>
  );
}
