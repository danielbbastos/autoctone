<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Project rules — JobTracker (learning project)

## Purpose (this changes how you should work here)
This repo exists so Daniel can relearn modern React (after a 3-year gap) and explain
every line in job interviews. Code he cannot explain is worse than no code.

## Hard rules
- **Explain before you build.** For any non-trivial pattern, say what it is and why
  it's used before writing it. Prefer the idiomatic modern pattern over clever ones.
- **No new dependencies without asking.** The teaching value is in React/Next
  primitives, not libraries. Current stack: Next.js 16 (App Router), React 19,
  TypeScript, Tailwind 4 — nothing else.
- **Comment density: moderate.** One comment block per component/function explaining
  what it does and which concept it demonstrates. Never line-by-line commentary.
- **Keep the README concept map in sync.** If you add/move a concept, update the
  table in README.md — it is Daniel's study index.
- **Server-first.** Default to Server Components; add "use client" only when hooks,
  handlers, or browser APIs require it, and push the boundary as low as possible.

## Architecture (30-second orientation)
- `lib/db.ts` — fake in-memory API with artificial latency (server-only)
- `app/actions.ts` — all Server Actions (mutations)
- `app/` — routes; `components/` — UI, client components marked with "use client"
- Filter/search state lives in the URL (?status=, ?q=), never in useState

## Verification
- `npm run build` must pass before claiming done; a PostToolUse hook runs
  `tsc --noEmit` after every .ts/.tsx edit (see .claude/settings.json)
