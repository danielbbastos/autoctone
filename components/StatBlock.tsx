/**
 * A headline statistic: a large number, unit, label, its sources, and an
 * optional "Quanto é isto?" toggle that reveals plain-language size comparisons.
 *
 * Concept demonstrated: props typing against the dataset shape. Passing a whole
 * `Stat` object (rather than loose props) keeps the component honest — it can
 * only render numbers that exist in `lib/narrative.ts`, sources included. The
 * number is sized to stay *below* the section heading (the section title is the
 * largest type on screen). The comparisons live in a client `Disclosure` and,
 * per the brief, carry no inline chips of their own (their derivation is cited
 * in the dataset and listed in the Sources footer).
 */
import type { Stat } from "@/lib/types";
import { getDictionary, localize, pick, type Locale } from "@/lib/i18n";
import { SourceMarks } from "./SourceMarks";
import { Disclosure } from "./Disclosure";

export function StatBlock({ stat, locale }: { stat: Stat; locale: Locale }) {
  const dict = getDictionary(locale);
  return (
    <figure className="border-l-2 border-cork/50 pl-5">
      <div className="flex items-baseline gap-2">
        <span className="font-display text-4xl font-semibold tabular-nums leading-none text-emerald-50 sm:text-5xl">
          {stat.value}
        </span>
        <span className="text-base font-medium text-cork">{pick(locale, stat.unitPt, stat.unitEn)}</span>
      </div>
      <figcaption className="mt-3 max-w-xs text-sm leading-relaxed text-emerald-200/80">
        {pick(locale, stat.labelPt, stat.labelEn)}
      </figcaption>
      <SourceMarks sources={stat.sources} />

      {stat.comparisons ? (
        <Disclosure label={dict.howMuch}>
          <ul className="max-w-sm space-y-3">
            {stat.comparisons.map((comparison) => (
              <li key={comparison.pt} className="text-sm leading-relaxed text-emerald-100/80">
                <span aria-hidden className="mr-2 text-cork">≈</span>
                {localize(locale, comparison)}
              </li>
            ))}
          </ul>
        </Disclosure>
      ) : null}
    </figure>
  );
}
