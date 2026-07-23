"use client";

import type { EntrySource } from "@/types";
import { ANALYTICS_EVENTS, trackEvent } from "@/lib/analytics";

interface EntrySourcesProps {
  sources?: EntrySource[];
  fromSlug?: string;
}

/**
 * Renders a numbered list of source citations.
 * Returns null when no sources exist — safe to always include in detail pages.
 * Placed after scores and before discovery (related / nearby topics).
 */
export function EntrySources({ sources, fromSlug }: EntrySourcesProps) {
  if (!sources || sources.length === 0) return null;

  return (
    <section className="mb-10" aria-labelledby="entry-sources-heading">
      <h2
        id="entry-sources-heading"
        className="mb-2 text-lg font-semibold tracking-tight text-white"
      >
        References
      </h2>
      <p className="mb-5 max-w-2xl text-sm leading-relaxed text-zinc-500">
        Sources behind this entry. Prefer primary reporting and established
        culture archives over rumor.
      </p>
      <ol className="glass-card space-y-4 p-5 sm:p-6">
        {sources.map((source, i) => (
          <li key={`${source.title}-${i}`} className="flex items-start gap-3">
            <span
              className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/5 font-mono text-[11px] text-zinc-500"
              aria-hidden
            >
              {i + 1}
            </span>

            <div className="min-w-0 flex-1">
              {source.url ? (
                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-start gap-1.5 text-sm font-medium text-[var(--accent-secondary)] transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]/40 rounded-sm"
                  aria-label={`${source.title} (opens in a new tab)`}
                  onClick={() => {
                    trackEvent(ANALYTICS_EVENTS.EXTERNAL_LINK_CLICKED, {
                      href: source.url!,
                      from_slug: fromSlug,
                      label: source.title,
                      link_kind: "source",
                    });
                  }}
                >
                  <span className="break-words">{source.title}</span>
                  <span
                    className="mt-0.5 shrink-0 text-xs text-zinc-600 transition-colors group-hover:text-zinc-400"
                    aria-hidden
                  >
                    ↗
                  </span>
                </a>
              ) : (
                <span className="text-sm font-medium text-zinc-300">
                  {source.title}
                </span>
              )}
              {source.domain && (
                <p className="mt-1 font-mono text-[11px] text-zinc-600">
                  {source.domain}
                </p>
              )}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
