# Autóctone 🌳🔥

A scrollytelling website about Portugal's wildfire crisis: how the native
forest resists fire, how eucalyptus took over the landscape — and who profits.

Named after the Portuguese word for native/indigenous species ("espécies
autóctones"). Portuguese-first, with an English version at `/en`.

## What's inside

A single scroll-driven narrative: the native forest parts to reveal a burning
eucalyptus plantation, the story follows the pulp economy that planted it and
the fire feedback loop that keeps it winning, and the forest closes back in at
the end — the restoration. Species data, fire statistics, and every claim about
companies or organizations carry citations, enforced at the type level: content
lives in `lib/` as typed datasets where a claim without a source doesn't
compile.

## Stack

Next.js (App Router) · React · TypeScript · Tailwind — no other runtime
dependencies. All animation is pure CSS scroll-driven animation
(`animation-timeline`), with `prefers-reduced-motion` respected throughout;
the page works as a static document without it.

```bash
npm run dev
npm run build
npm test          # unit (Vitest)
npm run test:e2e  # Playwright
```

## Deploy

Static-first; deploys to Vercel with zero config.

Set `NEXT_PUBLIC_SITE_URL` to the production origin so OG/canonical URLs are
absolute (falls back to `http://localhost:3000` in dev). `/` redirects to a
locale via `proxy.ts`; `/pt` and `/en` are prerendered.
