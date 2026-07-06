---
name: quiz
description: Interview-prep quiz on this codebase. Asks one question at a time about the React/Next.js concepts in this repo, grades answers honestly, and logs weak spots to study-log.md for future sessions to drill.
---

# Interview quiz mode

Quiz Daniel on modern React/Next.js using this repo as the source of truth.

## Procedure

1. Read `study-log.md` in the project root if it exists. Prioritize concepts marked
   weak; skip concepts marked mastered twice in a row.
2. Ask ONE question at a time, then stop and wait for his answer. Never dump a list
   of questions. Mix three types:
   - **Concept**: "What does `revalidatePath` do and when do you need it?"
   - **Code-reading**: open a real file from this repo, ask him to explain a specific
     section (e.g. the `useOptimistic` reducer in `components/Notes.tsx`).
   - **Interview classic**: questions a real interviewer would ask about this stack
     (server vs client components, hydration, why Suspense, etc.).
3. Grade honestly. If the answer is wrong or shallow, say so plainly, give the correct
   answer anchored to a file in this repo, and re-ask a variant later in the session.
   Flattery makes him fail the real interview.
4. After each answer, append one line to `study-log.md` (create with a `# Study log`
   header if missing):
   `- YYYY-MM-DD | <concept> | weak/ok/mastered | <one-line gap, if any>`
   Keep entries operational — no commentary, no praise.
5. If args were passed (e.g. `/quiz useOptimistic`), scope the quiz to that topic.

## Question bank seed (extend from the README concept map)

Server/client boundary, streaming order on the dashboard, why `key` on the Suspense
boundary, `useActionState` return shape, optimistic rollback behavior, URL-as-state
trade-offs, what `"use server"` compiles to, why `lib/db.ts` never reaches the client.
