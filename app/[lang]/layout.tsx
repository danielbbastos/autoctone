/* Root layout under [lang]: one prerendered document per locale
 * (generateStaticParams), locale-aware <head> via generateMetadata. */
import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { LOCALES, DEFAULT_LOCALE, isLocale, type Locale } from "@/lib/i18n";
import { SITE_NAME, SITE_COPY, THEME_COLOR } from "@/lib/site";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

// Base URL for absolute OG/canonical links; NEXT_PUBLIC_SITE_URL overrides
// for previews/staging. Baked in at build time (pages are SSG).
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://floresta-autoctone.pt";

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : DEFAULT_LOCALE;
  const { title, description } = SITE_COPY[locale];

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    alternates: {
      canonical: `/${locale}`,
      languages: { pt: "/pt", en: "/en" },
    },
    openGraph: {
      type: "website",
      locale: locale === "pt" ? "pt_PT" : "en_GB",
      title,
      description,
      siteName: SITE_NAME,
    },
  };
}

export const viewport: Viewport = {
  themeColor: THEME_COLOR,
  // Full-bleed scenes extend into the notch; fixed chrome compensates with
  // safe-area-inset offsets (LangToggle, BackToTop).
  viewportFit: "cover",
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  return (
    <html
      lang={lang}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
