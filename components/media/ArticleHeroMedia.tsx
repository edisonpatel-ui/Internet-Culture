import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import type { BaseEntry } from "@/types";

interface ArticleHeroMediaProps {
  entry: Pick<BaseEntry, "title" | "imageGradient" | "imageUrl" | "media">;
}

/**
 * Renders the featured media item as the hero visual for an article.
 *
 * Priority order:
 *   1. First MediaItem where role === "featured" and type is "image" or "gif"
 *   2. entry.imageUrl (legacy field — backwards compatible)
 *   3. Gradient ImagePlaceholder
 *
 * Images are rendered with a plain <img> tag so they load client-side,
 * avoiding Next.js image optimization proxy issues with external CDNs.
 *
 * Non-image featured items (embeds, link cards) are intentionally not rendered
 * here — the hero slot is a visual identity position. Those items are handled
 * by FeaturedMedia inside ArticleMediaSection.
 */
export function ArticleHeroMedia({ entry }: ArticleHeroMediaProps) {
  const featuredImage = (entry.media ?? []).find(
    (item) =>
      item.role === "featured" &&
      (item.type === "image" || item.type === "gif"),
  );

  const url = featuredImage?.url ?? entry.imageUrl;

  if (!url) {
    return (
      <ImagePlaceholder
        title={entry.title}
        gradient={entry.imageGradient}
        aspect="video"
      />
    );
  }

  return (
    <div className="relative aspect-video overflow-hidden rounded-xl bg-zinc-900">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={url}
        alt={entry.title}
        className="h-full w-full object-contain"
      />
      <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-xl" />
    </div>
  );
}
