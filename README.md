# JobTracker — modern React/Next.js study project

A small job-application tracker built to cover the React features that appeared (or went mainstream) in the last ~3 years: Server Components, Server Actions, streaming with Suspense, and the React 19 hooks. Stack: **Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4**.

```bash
npm install
npm run dev
```

Data lives in memory (`lib/db.ts`) with artificial latency to simulate a real API — it resets when the server restarts, which is fine for a study project.

## Concept map — where to find each thing

| Concept | File(s) | What to look at |
|---|---|---|
| **Server Components (RSC)** | `app/page.tsx`, `components/ApplicationList.tsx`, `components/StatsCards.tsx` | `async` components that `await` data directly. No `useEffect`+`fetch`, no loading state in the component. Their code never ships to the browser. |
| **Client Components** | anything with `"use client"` at the top | Needed for hooks, event handlers, browser APIs. Note how few there are — client components are "islands" inside server-rendered pages. |
| **Streaming + Suspense** | `app/page.tsx` | Two `<Suspense>` boundaries with different-speed data. Watch the page load: shell → list (~0.4s) → stats (~1.5s). Also note the `key` prop that re-triggers the fallback when the filter changes. |
| **`loading.tsx`** | `app/applications/[id]/loading.tsx` | Next.js sugar: automatically wraps the page in a Suspense boundary. |
| **Server Actions** | `app/actions.ts` | `"use server"` functions called directly from client code — Next.js generates the RPC endpoint. Note `revalidatePath` (cache invalidation) and `redirect`. |
| **`useActionState`** (React 19) | `components/NewApplicationForm.tsx` + `createApplicationAction` | Form → action → returned `{errors, values}` state → re-render with errors, keeping typed input. Server-side validation that also works without JS. |
| **`useOptimistic`** (React 19) | `components/StatusSelect.tsx` (simple form), `components/Notes.tsx` (reducer form) | UI updates instantly; React reverts/reconciles when the server responds. Two API shapes shown. |
| **`useTransition`** | `components/StatusFilter.tsx`, `components/DeleteButton.tsx` | Non-blocking updates + `isPending` for feedback while a navigation or action runs. |
| **URL as state** | `components/StatusFilter.tsx`, `components/SearchInput.tsx`, `app/page.tsx` | Filter/search live in `?status=`/`?q=`, not React state — shareable, survives refresh, and the *server* refetches. |
| **Dynamic routes** | `app/applications/[id]/page.tsx` | `params` is a **Promise** in Next 16 (`await params`). `notFound()` for missing IDs. |
| **Route Handlers (REST API)** | `app/api/applications/route.ts` | Classic JSON endpoint; try `curl localhost:3000/api/applications?status=offer`. The app itself doesn't use it — server components call `lib/db` directly, which is the point. |
| **Shared components** | `components/StatusBadge.tsx` | No hooks/handlers → works in both server and client trees without `"use client"`. |
| **Debouncing with `useEffect` cleanup** | `components/SearchInput.tsx` | The cleanup function cancels the pending timeout on every keystroke. |

## The mental model shift (if you last wrote React ~2022)

1. **Data fetching moved to the server.** The old default — `useEffect` + `fetch` + `useState` loading flags — is now the exception. An async Server Component just `await`s the data and renders HTML. Client-side fetching still exists (SWR/React Query) but for live/interactive data, not initial page data.
2. **Mutations moved to Server Actions.** Instead of building `/api/*` routes and calling `fetch` from handlers, you write a `"use server"` function and pass it to `<form action={...}>` or call it from an event handler. Validation returns state; `revalidatePath` refreshes the affected pages.
3. **Loading states moved to Suspense.** Instead of `if (isLoading) return <Spinner/>` inside components, you wrap slow subtrees in `<Suspense fallback>` and the server streams each part when ready.
4. **`"use client"` is a boundary, not a per-file chore.** Everything is a Server Component by default; a `"use client"` file and everything it imports becomes the client bundle. The skill is pushing that boundary as low in the tree as possible.
5. **New hooks formalize old patterns.** `useOptimistic` (optimistic UI), `useActionState` (form submission state), `useTransition` (non-blocking updates) replace hand-rolled versions of the same ideas.

## Questions to test yourself with

- Why does `StatusBadge` not need `"use client"` but `StatusSelect` does?
- What happens if you delete the `key` prop on the second Suspense boundary in `app/page.tsx`? (Try it: change filters and watch — the stale list stays visible instead of the skeleton.)
- Why does `lib/db.ts` never end up in the browser bundle?
- What does `revalidatePath("/")` actually do, and what breaks if you remove it from `updateStatusAction`?
- In `Notes.tsx`, why can `addOptimisticNote` be called without wrapping it in `startTransition`?
- Why is the filter stored in the URL instead of `useState`? What do you gain/lose?
- Visiting `/applications/999` shows the not-found page but returns HTTP 200 — why? (Hint: `loading.tsx` means the response starts streaming before `notFound()` runs.)
