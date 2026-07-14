"use client";
/**
 * "Back to top" — the project's FIRST Client Component, and a deliberately tiny
 * one. It crosses the `"use client"` boundary because two things it does are
 * only possible in the browser: React state (has the reader scrolled far enough
 * for the button to appear?) and an event handler (`onClick` → scroll to top).
 * A Server Component can do neither.
 *
 * Concept demonstrated: pushing the client boundary as LOW as possible. Notice
 * what is NOT here — the label text isn't looked up in this file. It's computed
 * on the server (page.tsx owns the locale dictionary) and handed in as a prop,
 * so this component stays dumb: it ships a few lines of interaction JS and
 * nothing else. `prefers-reduced-motion` turns the smooth scroll into an
 * instant jump.
 */
import { useEffect, useState } from "react";

export function BackToTop({ label }: { label: string }) {
  // Hidden until the reader has scrolled past ~the first screen. This boolean is
  // the reason the component must be a Client Component — server-rendered HTML
  // has no notion of "how far has the user scrolled".
  const [visible, setVisible] = useState(false);

  // useEffect runs only in the browser, after render. We subscribe to scroll and
  // flip visibility. The functional updater returns the *same* value when the
  // boolean hasn't changed, so React skips re-rendering on most scroll ticks.
  useEffect(() => {
    const onScroll = () => {
      const past = window.scrollY > window.innerHeight * 0.8;
      setVisible((v) => (v === past ? v : past));
    };
    onScroll(); // sync initial state (e.g. a refresh while scrolled down)
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={label}
      title={label}
      className={`fixed bottom-6 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-cork/50 bg-emerald-950/80 text-cork-soft backdrop-blur transition-all hover:border-cork hover:bg-emerald-900 hover:text-cork ${
        visible ? "opacity-100" : "pointer-events-none translate-y-2 opacity-0"
      }`}
    >
      <span aria-hidden className="text-lg leading-none">
        ↑
      </span>
    </button>
  );
}
