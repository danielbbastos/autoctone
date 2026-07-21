/* The single scrollytelling page: maps SECTIONS into the vertical spine and
 * injects the data-heavy blocks as children keyed by section id. */
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { getStat, SECTIONS } from "@/lib/narrative";
import { PROFIT_ORGS, RESIST_ORGS } from "@/lib/organizations";
import { ACTION_GROUPS } from "@/lib/actions";
import { DEFAULT_LOCALE, getDictionary, isLocale, type Locale } from "@/lib/i18n";
import { NarrativeSection } from "@/components/NarrativeSection";
import { InvasaoScene } from "@/components/InvasaoScene";
import { SpeciesGallery } from "@/components/SpeciesGallery";
import { OrgList } from "@/components/OrgList";
import { ActionList } from "@/components/ActionList";
import { ForestShareChart } from "@/components/ForestShareChart";
import { ShareButtons } from "@/components/ShareButtons";
import { SITE_COPY, localeUrl } from "@/lib/site";
import { StatBlock } from "@/components/StatBlock";
import { LandingHero } from "@/components/LandingHero";
import { ForestReveal } from "@/components/ForestReveal";
import { ForestRestore } from "@/components/ForestRestore";
import { SectionNav } from "@/components/SectionNav";
import { LangToggle } from "@/components/LangToggle";
import { SkipLink } from "@/components/SkipLink";
import { BackToTop } from "@/components/BackToTop";
import { ReadingProgress } from "@/components/ReadingProgress";
import { SourcesFooter } from "@/components/SourcesFooter";

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const locale: Locale = isLocale(lang) ? lang : DEFAULT_LOCALE;
  const dict = getDictionary(locale);

  const [heroSection, ...restSections] = SECTIONS;

  /* The section right after the blacked-out invasão scene plays as a pinned
   * cinematic: photo backdrop, centred title, then copy resolving out of blur. */
  const STAGED_SECTION = "ciclo";

  const sectionExtras: Partial<Record<string, ReactNode>> = {
    lucro: <OrgList orgs={PROFIT_ORGS} locale={locale} />,
    fogo: (
      <div className="flex flex-col gap-8 sm:flex-row">
        <StatBlock stat={getStat("pedrogao-mortos")} locale={locale} />
        <StatBlock stat={getStat("ano-2017-ardido")} locale={locale} />
      </div>
    ),
    galeria: <SpeciesGallery locale={locale} />,
    vizinhos: <ForestShareChart locale={locale} />,
    pessoas: (
      <div className="flex flex-col gap-8 sm:flex-row">
        <StatBlock stat={getStat("floresta-privada")} locale={locale} />
        <StatBlock stat={getStat("floresta-baldios")} locale={locale} />
      </div>
    ),
    resistencia: <OrgList orgs={RESIST_ORGS} locale={locale} />,
    acao: (
      <>
        <ActionList groups={ACTION_GROUPS} locale={locale} />
        <ShareButtons
          shareTitle={SITE_COPY[locale].title}
          url={localeUrl(locale)}
          labels={{
            title: dict.shareTitle,
            intro: dict.shareIntro,
            share: dict.shareGeneric,
            copyLink: dict.shareCopyLink,
            copied: dict.shareCopied,
          }}
        />
      </>
    ),
  };

  return (
    <>
      <SkipLink label={dict.skipToContent} />
      <ReadingProgress endId="fontes" />
      <LangToggle locale={locale} label={dict.language} />
      <SectionNav
        sections={SECTIONS}
        label={dict.sections}
        locale={locale}
      />
      <BackToTop label={dict.backToTop} />

      <main id="conteudo" className="bg-emerald-800 text-emerald-50">
        <LandingHero section={heroSection} locale={locale} />
        <ForestReveal locale={locale} />

        {/* The narrative steps share one pinned canopy backdrop. */}
        <div className="narrative-region">
          <div className="narrative-bg" aria-hidden />
          {/* +2: 1-based numbering, and `hero` was already split off the front. */}
          {restSections.map((section, i) =>
            section.id === "invasao" ? (
              <InvasaoScene
                key={section.id}
                section={section}
                stat={getStat("eucalipto-ha")}
                locale={locale}
                index={i + 2}
              />
            ) : (
              <NarrativeSection
                key={section.id}
                section={section}
                locale={locale}
                index={i + 2}
                heading="h2"
                staged={section.id === STAGED_SECTION}
              >
                {sectionExtras[section.id]}
              </NarrativeSection>
            ),
          )}
        </div>

        <ForestRestore locale={locale} />
        <SourcesFooter
          title={dict.sourcesTitle}
          intro={dict.sourcesIntro}
          updatedLabel={dict.lastUpdated}
          madeByLabel={dict.madeBy}
        />
      </main>
    </>
  );
}
