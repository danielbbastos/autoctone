"use client";
// Client Component: needs scroll state + a click handler. The label arrives as
// a prop so the locale dictionary stays on the server.
import { useEffect, useState } from "react";

export function BackToTop({ label }: { label: string }) {
  const [visible, setVisible] = useState(false);

  // The functional updater returns the same value while the boolean is stable,
  // so scroll ticks don't re-render.
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
      className={`fixed bottom-[max(1.5rem,env(safe-area-inset-bottom))] right-[max(1.5rem,env(safe-area-inset-right))] z-40 flex h-11 w-11 items-center justify-center rounded-full border border-cork/50 bg-emerald-950/80 text-cork-soft backdrop-blur transition-all hover:border-cork hover:bg-emerald-900 hover:text-cork ${
        visible ? "opacity-100" : "pointer-events-none translate-y-2 opacity-0"
      }`}
    >
      <span aria-hidden className="text-lg leading-none">
        ↑
      </span>
    </button>
  );
}
