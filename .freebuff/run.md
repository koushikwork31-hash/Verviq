# Verviq — Run Doc

Static-exported Next.js 15 + Tailwind v4 single-page site (App Router). No backend, no env files, no database.

## Reproduce artifacts

Nothing to reproduce for dev — dependencies only:

```bash
npm install   # package-lock.json present; only run if node_modules is missing
```

For a production build (must be run with the dev server STOPPED — building while `next dev` is live corrupts the `.next` cache and breaks hydration):

```bash
npm run build   # also emits the static export into out/ (output: "export" in next.config.ts)
```

## Run the dev server

```bash
npx next dev -p 3210
```

- **Always pass `-p 3210` explicitly.** A machine-level `PORT` env var can override the default port (observed: Next silently bound to 56005).
- **If a page returns HTTP 500 with `SyntaxError: Unexpected end of JSON input` in the dev log:** the `.next` dev cache is corrupted (usually from the server being killed mid-write). Fix: stop the server, `rm -rf .next`, restart. `next.config.ts` already sets `outputFileTracingRoot` to silence the multiple-lockfiles warning.
- **Restarting after a build:** `rm -rf .next` first — the cache written by `next build` confuses `next dev`.
- The documented preview URL is `http://localhost:3210/`.
- Detached start (this environment): `nohup npx next dev -p 3210 > .freebuff/preview.log 2> .freebuff/preview.log.err &`
- Find the listener pid with `netstat -ano | grep :3210 | grep LISTEN`, register it with the preview.
