"use client";

import type { EntrySource, MediaItem } from "@/types";
import { ANALYTICS_EVENTS, trackEvent } from "@/lib/analytics";
import { getGalleryItems } from "@/lib/media/mediaUtils";
import { MediaRenderer } from "@/components/media/MediaRenderer";

interface ReferencesSectionProps {
  media?: MediaItem[];
  sources?: EntrySource[];
  fromSlug?: string;
  /**
   * true (Meme/Slang/Person/Trend): merge the FULL gallery — supporting
   * images, videos, and reference cards — into this section as the "Media"
   * sub-part, replacing a separate Media section entirely.
   *
   * false (Event): only reference-role media (embeds/citation cards) merge
   * in here. Supporting photos stay in their own separate Media section
   * elsewhere on the page, per that category's template.
   */
  includeFullGallery: boolean;
}

/**
 * Standardized combined References section.
 *
 * Media appears as a sub-part of References (no per-item source/verified
 * caption line — that would just repeat the citation list right below it),
 * followed by the numbered citation list. One heading, one section, per
 * the site's article templates (lib/content/articleTemplates).
 */
export function ReferencesSection({
  media,
  sources,
  fromSlug,
  includeFullGallery,
}: ReferencesSectionProps) {
  const nonFeatured = getGalleryItems(media ?? []).filter(
    (item) => item.role !== "featured",
  );
  const mediaSubItems = includeFullGallery
    ? nonFeatured
    : nonFeatured.filter((item) => item.role === "reference");

  const hasSources = Boolean(sources && sources.length > 0);
  const hasMedia = mediaSubItems.length > 0;

  if (!hasSources && !hasMedia) return null;

  return (
    <section className="mb-10" aria-labelledby="references-heading">
      <h2
        id="references-heading"
        className="mb-2 text-lg font-semibold tracking-tight text-white"
      >
        References
      </h2>
      <p className="mb-5 max-w-2xl text-sm leading-relaxed text-zinc-500">
        Sources and media behind this entry. Prefer primary reporting and
        established culture archives over rumor.
      </p>

      <div className="glass-card space-y-6 p-5 sm:p-6">
        {hasMedia && (
          <div className="grid gap-4 sm:grid-cols-2">
            {mediaSubItems.map((item, i) => (
              <MediaRenderer key={`ref-media-${i}`} item={item} hideAttribution />
            ))}
          </div>
        )}

        {hasSources && (
          <ol className={hasMedia ? "space-y-4 border-t border-white/5 pt-6" : "space-y-4"}>
            {sources!.map((source, i) => (
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
        )}
      </div>
    </section>
  );
}
