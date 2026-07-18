/**
 * lib/content/validateMedia.ts
 *
 * Category-aware media validation for Internet Culture Hub.
 *
 * Soft quality warnings for audit:media and npm run validate.
 * Hard media schema errors live in lib/content/validation/validateContent.ts.
 *
 * Category policy (P0):
 * - slang / abstract trends: no media is OK — do not warn
 * - memes / creators / events: warn when featured image/gif is missing
 */

import type { BaseEntry, ContentCategory } from "@/types";

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

// ─── Valid platform values (must stay in sync with MediaPlatform in types/) ───

const VALID_PLATFORMS = new Set([
  "youtube",
  "tiktok",
  "twitter",
  "instagram",
  "reddit",
  "twitch",
  "wikimedia",
  "knowyourmeme",
  "original",
  "other",
]);

// ─── Suspicious image hosts ────────────────────────────────────────────────────

const SUSPICIOUS_HOSTS = [
  "pinterest.com",
  "pinterest.",
  "pbs.twimg.com",
  "pbs.twimg",
  "gyazo.com",
  "prnt.sc",
  "prntscr.com",
  "postimg.org",
  "postimg.cc",
  "i.imgur.com/delete",
  "google.com/imgres",
  "gstatic.com",
  "ggpht.com",
  "fbcdn.net",
  "cdninstagram.com",
  "redd.it",
  "preview.redd.it",
  "external-preview.redd.it",
];

const INVALID_ROLE_TYPE_COMBOS: Array<{
  role: string;
  type: string;
  reason: string;
}> = [
  {
    role: "video",
    type: "image",
    reason:
      'role "video" with type "image" — use role "supporting" for images',
  },
  {
    role: "video",
    type: "gif",
    reason: 'role "video" with type "gif" — use role "supporting" for GIFs',
  },
  {
    role: "featured",
    type: "embed",
    reason:
      'role "featured" with type "embed" — embeds cannot render as hero images; use role "reference"',
  },
];

/** Categories where gradient-only (no media) is an acceptable default. */
export function mediaOptionalForCategory(category: ContentCategory): boolean {
  return category === "slang" || category === "trend";
}

/** Categories that should warn when a featured image/gif is missing. */
function expectsFeaturedMedia(category: ContentCategory): boolean {
  return (
    category === "meme" ||
    category === "creator" ||
    category === "event" ||
    category === "brainrot"
  );
}

/**
 * Validates the media array of a single entry.
 * Returns soft warnings — empty means no media-quality issues for this entry.
 */
export function validateEntryMedia(entry: BaseEntry): MediaWarning[] {
  const warnings: MediaWarning[] = [];
  const media = entry.media ?? [];

  function warn(field: string, message: string) {
    warnings.push({ slug: entry.slug, title: entry.title, field, message });
  }

  // ── Missing media entirely ─────────────────────────────────────────────────
  if (media.length === 0) {
    if (mediaOptionalForCategory(entry.category)) {
      return warnings; // slang / abstract trends — gradient is fine
    }
    if (expectsFeaturedMedia(entry.category)) {
      warn(
        "media",
        `No media — ${entry.category} entries should have featured media when a reliable visual exists (gradient fallback otherwise)`,
      );
    }
    return warnings;
  }

  // ── Missing featured media ─────────────────────────────────────────────────
  const hasFeatured = media.some((item) => item.role === "featured");
  const featuredItems = media.filter((item) => item.role === "featured");
  const featuredImages = featuredItems.filter(
    (item) => item.type === "image" || item.type === "gif",
  );

  if (expectsFeaturedMedia(entry.category) && !hasFeatured) {
    warn(
      "media.role",
      "No featured media item — cards and hero will show gradient fallback",
    );
  }

  if (featuredItems.length > 0 && featuredImages.length === 0) {
    warn(
      "media[role=featured].type",
      "Featured media exists but has no image/gif type — hero and cards show gradient",
    );
  }

  if (featuredImages.length > 1) {
    warn(
      "media[role=featured]",
      `${featuredImages.length} featured image/gif items found — only the first is used as the hero; remove extras or change role to "supporting"`,
    );
  }

  const seenUrls = new Set<string>();
  for (const item of media) {
    if (item.url) {
      if (seenUrls.has(item.url)) {
        warn(`media url`, `Duplicate URL detected: ${item.url}`);
      }
      seenUrls.add(item.url);
    }
  }

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
    } else if (!VALID_PLATFORMS.has(item.platform)) {
      warn(
        ref,
        `Invalid platform value "${item.platform}" — must be one of: ${[...VALID_PLATFORMS].join(", ")}`,
      );
    }

    if (!item.attribution || item.attribution.trim() === "") {
      warn(
        ref,
        "Missing attribution — required for proper credit even when license allows reuse",
      );
    }

    if (
      (item.platform === "wikimedia" || item.platform === "original") &&
      (item.type === "image" || item.type === "gif") &&
      (!item.license || item.license.trim() === "")
    ) {
      warn(
        ref,
        "Missing license — Wikimedia and original images require a license field (e.g. CC BY 4.0, CC BY-SA 2.0, Public Domain)",
      );
    }

    if (!item.verified) {
      warn(
        ref,
        "Unverified (verified: false or undefined) — set verified:true after confirming URL serves the correct image",
      );
    }

    if (item.url) {
      const urlLower = item.url.toLowerCase();
      const suspiciousHost = SUSPICIOUS_HOSTS.find((host) =>
        urlLower.includes(host),
      );
      if (suspiciousHost) {
        warn(
          ref,
          `Suspicious or ephemeral host detected in URL ("${suspiciousHost}") — prefer Wikimedia Commons, official YouTube, or official websites`,
        );
      }

      if (urlLower.includes("i.ytimg.com") && urlLower.includes("maxresdefault")) {
        warn(
          ref,
          `YouTube thumbnail uses "maxresdefault" — this format is not generated for all videos. Prefer "hqdefault" for reliability`,
        );
      }
    }

    for (const combo of INVALID_ROLE_TYPE_COMBOS) {
      if (item.role === combo.role && item.type === combo.type) {
        warn(ref, `Invalid role+type combination: ${combo.reason}`);
      }
    }
  }

  return warnings;
}

export function validateAllMedia(entries: BaseEntry[]): MediaWarning[] {
  return entries.flatMap((entry) => validateEntryMedia(entry));
}

export interface MediaAuditGroup {
  noMedia: BaseEntry[];
  missingFeatured: BaseEntry[];
  hasWarnings: BaseEntry[];
  clean: BaseEntry[];
}

/**
 * Groups entries by media readiness.
 *
 * Slang / trend with no media are treated as clean (gradient acceptable).
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
    const warnings = validateEntryMedia(entry);

    if (media.length === 0) {
      if (mediaOptionalForCategory(entry.category)) {
        if (warnings.length === 0) clean.push(entry);
        else hasWarnings.push(entry);
      } else {
        noMedia.push(entry);
      }
      continue;
    }

    const hasFeaturedImage = media.some(
      (item) =>
        item.role === "featured" &&
        (item.type === "image" || item.type === "gif"),
    );

    if (!hasFeaturedImage && expectsFeaturedMedia(entry.category)) {
      missingFeatured.push(entry);
    } else if (warnings.length > 0) {
      hasWarnings.push(entry);
    } else {
      clean.push(entry);
    }
  }

  return { noMedia, missingFeatured, hasWarnings, clean };
}
