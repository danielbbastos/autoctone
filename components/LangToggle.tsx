// Locale switching is just navigation — the URL is the source of truth.
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
    <nav
      aria-label={label}
      className="fixed right-[max(1rem,env(safe-area-inset-right))] top-[max(1rem,env(safe-area-inset-top))] z-40"
    >
      <Link
        href={`/${target}`}
        hrefLang={target}
        className="rounded-full border border-emerald-700/60 bg-emerald-950 px-3 py-1 text-sm text-emerald-100 backdrop-blur transition hover:bg-emerald-900"
      >
        {otherLabel}
      </Link>
    </nav>
  );
}
