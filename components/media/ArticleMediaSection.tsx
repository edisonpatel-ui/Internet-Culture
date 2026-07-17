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

  const hasFeatured = media.some((item) => item.role === "featured");
  const hasGallery = media.some(
    (item) =>
      item.role === "supporting" ||
      item.role === "video" ||
      item.role === "reference",
  );

  if (!hasFeatured && !hasGallery) return null;

  return (
    <section aria-label="Media" className={`mb-8 ${className ?? ""}`}>
      <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-zinc-500">
        Media
      </h2>
      <div className="space-y-6">
        <FeaturedMedia media={media} />
        <MediaGallery media={media} />
      </div>
    </section>
  );
}
