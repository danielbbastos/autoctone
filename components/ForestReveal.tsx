/* Opening scene: the native forest parts on scroll (named --reveal timeline),
 * revealing the burning plantation. Reduced-motion / unsupported → static
 * parted composition. */
import { Fragment } from "react";
import { getDictionary, type Locale } from "@/lib/i18n";
import {
  BAND_SINK,
  DEPTHS,
  ForestAtmosphere,
  ImgTreeLayer,
  REVEAL_STAY_LEFT,
  REVEAL_STAY_RIGHT,
} from "./forest-parts";

// Embers generated with index math — deterministic, so SSR and client render
// the same markup (Math.random() here would be a hydration mismatch).
const EMBER_COUNT = 22;
const EMBERS = Array.from({ length: EMBER_COUNT }, (_, i) => ({
  left: (i * 100) / (EMBER_COUNT - 1) + (((i * 13) % 7) - 3),
  bottom: 14 + ((i * 23) % 54),
  size: 0.3 + ((i * 11) % 4) * 0.1,
  red: i % 3 === 2,
  delay: -((i * 1.7) % 8),
  duration: 6 + ((i * 5) % 9) * 0.5,
}));

export function ForestReveal({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  return (
    <section id="floresta" className="forest-reveal">
      <div className="forest-stage">
        <div className="forest-fire-bg" aria-hidden />
        <div className="forest-embers" aria-hidden>
          {EMBERS.map((e, i) => (
            <span
              key={i}
              style={{
                left: `${e.left}%`,
                bottom: `${e.bottom}%`,
                width: `calc(${e.size} * var(--fu, 1vh))`,
                height: `calc(${e.size} * var(--fu, 1vh))`,
                background: e.red ? "#f87171" : "#fdba74",
                boxShadow: e.red
                  ? "0 0 5px 2px rgba(220, 38, 38, 0.6)"
                  : "0 0 6px 2px rgba(249, 115, 22, 0.65)",
                animationDelay: `${e.delay}s`,
                animationDuration: `${e.duration}s`,
              }}
            />
          ))}
        </div>
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
        <p className="forest-caption">{dict.forestRevealCaption}</p>
      </div>
    </section>
  );
}
