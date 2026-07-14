/**
 * Screen 1: a calm, text-only landing. The forest sequence begins one screen
 * below, so the page opens on the message, not the spectacle.
 *
 * This holds the page's single <h1>. (Placeholder copy for now — will be
 * designed out later.)
 */
import type { Section } from "@/lib/narrative";
import { getDictionary, localize, type Locale } from "@/lib/i18n";
import { SourceMarks } from "./SourceMarks";

export function LandingHero({
  section,
  locale,
}: {
  section: Section;
  locale: Locale;
}) {
  const dict = getDictionary(locale);
  const claim = section.body[0];

  return (
    <section
      id={section.id}
      className="landing relative isolate flex min-h-screen snap-start flex-col items-center justify-center px-6 text-center"
    >
      {/* Native-forest photo backdrop (drop public/landing-forest.jpg) + a
          legibility scrim. Opacity is tuned in globals.css (`.landing-bg`). */}
      <div className="landing-bg" />
      <div className="landing-scrim" />
      <p className="flex items-center gap-3 text-xs font-medium uppercase tracking-[0.3em] text-cork-soft drop-shadow">
        <span aria-hidden className="h-px w-8 bg-cork/70" />
        {section.kicker}
        <span aria-hidden className="h-px w-8 bg-cork/70" />
      </p>
      <h1 className="mt-5 max-w-3xl font-display text-5xl font-semibold leading-[1.05] tracking-tight text-white drop-shadow-lg sm:text-7xl">
        {section.titlePt}
      </h1>
      {claim ? (
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-emerald-50/95 drop-shadow">
          {localize(locale, claim)}
        </p>
      ) : null}
      <p className="mt-10 flex items-center gap-2 text-sm text-emerald-200/80">
        <span aria-hidden className="animate-bounce">
          ↓
        </span>
        {dict.scrollToEnter}
      </p>
      {claim ? (
        <div className="mt-6 max-w-xl text-left">
          <SourceMarks sources={claim.sources} />
        </div>
      ) : null}
    </section>
  );
}
