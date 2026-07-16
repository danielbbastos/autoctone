import type { Locale } from "./i18n";

/** Single source for site identity shared by layout metadata, the web app
 * manifest, and the OG image — edit here, everything stays in sync. */
export const SITE_NAME = "Autóctone";

/** emerald-950 — the page background; also the PWA theme/splash color. */
export const THEME_COLOR = "#022c22";

export const SITE_COPY: Record<Locale, { title: string; description: string }> = {
  pt: {
    title: "Autóctone — a floresta que resiste ao fogo",
    description:
      "Como as espécies nativas de Portugal combatem os incêndios — e porque é que o eucalipto tomou conta da paisagem.",
  },
  en: {
    title: "Autóctone — the forest that resists fire",
    description:
      "How Portugal's native species fight wildfire — and how eucalyptus took over the landscape.",
  },
};
