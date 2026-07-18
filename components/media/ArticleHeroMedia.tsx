import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { getFeaturedMediaItem } from "@/lib/media/mediaUtils";
import type { BaseEntry } from "@/types";
import { MediaImage } from "./MediaImage";

interface ArticleHeroMediaProps {
  entry: Pick<
    BaseEntry,
    "title" | "imageGradient" | "imageUrl" | "media" | "category"
  >;
}

/**
 * Renders the featured media item as the hero visual for an article.
 *
 * Priority order:
 *   1. First MediaItem where role === "featured" and type is "image" or "gif"
 *   2. entry.imageUrl (legacy field — backwards compatible)
 *   3. Gradient ImagePlaceholder
 *
 * Heroes always use object-contain so faces, logos, and meme frames are not
 * cropped. Card thumbnails keep category-aware cover via getMediaObjectFit.
 *
 * Failed images fall back to the gradient placeholder — never a broken icon.
 */
export function ArticleHeroMedia({ entry }: ArticleHeroMediaProps) {
  const best = getFeaturedMediaItem(entry.media ?? []);
  const featuredImage =
    best?.type === "image" || best?.type === "gif" ? best : undefined;

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
    <MediaImage
      src={url}
      alt={featuredImage?.title ?? entry.title}
      fallbackTitle={entry.title}
      fallbackGradient={entry.imageGradient}
      fit="contain"
      aspect="video"
    />
  );
}
