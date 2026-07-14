/**
 * Proxy (Next 16's renamed `middleware`). Runs before routing and redirects any
 * locale-less path to a localized one, e.g. `/` → `/pt`.
 *
 * Concept demonstrated: locale negotiation at the edge. We read `Accept-Language`
 * and pick a supported locale, defaulting to PT. Detection is hand-rolled to
 * avoid extra dependencies (the docs suggest `negotiator` + `intl-localematcher`;
 * this project's rule is no new deps).
 */
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { LOCALES, DEFAULT_LOCALE, isLocale } from "@/lib/i18n";

function detectLocale(request: NextRequest): string {
  const header = request.headers.get("accept-language");
  if (!header) return DEFAULT_LOCALE;
  // "pt-PT,pt;q=0.9,en;q=0.8" → ordered base language tags.
  const preferred = header
    .split(",")
    .map((part) => part.split(";")[0].trim().split("-")[0].toLowerCase());
  return preferred.find(isLocale) ?? DEFAULT_LOCALE;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasLocale = LOCALES.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );
  if (hasLocale) return;

  request.nextUrl.pathname = `/${detectLocale(request)}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  // Run on everything except Next internals and files with an extension.
  matcher: ["/((?!_next|.*\\..*).*)"],
};
