# Autóctone 🌳🔥

A scrollytelling website about Portugal's eucalyptus problem — and how native
forests are the country's real fire infrastructure.

Named after the Portuguese word for native/indigenous species ("espécies
autóctones") — the vocabulary Portuguese forestry and conservation use for the
trees this site champions. Display text carries the accent (Autóctone); the
repo, package, and domain use the plain form (autoctone).

## The story the site tells

1. **Hero** — the native forest as it was
2. **The invasion** — natives slide out, eucalyptus rows slide in (~845k ha; the
   most common tree in Portugal)
3. **Porquê?** — the pulp economy, smallholder incentives, 1960s–80s expansion
4. **Who profits** — The Navigator Company, Altri, CELPA (cited claims only)
5. **The fire** — Pedrógão Grande, June 2017; ember spotting; the sobreiro that
   survives
6. **The feedback loop** — fire helps eucalyptus win
7. **Species gallery** — sobreiro, azinheira, carvalhos, medronheiro, riparian
   firebreaks
8. **The resistance** — Quercus, ZERO, Montis, Plantar Uma Árvore, ATN, the 2017
   expansion-freeze law
9. **What you can do**

## Build phases

1. Content first — narrative script + cited datasets in `lib/` (no code)
2. Static walking skeleton — all sections, real text, placeholder SVGs
3. Tree illustrations — stylized inline SVGs, parts addressable for animation
4. Scroll animation pass — one signature moment (the invasion), simple reveals
   elsewhere; `prefers-reduced-motion` respected
5. Species gallery + polish — PT/EN, meta, Lighthouse, deploy

## Concept map (study index)

This repo is also a modern-React relearning project. Every concept used gets a
row here, pointing at the file that demonstrates it.

| Concept | Where | Notes |
| ------- | ----- | ----- |
| Typed content layer | `lib/types.ts` | All facts live as typed data; components are dumb renderers |
| `satisfies` operator | `lib/species.ts`, `lib/organizations.ts` | Validate against a type without widening literals |
| `as const` readonly data | all `lib/*.ts` datasets | Freeze arrays into readonly tuples; keep literal `slug` types |
| Deriving a union from data | `SpeciesSlug`, `OrgSlug`, `StatSlug` | `(typeof X)[number]["slug"]` → autocomplete + typo-proof lookups |
| Citation-enforced content | `Claim` / `SourceRef` types | "No unsourced numbers" enforced by the compiler, not review |
| Normalized source registry | `lib/sources.ts` | Sources live once, keyed by id; claims hold `SourceRef`s → de-dup + stable footnote numbers |
| Numbered footnotes + jump-to | `SourceMarks` → `SourcesFooter` | Server-rendered `#fonte-<id>` anchors; a client footer opens, scrolls to, and focuses the row (`:target` + hash listener) |
| Client disclosure (low boundary) | `components/Disclosure.tsx` | "Quanto é isto?" toggle; only the open/close boolean is client, revealed content stays server-rendered |
| Cross-section anchor link | `components/CrossLink.tsx` | Styled `<a href="#id">` "read why" button; native anchor jump, zero JS |
| Server Components (default) | `app/page.tsx`, most `components/*` | Render on server, import data directly, ship zero JS |
| Client Component boundary | `components/BackToTop.tsx` (`"use client"`) | Only file that ships JS: needs `useState` + `onClick`; label passed in as a prop to keep it tiny |
| Composition via `children` | `NarrativeSection`, `page.tsx` `sectionExtras` | Wrapper owns layout, caller owns content (React "slots") |
| List rendering + stable keys | `SpeciesGallery`, `OrgList` | `key={slug}`, never the array index |
| Inline SVG as a component | `components/TreeSvg.tsx` | Shapes take props/classes; animation-ready `<g>` ids |
| Shape-driven rendering | `components/TreeSvg.tsx` | Species → `TreeShape` → SVG map, no boolean soup |
| Tailwind 4 `@theme` tokens | `app/globals.css` | Custom `--font-display` / `--color-cork` mint `font-display`, `text-cork`… utilities |
| Editorial CSS type devices | `globals.css`, `NarrativeSection` | Ghost numeral via `attr(data-index)`, drop-cap (`initial-letter`/`::first-letter`), pull-quote, inline-SVG grain |
| CSS scroll-driven animation | `app/globals.css` (`animation-timeline`) | Pure CSS, no JS; whole site is Server Components |
| Sticky + named view-timeline | `ForestReveal`/`ForestRestore` + `--reveal`/`--restore` | Tall section scrubs a pinned full-screen stage; forest parts/closes |
| Reversible scroll scene | `ForestRestore` (`close-left/right` keyframes) | Same technique run backwards — the native forest sweeps back in |
| Staggered `animation-range` | `globals.css` (`--stagger` per depth) | `calc()` + custom property delays one shared range per layer → the front row slides first, deeper rows follow (domino) |
| Scroll-driven opacity fade | `.forest-smoke-haze` (`haze-clear` keyframe) | Overlay pinned between background and trees; opacity scrubs 1→0 across the whole domino, unveiling the fire backdrop |
| Independent `scale` property | `forest-part`/`forest-close` keyframes | `scale` composes with `transform: translateX()` on the same element — no wrapper divs for compound motion |
| `animation-direction: reverse` | `.forest-mist` (`mist-thin` keyframe) | One keyframe drives both scenes: mist thins on reveal, thickens on restore |
| `mask-image` gradient masking | `.forest-lightshafts` (also `.species-card-bg`) | A repeating-gradient masked by a fade → god rays that dissolve before the forest floor |
| Illustrator-shaded SVG | `components/forest-parts.tsx` | Radial-gradient clumps (broccoli method), dark→mid→light+sun, occlusion, ground shadow |
| Continuous CSS animation | `BurningEucalyptus` + `globals.css` | Flame flicker / smoke / glow, independent of scroll, reduced-motion gated (component currently unused — kept for the Pedrógão sequence) |
| `prefers-reduced-motion` | `app/globals.css` `@media` | Motion inside `@media … no-preference`; static accessible base scene |
| i18n routing (`[lang]`) | `app/[lang]/`, `lib/i18n.ts` | Locale is a URL segment; `params` is awaited; PT default, EN scaffolded |
| Proxy (ex-middleware) | `proxy.ts` | Edge locale negotiation from `Accept-Language`; `/` → `/pt` |
| `generateStaticParams` | `app/[lang]/layout.tsx` | Prerender one HTML doc per locale at build time |
| `generateMetadata` + hreflang | `app/[lang]/layout.tsx` | Locale-aware `<head>` + `alternates.languages` |
| Dynamic OG image | `app/[lang]/opengraph-image.tsx` | `next/og` renders JSX → PNG per locale, no asset committed |
| A11y: skip link, one `h1`, focus | `SkipLink`, `NarrativeSection`, `globals.css` | Heading level as a prop; `:focus-visible` ring |
| Unit tests (Vitest) | `__tests__/*.test.ts`, `vitest.config.mts` | Data-layer invariants types can't enforce: no empty `sources: []`, unique slugs, PT/EN dictionary parity |
| Component tests (RTL) | `__tests__/disclosure.test.tsx` | Assert via the a11y tree (`getByRole`, `aria-expanded`), not implementation details |
| E2E tests (Playwright) | `e2e/site.spec.ts`, `playwright.config.ts` | Production build on its own port; locale negotiation per `Accept-Language`; Chromium + WebKit; `reducedMotion` emulation |

## Stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind 4 · CSS scroll-driven
animations — **no other dependencies**.

```bash
npm run dev
npm run build   # must pass before any change is "done"
```

## Deploy

Static-first; deploys to Vercel with zero config.

```bash
npx vercel          # first run: link the project (preview deploy)
npx vercel --prod   # promote to production
```

Set one environment variable so OG/canonical URLs are absolute:

- `NEXT_PUBLIC_SITE_URL` = the production origin, e.g. `https://autoctone.vercel.app`
  (falls back to `http://localhost:3000` in dev).

Routes: `/` redirects to a locale via `proxy.ts`; `/pt` and `/en` are prerendered.
