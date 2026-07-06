"use client";

// Optimistic status updater. The server action takes ~600ms; useOptimistic
// shows the new status instantly, then React reconciles with the real server
// state when revalidation finishes (or rolls back if the action throws).

import { useOptimistic, useTransition } from "react";
import { updateStatusAction } from "@/app/actions";
import { Status, STATUS_LABELS, STATUSES } from "@/lib/types";
import { StatusBadge } from "./StatusBadge";

export function StatusSelect({ id, status }: { id: string; status: Status }) {
  const [isPending, startTransition] = useTransition();
  // optimisticStatus mirrors the `status` prop, except during a pending
  // transition where it shows whatever we passed to setOptimisticStatus.
  const [optimisticStatus, setOptimisticStatus] = useOptimistic(status);

  function handleChange(next: Status) {
    startTransition(async () => {
      setOptimisticStatus(next); // UI updates immediately
      await updateStatusAction(id, next); // server catches up
    });
  }

  return (
    <div className="flex items-center gap-2">
      <StatusBadge status={optimisticStatus} />
      <select
        value={optimisticStatus}
        onChange={(e) => handleChange(e.target.value as Status)}
        className="rounded-lg border border-zinc-200 bg-white px-2 py-1 text-sm"
      >
        {STATUSES.map((s) => (
          <option key={s} value={s}>
            {STATUS_LABELS[s]}
          </option>
        ))}
      </select>
      {isPending && <span className="text-xs text-zinc-400">Saving…</span>}
    </div>
  );
}
