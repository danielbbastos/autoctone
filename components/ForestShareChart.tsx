/* Planted-vs-natural forest across four Mediterranean countries. Bars are CSS
 * widths off a derived percentage; the same data is repeated as a visually
 * hidden table so screen readers get the figures rather than a shape. */
import { FOREST_SHARES, plantedShare } from "@/lib/comparison";
import { getDictionary, pick, type Locale } from "@/lib/i18n";
import { SourceMarks } from "./SourceMarks";

const HOME = "PRT";

export function ForestShareChart({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const rows = FOREST_SHARES.map((share) => ({
    ...share,
    name: pick(locale, share.namePt, share.nameEn),
    percent: plantedShare(share),
  }));

  return (
    <figure className="w-full">
      <figcaption className="text-sm font-medium uppercase tracking-[0.2em] text-cork">
        {dict.plantedShareTitle}
      </figcaption>

      <ul aria-hidden className="mt-6 space-y-4">
        {rows.map((row) => (
          <li key={row.code} className="grid grid-cols-[5.5rem_1fr_3.5rem] items-center gap-3">
            <span
              className={
                row.code === HOME
                  ? "text-sm font-semibold text-cork-soft"
                  : "text-sm text-emerald-100/70"
              }
            >
              {row.name}
            </span>
            <span className="h-3 overflow-hidden rounded-full bg-emerald-950/60">
              <span
                className={`block h-full rounded-full ${
                  row.code === HOME ? "bg-cork" : "bg-emerald-600/70"
                }`}
                style={{ width: `${row.percent.toFixed(1)}%` }}
              />
            </span>
            <span
              className={`text-right text-sm tabular-nums ${
                row.code === HOME ? "font-semibold text-cork-soft" : "text-emerald-100/70"
              }`}
            >
              {row.percent.toFixed(0)}%
            </span>
          </li>
        ))}
      </ul>

      <table className="sr-only">
        <caption>{dict.plantedShareTitle}</caption>
        <thead>
          <tr>
            <th scope="col">{dict.country}</th>
            <th scope="col">{dict.plantedShareColumn}</th>
            <th scope="col">{dict.forestAreaColumn}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.code}>
              <th scope="row">{row.name}</th>
              <td>{row.percent.toFixed(1)}%</td>
              <td>{Math.round(row.totalKha * 1000).toLocaleString(locale)} ha</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p className="mt-5 max-w-xl text-sm leading-relaxed text-emerald-100/70">
        {dict.plantedShareCaveat}
      </p>
      {/* All four rows cite the same harmonised report; the per-country tables
        * are recorded in each row's SourceRef note. */}
      <SourceMarks sources={[{ id: "fra2020" }]} label={dict.sources} />
    </figure>
  );
}
