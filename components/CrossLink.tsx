// Pill link that jumps to a deep-dive section — native anchor, no JS.
import { localize, type Locale } from "@/lib/i18n";

export function CrossLink({
  locale,
  link,
}: {
  locale: Locale;
  link: { pt: string; en?: string; to: string };
}) {
  return (
    <a
      href={link.to}
      className="group mt-8 inline-flex items-center gap-2 rounded-full border border-cork/40 bg-emerald-950/40 px-4 py-2 text-sm font-medium text-cork-soft transition hover:border-cork hover:bg-emerald-900/60 hover:text-cork"
    >
      {localize(locale, link)}
      <span aria-hidden className="transition-transform group-hover:translate-y-0.5 motion-reduce:transition-none">
        ↓
      </span>
    </a>
  );
}
