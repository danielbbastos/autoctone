/* Finale: the reveal run backwards (named --restore timeline) — the forest
 * sweeps back in. Reduced-motion / unsupported → static restored forest. */
import { Fragment } from "react";
import { getDictionary, type Locale } from "@/lib/i18n";
import { BACKDROP, BAND_SINK, DEPTHS, ForestAtmosphere, ImgTreeLayer } from "./forest-parts";

export function ForestRestore({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  return (
    <section id="renascer" className="forest-restore">
      <div className="forest-stage">
        <div className="forest-sky forest-sky-dawn" />
        <ImgTreeLayer trees={BACKDROP} className="forest-backdrop" sink={BAND_SINK} />
        {DEPTHS.map((d) => (
          <Fragment key={d.name}>
            <ImgTreeLayer trees={d.left} className={`restore-left-${d.name}`} sink={d.sink} />
            <ImgTreeLayer trees={d.right} className={`restore-right-${d.name}`} sink={d.sink} />
          </Fragment>
        ))}
        <ForestAtmosphere />
        <p className="forest-caption">{dict.forestRestoreCaption}</p>
      </div>
    </section>
  );
}
