// Generates Verviq brand assets for LinkedIn: avatars + banner.
// Usage: node scripts/make-brand.mjs  (requires sharp, already in node_modules)
import sharp from "sharp";
import { mkdir } from "node:fs/promises";

const OUT = "public/brand";
await mkdir(OUT, { recursive: true });

// ── Shared mark pieces (scaled to a 1024 canvas) ────────────────
const web = (o = 0.5) => `
  <g stroke="#FF3D3D" stroke-width="22" stroke-linecap="round" opacity="${o}" fill="none">
    <path d="M0 0 L384 0 M0 0 L272 272 M0 0 L0 384"/>
    <path d="M192 0 A192 192 0 0 1 0 192"/>
    <path d="M336 0 A336 336 0 0 1 0 336"/>
  </g>`;

const bubble = `
  <rect x="192" y="144" width="640" height="496" rx="248" fill="#FF3D3D"/>
  <path d="M352 608 L320 816 L528 624 Z" fill="#FF3D3D"/>`;

const eyes = `
  <g transform="rotate(-16 404 384)">
    <ellipse cx="404" cy="384" rx="86" ry="62" fill="#ffffff"/>
  </g>
  <g transform="rotate(16 620 384)">
    <ellipse cx="620" cy="384" rx="86" ry="62" fill="#ffffff"/>
  </g>`;

const sparkle = (x, y, size, color = "#FFC940") => `
  <path d="M${x} ${y - size} L${x + size * 0.4} ${y - size * 0.4} L${x + size} ${y}
           L${x + size * 0.4} ${y + size * 0.4} L${x} ${y + size}
           L${x - size * 0.4} ${y + size * 0.4} L${x - size} ${y}
           L${x - size * 0.4} ${y - size * 0.4} Z" fill="${color}"/>`;

// ── 1. Avatar (dark) — crop-safe circular, 1024×1024 ───────────
const darkSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 1024 1024">
  <rect width="1024" height="1024" rx="230" fill="#0A0F2C"/>
  ${web(0.55)}
  <g transform="translate(0, 40)">
    ${bubble}
    ${eyes}
  </g>
  ${sparkle(880, 150, 60)}
</svg>`;

// ── 2. Avatar (light) — for light backgrounds ──────────────────
const lightSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 1024 1024">
  <rect width="1024" height="1024" rx="230" fill="#FFF9F2"/>
  ${web(0.25)}
  <g transform="translate(0, 40)">
    ${bubble}
    ${eyes}
  </g>
  ${sparkle(880, 150, 60)}
</svg>`;

// ── 3. Profile banner — 1584×396 (LinkedIn recommended) ────────
// Composition starts at x=430: on personal profiles the circular avatar
// overlaps the banner's bottom-left, so the mark must sit right of it.
const bannerSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1584" height="396" viewBox="0 0 1584 396">
  <rect width="1584" height="396" fill="#0A0F2C"/>
  <g stroke="#3B6BFF" stroke-width="1.5" opacity="0.25">
    ${Array.from({ length: 12 }, (_, i) => `<line x1="${i * 140}" y1="0" x2="${i * 140 - 120}" y2="396"/>`).join("")}
    ${Array.from({ length: 4 }, (_, i) => `<line x1="0" y1="${i * 120}" x2="1584" y2="${i * 120}"/>`).join("")}
  </g>
  <g transform="translate(470, 78) scale(3.75)">
    <rect width="64" height="64" rx="14" fill="#131C44"/>
    <g transform="scale(0.09375) translate(0, 40)">
      ${web(0.55)}
      ${bubble}
      ${eyes}
    </g>
    ${sparkle(54, 12, 4.5)}
  </g>
  <text x="756" y="192" font-family="Arial, Helvetica, sans-serif" font-size="104" font-weight="800" fill="#FFF9F2" letter-spacing="-3">Ver<tspan fill="#FF3D3D">viq</tspan></text>
  <text x="760" y="254" font-family="Arial, Helvetica, sans-serif" font-size="30" font-weight="500" fill="#8FA3C8" letter-spacing="0.5">With great communication comes great opportunities.</text>
  <text x="760" y="306" font-family="Arial, Helvetica, sans-serif" font-size="25" font-weight="600" fill="#3B6BFF" letter-spacing="2">INTERVIEW PRACTICE · GAMIFIED · TIER-2/3 COLLEGES</text>
</svg>`;

// ── Render ──────────────────────────────────────────────────────
await sharp(Buffer.from(darkSvg)).png().toFile(`${OUT}/verviq-avatar-dark-1024.png`);
await sharp(Buffer.from(lightSvg)).png().toFile(`${OUT}/verviq-avatar-light-1024.png`);
await sharp(Buffer.from(bannerSvg)).png().toFile(`${OUT}/verviq-banner-1584x396.png`);

// Smaller conveniences
await sharp(Buffer.from(darkSvg)).resize(512, 512).png().toFile(`${OUT}/verviq-avatar-dark-512.png`);
await sharp(Buffer.from(darkSvg)).resize(400, 400).png().toFile(`${OUT}/verviq-avatar-dark-400.png`);

console.log("✅ Brand assets written to public/brand/");
