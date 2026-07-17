import type { MediaItem } from "@/types";
import { MediaRenderer } from "./MediaRenderer";

interface FeaturedMediaProps {
  media?: MediaItem[];
}

/**
 * Renders a featured MediaItem that the hero cannot display as an image.
 *
 * The hero (ArticleHeroMedia) already handles featured items where
 * type === "image" or "gif". This component covers the complementary case:
 * featured items where type === "video" or "embed" — so a YouTube video
 * or an embed link card appears directly below the hero when the featured
 * item is a video rather than a static image.
 *
 * Returns null when:
 *   - no media exists
 *   - the featured item is an image/gif (already shown in the hero)
 *   - no featured item exists at all
 *
 * For the full hero experience (gradient fallback + entry metadata),
 * use ArticleHeroMedia directly in EntryHero.
 */
export function FeaturedMedia({ media }: FeaturedMediaProps) {
  // image/gif featured items are shown in the hero via ArticleHeroMedia — skip here
  const featured = (media ?? []).find(
    (item) =>
      item.role === "featured" &&
      (item.type === "video" || item.type === "embed"),
  );

  if (!featured) return null;

  return (
    <div className="mb-4">
      <MediaRenderer item={featured} />
    </div>
  );
}
