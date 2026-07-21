/* Thin top scroll-progress bar for phones — the desktop dot rail (SectionNav)
 * is `lg:flex`, so below lg there's otherwise no sense of how far through this
 * long page you are. Decorative: a continuously-changing percentage is noise to
 * announce, and screen-reader users move by headings/landmarks, so it's
 * aria-hidden. Scroll-linked direct feedback, not gratuitous motion — no CSS
 * transition, so it's inherently reduced-motion-safe.
 *
 * The page length comes from the last section's layout rect, NOT
 * `documentElement.scrollHeight`: iOS Safari mis-reports that on this page's
 * tall pinned / view-timeline sections (it returns roughly the viewport
 * height), which makes `scrollY / (scrollHeight - innerHeight)` saturate at 1
 * almost everywhere. `getBoundingClientRect` is a plain layout measurement and
 * stays correct. */
"use client";

import { useEffect, useState } from "react";

export function ReadingProgress({ endId }: { endId: string }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const end = document.getElementById(endId);
      if (!end) return;
      // Absolute document Y of the last section's bottom = full scrollable height.
      const endY = end.getBoundingClientRect().bottom + window.scrollY;
      const max = endY - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0);
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
  }, [endId]);

  return (
    // Width, not transform: a `position: fixed` element with a transform is a
    // compositing layer iOS Safari drops during async scroll, so the bar
    // vanished mid-scroll. A plain width keeps it painted.
    <div
      aria-hidden
      data-reading-progress
      className="fixed left-0 top-0 z-40 h-0.5 bg-cork lg:hidden"
      style={{ width: `${progress * 100}%` }}
    />
  );
}
