/* Language selector: a globe trigger that opens a small menu of the available
 * locales. On phones the trigger is just the globe; from sm up it also shows the
 * current language name. Client because it owns the open/close state and closes
 * on outside-click / Escape — the choices themselves are still plain links, so
 * locale switching stays pure navigation. */
"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { LOCALES, LOCALE_NAMES, type Locale } from "@/lib/i18n";

export function LangToggle({ locale, label }: { locale: Locale; label: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <nav
      ref={ref}
      aria-label={label}
      className="fixed right-[max(1rem,env(safe-area-inset-right))] top-[max(1rem,env(safe-area-inset-top))] z-40"
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls="lang-menu"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 rounded-full border border-emerald-700/60 bg-emerald-950 px-3 py-1.5 text-sm text-emerald-100 backdrop-blur transition hover:bg-emerald-900"
      >
        <GlobeIcon />
        <span className="hidden sm:inline">{LOCALE_NAMES[locale]}</span>
        <ChevronIcon
          className={`hidden transition-transform motion-reduce:transition-none sm:block ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open ? (
        <ul
          id="lang-menu"
          className="absolute right-0 mt-2 min-w-36 overflow-hidden rounded-xl border border-emerald-700/60 bg-emerald-950 py-1 text-sm shadow-lg shadow-black/40 backdrop-blur"
        >
          {LOCALES.map((loc) => {
            const active = loc === locale;
            return (
              <li key={loc}>
                <Link
                  href={`/${loc}`}
                  hrefLang={loc}
                  aria-current={active ? "true" : undefined}
                  onClick={() => setOpen(false)}
                  className={`block px-4 py-2 transition hover:bg-emerald-900 ${
                    active ? "text-cork" : "text-emerald-100"
                  }`}
                >
                  {LOCALE_NAMES[loc]}
                </Link>
              </li>
            );
          })}
        </ul>
      ) : null}
    </nav>
  );
}

function GlobeIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className="h-5 w-5 shrink-0"
      aria-hidden
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 3c-5 4.5-5 13.5 0 18M12 3c5 4.5 5 13.5 0 18" strokeLinecap="round" />
      <path d="M3 12h18" strokeLinecap="round" />
    </svg>
  );
}

function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`h-3.5 w-3.5 shrink-0 ${className ?? ""}`}
      aria-hidden
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}
