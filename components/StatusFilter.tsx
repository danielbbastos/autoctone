"use client";

// Filter tabs. The filter state lives in the URL (?status=...), not in React
// state — so it survives refreshes and is shareable. Clicking a tab navigates,
// which re-runs the Server Component page with the new searchParams.

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { Status, STATUS_LABELS, STATUSES } from "@/lib/types";

export function StatusFilter({ active }: { active?: Status }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  // useTransition marks the navigation as non-urgent: the current UI stays
  // interactive and isPending lets us show feedback while the new page loads.
  const [isPending, startTransition] = useTransition();

  function setFilter(status?: Status) {
    const params = new URLSearchParams(searchParams);
    if (status) params.set("status", status);
    else params.delete("status");
    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  }

  return (
    <div
      className={`flex flex-wrap gap-1.5 transition-opacity ${isPending ? "opacity-50" : ""}`}
    >
      <FilterTab label="All" isActive={!active} onClick={() => setFilter(undefined)} />
      {STATUSES.map((status) => (
        <FilterTab
          key={status}
          label={STATUS_LABELS[status]}
          isActive={active === status}
          onClick={() => setFilter(status)}
        />
      ))}
    </div>
  );
}

function FilterTab({
  label,
  isActive,
  onClick,
}: {
  label: string;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-3 py-1 text-sm transition ${
        isActive
          ? "bg-zinc-900 text-white"
          : "bg-white text-zinc-600 ring-1 ring-zinc-200 hover:bg-zinc-100"
      }`}
    >
      {label}
    </button>
  );
}
