/* Thin top scroll-progress bar for phones — the desktop dot rail (SectionNav)
 * is `lg:flex`, so below lg there's otherwise no sense of how far through this
 * long page you are. Decorative: a continuously-changing percentage is noise to
 * announce, and screen-reader users move by headings/landmarks, so it's
 * aria-hidden. Scroll-linked direct feedback, not gratuitous motion — no CSS
 * transition, so it's inherently reduced-motion-safe. */
"use client";

import { useEffect, useState } from "react";

export function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
    };
    // rAF-coalesce: at most one measure per frame no matter the scroll rate.
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      aria-hidden
      data-reading-progress
      className="fixed inset-x-0 top-0 z-40 h-0.5 origin-left bg-cork lg:hidden"
      style={{ transform: `scaleX(${progress})` }}
    />
  );
}
