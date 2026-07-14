/**
 * "Skip to content" link — visually hidden until focused, then jumps past the
 * fixed nav to the main content.
 *
 * Concept demonstrated: an accessibility affordance built with Tailwind's
 * `sr-only` / `focus:not-sr-only` utilities. Keyboard users get a first-tab
 * shortcut; pointer users never see it. Server Component, no JS.
 */
export function SkipLink({ label }: { label: string }) {
  return (
    <a
      href="#conteudo"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-emerald-100 focus:px-4 focus:py-2 focus:font-medium focus:text-emerald-950"
    >
      {label}
    </a>
  );
}
