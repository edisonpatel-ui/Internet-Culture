/**
 * lib/media/mediaUtils.ts
 *
 * Central media helper utilities for Internet Culture Hub.
 *
 * All components that filter, sort, or select MediaItems should import
 * from here instead of writing ad-hoc filtering logic inline.
 *
 * Array-based functions (accept MediaItem[]):
 *   getCanonicalFeaturedImage — role=featured + image/gif (cards / heroes / OG)
 *   getFeaturedMediaItem      — any role=featured item (image preferred, then video/embed)
 *   getGalleryItems           — all items sorted by role priority
 *   countMediaByType          — image/video/embed counts from a raw array
 *
 * Entry-based wrappers:
 *   getEntryPreviewImageUrl — single source of truth for card + hero + social preview URLs
 *   getFeaturedMedia        — featured MediaItem helper
 *   getGalleryMedia         — full sorted gallery list
 *   getMediaStats           — { images, videos, embeds, total }
 */

import type {
  BaseEntry,
  ContentCategory,
  MediaItem,
  MediaRole,
} from "@/types";

export type MediaObjectFit = "contain" | "cover";

/**
 * Category-aware object-fit for CARD thumbnails only.
 * Article heroes always use `contain` (see ArticleHeroMedia).
 *
 * Creators / memes / brainrot: preserve faces and full meme frames.
 * Events / trends / slang: cover fills the card when cropping is safe.
 */
export function getMediaObjectFit(
  category?: ContentCategory | string,
): MediaObjectFit {
  switch (category) {
    case "creator":
    case "meme":
    case "brainrot":
      return "contain";
    case "event":
    case "trend":
    case "slang":
    default:
      return "cover";
  }
}

/**
 * Normalize media URLs so SSR HTML and client hydration agree.
 *
 * Browsers often decode `%28`/`%29` to `(`/`)` in the live DOM `src`,
 * which makes React report an attribute hydration mismatch when the
 * server rendered the percent-encoded form.
 *
 * encodeURI leaves parentheses unescaped (valid in URLs).
 */
export function stableMediaUrl(url: string): string {
  try {
    const parsed = new URL(url);
    parsed.pathname = encodeURI(decodeURI(parsed.pathname));
    return parsed.href;
  } catch {
    return url;
  }
}

// ─── Internal role sort order ─────────────────────────────────────────────────

const ROLE_ORDER: Record<MediaRole, number> = {
  featured: 0,
  supporting: 1,
  video: 2,
  reference: 3,
};

// ─── Array-based utilities ────────────────────────────────────────────────────

/**
 * Canonical featured still — the ONLY image used for cards, heroes, and OG.
 *
 * Requires role === "featured" AND type image | gif.
 * Does NOT fall back to supporting/gallery images (those stay in the gallery).
 */
export function getCanonicalFeaturedImage(
  media: MediaItem[] | undefined,
): MediaItem | undefined {
  return (media ?? []).find(
    (item) =>
      item.role === "featured" &&
      (item.type === "image" || item.type === "gif"),
  );
}

/**
 * Featured item for gallery / video slots (not the card/hero still).
 *
 * Priority:
 *   1. role === "featured"  AND  type image | gif
 *   2. role === "featured"  (video/embed)
 *   3. undefined — never promote supporting/gallery images to "featured"
 *
 * Card/hero/OG URLs must use getCanonicalFeaturedImage / getEntryPreviewImageUrl.
 */
export function getFeaturedMediaItem(media: MediaItem[]): MediaItem | undefined {
  const featuredImage = getCanonicalFeaturedImage(media);
  if (featuredImage) return featuredImage;

  return media.find((item) => item.role === "featured");
}

/**
 * Returns all MediaItems sorted by role priority:
 *   featured → supporting → video → reference
 *
 * Does NOT filter any items out. Callers decide what to render.
 * Used by: MediaGallery, FeaturedMedia, getGalleryMedia.
 */
export function getGalleryItems(media: MediaItem[]): MediaItem[] {
  return [...media].sort(
    (a, b) => (ROLE_ORDER[a.role] ?? 99) - (ROLE_ORDER[b.role] ?? 99),
  );
}

export interface MediaStats {
  images: number;
  videos: number;
  embeds: number;
  total: number;
}

/**
 * Counts media items by type from a raw array.
 * Used by: getMediaStats, audit scripts.
 */
export function countMediaByType(media: MediaItem[]): MediaStats {
  return {
    images: media.filter((item) => item.type === "image" || item.type === "gif")
      .length,
    videos: media.filter((item) => item.type === "video").length,
    embeds: media.filter((item) => item.type === "embed").length,
    total: media.length,
  };
}

// ─── Entry-based wrappers ─────────────────────────────────────────────────────

/**
 * Returns the featured MediaItem for an entry (image/gif preferred, else any featured).
 * For card/hero image URLs, use getEntryPreviewImageUrl instead.
 */
export function getFeaturedMedia(
  entry: Pick<BaseEntry, "media">,
): MediaItem | undefined {
  return getFeaturedMediaItem(entry.media ?? []);
}

export type EntryPreviewFields = Pick<
  BaseEntry,
  "title" | "imageGradient" | "imageUrl" | "media" | "category"
>;

/**
 * Single source of truth for card + hero + Open Graph image URLs.
 *
 * Pipeline: featured media → card image → hero image → social preview.
 *
 * Priority:
 *   1. role:"featured" + type image|gif
 *   2. legacy entry.imageUrl
 *   3. null → caller shows gradient / text-only layout
 *
 * Never uses supporting/gallery images as the preview.
 */
export function getEntryPreviewImageUrl(
  entry: Pick<BaseEntry, "media" | "imageUrl">,
): string | null {
  const featured = getCanonicalFeaturedImage(entry.media);
  if (featured?.url) return featured.url;
  return entry.imageUrl ?? null;
}

/** True when cards/heroes should show a real image (not gradient-only). */
export function hasEntryPreviewImage(
  entry: Pick<BaseEntry, "media" | "imageUrl">,
): boolean {
  return getEntryPreviewImageUrl(entry) != null;
}

/**
 * Alt / caption title for the preview image (featured item title when present).
 */
export function getEntryPreviewImageTitle(
  entry: Pick<BaseEntry, "title" | "media" | "imageUrl">,
): string {
  const featured = getCanonicalFeaturedImage(entry.media);
  if (featured?.title) return featured.title;
  return entry.title;
}

/**
 * Returns all media items for an entry sorted by role priority.
 *
 * Order: featured → supporting → video → reference
 *
 * Includes ALL items. Components filter further based on their slot:
 *   - Cards / ArticleHeroMedia / OG: getEntryPreviewImageUrl (featured image/gif)
 *   - FeaturedMedia: featured video/embed only
 *   - MediaGallery: everything except featured
 */
export function getGalleryMedia(
  entry: Pick<BaseEntry, "media">,
): MediaItem[] {
  return getGalleryItems(entry.media ?? []);
}

/**
 * Returns image/video/embed/total counts for an entry.
 */
export function getMediaStats(
  entry: Pick<BaseEntry, "media">,
): MediaStats {
  return countMediaByType(entry.media ?? []);
}
