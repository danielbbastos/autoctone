// One card per native species, keyed by the dataset's unique slug.
import { NATIVE_SPECIES } from "@/lib/species";
import { getDictionary, pick, type Locale } from "@/lib/i18n";
import type { FireBehaviour } from "@/lib/types";
import { SourceMarks } from "./SourceMarks";
import { TreeSvg } from "./TreeSvg";

const BADGE_CLASS: Record<FireBehaviour, string> = {
  resists: "bg-emerald-500/15 text-emerald-300 ring-emerald-500/30",
  resprouts: "bg-teal-500/15 text-teal-300 ring-teal-500/30",
  firebreak: "bg-sky-500/15 text-sky-300 ring-sky-500/30",
  accelerant: "bg-amber-500/15 text-amber-300 ring-amber-500/30",
};

const ACCENT_CLASS: Record<FireBehaviour, string> = {
  resists: "bg-emerald-400/70",
  resprouts: "bg-teal-400/70",
  firebreak: "bg-sky-400/70",
  accelerant: "bg-amber-400/70",
};

export function SpeciesGallery({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  return (
    <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {NATIVE_SPECIES.map((species) => (
        <li
          key={species.slug}
          className="relative isolate flex flex-col overflow-hidden rounded-lg border border-emerald-600/30 bg-emerald-950/50 p-5"
        >
          <span
            aria-hidden
            className={`absolute inset-x-0 top-0 h-1 ${ACCENT_CLASS[species.fireBehaviour]}`}
          />
          <div
            className="species-card-bg"
            style={{ backgroundImage: `url(/species/${species.slug}.jpg)` }}
          />
          <div className="flex items-start justify-between gap-2">
            <TreeSvg slug={species.slug} className="h-24 w-auto text-emerald-500" />
            <span
              className={`rounded-full px-2.5 py-1 text-xs font-medium ring-1 ${BADGE_CLASS[species.fireBehaviour]}`}
            >
              {dict.fireBehaviour[species.fireBehaviour]}
            </span>
          </div>
          <h3 className="mt-3 font-display text-2xl font-semibold text-emerald-50">
            {pick(locale, species.namePt, species.nameEn)}
          </h3>
          <p className="text-sm italic text-emerald-300/90">{species.scientific}</p>
          <p className="mt-3 border-l-2 border-cork/50 pl-3 text-sm font-medium text-cork-soft">
            {pick(locale, species.taglinePt, species.taglineEn)}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-emerald-100/80">
            {pick(locale, species.bodyPt, species.bodyEn)}
          </p>
          <div className="mt-auto pt-4">
            <SourceMarks sources={species.sources} />
          </div>
        </li>
      ))}
    </ul>
  );
}
