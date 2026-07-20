/* Fixed dot rail. Client-only because the active dot tracks scroll position via
 * IntersectionObserver; the smooth jump still comes from CSS scroll-behavior.
 *
 * Sections are ~1 viewport tall and snap, so "most visible wins" is stable —
 * a rootMargin band would flicker at snap boundaries instead. */
"use client";

import { useEffect, useState } from "react";
import { sectionNumber } from "@/lib/narrative";
import { pick, type Locale } from "@/lib/i18n";

export function SectionNav({
  sections,
  label,
  progressLabel,
  locale,
}: {
  sections: readonly { id: string; titlePt: string; titleEn?: string }[];
  label: string;
  progressLabel: string;
  locale: Locale;
}) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const elements = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null);

    const ratios = new Map<string, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratios.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
        }
        let bestId = "";
        let best = 0;
        for (const [id, ratio] of ratios) {
          if (ratio > best) {
            best = ratio;
            bestId = id;
          }
        }
        if (bestId) {
          const i = sections.findIndex((s) => s.id === bestId);
          if (i !== -1) setActive(i);
        }
      },
      { threshold: [0, 0.25, 0.5, 0.75, 1] },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sections]);

  return (
    <nav
      aria-label={label}
      className="section-nav fixed right-4 top-1/2 z-30 hidden -translate-y-1/2 flex-col items-end gap-3 lg:flex"
    >
      <ol className="flex flex-col items-end gap-3">
        {sections.map((s, i) => {
          const title = pick(locale, s.titlePt, s.titleEn);
          const number = sectionNumber(i + 1);
          const isActive = i === active;
          return (
            <li key={s.id} className="section-nav-item">
              <a
                href={`#${s.id}`}
                aria-label={`${number} · ${title}`}
                aria-current={isActive ? "true" : undefined}
                className="group flex h-3 items-center justify-end gap-2"
              >
                <span className="section-nav-label" aria-hidden>
                  <span className="tabular-nums text-cork">{number}</span> · {title}
                </span>
                <span
                  className={`section-nav-dot h-2.5 w-2.5 rounded-full border ${
                    isActive
                      ? "scale-125 border-cork bg-cork"
                      : "border-emerald-400/70 bg-emerald-950"
                  }`}
                />
              </a>
            </li>
          );
        })}
      </ol>

      <p className="mt-1 text-[0.7rem] tabular-nums text-emerald-300/60">
        <span className="sr-only">{progressLabel} </span>
        {active + 1}/{sections.length}
      </p>
    </nav>
  );
}
