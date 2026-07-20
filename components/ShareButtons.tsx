/* Sharing row for the closing section. navigator.share is the good path on
 * mobile; the explicit links are the fallback everywhere else.
 *
 * The canonical URL comes in as a prop rather than from window.location: it has
 * to be correct in the server-rendered HTML, and it should point at the public
 * domain even when the page is opened from localhost or a preview host. */
"use client";

import { useState } from "react";

type Labels = {
  title: string;
  intro: string;
  share: string;
  copyLink: string;
  copied: string;
};

const TARGETS = [
  { name: "WhatsApp", href: (u: string, t: string) => `https://wa.me/?text=${t}%20${u}` },
  {
    name: "Bluesky",
    href: (u: string, t: string) => `https://bsky.app/intent/compose?text=${t}%20${u}`,
  },
  {
    name: "LinkedIn",
    href: (u: string) => `https://www.linkedin.com/sharing/share-offsite/?url=${u}`,
  },
];

export function ShareButtons({
  labels,
  shareTitle,
  url,
}: {
  labels: Labels;
  shareTitle: string;
  /** Canonical absolute URL of this locale's page (see lib/site.ts). */
  url: string;
}) {
  const [copied, setCopied] = useState(false);

  async function nativeShare() {
    if (navigator.share) {
      // AbortError just means the user dismissed the sheet — not worth surfacing.
      try {
        await navigator.share({ title: shareTitle, url });
      } catch {
        /* dismissed */
      }
      return;
    }
    await copyLink();
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard blocked — the explicit links below still work */
    }
  }

  return (
    <div className="mt-4">
      <h3 className="font-display text-xl font-semibold text-cork-soft">{labels.title}</h3>
      <p className="mt-1 text-sm text-emerald-100/70">{labels.intro}</p>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={nativeShare}
          className="rounded-full border border-cork/50 bg-cork/10 px-4 py-1.5 text-sm font-medium text-cork-soft transition hover:border-cork hover:bg-cork/20"
        >
          {labels.share}
        </button>

        {TARGETS.map((target) => (
          <a
            key={target.name}
            href={target.href(encodeURIComponent(url), encodeURIComponent(shareTitle))}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-emerald-600/40 px-4 py-1.5 text-sm text-emerald-100/80 transition hover:border-cork/60 hover:text-cork-soft"
          >
            {target.name}
          </a>
        ))}

        <button
          type="button"
          onClick={copyLink}
          className="rounded-full border border-emerald-600/40 px-4 py-1.5 text-sm text-emerald-100/80 transition hover:border-cork/60 hover:text-cork-soft"
        >
          {copied ? labels.copied : labels.copyLink}
        </button>

        {/* Announce the copy without moving focus. */}
        <span aria-live="polite" className="sr-only">
          {copied ? labels.copied : ""}
        </span>
      </div>
    </div>
  );
}
