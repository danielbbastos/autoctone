/**
 * The eucalyptus revealed in the centre of the forest — on fire, or (in the
 * finale) already burnt.
 *
 * Concept demonstrated: continuous CSS keyframe animation (flame flicker, rising
 * smoke, pulsing glow) layered independently of the scroll-driven parting. It is
 * decorative (`aria-hidden`) and every animation lives inside a
 * `prefers-reduced-motion: no-preference` guard, so a reduced-motion user sees a
 * static, still-legible scene. Colours come from the shared `<ForestDefs />`.
 */
export function BurningEucalyptus({ burnt = false }: { burnt?: boolean }) {
  const barkFill = burnt ? "url(#char)" : "url(#bark-pale)";

  return (
    <div className="euc-holder" aria-hidden>
      <div className={burnt ? "euc-glow euc-glow-dim" : "euc-glow"} />

      <svg
        className="euc-tree"
        viewBox="0 0 120 300"
        preserveAspectRatio="xMidYMax meet"
      >
        <ellipse cx="61" cy="298" rx="40" ry="6" fill="#000" opacity="0.18" />
        <g>
          <path
            d="M56 300 C55 210 54 110 58 44 L64 44 C68 110 67 210 66 300 Z"
            fill={barkFill}
          />
          <g stroke={barkFill} strokeWidth="3" fill="none" strokeLinecap="round">
            <path d="M60 120 C48 108 42 100 34 96" />
            <path d="M60 100 C72 90 80 84 90 80" />
            <path d="M60 150 C50 142 44 138 38 136" />
          </g>
        </g>

        {burnt ? (
          <>
            <g stroke="url(#char)" strokeWidth="2" fill="none" strokeLinecap="round">
              <path d="M34 96 C28 90 26 84 24 78" />
              <path d="M90 80 C96 74 98 68 102 62" />
              <path d="M38 136 C32 132 28 128 24 124" />
            </g>
            <g className="euc-ember" fill="#f59e0b">
              <circle cx="40" cy="150" r="1.8" />
              <circle cx="70" cy="118" r="1.8" />
              <circle cx="58" cy="182" r="1.8" />
            </g>
          </>
        ) : (
          <>
            <g fill="url(#fol-euc)">
              <ellipse cx="60" cy="70" rx="26" ry="40" />
              <ellipse cx="38" cy="96" rx="12" ry="26" />
              <ellipse cx="84" cy="92" rx="12" ry="26" />
              <ellipse cx="60" cy="40" rx="16" ry="26" />
              <ellipse cx="46" cy="60" rx="10" ry="22" />
              <ellipse cx="76" cy="64" rx="10" ry="22" />
            </g>
            <g fill="#e2ebdd" opacity="0.4">
              <ellipse cx="52" cy="52" rx="6" ry="16" />
              <ellipse cx="44" cy="82" rx="4" ry="12" />
            </g>
          </>
        )}
      </svg>

      {!burnt && (
        <>
          <div className="euc-smoke">
            <span />
            <span />
            <span />
          </div>
          <svg
            className="euc-flames"
            viewBox="0 0 200 220"
            preserveAspectRatio="xMidYMax meet"
          >
            <g className="flame flame-a">
              <path
                d="M100 216 C60 178 78 120 96 82 C101 70 98 40 104 20 C112 50 134 76 140 120 C148 170 140 198 100 216 Z"
                fill="url(#flame-outer)"
              />
              <path
                d="M100 210 C76 182 86 140 100 108 C104 96 102 74 106 58 C114 84 124 108 126 140 C130 174 122 194 100 210 Z"
                fill="url(#flame-inner)"
              />
            </g>
            <g className="flame flame-b">
              <path
                d="M64 218 C40 192 46 152 60 120 C64 110 62 92 66 80 C72 100 84 124 86 152 C90 186 86 202 64 218 Z"
                fill="url(#flame-outer)"
              />
            </g>
            <g className="flame flame-c">
              <path
                d="M136 218 C112 192 118 152 132 120 C136 110 134 92 138 80 C144 100 156 124 158 152 C162 186 158 202 136 218 Z"
                fill="url(#flame-outer)"
              />
            </g>
          </svg>
        </>
      )}
    </div>
  );
}
