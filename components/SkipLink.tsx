/**
 * "Skip to content" link — visually hidden until focused, then jumps past the
 * fixed nav to the main content.
 *
 * Concept demonstrated: an accessibility affordance built with Tailwind's
 * `sr-only` / `focus-visible:not-sr-only` utilities. The reveal keys off
 * `:focus-visible` (keyboard-heuristic focus), not plain `:focus`: the App
 * Router programmatically focuses the top of the page after client-side
 * navigation (e.g. the language toggle), and `:focus` would make the link
 * flash visible on every locale switch. Server Component, no JS.
 */
export function SkipLink({ label }: { label: string }) {
  return (
    <a
      href="#conteudo"
      className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:left-4 focus-visible:top-4 focus-visible:z-50 focus-visible:rounded focus-visible:bg-emerald-100 focus-visible:px-4 focus-visible:py-2 focus-visible:font-medium focus-visible:text-emerald-950"
    >
      {label}
    </a>
  );
}
