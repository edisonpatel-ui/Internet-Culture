import type { MediaItem } from "@/types";
import { MediaRenderer } from "./MediaRenderer";

interface FeaturedMediaProps {
  media?: MediaItem[];
}

/**
 * Renders a featured video/embed when the hero cannot show a still image.
 *
 * Featured image/gif → ArticleHeroMedia (via EntryHero + getEntryPreviewImageUrl)
 * Featured video/embed → this component (below the hero)
 *
 * Returns null when there is no featured video/embed.
 */
export function FeaturedMedia({ media }: FeaturedMediaProps) {
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
