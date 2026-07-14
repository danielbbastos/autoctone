/**
 * Inline source markers: for each `SourceRef`, a small footnote link showing the
 * registry number + the source's short label (e.g. "¹² ICNF"). Clicking jumps to
 * `#fonte-<id>` in the collapsible Sources footer, which opens and focuses that
 * entry (see components/SourcesFooter.tsx).
 *
 * Concept demonstrated: a leaf Server Component reading from a normalized
 * registry. It ships zero JavaScript — the "scroll + expand + focus" behaviour
 * lives entirely in the footer's client component, reached by a plain anchor.
 * Kept deliberately light (no pill, small type) so a row of sources reads as a
 * quiet footnote, not a stack of buttons. An optional `label` prefixes the row
 * where the sources are aggregated for a whole section.
 */
import type { SourceRef } from "@/lib/types";
import { getSource, sourceNumber } from "@/lib/sources";

export function SourceMarks({
  sources,
  label,
}: {
  sources: readonly SourceRef[];
  label?: string;
}) {
  if (sources.length === 0) return null;

  return (
    <span className="mt-2 flex flex-wrap items-baseline gap-x-3 gap-y-1">
      {label ? (
        <span className="text-[0.65rem] font-medium uppercase tracking-wide text-emerald-300/40">
          {label}
        </span>
      ) : null}
      {sources.map((ref, i) => {
        const src = getSource(ref.id);
        return (
          <a
            key={`${ref.id}-${i}`}
            href={`#fonte-${ref.id}`}
            title={src.source}
            className="group inline-flex items-baseline gap-1 text-[0.72rem] text-emerald-300/60 no-underline transition hover:text-cork-soft"
          >
            <sup className="text-[0.6rem] font-semibold text-cork">{sourceNumber(ref.id)}</sup>
            <span className="underline decoration-emerald-500/25 decoration-dotted underline-offset-2 transition group-hover:decoration-cork">
              {src.short}
            </span>
          </a>
        );
      })}
    </span>
  );
}
