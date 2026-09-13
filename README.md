# Verviq

> _With great communication comes great opportunities._

**Verviq** helps Tier-2 and Tier-3 college students become confident, interview-ready professionals — through fun, highly interactive, real-world practice instead of boring classroom lectures.

The idea came from the founder's HR experience: conducting **~500 candidate interviews in a single week** and watching technically capable students struggle — not because they lacked knowledge, but because they couldn't communicate it. Verviq turns interview preparation from a lecture into an experience.

**Live site:** _coming soon on Vercel_ · **Founding campus partners:** 2026

---

## ✨ What's inside

A single-page marketing site with a fully playable interview-training playground:

| Section | Highlights |
| --- | --- |
| 🎬 **Hero** | Animated mock-interview scene (interviewer → candidate → feedback loop), floating skill chips, microcopy marquee |
| 🧩 **The Problem** | 4 interactive error-style cards — `404: Confidence Not Found` |
| ⚖️ **The Difference** | Animated Traditional ↔ Verviq comparison toggle |
| 🏟️ **The Arena** | 4 signature challenges with 3D flip cards (Two-Ball Interview, HR Hot Seat, 60-Second Challenge, GD Battle) |
| 🎮 **Playground** | **3 real playable games** with XP, levels, badges & streaks |
| 🏆 **Leaderboard** | Sample students **+ your live XP** merged into the ranking |
| 🗓️ **Programs** | 4-week Placement Sprint, 120-minute session timeline, How-It-Works loop |
| 🎓 **For Colleges** | B2B pitch for TPOs/principals with honest demo-data labels |
| 📬 **Contact** | Validated form with success state (UI-only for now) |

### 🎮 The games

1. **🔥 HR Hot Seat** — 8 rapid-fire HR questions, 10s timer each, streak bonuses, coach tips on why the best answer wins
2. **⚡ 60-Second Challenge** — random topic, 10s to think, 60s to speak, self-scored against 5 checkpoints
3. **🧩 STAR Builder** — assemble behavioral answers Situation → Task → Action → Result while rejecting distractors

**XP system:** 6 levels from _Nervous Newbie_ to _Opportunity Magnet_, achievement badges, toast notifications — all persisted in `localStorage` under `verviq-xp-v1`.

---

## 🛠️ Tech stack

- **[Next.js 15](https://nextjs.org)** (App Router) + **React 19**
- **Tailwind CSS v4** (CSS-first `@theme` config)
- **TypeScript**
- **Zero animation libraries** — all motion is hand-rolled CSS/`IntersectionObserver`, `prefers-reduced-motion` safe
- **Static export** (`output: "export"`) — no backend required

## 🚀 Getting started

```bash
# 1. Install dependencies
npm install

# 2. Run the dev server
npm run dev          # → http://localhost:3000

# 3. Production build (static output in out/)
npm run build
```

> **Tip:** if the dev server binds to an unexpected port, a machine-level `PORT` env var may be set — force it with `npx next dev -p 3210`.

## 📁 Project structure

```
app/
  layout.tsx          # Root layout + fonts (Space Grotesk, Inter) + metadata
  page.tsx            # Section composition
  globals.css         # Design tokens, keyframes, utilities
  icon.svg            # Favicon (hero-mask speech bubble)
components/
  Navbar / Footer     # Sticky nav with mobile menu, footer
  Hero / Problem      # Above-the-fold + problem cards
  Difference / Arena  # Toggle comparison + flip-card challenges
  Playground          # Tabbed game shell + XP header
  games/              # HotSeat, SixtySeconds, StarBuilder, XpContext (XP engine)
  ui/                 # Reveal (scroll animations), Counter, SectionTag
  ...                 # Session, Program, ForColleges, Founder, SocialProof,
                      # Leaderboard, FinalCTA, Contact
outreach/
  college-outreach-email.md   # TPO outreach kit (email + follow-ups + WhatsApp)
```

## ☁️ Deploy to Vercel

1. Push to GitHub (this repo ✅)
2. [vercel.com](https://vercel.com) → **Add New → Project** → import the repo
3. Defaults are fine — Vercel auto-detects Next.js → **Deploy**

Every push to `main` auto-deploys. The site is fully static, so it also works on Netlify, GitHub Pages (via the `out/` folder), or any static host.

## 📌 Notes

- **Demo data:** the For-Colleges dashboard stats and leaderboard students are clearly labeled examples — no fabricated testimonials anywhere.
- **Contact form:** UI-only right now; wire it to Formspree or a Vercel serverless function to receive real inquiries.
- **XP persistence:** stored per-device in `localStorage`; older `hirelab-*` / `hirevibe-*` keys are auto-migrated.

---

© 2026 Verviq. Built for the next generation of talent — with practice, not PPTs. 🚀
