/**
 * lib/content/validateMedia.ts
 *
 * Reusable media validation for Internet Culture Hub.
 *
 * Checks every article's media array for common problems and returns
 * structured warnings. Never throws and never breaks builds — warnings only.
 *
 * Usage:
 *   import { validateEntryMedia, validateAllMedia } from "@/lib/content/validateMedia";
 *
 *   // Single entry
 *   const warnings = validateEntryMedia(entry);
 *
 *   // All entries
 *   const warnings = validateAllMedia(entries);
 *
 * Called by:
 *   - scripts/audit-media.ts (CLI audit)
 *   - scripts/validate-content.ts (build-time checks)
 */

import type { BaseEntry } from "@/types";

// ─── Warning type ─────────────────────────────────────────────────────────────

export interface MediaWarning {
  /** Entry slug for easy lookup. */
  slug: string;
  /** Entry title for human-readable output. */
  title: string;
  /** Which field or media index triggered this warning. */
  field: string;
  /** Human-readable warning message. */
  message: string;
}

// ─── Single-entry validation ──────────────────────────────────────────────────

/**
 * Validates the media array of a single entry.
 * Returns an array of warnings — empty means no issues.
 */
export function validateEntryMedia(entry: BaseEntry): MediaWarning[] {
  const warnings: MediaWarning[] = [];
  const media = entry.media ?? [];

  function warn(field: string, message: string) {
    warnings.push({ slug: entry.slug, title: entry.title, field, message });
  }

  // ── Missing media entirely ─────────────────────────────────────────────────
  if (media.length === 0) {
    warn("media", "No media — article renders gradient placeholder only");
    return warnings;
  }

  // ── Missing featured media ─────────────────────────────────────────────────
  const hasFeatured = media.some((item) => item.role === "featured");
  if (!hasFeatured) {
    warn(
      "media.role",
      "No featured media item — cards and hero will show gradient fallback",
    );
  }

  // ── Featured media has no usable image/gif ─────────────────────────────────
  const featuredItems = media.filter((item) => item.role === "featured");
  const featuredImages = featuredItems.filter(
    (item) => item.type === "image" || item.type === "gif",
  );
  if (featuredItems.length > 0 && featuredImages.length === 0) {
    warn(
      "media[role=featured].type",
      "Featured media exists but has no image/gif type — hero and cards show gradient",
    );
  }

  // ── Multiple featured images (ambiguous ordering) ──────────────────────────
  if (featuredImages.length > 1) {
    warn(
      "media[role=featured]",
      `${featuredImages.length} featured image/gif items found — only the first is used as the hero; remove extras or change role to "supporting"`,
    );
  }

  // ── Duplicate URLs ─────────────────────────────────────────────────────────
  const seenUrls = new Set<string>();
  for (const item of media) {
    if (item.url) {
      if (seenUrls.has(item.url)) {
        warn(
          `media url`,
          `Duplicate URL detected: ${item.url}`,
        );
      }
      seenUrls.add(item.url);
    }
  }

  // ── Per-item checks ────────────────────────────────────────────────────────
  for (let i = 0; i < media.length; i++) {
    const item = media[i];
    const ref = `media[${i}] "${item.title ?? "(no title)"}"`;

    if (!item.title || item.title.trim() === "") {
      warn(ref, "Missing title");
    }
    if (!item.source || item.source.trim() === "") {
      warn(ref, "Missing source");
    }
    if (!item.sourceUrl || item.sourceUrl.trim() === "") {
      warn(ref, "Missing sourceUrl");
    }
    if (!item.platform) {
      warn(ref, "Missing platform");
    }
    if (!item.attribution || item.attribution.trim() === "") {
      warn(ref, "Missing attribution — required for proper credit even when license allows reuse");
    }
    if (!item.verified) {
      warn(ref, "Unverified (verified: false or undefined) — set verified:true after confirming URL serves the correct image");
    }
  }

  return warnings;
}

// ─── Batch validation ─────────────────────────────────────────────────────────

/**
 * Validates media for every entry in the provided array.
 * Returns a flat list of all warnings across all entries.
 */
export function validateAllMedia(entries: BaseEntry[]): MediaWarning[] {
  return entries.flatMap((entry) => validateEntryMedia(entry));
}

// ─── Grouping helpers (for audit output) ─────────────────────────────────────

export interface MediaAuditGroup {
  noMedia: BaseEntry[];
  missingFeatured: BaseEntry[];
  hasWarnings: BaseEntry[];
  clean: BaseEntry[];
}

/**
 * Groups entries by their media readiness state.
 *
 * noMedia      — no media array at all
 * missingFeatured — has media but no featured image/gif
 * hasWarnings  — has featured media but other warnings exist
 * clean        — all checks pass (featured image, verified, sources set)
 */
export function groupEntriesByMediaState(
  entries: BaseEntry[],
): MediaAuditGroup {
  const noMedia: BaseEntry[] = [];
  const missingFeatured: BaseEntry[] = [];
  const hasWarnings: BaseEntry[] = [];
  const clean: BaseEntry[] = [];

  for (const entry of entries) {
    const media = entry.media ?? [];

    if (media.length === 0) {
      noMedia.push(entry);
      continue;
    }

    // Explicit role check — does the entry have at least one featured image/gif?
    const hasFeaturedImage = media.some(
      (item) =>
        item.role === "featured" &&
        (item.type === "image" || item.type === "gif"),
    );

    const warnings = validateEntryMedia(entry);

    if (!hasFeaturedImage) {
      missingFeatured.push(entry);
    } else if (warnings.length > 0) {
      hasWarnings.push(entry);
    } else {
      clean.push(entry);
    }
  }

  return { noMedia, missingFeatured, hasWarnings, clean };
}
