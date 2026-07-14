/**
 * Dynamically generated social-share image (Open Graph / Twitter card), one per
 * locale.
 *
 * Concept demonstrated: `next/og`'s `ImageResponse` renders JSX to a PNG at the
 * edge — no design tool, no committed image asset, and it stays in sync with the
 * site's wording. `size` and `contentType` are the file-convention exports Next
 * reads to wire the `<meta>` tags automatically.
 */
import { ImageResponse } from "next/og";
import { LOCALES, DEFAULT_LOCALE, isLocale, type Locale } from "@/lib/i18n";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Autóctone";

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

const COPY: Record<Locale, { title: string; tagline: string }> = {
  pt: { title: "Autóctone", tagline: "A floresta que resiste ao fogo" },
  en: { title: "Autóctone", tagline: "The forest that resists fire" },
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
          background: "linear-gradient(135deg, #022c22 0%, #064e3b 100%)",
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
