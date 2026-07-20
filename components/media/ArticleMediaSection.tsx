import type { MediaItem } from "@/types";
import { FeaturedMedia } from "./FeaturedMedia";
import { MediaGallery } from "./MediaGallery";

interface ArticleMediaSectionProps {
  media?: MediaItem[];
  className?: string;
}

/**
 * ArticleMediaSection
 *
 * Orchestrates the full media experience for an article using role-based routing:
 *
 *   featured  → FeaturedMedia (top of section)
 *   supporting + video + reference → MediaGallery (below featured)
 *
 * Returns null when no media exists — safe to always include.
 *
 * Used directly in all article detail pages — renders below the hero.
 * ArticleHeroMedia (inside EntryHero) renders the featured image/gif.
 * This component renders everything else: featured video/embed, supporting
 * images, videos, and reference cards.
 */
export function ArticleMediaSection({ media, className }: ArticleMediaSectionProps) {
  if (!media || media.length === 0) return null;

  // Featured image/gif already lives in the hero — do not open an empty Media
  // section for articles that only have a featured still.
  const hasFeaturedVideoOrEmbed = media.some(
    (item) =>
      item.role === "featured" &&
      (item.type === "video" || item.type === "embed"),
  );
  const hasGallery = media.some((item) => item.role !== "featured");

  if (!hasFeaturedVideoOrEmbed && !hasGallery) return null;

  return (
    <section aria-label="Media" className={`mb-10 ${className ?? ""}`}>
      <h2 className="mb-4 text-xs font-semibold uppercase tracking-wider text-zinc-500">
        Media
      </h2>
      <div className="space-y-6">
        <FeaturedMedia media={media} />
        <MediaGallery media={media} />
      </div>
    </section>
  );
}
