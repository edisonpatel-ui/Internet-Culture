import type { MediaItem } from "@/types";
import { AttributionBar } from "./AttributionBar";
import { GalleryImage } from "./GalleryImage";
import { PLATFORM_META } from "./platformMeta";

// ─── Utilities ────────────────────────────────────────────────────────────────

export function extractYoutubeId(url: string): string | null {
  const patterns = [
    /[?&]v=([^&#]+)/,
    /youtu\.be\/([^?#]+)/,
    /youtube\.com\/embed\/([^?#]+)/,
    /youtube\.com\/shorts\/([^?#]+)/,
  ];
  for (const pattern of patterns) {
    const m = url.match(pattern);
    if (m?.[1]) return m[1];
  }
  return null;
}

// Re-export for existing imports
export { PLATFORM_META };

// ─── Individual renderers ─────────────────────────────────────────────────────

function YoutubeRenderer({
  item,
  hideAttribution,
}: {
  item: MediaItem;
  hideAttribution?: boolean;
}) {
  const videoId = extractYoutubeId(item.url);
  if (!videoId) return <LinkCardRenderer item={item} hideAttribution={hideAttribution} />;

  return (
    <div>
      <div className="overflow-hidden rounded-xl border border-white/10">
        <div className="aspect-video w-full">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${videoId}`}
            title={item.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="h-full w-full"
            loading="lazy"
          />
        </div>
      </div>
      {item.description && (
        <p className="mt-2 text-sm text-zinc-400">{item.description}</p>
      )}
      {!hideAttribution && <AttributionBar item={item} />}
    </div>
  );
}

function LinkCardRenderer({
  item,
  hideAttribution,
}: {
  item: MediaItem;
  hideAttribution?: boolean;
}) {
  const meta = PLATFORM_META[item.platform] ?? PLATFORM_META.other;

  return (
    <div>
      <a
        href={item.sourceUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="glass-card flex items-center gap-4 p-4 transition-colors duration-200 hover:border-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/40"
        aria-label={`${item.title} (opens in a new tab)`}
      >
        <span className={`shrink-0 text-2xl ${meta.color}`} aria-hidden>
          {meta.icon}
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-white">{item.title}</p>
          {item.description && (
            <p className="mt-0.5 line-clamp-2 text-xs text-zinc-500">
              {item.description}
            </p>
          )}
          <p className="mt-0.5 truncate text-xs text-zinc-600">{item.sourceUrl}</p>
        </div>
        <span className="shrink-0 text-xs text-zinc-600" aria-hidden>
          ↗
        </span>
      </a>
      {!hideAttribution && <AttributionBar item={item} />}
    </div>
  );
}

// ─── Public component ─────────────────────────────────────────────────────────

interface MediaRendererProps {
  item: MediaItem;
  /** Hide the source/attribution/verified-checkmark caption line — used in
   * the combined References section, where that caption is redundant with
   * the citation list right below it. */
  hideAttribution?: boolean;
}

/**
 * Renders a single MediaItem using the most appropriate visual format.
 *
 * This is a Server Component. Only GalleryImage (image error fallback) is a
 * client island — YouTube iframes and link cards stay server-rendered so they
 * do not participate in client hydration attribute checks.
 */
export function MediaRenderer({ item, hideAttribution }: MediaRendererProps) {
  if (
    item.platform === "youtube" &&
    (item.type === "video" || item.type === "embed")
  ) {
    return <YoutubeRenderer item={item} hideAttribution={hideAttribution} />;
  }

  if (item.type === "image" || item.type === "gif") {
    return <GalleryImage item={item} hideAttribution={hideAttribution} />;
  }

  return <LinkCardRenderer item={item} hideAttribution={hideAttribution} />;
}
