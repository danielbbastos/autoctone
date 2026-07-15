/**
 * A list of organizations (either the pulp economy or the resistance), each
 * with its defining cited claim, an optional row of key figures, and a name
 * that links to the organization's website when one is known.
 *
 * Concept demonstrated: a reusable component parameterised by props. The same
 * component renders both "who profits" and "who resists" — the page passes the
 * right slice of data (`PROFIT_ORGS` or `RESIST_ORGS`) as the `orgs` prop. The
 * claim text is localized through `localize`, falling back to PT.
 */
import type { Organization } from "@/lib/types";
import { localize, pick, type Locale } from "@/lib/i18n";
import { SourceMarks } from "./SourceMarks";

export function OrgList({
  orgs,
  locale,
}: {
  orgs: readonly Organization[];
  locale: Locale;
}) {
  return (
    <ul className="divide-y divide-emerald-700/30 border-t border-emerald-700/30">
      {orgs.map((org) => (
        <li key={org.slug} className="grid gap-1 py-5 sm:grid-cols-[1fr_2fr] sm:gap-8">
          <h3 className="font-display text-xl font-semibold leading-snug text-emerald-50">
            {org.site ? (
              <a
                href={org.site}
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-cork/40 decoration-dotted underline-offset-4 transition hover:text-cork-soft hover:decoration-cork"
              >
                {org.name}
              </a>
            ) : (
              org.name
            )}
            {org.since ? (
              <span className="mt-1 block text-sm font-sans font-normal tabular-nums text-cork">
                {org.since}
              </span>
            ) : null}
          </h3>
          <div>
            <p className="text-emerald-100/80">{localize(locale, org.claim)}</p>
            <SourceMarks sources={org.claim.sources} />

            {org.facts ? (
              <dl className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
                {org.facts.map((fact) => (
                  <div
                    key={fact.labelPt}
                    className="rounded-md border border-emerald-700/30 bg-emerald-950/40 p-3"
                  >
                    <dt className="text-[0.7rem] font-medium uppercase tracking-wide text-emerald-300/60">
                      {pick(locale, fact.labelPt, fact.labelEn)}
                    </dt>
                    <dd className="mt-1 font-display text-lg font-semibold tabular-nums text-cork-soft">
                      {fact.value}
                    </dd>
                  </div>
                ))}
              </dl>
            ) : null}
          </div>
        </li>
      ))}
    </ul>
  );
}
