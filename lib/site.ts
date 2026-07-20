import type { Locale } from "./i18n";

/** Single source for site identity shared by layout metadata, the web app
 * manifest, and the OG image — edit here, everything stays in sync. */
export const SITE_NAME = "Autóctone";

/** emerald-950 — the page background; also the PWA theme/splash color. */
export const THEME_COLOR = "#022c22";

/* Base URL for absolute OG/canonical/share links; NEXT_PUBLIC_SITE_URL
 * overrides for previews/staging. Baked in at build time (pages are SSG). */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://floresta-autoctone.pt";

/** Canonical absolute URL of a locale's page — what sharing should point at. */
export function localeUrl(locale: Locale): string {
  return `${SITE_URL}/${locale}`;
}

export const SITE_AUTHOR = "Daniel Bastos";

export const SITE_AUTHOR_URL = "https://daniel-bastos.vercel.app";

/** ISO date of the last commit, injected at build time (see next.config.ts). */
export const SITE_UPDATED = process.env.NEXT_PUBLIC_LAST_UPDATED ?? "";

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
