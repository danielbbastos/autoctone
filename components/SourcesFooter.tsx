"use client";
/* Collapsible source list — the #fonte-<id> jump target for every SourceMarks
 * chip. Listens for the hash, opens, scrolls to and focuses the entry. */
import { useEffect, useState } from "react";
import { SOURCE_ORDER, getSource, sourceNumber } from "@/lib/sources";
import { SITE_AUTHOR, SITE_AUTHOR_URL, SITE_UPDATED } from "@/lib/site";

export function SourcesFooter({
  title,
  intro,
  updatedLabel,
  madeByLabel,
}: {
  title: string;
  intro: string;
  updatedLabel: string;
  madeByLabel: string;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const openToHash = (hash: string) => {
      const match = hash.match(/^#fonte-(.+)$/);
      if (!match) return;
      setOpen(true);
      // Wait one frame so the list is displayed (it is `hidden` while closed)
      // before we try to scroll to and focus the target row.
      requestAnimationFrame(() => {
        const el = document.getElementById(`fonte-${match[1]}`);
        if (!el) return;
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "center" });
        el.focus({ preventScroll: true });
      });
    };

    openToHash(window.location.hash);
    const onHashChange = () => openToHash(window.location.hash);
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  return (
    <section
      id="fontes"
      className="flex min-h-screen flex-col justify-center bg-emerald-900 px-6 py-16 text-emerald-50 sm:px-12"
    >
      <div className="mx-auto w-full max-w-4xl">
        <button
          type="button"
          aria-expanded={open}
          aria-controls="fontes-lista"
          onClick={() => setOpen((o) => !o)}
          className="flex w-full items-center justify-between gap-4 text-left"
        >
          <h2 className="font-display text-2xl font-semibold text-emerald-50 sm:text-3xl">
            {title}
          </h2>
          <span
            aria-hidden
            className={`text-2xl leading-none text-cork transition-transform motion-reduce:transition-none ${
              open ? "rotate-45" : ""
            }`}
          >
            +
          </span>
        </button>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-emerald-200/70">{intro}</p>

        <ol id="fontes-lista" hidden={!open} className="mt-6 space-y-3">
          {SOURCE_ORDER.map((id) => {
            const src = getSource(id);
            return (
              <li
                key={id}
                id={`fonte-${id}`}
                tabIndex={-1}
                className="scroll-mt-24 rounded-md border border-transparent p-2 text-sm leading-relaxed text-emerald-100/80 target:border-cork/50 target:bg-emerald-950/40"
              >
                <span className="mr-2 font-semibold tabular-nums text-cork">{sourceNumber(id)}.</span>
                {src.url ? (
                  <a
                    href={src.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline decoration-dotted underline-offset-2 hover:text-emerald-50"
                  >
                    {src.source}
                  </a>
                ) : (
                  <span>{src.source}</span>
                )}
                {src.year ? <span className="text-emerald-300/50"> ({src.year})</span> : null}
              </li>
            );
          })}
        </ol>

        <p className="mt-10 border-t border-emerald-700/30 pt-5 text-xs text-emerald-200/60">
          {SITE_UPDATED ? (
            <>
              {updatedLabel}{" "}
              <time dateTime={SITE_UPDATED} className="tabular-nums">
                {SITE_UPDATED}
              </time>
              {" · "}
            </>
          ) : null}
          {madeByLabel}{" "}
          <a
            href={SITE_AUTHOR_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-dotted underline-offset-2 transition hover:text-cork-soft"
          >
            {SITE_AUTHOR}
          </a>
        </p>
      </div>
    </section>
  );
}
