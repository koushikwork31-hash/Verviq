import Logo from "./Logo";

const links = [
  { label: "Home", href: "/#home" },
  { label: "Play & XP", href: "/play" },
  { label: "Voices", href: "/voices" },
  { label: "Programs", href: "/#program" },
  { label: "For Colleges", href: "/#colleges" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
  { label: "Privacy Policy", href: "#" },
];

const socials = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com",
    icon: (
      <path d="M6.94 8.5v12H3.56v-12h3.38zM5.25 3a1.97 1.97 0 1 1 0 3.94 1.97 1.97 0 0 1 0-3.94zM20.5 13.47v7.03h-3.37v-6.62c0-1.66-.6-2.8-2.1-2.8-1.14 0-1.82.77-2.12 1.51-.1.26-.13.63-.13 1v6.91H9.4v-12h3.37v1.69c.45-.7 1.25-1.7 3.04-1.7 2.22 0 3.69 1.45 3.69 4.98z" fill="currentColor" />
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com",
    icon: (
      <path d="M12 4.32c2.5 0 2.8.01 3.79.06.92.04 1.42.2 1.75.32.44.17.75.38 1.08.7.33.34.54.65.71 1.09.13.33.28.83.33 1.75.04.99.05 1.28.05 3.79s-.01 2.8-.05 3.79c-.05.92-.2 1.42-.33 1.75-.17.44-.38.75-.7 1.08-.34.33-.65.54-1.09.71-.33.13-.83.28-1.75.33-.99.04-1.28.05-3.79.05s-2.8-.01-3.79-.05c-.92-.05-1.42-.2-1.75-.33a2.9 2.9 0 0 1-1.08-.7 2.9 2.9 0 0 1-.71-1.09c-.13-.33-.28-.83-.32-1.75-.05-.99-.06-1.28-.06-3.79s.01-2.8.06-3.79c.04-.92.2-1.42.32-1.75.17-.44.38-.75.71-1.08.33-.33.64-.54 1.08-.71.33-.13.83-.28 1.75-.32.99-.05 1.28-.06 3.79-.06M12 2.6c-2.55 0-2.87.01-3.87.06-1 .04-1.69.2-2.29.44-.62.24-1.14.56-1.66 1.08A4.6 4.6 0 0 0 3.1 5.84c-.23.6-.4 1.28-.44 2.28-.05 1-.06 1.32-.06 3.88s.01 2.87.06 3.87c.05 1 .21 1.69.44 2.29.24.62.56 1.14 1.08 1.66.52.52 1.04.84 1.66 1.08.6.23 1.29.4 2.29.44 1 .05 1.32.06 3.87.06s2.87-.01 3.87-.06c1-.05 1.69-.21 2.29-.44a4.6 4.6 0 0 0 1.66-1.08c.52-.52.84-1.04 1.08-1.66.23-.6.4-1.29.44-2.29.05-1 .06-1.32.06-3.87s-.01-2.88-.06-3.88c-.05-1-.21-1.68-.44-2.28a4.6 4.6 0 0 0-1.08-1.66 4.6 4.6 0 0 0-1.66-1.08c-.6-.24-1.29-.4-2.29-.45-1-.04-1.32-.05-3.87-.05zm0 4.57a4.83 4.83 0 1 0 0 9.66 4.83 4.83 0 0 0 0-9.66zm0 7.96a3.13 3.13 0 1 1 0-6.27 3.13 3.13 0 0 1 0 6.27zm6.15-8.15a1.13 1.13 0 1 1-2.26 0 1.13 1.13 0 0 1 2.26 0z" fill="currentColor" />
    ),
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com",
    icon: (
      <path d="M21.58 7.19a2.5 2.5 0 0 0-1.76-1.77C18.25 5 12 5 12 5s-6.25 0-7.82.42A2.5 2.5 0 0 0 2.42 7.2C2 8.76 2 12 2 12s0 3.24.42 4.81c.23.86.9 1.54 1.76 1.77C5.75 19 12 19 12 19s6.25 0 7.82-.42a2.5 2.5 0 0 0 1.76-1.77C22 15.24 22 12 22 12s0-3.24-.42-4.81zM10 15.13V8.87L15.2 12 10 15.13z" fill="currentColor" />
    ),
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink pb-10 pt-16 text-white">
      <div className="wrap">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-sm">
            <Logo dark />
            <p className="mt-4 font-display text-sm italic text-white/50">
              &ldquo;With great communication comes great opportunities.&rdquo;
            </p>
          </div>

          <nav aria-label="Footer">
            <ul className="grid grid-cols-2 gap-x-12 gap-y-3 sm:grid-cols-3">
              {links.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="text-sm text-white/55 transition-colors hover:text-white">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex gap-3">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/60 transition-all hover:-translate-y-0.5 hover:border-white/40 hover:text-white"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                  {s.icon}
                </svg>
              </a>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-7 sm:flex-row">
          <p className="text-xs text-white/40">© 2026 Verviq. Built for the next generation of talent.</p>
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/25">
            Made with practice, not PPTs
          </p>
        </div>
      </div>
    </footer>
  );
}
