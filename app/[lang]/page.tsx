/* The single scrollytelling page: maps SECTIONS into the vertical spine and
 * injects the data-heavy blocks as children keyed by section id. */
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { getStat, SECTIONS, type Section } from "@/lib/narrative";
import { PROFIT_ORGS, RESIST_ORGS } from "@/lib/organizations";
import { ACTION_GROUPS } from "@/lib/actions";
import { DEFAULT_LOCALE, getDictionary, isLocale, type Locale } from "@/lib/i18n";
import { NarrativeSection } from "@/components/NarrativeSection";
import { InvasionScene } from "@/components/InvasionScene";
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

  const [heroSection, ...restSections]: readonly Section[] = SECTIONS;

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
      <ReadingProgress endId="sources" />
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
          {/* +2: 1-based numbering, and `hero` was already split off the front.
           * Each section's `scene` (in lib/narrative.ts) picks its treatment. */}
          {restSections.map((section, i) => {
            const index = i + 2;
            switch (section.scene) {
              // Rendered as the second half of its lead's staged run, below.
              case "staged-follow":
                return null;
              // A shared-backdrop run: this lead plus the adjacent follow play as
              // pinned scenes over one burnt-forest photo. Adjacency is enforced
              // in content.test.ts, so the follow is safely restSections[i + 1].
              case "staged-lead": {
                const follow: Section = restSections[i + 1];
                return (
                  <div className="staged-sequence" key="staged-sequence">
                    <div className="staged-sequence-bg" aria-hidden />
                    <NarrativeSection
                      section={section}
                      locale={locale}
                      index={index}
                      heading="h2"
                      staged
                      firstStaged
                    >
                      {sectionExtras[section.id]}
                    </NarrativeSection>
                    <NarrativeSection
                      section={follow}
                      locale={locale}
                      index={index + 1}
                      heading="h2"
                      staged
                    >
                      {sectionExtras[follow.id]}
                    </NarrativeSection>
                  </div>
                );
              }
              case "invasion":
                return (
                  <InvasionScene
                    key={section.id}
                    section={section}
                    stat={getStat("eucalipto-ha")}
                    locale={locale}
                    index={index}
                  />
                );
              default:
                return (
                  <NarrativeSection
                    key={section.id}
                    section={section}
                    locale={locale}
                    index={index}
                    heading="h2"
                    seamAbove={section.seamAbove}
                  >
                    {sectionExtras[section.id]}
                  </NarrativeSection>
                );
            }
          })}
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
