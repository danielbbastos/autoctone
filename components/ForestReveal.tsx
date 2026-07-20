/* Opening scene: the native forest parts on scroll (named --reveal timeline),
 * revealing the burning plantation. Reduced-motion / unsupported → static
 * parted composition. */
import { Fragment } from "react";
import { getDictionary, type Locale } from "@/lib/i18n";
import {
  BAND_SINK,
  DEPTHS,
  EmberField,
  ForestAtmosphere,
  ImgTreeLayer,
  REVEAL_STAY_LEFT,
  REVEAL_STAY_RIGHT,
} from "./forest-parts";

export function ForestReveal({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  return (
    /* The visible caption is the scene's text equivalent — naming the section
     * with it means a screen reader gets the description, not a bare landmark. */
    <section
      id="floresta"
      className="forest-reveal"
      role="img"
      aria-labelledby="floresta-legenda"
    >
      <div className="forest-stage">
        <div className="forest-fire-bg" aria-hidden />
        <EmberField />
        <div className="forest-smoke-haze" aria-hidden />
        {/* Stay band: tiny --slide, so the centre only ever opens ~20vw. */}
        <ImgTreeLayer trees={REVEAL_STAY_LEFT} className="reveal-left-stay" sink={BAND_SINK} />
        <ImgTreeLayer trees={REVEAL_STAY_RIGHT} className="reveal-right-stay" sink={BAND_SINK} />
        {DEPTHS.map((d) => (
          <Fragment key={d.name}>
            <ImgTreeLayer trees={d.left} className={`reveal-left-${d.name}`} sink={d.sink} />
            <ImgTreeLayer trees={d.right} className={`reveal-right-${d.name}`} sink={d.sink} />
          </Fragment>
        ))}
        <ForestAtmosphere />
        <p id="floresta-legenda" className="forest-caption">
          {dict.forestRevealCaption}
        </p>
      </div>
    </section>
  );
}
