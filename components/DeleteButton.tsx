"use client";

// Calls a Server Action from a plain onClick handler (not a form).
// window.confirm is a deliberate simplicity choice for a demo app.

import { useTransition } from "react";
import { deleteApplicationAction } from "@/app/actions";

export function DeleteButton({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    if (!window.confirm("Delete this application?")) return;
    startTransition(() => deleteApplicationAction(id));
  }

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      className="rounded-lg px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 disabled:opacity-50"
    >
      {isPending ? "Deleting…" : "Delete"}
    </button>
  );
}
