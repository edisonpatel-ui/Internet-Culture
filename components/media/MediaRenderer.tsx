import type { MediaItem } from "@/types";

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

// ─── Platform display metadata ────────────────────────────────────────────────

export const PLATFORM_META: Record<
  string,
  { label: string; icon: string; color: string }
> = {
  youtube:      { label: "YouTube",           icon: "▶",  color: "text-red-400" },
  tiktok:       { label: "TikTok",            icon: "♪",  color: "text-pink-400" },
  twitter:      { label: "X (Twitter)",       icon: "✕",  color: "text-sky-400" },
  instagram:    { label: "Instagram",         icon: "◆",  color: "text-fuchsia-400" },
  reddit:       { label: "Reddit",            icon: "◎",  color: "text-orange-400" },
  twitch:       { label: "Twitch",            icon: "●",  color: "text-purple-400" },
  wikimedia:    { label: "Wikimedia Commons", icon: "⊕",  color: "text-emerald-400" },
  knowyourmeme: { label: "Know Your Meme",    icon: "◈",  color: "text-yellow-400" },
  original:     { label: "Original Upload",   icon: "↑",  color: "text-zinc-400" },
  other:        { label: "External Source",   icon: "↗",  color: "text-zinc-400" },
};

// ─── Attribution bar ──────────────────────────────────────────────────────────

export function AttributionBar({ item }: { item: MediaItem }) {
  const meta = PLATFORM_META[item.platform] ?? PLATFORM_META.other;

  return (
    <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-zinc-500">
      <a
        href={item.sourceUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center gap-1 transition-colors hover:text-zinc-300 ${meta.color}`}
      >
        <span aria-hidden>{meta.icon}</span>
        {item.source}
      </a>
      {item.attribution && <span>{item.attribution}</span>}
      {item.license && (
        <span className="rounded border border-white/10 px-1.5 py-0.5 text-[10px] text-zinc-600">
          {item.license}
        </span>
      )}
      {item.verified && (
        <span
          className="inline-flex items-center gap-1 text-emerald-600"
          title="Source verified by editors"
        >
          ✓ verified
        </span>
      )}
    </div>
  );
}

// ─── Individual renderers ─────────────────────────────────────────────────────

function YoutubeRenderer({ item }: { item: MediaItem }) {
  const videoId = extractYoutubeId(item.url);
  if (!videoId) return <LinkCardRenderer item={item} />;

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
      <AttributionBar item={item} />
    </div>
  );
}

function ImageRenderer({ item }: { item: MediaItem }) {
  return (
    <div>
      <div className="relative overflow-hidden rounded-xl border border-white/10 bg-zinc-900">
        <div className="aspect-video w-full">
          {/* External images use a plain <img> to avoid Next.js proxy issues with external CDNs */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={item.url}
            alt={item.title}
            className="h-full w-full object-contain"
          />
        </div>
      </div>
      {item.description && (
        <p className="mt-2 text-sm text-zinc-400">{item.description}</p>
      )}
      <AttributionBar item={item} />
    </div>
  );
}

function LinkCardRenderer({ item }: { item: MediaItem }) {
  const meta = PLATFORM_META[item.platform] ?? PLATFORM_META.other;

  return (
    <div>
      <a
        href={item.sourceUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="glass-card flex items-center gap-4 p-4 transition-all hover:border-white/20"
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
        <span className="shrink-0 text-xs text-zinc-600" aria-hidden>↗</span>
      </a>
      <AttributionBar item={item} />
    </div>
  );
}

// ─── Public component ─────────────────────────────────────────────────────────

interface MediaRendererProps {
  item: MediaItem;
}

/**
 * Renders a single MediaItem using the most appropriate visual format.
 *
 * Dispatch rules:
 * - YouTube platform + video/embed type → native iframe (youtube-nocookie.com)
 * - image / gif type → <img> with dark letterbox background
 * - Everything else → attribution-aware external link card
 *
 * TikTok and other social platforms fall through to the link card because
 * their embed SDKs are not SSR-compatible.
 *
 * The role field controls where this item appears in the page layout,
 * not how it renders visually — that is determined by type + platform.
 */
export function MediaRenderer({ item }: MediaRendererProps) {
  if (
    item.platform === "youtube" &&
    (item.type === "video" || item.type === "embed")
  ) {
    return <YoutubeRenderer item={item} />;
  }

  if (item.type === "image" || item.type === "gif") {
    return <ImageRenderer item={item} />;
  }

  return <LinkCardRenderer item={item} />;
}
