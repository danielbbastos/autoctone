/* Pinned scroll scene for the "invasão" section: a tall section exposes the
 * --invasao view-timeline and the sticky stage pins while scroll progress stages
 * each block in. The pin is a desktop/tablet enhancement — on phones (and with
 * reduced motion) the same markup falls back to normal flow so nothing clips
 * (see globals.css, "Invasão pinned scene"). */
import { sectionNumber, type Section } from "@/lib/narrative";
import type { Stat } from "@/lib/types";
import { getDictionary, localize, pick, type Locale } from "@/lib/i18n";
import { EmberField } from "./forest-parts";
import { collectSources } from "./NarrativeSection";
import { SourceMarks } from "./SourceMarks";
import { StatBlock } from "./StatBlock";

export function InvasaoScene({
  section,
  stat,
  locale,
  index,
}: {
  section: Section;
  stat: Stat;
  locale: Locale;
  /** 1-based position in SECTIONS; drives the ghost numeral and the kicker. */
  index: number;
}) {
  const dict = getDictionary(locale);
  const number = sectionNumber(index);
  const kicker = pick(locale, section.kicker, section.kickerEn);
  const [lede, aside] = section.body;
  const sources = collectSources(section);

  return (
    <section
      id={section.id}
      className="invasao-scene scene-seam relative"
    >
      <div className="invasao-stage flex flex-col justify-center px-6 py-16 sm:px-12">
        <EmberField />
        <div className="section-index relative z-10 mx-auto w-full max-w-4xl" data-index={number}>
          <p className="mb-4 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.25em] text-cork">
            <span aria-hidden className="h-px w-8 bg-cork/60" />
            {number} · {kicker}
          </p>
          <h2 className="font-display text-3xl font-semibold leading-[1.05] tracking-tight text-emerald-50 sm:text-5xl">
            {pick(locale, section.titlePt, section.titleEn)}
          </h2>

          <p className="lede mt-5 max-w-xl text-base leading-relaxed text-emerald-100/90 sm:text-lg">
            {localize(locale, lede)}
          </p>
          {sources.length > 0 ? (
            <div className="mt-4 max-w-xl">
              <SourceMarks sources={sources} label={dict.sources} />
            </div>
          ) : null}

          <p className="inv-aside ml-auto mt-6 max-w-xl text-right text-base leading-relaxed text-emerald-100/90 sm:text-lg">
            {localize(locale, aside)}
          </p>

          {section.pullQuote ? (
            <blockquote className="pull-quote inv-quote mt-8 max-w-2xl">
              {localize(locale, section.pullQuote)}
            </blockquote>
          ) : null}

          <div className="inv-stat mt-8">
            <StatBlock stat={stat} locale={locale} hideComparisons />
          </div>

          {stat.comparisons ? (
            <ul className="inv-compare mt-6 max-w-md space-y-3">
              {stat.comparisons.map((comparison) => (
                <li
                  key={comparison.pt}
                  className="inv-compare-item text-sm leading-relaxed text-emerald-100/80"
                >
                  <span aria-hidden className="mr-2 text-cork">≈</span>
                  {localize(locale, comparison)}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </section>
  );
}
