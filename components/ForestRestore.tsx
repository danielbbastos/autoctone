/**
 * Finale scene: the reverse of the reveal. It opens on a cleared centre under a
 * dawn sky; as you scroll, the parallax forest sweeps back IN from both sides
 * and fills the screen again — the restoration.
 *
 * Same depth layers as the reveal, animated backwards (named `--restore`
 * timeline). Reduced-motion / unsupported → static restored forest.
 */
import { Fragment } from "react";
import { getDictionary, type Locale } from "@/lib/i18n";
import { BACKDROP, BAND_SINK, DEPTHS, ForestAtmosphere, ImgTreeLayer } from "./forest-parts";

export function ForestRestore({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  return (
    <section id="renascer" className="forest-restore">
      <div className="forest-stage">
        <div className="forest-sky forest-sky-dawn" />
        {/* Permanent, non-sliding backdrop: keeps the centre wooded as the forest parts. */}
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
