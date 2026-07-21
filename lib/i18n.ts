/* i18n: a locale is a URL segment plus a dictionary lookup. This file owns the
 * locale list, the UI chrome strings, and the localize/pick fallback helpers. */
export const LOCALES = ["pt", "en"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "pt";

/** Native display name per locale, for the language selector. */
export const LOCALE_NAMES: Record<Locale, string> = {
  pt: "Português",
  en: "English",
};

/** Type guard so a raw route param (`string`) can be narrowed to `Locale`. */
export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

/** EN when present, otherwise PT — lets EN copy land incrementally. */
export function localize(locale: Locale, value: { pt: string; en?: string }): string {
  return locale === "en" ? value.en ?? value.pt : value.pt;
}

/** `localize` for datasets that store languages as separate `*Pt`/`*En` fields. */
export function pick(locale: Locale, pt: string, en?: string): string {
  return localize(locale, { pt, en });
}

/** UI chrome strings — short, safe to translate now (not cited content). */
const DICTIONARY = {
  pt: {
    skipToContent: "Saltar para o conteúdo principal",
    sections: "Secções",
    sources: "Fontes",
    sourcesTitle: "Fontes",
    sourcesIntro:
      "Todos os números e afirmações do site, ligados à sua origem. Carrega num número ao longo da página para saltar até à fonte.",
    howMuch: "Quanto é isto?",
    language: "Idioma",
    otherLangName: "English",
    scrollToEnter: "Deslize para entrar na floresta",
    backToTop: "Voltar ao topo",
    forestRevealCaption:
      "Pelo meio da escassa vegetação nativa já se vê a paisagem habitual, um eucaliptal em chamas.",
    forestRestoreCaption:
      "Onde os eucaliptos deixaram a sua marca, aos poucos a ferida vai sarando com floresta autóctone.",
    plantedShareTitle: "Floresta plantada, não nascida",
    plantedShareCaveat:
      "«Plantada» quer dizer posta lá por pessoas — não quer dizer exótica. Boa parte do valor português é pinheiro-bravo, que é nativo. O que estes números mostram não é que a floresta é estrangeira, é que quase não há floresta que se tenha feito sozinha.",
    country: "País",
    plantedShareColumn: "Floresta plantada",
    forestAreaColumn: "Área florestal total",
    shareTitle: "Passa a palavra",
    shareIntro: "Partilhar é a ação mais barata desta lista.",
    shareGeneric: "Partilhar",
    shareCopyLink: "Copiar ligação",
    shareCopied: "Ligação copiada",
    lastUpdated: "Última atualização",
    madeBy: "Feito por",
    sectionProgress: "Secção",
    fireBehaviour: {
      resists: "Resiste ao fogo",
      resprouts: "Rebenta após o fogo",
      firebreak: "Barreira corta-fogo",
      accelerant: "Acelera o fogo",
    },
  },
  en: {
    skipToContent: "Skip to main content",
    sections: "Sections",
    sources: "Sources",
    sourcesTitle: "Sources",
    sourcesIntro:
      "Every figure and claim on the site, linked to its origin. Tap a number anywhere on the page to jump to its source.",
    howMuch: "How much is that?",
    language: "Language",
    otherLangName: "Português",
    scrollToEnter: "Scroll to enter the forest",
    backToTop: "Back to top",
    forestRevealCaption:
      "Through the thin native vegetation, the familiar landscape shows through: a eucalyptus plantation in flames.",
    forestRestoreCaption:
      "Where the eucalyptus left its mark, the wound slowly heals over with native forest.",
    plantedShareTitle: "Forest planted, not grown",
    plantedShareCaveat:
      "\"Planted\" means put there by people — it does not mean exotic. Much of the Portuguese figure is maritime pine, which is native. What these numbers show is not that the forest is foreign, but that almost none of it made itself.",
    country: "Country",
    plantedShareColumn: "Planted forest",
    forestAreaColumn: "Total forest area",
    shareTitle: "Pass it on",
    shareIntro: "Sharing is the cheapest action on this list.",
    shareGeneric: "Share",
    shareCopyLink: "Copy link",
    shareCopied: "Link copied",
    lastUpdated: "Last updated",
    madeBy: "Made by",
    sectionProgress: "Section",
    fireBehaviour: {
      resists: "Fire-resistant",
      resprouts: "Resprouts after fire",
      firebreak: "Natural firebreak",
      accelerant: "Fire accelerant",
    },
  },
} as const;

export type Dictionary = (typeof DICTIONARY)[Locale];

/** Fetch the UI dictionary for a locale. */
export function getDictionary(locale: Locale): Dictionary {
  return DICTIONARY[locale];
}

/** The other locale, for the language toggle. */
export function otherLocale(locale: Locale): Locale {
  return locale === "pt" ? "en" : "pt";
}
