/**
 * Opening scene: a dense endemic forest (illustrated tree images across five
 * parallax depth layers) that parts as you scroll, revealing a burning
 * eucalyptus plantation (full-bleed illustration) behind it.
 *
 * Pure-CSS scroll-driven reveal (named `--reveal` view-timeline). The NEAR
 * layer slides first and the farther layers follow (domino stagger via
 * `animation-range`); a smoke haze sits between the fire backdrop and the
 * trees and thins on the same timeline, so the fire emerges gradually.
 * Reduced-motion / unsupported → static parted composition.
 */
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

// Wind-borne embers, generated with index math (deterministic → SSR-safe, same
// trick as the tree bands). Inline styles carry the per-ember variation
// (position, size, colour, loop phase); the shared `ember-fly` keyframe and the
// reduced-motion guard live in globals.css. Inline animation-delay/-duration
// override the stylesheet shorthand's values but only take effect when the
// guard supplies the animation-name.
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
        {/* Wind-borne embers: part of the BACKGROUND (z 1, under the smoke
            haze), so they only become visible as the smoke thins. */}
        <div className="forest-embers" aria-hidden>
          {EMBERS.map((e, i) => (
            <span
              key={i}
              style={{
                left: `${e.left}%`,
                bottom: `${e.bottom}%`,
                width: `${e.size}vh`,
                height: `${e.size}vh`,
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
        {/* The last domino piece: the `reveal-left-/right-` class prefix opts
            these halves into the shared parting animation, but their tiny
            --slide only opens a ~20vw centre gap — the forest never fully
            unfolds. */}
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
