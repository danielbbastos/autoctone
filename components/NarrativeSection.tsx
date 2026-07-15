/**
 * The shell every scroll section shares: a full-height band with a ghost
 * numeral, kicker, serif heading (the largest type on screen), its body
 * paragraphs (the first one drop-capped), one de-duplicated row of the section's
 * sources, an optional pull-quote, an optional cross-link, and a content slot.
 *
 * Concept demonstrated: composition via `children` plus a configurable heading
 * level. The page passes `heading="h1"` for the hero and `"h2"` for the rest, so
 * the document keeps a single top-level heading (a11y/SEO) without special-casing
 * the markup. Rather than repeat a chip under every paragraph (the same source
 * often backs several), the section's sources are collected once — unique, in
 * first-seen order — and listed at the foot of the copy.
 */
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
  const Heading = heading; // capitalized → React treats it as a component/tag

  const kicker = pick(locale, section.kicker, section.kickerEn);
  // The kicker is "06 · O fogo"; the leading number feeds the ghost numeral.
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
