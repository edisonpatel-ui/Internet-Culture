import type { MediaItem } from "@/types";
import { FeaturedMedia } from "./FeaturedMedia";
import { MediaGallery } from "./MediaGallery";

interface ArticleMediaSectionProps {
  media?: MediaItem[];
  className?: string;
  /**
   * When true, role: "reference" items are excluded — used by templates
   * (e.g. Events) that move reference/citation media into the combined
   * References section instead of showing it here.
   */
  excludeReferenceRole?: boolean;
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
 * Used on article detail pages after History / Examples.
 * ArticleHeroMedia (inside EntryHero) renders the featured image/gif.
 * This component renders gallery media: featured video/embed, supporting
 * images, videos, and reference cards. Returns null when there is nothing
 * beyond the hero still — no empty Media section.
 */
export function ArticleMediaSection({
  media,
  className,
  excludeReferenceRole,
}: ArticleMediaSectionProps) {
  if (!media || media.length === 0) return null;
  const effectiveMedia = excludeReferenceRole
    ? media.filter((item) => item.role !== "reference")
    : media;
  if (effectiveMedia.length === 0) return null;

  // Featured image/gif already lives in the hero — do not open an empty Media
  // section for articles that only have a featured still.
  const hasFeaturedVideoOrEmbed = effectiveMedia.some(
    (item) =>
      item.role === "featured" &&
      (item.type === "video" || item.type === "embed"),
  );
  const hasGallery = effectiveMedia.some((item) => item.role !== "featured");

  if (!hasFeaturedVideoOrEmbed && !hasGallery) return null;

  return (
    <section aria-label="Media" className={`mb-10 ${className ?? ""}`}>
      <h2 className="mb-4 text-xs font-semibold uppercase tracking-wider text-zinc-500">
        Media
      </h2>
      <div className="space-y-6">
        <FeaturedMedia media={effectiveMedia} />
        <MediaGallery media={effectiveMedia} />
      </div>
    </section>
  );
}
