// The closing ask: themed groups of concrete actions, each one cited.
import type { ActionGroup } from "@/lib/types";
import { localize, pick, type Locale } from "@/lib/i18n";
import { SourceMarks } from "./SourceMarks";

export function ActionList({
  groups,
  locale,
}: {
  groups: readonly ActionGroup[];
  locale: Locale;
}) {
  return (
    <div className="grid gap-10 sm:grid-cols-2">
      {groups.map((group) => (
        <section key={group.slug} aria-labelledby={`accao-${group.slug}`}>
          <h3
            id={`accao-${group.slug}`}
            className="font-display text-xl font-semibold leading-snug text-cork-soft"
          >
            {pick(locale, group.titlePt, group.titleEn)}
          </h3>
          <p className="mt-1 text-sm leading-relaxed text-emerald-100/70">
            {pick(locale, group.ledePt, group.ledeEn)}
          </p>

          <ul className="mt-4 space-y-4 border-t border-emerald-700/30 pt-4">
            {group.actions.map((action) => {
              const label = pick(locale, action.labelPt, action.labelEn);
              return (
                <li key={action.slug}>
                  <h4 className="font-medium leading-snug text-emerald-50">
                    {action.href ? (
                      <a
                        href={action.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline decoration-cork/40 decoration-dotted underline-offset-4 transition hover:text-cork-soft hover:decoration-cork"
                      >
                        {label}
                      </a>
                    ) : (
                      label
                    )}
                  </h4>
                  <p className="mt-1 text-sm leading-relaxed text-emerald-100/75">
                    {localize(locale, action.claim)}
                  </p>
                  <SourceMarks sources={action.claim.sources} />
                </li>
              );
            })}
          </ul>
        </section>
      ))}
    </div>
  );
}
