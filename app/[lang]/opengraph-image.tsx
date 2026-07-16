/* Social-share image rendered from JSX per locale (next/og ImageResponse) —
 * no committed asset, stays in sync with the site's wording. */
import { ImageResponse } from "next/og";
import { LOCALES, DEFAULT_LOCALE, isLocale, type Locale } from "@/lib/i18n";
import { SITE_NAME, THEME_COLOR } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = SITE_NAME;

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

const COPY: Record<Locale, { title: string; tagline: string }> = {
  pt: { title: SITE_NAME, tagline: "A floresta que resiste ao fogo" },
  en: { title: SITE_NAME, tagline: "The forest that resists fire" },
};

export default async function Image({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : DEFAULT_LOCALE;
  const { title, tagline } = COPY[locale];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: `linear-gradient(135deg, ${THEME_COLOR} 0%, #064e3b 100%)`,
          color: "#ecfdf5",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 40 }}>🌳🔥</div>
        <div style={{ fontSize: 110, fontWeight: 700, marginTop: 24 }}>{title}</div>
        <div style={{ fontSize: 48, color: "#6ee7b7", marginTop: 8 }}>{tagline}</div>
      </div>
    ),
    size,
  );
}
