/**
 * Fixed vertical dot navigation — one anchor per section of the story.
 *
 * Concept demonstrated: in-page anchor navigation with zero JavaScript. Each dot
 * is a plain `<a href="#id">`; the browser handles the jump, and CSS
 * `scroll-behavior` (see globals.css, gated on reduced-motion) makes it smooth.
 * `aria-label` on each link gives screen-reader users the section name.
 */
export function SectionNav({
  sections,
  label,
}: {
  sections: readonly { id: string; titlePt: string }[];
  label: string;
}) {
  return (
    <nav
      aria-label={label}
      className="fixed right-4 top-1/2 z-30 hidden -translate-y-1/2 flex-col gap-3 lg:flex"
    >
      {sections.map((s) => (
        <a
          key={s.id}
          href={`#${s.id}`}
          aria-label={s.titlePt}
          title={s.titlePt}
          className="group flex h-3 w-3 items-center justify-center"
        >
          <span className="h-2.5 w-2.5 rounded-full border border-emerald-400/70 bg-emerald-950 transition group-hover:scale-125 group-hover:bg-emerald-400" />
        </a>
      ))}
    </nav>
  );
}
