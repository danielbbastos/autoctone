"use client";

// Debounced search box. Like StatusFilter, it writes to the URL (?q=...)
// rather than holding app state — the server refetches with the new query.
// The debounce (via useEffect cleanup) avoids navigating on every keystroke.

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export function SearchInput() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [value, setValue] = useState(searchParams.get("q") ?? "");

  useEffect(() => {
    const timeout = setTimeout(() => {
      const params = new URLSearchParams(searchParams);
      if (value) params.set("q", value);
      else params.delete("q");
      // Only navigate if the query actually changed (e.g. skip initial mount).
      if (params.toString() !== searchParams.toString()) {
        router.push(`${pathname}?${params.toString()}`);
      }
    }, 300);
    // Cleanup cancels the pending navigation when the user keeps typing.
    return () => clearTimeout(timeout);
  }, [value, pathname, router, searchParams]);

  return (
    <input
      type="search"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="Search company or role…"
      className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 sm:w-64"
    />
  );
}
