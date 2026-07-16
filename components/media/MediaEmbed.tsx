import type { MediaEmbed as EmbedData } from "@/types";

/** Extracts a YouTube video ID from common URL formats. */
function extractYoutubeId(url: string): string | null {
  const patterns = [
    /[?&]v=([^&#]+)/,
    /youtu\.be\/([^?#]+)/,
    /youtube\.com\/embed\/([^?#]+)/,
    /youtube\.com\/shorts\/([^?#]+)/,
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match?.[1]) return match[1];
  }
  return null;
}

/** Maps embed type to a display label and icon. */
const EMBED_META: Record<string, { label: string; icon: string; color: string }> = {
  youtube: { label: "YouTube", icon: "▶", color: "text-red-400" },
  tiktok: { label: "TikTok", icon: "♪", color: "text-pink-400" },
  twitter: { label: "X (Twitter)", icon: "✕", color: "text-sky-400" },
  instagram: { label: "Instagram", icon: "◆", color: "text-fuchsia-400" },
  reddit: { label: "Reddit", icon: "◎", color: "text-orange-400" },
};

interface MediaEmbedPlayerProps {
  embed: EmbedData;
}

/**
 * Renders a single embed.
 * - YouTube → native iframe
 * - All others → styled external link card (embed scripts are not SSR-friendly)
 */
export function MediaEmbedPlayer({ embed }: MediaEmbedPlayerProps) {
  const meta = EMBED_META[embed.type] ?? {
    label: embed.type,
    icon: "↗",
    color: "text-zinc-400",
  };

  if (embed.type === "youtube") {
    const videoId = extractYoutubeId(embed.url);
    if (!videoId) return <EmbedLinkCard embed={embed} meta={meta} />;

    return (
      <div className="overflow-hidden rounded-xl border border-white/10">
        <div className="aspect-video w-full">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${videoId}`}
            title={embed.caption ?? "YouTube video"}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="h-full w-full"
          />
        </div>
        {embed.caption && (
          <p className="px-4 py-2 text-xs text-zinc-500">{embed.caption}</p>
        )}
      </div>
    );
  }

  return <EmbedLinkCard embed={embed} meta={meta} />;
}

interface EmbedLinkCardProps {
  embed: EmbedData;
  meta: { label: string; icon: string; color: string };
}

function EmbedLinkCard({ embed, meta }: EmbedLinkCardProps) {
  return (
    <a
      href={embed.url}
      target="_blank"
      rel="noopener noreferrer"
      className="glass-card flex items-center gap-4 p-4 transition-all hover:border-white/20"
    >
      <span className={`shrink-0 text-2xl ${meta.color}`} aria-hidden>
        {meta.icon}
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-white">
          {embed.caption ?? `View on ${meta.label}`}
        </p>
        <p className="mt-0.5 truncate text-xs text-zinc-500">{embed.url}</p>
      </div>
      <span className="shrink-0 text-xs text-zinc-600">↗</span>
    </a>
  );
}
