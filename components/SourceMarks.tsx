/* Footnote links into the Sources footer (#fonte-<id>); the footer's client
 * component handles the open/scroll/focus behaviour. */
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
