/* Proxy (Next 16's renamed middleware): redirects locale-less paths to the
 * default locale. PT is the site's voice — everyone lands on /pt and opts
 * into EN via the toggle; no Accept-Language negotiation. */
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { LOCALES, DEFAULT_LOCALE } from "@/lib/i18n";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasLocale = LOCALES.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );
  if (hasLocale) return;

  request.nextUrl.pathname = `/${DEFAULT_LOCALE}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  // Run on everything except Next internals and files with an extension.
  matcher: ["/((?!_next|.*\\..*).*)"],
};
