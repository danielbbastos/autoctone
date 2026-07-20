/* Shared shell for every scroll section. `heading` is configurable so the page
 * keeps a single <h1>; body sources are de-duplicated into one footer row. */
import type { ReactNode } from "react";
import { sectionNumber, type Section } from "@/lib/narrative";
import type { SourceRef } from "@/lib/types";
import { getDictionary, localize, pick, type Locale } from "@/lib/i18n";
import { SourceMarks } from "./SourceMarks";
import { CrossLink } from "./CrossLink";

/** Unique source refs across the section's body, in first-seen order. */
export function collectSources(section: Section): SourceRef[] {
  const seen = new Set<string>();
  return section.body
    .flatMap((claim) => claim.sources)
    .filter((ref) => (seen.has(ref.id) ? false : (seen.add(ref.id), true)));
}

export function NarrativeSection({
  section,
  locale,
  index,
  heading = "h2",
  staged = false,
  children,
}: {
  section: Section;
  locale: Locale;
  /** 1-based position in SECTIONS; drives the ghost numeral and the kicker. */
  index: number;
  heading?: "h1" | "h2";
  /**
   * Cinematic variant: the section grows tall and pins, opening on the photo
   * backdrop with the title centred, then the title rises and the rest resolves
   * out of blur as you scroll. Staging lives in globals.css (".staged-scene").
   */
  staged?: boolean;
  children?: ReactNode;
}) {
  const dict = getDictionary(locale);
  const Heading = heading;

  const number = sectionNumber(index);
  const kicker = pick(locale, section.kicker, section.kickerEn);
  const sources = collectSources(section);

  // Staged scenes move the padding/centring onto the sticky stage; the tall
  // outer section exists only to supply scroll distance.
  const layout = `flex min-h-screen flex-col justify-center px-6 sm:px-12 ${
    staged ? "py-16" : "py-32"
  }`;

  const content = (
    <div className="section-index relative z-10 mx-auto w-full max-w-4xl" data-index={number}>
      <p className="mb-4 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.25em] text-cork">
        <span aria-hidden className="h-px w-8 bg-cork/60" />
        {number} · {kicker}
      </p>
      <Heading
        className={`font-display text-4xl font-semibold leading-[1.05] tracking-tight text-emerald-50 sm:text-6xl ${
          staged ? "staged-title" : ""
        }`}
      >
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
  );

  return (
    <section
      id={section.id}
      className={`relative ${staged ? "staged-scene scene-seam" : layout}`}
    >
      {staged ? <div className={`staged-stage ${layout}`}>{content}</div> : content}
    </section>
  );
}
