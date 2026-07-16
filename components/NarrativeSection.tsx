/* Shared shell for every scroll section. `heading` is configurable so the page
 * keeps a single <h1>; body sources are de-duplicated into one footer row. */
import type { ReactNode } from "react";
import type { Section } from "@/lib/narrative";
import type { SourceRef } from "@/lib/types";
import { getDictionary, localize, pick, type Locale } from "@/lib/i18n";
import { SourceMarks } from "./SourceMarks";
import { CrossLink } from "./CrossLink";

/** Unique source refs across the section's body, in first-seen order. */
function collectSources(section: Section): SourceRef[] {
  const seen = new Set<string>();
  return section.body
    .flatMap((claim) => claim.sources)
    .filter((ref) => (seen.has(ref.id) ? false : (seen.add(ref.id), true)));
}

export function NarrativeSection({
  section,
  locale,
  heading = "h2",
  children,
}: {
  section: Section;
  locale: Locale;
  heading?: "h1" | "h2";
  children?: ReactNode;
}) {
  const dict = getDictionary(locale);
  const Heading = heading;

  const kicker = pick(locale, section.kicker, section.kickerEn);
  // Kickers are "06 · O fogo" — the number before the · feeds the ghost numeral.
  const index = kicker.split("·")[0]?.trim();
  const sources = collectSources(section);

  return (
    <section
      id={section.id}
      className="relative flex min-h-screen snap-start snap-always flex-col justify-center border-b border-emerald-700/30 px-6 py-24 sm:px-12"
    >
      <div className="section-index relative z-10 mx-auto w-full max-w-4xl" data-index={index}>
        <p className="mb-4 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.25em] text-cork">
          <span aria-hidden className="h-px w-8 bg-cork/60" />
          {kicker}
        </p>
        <Heading className="font-display text-4xl font-semibold leading-[1.05] tracking-tight text-emerald-50 sm:text-6xl">
          {pick(locale, section.titlePt, section.titleEn)}
        </Heading>

        {section.body.map((claim, i) => (
          <p
            key={i}
            className={`mt-6 max-w-2xl text-lg leading-relaxed text-emerald-100/90 ${
              i === 0 ? "lede" : ""
            }`}
          >
            {localize(locale, claim)}
          </p>
        ))}

        {sources.length > 0 ? (
          <div className="mt-5 max-w-2xl">
            <SourceMarks sources={sources} label={dict.sources} />
          </div>
        ) : null}

        {section.pullQuote ? (
          <blockquote className="pull-quote mt-10 max-w-2xl">
            {localize(locale, section.pullQuote)}
          </blockquote>
        ) : null}

        {section.link ? <CrossLink locale={locale} link={section.link} /> : null}

        {children ? <div className="mt-12">{children}</div> : null}
      </div>
    </section>
  );
}
