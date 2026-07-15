/**
 * The single scrollytelling page, now locale-aware. It maps `SECTIONS` into the
 * vertical spine and injects the data-heavy sections as `children` keyed by id.
 *
 * Concept demonstrated: `params` as a Promise in the App Router. The page is an
 * async Server Component; it awaits `params`, narrows the raw `lang` string to a
 * `Locale`, and threads that locale down to the components that render UI chrome
 * (labels, nav, the language toggle). The cited *content* stays PT for now and
 * is surfaced through the `localize` fallback until EN copy is written.
 */
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { getStat, SECTIONS } from "@/lib/narrative";
import { PROFIT_ORGS, RESIST_ORGS } from "@/lib/organizations";
import { DEFAULT_LOCALE, getDictionary, isLocale, type Locale } from "@/lib/i18n";
import { NarrativeSection } from "@/components/NarrativeSection";
import { SpeciesGallery } from "@/components/SpeciesGallery";
import { OrgList } from "@/components/OrgList";
import { StatBlock } from "@/components/StatBlock";
import { LandingHero } from "@/components/LandingHero";
import { ForestDefs } from "@/components/forest-parts";
import { ForestReveal } from "@/components/ForestReveal";
import { ForestRestore } from "@/components/ForestRestore";
import { SectionNav } from "@/components/SectionNav";
import { LangToggle } from "@/components/LangToggle";
import { SkipLink } from "@/components/SkipLink";
import { BackToTop } from "@/components/BackToTop";
import { SourcesFooter } from "@/components/SourcesFooter";

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const locale: Locale = isLocale(lang) ? lang : DEFAULT_LOCALE;
  const dict = getDictionary(locale);

  // The hero (section 0) is the full-screen parting-forest scene; it holds the
  // page's single <h1>. The remaining sections render as the narrative spine.
  const [heroSection, ...restSections] = SECTIONS;

  // Section-specific content, keyed by section id.
  const sectionExtras: Partial<Record<string, ReactNode>> = {
    invasao: <StatBlock stat={getStat("eucalipto-ha")} locale={locale} />,
    lucro: <OrgList orgs={PROFIT_ORGS} locale={locale} />,
    fogo: (
      <div className="flex flex-col gap-8 sm:flex-row">
        <StatBlock stat={getStat("pedrogao-mortos")} locale={locale} />
        <StatBlock stat={getStat("ano-2017-ardido")} locale={locale} />
      </div>
    ),
    galeria: <SpeciesGallery locale={locale} />,
    resistencia: <OrgList orgs={RESIST_ORGS} locale={locale} />,
    acao: <StatBlock stat={getStat("floresta-privada")} locale={locale} />,
  };

  return (
    <>
      <SkipLink label={dict.skipToContent} />
      <LangToggle locale={locale} label={dict.language} otherLabel={dict.otherLangName} />
      <SectionNav sections={SECTIONS} label={dict.sections} locale={locale} />
      {/* This page (a Server Component) computes the label, then hands it to the
          one Client Component on the site — see components/BackToTop.tsx. */}
      <BackToTop label={dict.backToTop} />

      <main id="conteudo" className="bg-emerald-800 text-emerald-50">
        {/* Shared SVG gradient defs for every tree/flame on the page. */}
        <ForestDefs />

        {/* Screen 1: text landing. Screen 2+: the forest opens onto the fire. */}
        <LandingHero section={heroSection} locale={locale} />
        <ForestReveal locale={locale} />

        {/* The narrative steps share one pinned canopy backdrop. */}
        <div className="narrative-region">
          <div className="narrative-bg" aria-hidden />
          {restSections.map((section) => (
            <NarrativeSection
              key={section.id}
              section={section}
              locale={locale}
              heading="h2"
            >
              {sectionExtras[section.id]}
            </NarrativeSection>
          ))}
        </div>

        {/* Finale: the native forest sweeps back in over the burnt eucalyptus. */}
        <ForestRestore locale={locale} />

        {/* Numbered footnote registry — the jump target for every source chip. */}
        <SourcesFooter title={dict.sourcesTitle} intro={dict.sourcesIntro} />
      </main>
    </>
  );
}
