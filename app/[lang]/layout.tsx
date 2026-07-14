/**
 * Root layout, now nested under the `[lang]` segment so the `<html lang>`
 * attribute reflects the active locale. This is the App Router i18n pattern:
 * every special file lives under `app/[lang]`, and `params` arrives as a Promise
 * that layouts and pages await.
 *
 * Concept demonstrated: `generateStaticParams` prerenders one HTML document per
 * locale at build time, and `generateMetadata` produces locale-aware `<head>`
 * tags (title, description, and `alternates.languages` for hreflang).
 */
import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { LOCALES, DEFAULT_LOCALE, isLocale, type Locale } from "@/lib/i18n";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

// Base URL for absolute OG/canonical links; override per environment at deploy.
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

const COPY: Record<Locale, { title: string; description: string }> = {
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
  const { title, description } = COPY[locale];

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
      siteName: "Autóctone",
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#022c22", // emerald-950, matches the page background
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
