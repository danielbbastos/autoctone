"use client";
/**
 * A "reveal more" toggle styled as a pill button (matching CrossLink): a rounded
 * cork-outlined control with a rotating arrow that shows/hides its children.
 * Used for the "Quanto é isto?" size comparisons under a headline stat.
 *
 * Concept demonstrated: the client boundary kept as low as possible. Only the
 * open/closed boolean and the click handler need the browser, so only this
 * wrapper is a Client Component — the content it reveals is passed in as
 * `children`, still rendered on the server. The arrow's rotation is disabled
 * under `prefers-reduced-motion` (Tailwind `motion-reduce:`).
 */
import { useId, useState, type ReactNode } from "react";

export function Disclosure({ label, children }: { label: string; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <div className="mt-4">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((o) => !o)}
        className="group inline-flex items-center gap-2 rounded-full border border-cork/40 bg-emerald-950/40 px-4 py-2 text-sm font-medium text-cork-soft transition hover:border-cork hover:bg-emerald-900/60 hover:text-cork"
      >
        {label}
        <span
          aria-hidden
          className={`transition-transform motion-reduce:transition-none ${open ? "rotate-180" : ""}`}
        >
          ↓
        </span>
      </button>
      <div id={panelId} hidden={!open} className="mt-3">
        {children}
      </div>
    </div>
  );
}
