/**
 * Fixed language toggle linking to the other locale's route.
 *
 * Concept demonstrated: locale switching is just navigation. `next/link` points
 * at the sibling locale root (`/pt` ↔ `/en`); no client state, no context — the
 * URL is the source of truth. `hrefLang` tells crawlers what they'll get.
 */
import Link from "next/link";
import { otherLocale, type Locale } from "@/lib/i18n";

export function LangToggle({
  locale,
  label,
  otherLabel,
}: {
  locale: Locale;
  label: string;
  otherLabel: string;
}) {
  const target = otherLocale(locale);
  return (
    <nav aria-label={label} className="fixed right-4 top-4 z-40">
      <Link
        href={`/${target}`}
        hrefLang={target}
        className="rounded-full border border-emerald-700/60 bg-emerald-950/80 px-3 py-1 text-sm text-emerald-100 backdrop-blur transition hover:bg-emerald-900"
      >
        {otherLabel}
      </Link>
    </nav>
  );
}
