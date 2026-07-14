<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->
# Project rules — Sobreiro (eucalyptus awareness site + learning project)

## What this is
A scrollytelling website (Portuguese audience, PT-first) that explains how Portugal's
native forest species fight wildfires, why eucalyptus took over (the pulp economy),
who profits, and who is fighting back. Centerpiece: scroll-driven animations of trees
(natives slide out, eucalyptus rows slide in; the Pedrógão 2017 fire sequence).

## Purpose (this changes how you should work here)
This repo doubles as Daniel's modern-React relearning project (3-year gap, interview
prep). Code he cannot explain is worse than no code.

## Hard rules
- **Explain before you build.** For any non-trivial pattern, say what it is and why
  it's used before writing it. Prefer the idiomatic modern pattern over clever ones.
- **No new dependencies without asking.** Animations use CSS scroll-driven animations
  (`animation-timeline`) with IntersectionObserver fallback — no animation libraries.
  Trees are inline SVG. Stack: Next.js 16 (App Router), React 19, TypeScript,
  Tailwind 4 — nothing else.
- **Comment density: moderate.** One comment block per component/function explaining
  what it does and which concept it demonstrates. Never line-by-line commentary.
- **Keep the NOTES.md concept map in sync.** If you add/move a concept, update the
  table in NOTES.md (gitignored) — it is Daniel's study index. README.md is the
  public face: short and non-personal; don't add study material there.
- **Server-first.** Default to Server Components; add "use client" only when hooks,
  handlers, or browser APIs require it, and push the boundary as low as possible.
- **Respect `prefers-reduced-motion`** in every animation from day one.
- **Facts need sources.** Species data, fire statistics, and any claim about
  companies (Navigator, Altri, CELPA) or NGOs must carry a citation in the content
  data files. No unsourced numbers in copy.

## Architecture (30-second orientation)
- `lib/` — content datasets (species, organizations, narrative copy), typed and cited
- `app/` — routes; `components/` — UI, client components marked with "use client"
- Narrative sections render top-to-bottom on one page; animation is progressive
  enhancement over static content

## Verification
- `npm run build` must pass before claiming done; a PostToolUse hook runs
  `tsc --noEmit` after every .ts/.tsx edit (see .claude/settings.json)
