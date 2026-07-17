import { getGalleryItems } from "@/lib/media/mediaUtils";
import type { MediaItem } from "@/types";
import { MediaRenderer } from "./MediaRenderer";

interface MediaGalleryProps {
  /**
   * Full media array for an entry.
   * Featured items are excluded — image/gif featured items are in the hero,
   * video/embed featured items are in FeaturedMedia.
   */
  media?: MediaItem[];
}

/**
 * Renders the non-featured media for an article, organized into sections
 * by role AND type.
 *
 * Routing rules (both role and type must match):
 *   supporting + image/gif  → supporting images section
 *   video + video/embed     → video section (YouTube iframes, etc.)
 *   reference + any         → reference link cards section
 *   other (catch-all)       → rendered via MediaRenderer in order
 *
 * All rendering is delegated to MediaRenderer which dispatches by type + platform.
 * Returns null when no gallery items exist.
 */
export function MediaGallery({ media = [] }: MediaGalleryProps) {
  // Sort by role priority then exclude featured — those belong to hero + FeaturedMedia
  const nonFeatured = getGalleryItems(media).filter(
    (item) => item.role !== "featured",
  );

  if (nonFeatured.length === 0) return null;

  // Route by BOTH role AND type
  const supportingImages = nonFeatured.filter(
    (item) =>
      item.role === "supporting" &&
      (item.type === "image" || item.type === "gif"),
  );

  const videoItems = nonFeatured.filter(
    (item) =>
      item.role === "video" &&
      (item.type === "video" || item.type === "embed"),
  );

  const referenceItems = nonFeatured.filter(
    (item) => item.role === "reference",
  );

  // Catch-all: supporting+video, video+image, or any other unexpected combination
  const otherItems = nonFeatured.filter(
    (item) =>
      !supportingImages.includes(item) &&
      !videoItems.includes(item) &&
      !referenceItems.includes(item),
  );

  return (
    <section className="space-y-4">
      {supportingImages.map((item, i) => (
        <MediaRenderer key={`s-${i}`} item={item} />
      ))}
      {videoItems.map((item, i) => (
        <MediaRenderer key={`v-${i}`} item={item} />
      ))}
      {referenceItems.map((item, i) => (
        <MediaRenderer key={`r-${i}`} item={item} />
      ))}
      {otherItems.map((item, i) => (
        <MediaRenderer key={`o-${i}`} item={item} />
      ))}
    </section>
  );
}
