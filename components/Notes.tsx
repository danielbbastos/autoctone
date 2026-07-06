"use client";

// Notes list with optimistic additions. Here useOptimistic takes an update
// function: it appends a temporary note to the server-provided list, and the
// temp note is replaced by the real one once revalidatePath refreshes props.

import { useOptimistic, useRef } from "react";
import { addNoteAction } from "@/app/actions";
import { Note } from "@/lib/types";

export function Notes({ applicationId, notes }: { applicationId: string; notes: Note[] }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [optimisticNotes, addOptimisticNote] = useOptimistic(
    notes,
    (current, text: string) => [
      ...current,
      { id: "optimistic", text, createdAt: "Saving…" },
    ]
  );

  // Form actions run inside a transition automatically, so we can call
  // addOptimisticNote here without wrapping in startTransition ourselves.
  async function handleSubmit(formData: FormData) {
    const text = (formData.get("text") as string)?.trim();
    if (!text) return;
    formRef.current?.reset();
    addOptimisticNote(text);
    await addNoteAction(applicationId, formData);
  }

  return (
    <section className="rounded-xl border border-zinc-200 bg-white p-6">
      <h2 className="font-semibold">Notes</h2>

      <ul className="mt-3 space-y-2">
        {optimisticNotes.length === 0 && (
          <li className="text-sm text-zinc-400">No notes yet.</li>
        )}
        {optimisticNotes.map((note) => (
          <li
            key={note.id}
            className={`rounded-lg bg-zinc-50 p-3 text-sm ${
              note.id === "optimistic" ? "opacity-50" : ""
            }`}
          >
            <p>{note.text}</p>
            <p className="mt-1 text-xs text-zinc-400">{note.createdAt}</p>
          </li>
        ))}
      </ul>

      <form ref={formRef} action={handleSubmit} className="mt-4 flex gap-2">
        <input
          name="text"
          placeholder="Add a note…"
          className="flex-1 rounded-lg border border-zinc-200 px-3 py-1.5 text-sm outline-none focus:border-indigo-400"
        />
        <button className="rounded-lg bg-zinc-900 px-3 py-1.5 text-sm font-medium text-white hover:bg-zinc-700">
          Add
        </button>
      </form>
    </section>
  );
}
