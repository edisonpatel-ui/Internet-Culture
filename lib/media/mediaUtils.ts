/**
 * lib/media/mediaUtils.ts
 *
 * Central media helper utilities for Internet Culture Hub.
 *
 * All components that filter, sort, or select MediaItems should import
 * from here instead of writing ad-hoc filtering logic inline.
 *
 * Array-based functions (accept MediaItem[]):
 *   getFeaturedMediaItem   — best featured item from a raw array
 *   getGalleryItems        — all items sorted by role priority
 *   countMediaByType       — image/video/embed counts from a raw array
 *
 * Entry-based wrappers (accept BaseEntry, delegate to array functions):
 *   getFeaturedMedia       — spec: role=featured+image/gif → any featured → first image/gif
 *   getGalleryMedia        — full sorted gallery list (featured first, then supporting/video/reference)
 *   getMediaStats          — { images, videos, embeds, total }
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
 * Returns the best featured media item from a raw MediaItem array.
 *
 * Priority:
 *   1. role === "featured"  AND  type image | gif   (ideal hero/card image)
 *   2. role === "featured"  (any type — video/embed fallback)
 *   3. First image | gif item (regardless of role)
 *   4. undefined
 *
 * Used by: ArticleHeroMedia, TrendCard, FeaturedMedia, audit scripts.
 */
export function getFeaturedMediaItem(media: MediaItem[]): MediaItem | undefined {
  // Priority 1 — featured image/gif
  const featuredImage = media.find(
    (item) =>
      item.role === "featured" &&
      (item.type === "image" || item.type === "gif"),
  );
  if (featuredImage) return featuredImage;

  // Priority 2 — any featured item
  const featuredAny = media.find((item) => item.role === "featured");
  if (featuredAny) return featuredAny;

  // Priority 3 — first image/gif (no featured exists)
  return media.find((item) => item.type === "image" || item.type === "gif");
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
 * Returns the best featured media item for an entry.
 *
 * Spec priority (same as getFeaturedMediaItem):
 *   1. role=featured + type image/gif
 *   2. role=featured (any type)
 *   3. First image/gif
 *   4. undefined
 *
 * Note: Always check the returned item's type before rendering as an image.
 * ArticleHeroMedia and TrendCard only render image/gif types in the visual slot.
 */
export function getFeaturedMedia(
  entry: Pick<BaseEntry, "media">,
): MediaItem | undefined {
  return getFeaturedMediaItem(entry.media ?? []);
}

/**
 * Returns all media items for an entry sorted by role priority.
 *
 * Order: featured → supporting → video → reference
 *
 * Includes ALL items. Components filter further based on their slot:
 *   - ArticleHeroMedia: featured image/gif only
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
