/* Reveal keys off `focus-visible`, not `focus`. Safari also applies
 * :focus-visible to programmatic focus, so `appNewScrollHandler` in
 * next.config.ts keeps the router from focusing this link after navigation. */
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
