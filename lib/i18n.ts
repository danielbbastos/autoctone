/**
 * Internationalization scaffold. PT is the default and only fully-written
 * locale; EN is wired end-to-end but its *content* translations are a follow-up
 * (the cited datasets still carry PT copy, surfaced via `localize` fallback).
 *
 * Concept demonstrated: a locale is just a URL segment (`/pt`, `/en`) plus a
 * dictionary lookup. This file owns three things — the list of locales, the UI
 * "chrome" strings (labels, not content), and small helpers — so components and
 * the `[lang]` routes stay declarative.
 */
export const LOCALES = ["pt", "en"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "pt";

/** Type guard so a raw route param (`string`) can be narrowed to `Locale`. */
export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

/**
 * A bilingual value from the content datasets: PT is required, EN optional.
 * `localize` returns EN when present, otherwise falls back to PT — this is what
 * lets us ship the EN route today and fill EN copy incrementally.
 */
export function localize(locale: Locale, value: { pt: string; en?: string }): string {
  return locale === "en" ? value.en ?? value.pt : value.pt;
}

/**
 * Same idea as `localize`, but for datasets that store their two languages as
 * separate `*Pt` / `*En` fields (species, stats, sections) rather than a nested
 * `{ pt, en }` object. Returns EN when present, otherwise falls back to PT.
 */
export function pick(locale: Locale, pt: string, en?: string): string {
  return locale === "en" ? en ?? pt : pt;
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
