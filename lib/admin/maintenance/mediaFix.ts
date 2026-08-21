/**
 * Detects the "entry has media, but none of it is role: 'featured'" gap —
 * distinct from full media backfill (lib/dynamicMetadata/applyPatch.ts
 * applyMediaBackfillPatch), which only handles an entry with NO media at
 * all. An entry can have supporting/gallery images and still have no hero
 * image for previews/OG tags, which is its own, narrower problem.
 *
 * NOTE for whoever wired the Maintenance review UI to `change.mediaFix`:
 * this module was reconstructed without visibility into that component —
 * only `found` was confirmed from the Vercel error trace. If the UI reads
 * any field name below that doesn't match what it expects, that's a
 * mismatch to fix on one side or the other, not a guess I could verify.
 */

import type { BaseEntry, MediaItem } from "@/types";
import { findWikimediaMedia } from "@/lib/ai/research/wikimediaMedia";
import { toMediaItem } from "@/lib/admin/maintenance/mediaConvert";

export interface MaintenanceMediaFix {
  /** True when a missing-featured-media problem was detected this check. */
  found: boolean;
  /** True when the entry already had a role:"featured" item (found is always false in that case). */
  hadFeatured: boolean;
  /** True when a replacement featured candidate was located (not yet whether it was written to disk). */
  fixed: boolean;
  /** Human-readable explanation for the Maintenance review UI. */
  reason: string;
  /** The media item to write, when fixed is true. Matches change.mediaFix.media in RefreshReportView.tsx. Caller decides whether/when to apply it. */
  media?: MediaItem;
}

/**
 * Checks one entry for a missing featured image and looks for a live
 * replacement candidate. Never writes anything — purely a detect + propose
 * step, matching the rest of the Refresh pipeline's propose/apply split.
 */
export async function checkAndFixMissingFeaturedMedia(
  entry: BaseEntry,
): Promise<MaintenanceMediaFix> {
  const media = entry.media ?? [];
  const hasFeatured = media.some((m) => m.role === "featured");

  if (hasFeatured) {
    return {
      found: false,
      hadFeatured: true,
      fixed: false,
      reason: "Entry already has a featured image — nothing to fix.",
    };
  }

  if (media.length === 0) {
    // Zero media entirely is applyMediaBackfillPatch's job, not this one —
    // avoid the two features fighting over the same entry.
    return {
      found: false,
      hadFeatured: false,
      fixed: false,
      reason: "Entry has no media at all — handled by media backfill, not media fix.",
    };
  }

  try {
    const candidate = await findWikimediaMedia(
      entry.title,
      "featured",
      entry.category,
    );
    if (candidate) {
      return {
        found: true,
        hadFeatured: false,
        fixed: true,
        reason:
          "Missing a featured image (has other media, but no hero) — found a Wikimedia candidate. Unverified, needs a human look before it's treated as confirmed.",
        media: toMediaItem(candidate),
      };
    }
    return {
      found: true,
      hadFeatured: false,
      fixed: false,
      reason: "Missing a featured image — no suitable live candidate found this refresh.",
    };
  } catch {
    return {
      found: true,
      hadFeatured: false,
      fixed: false,
      reason: "Missing a featured image — media search failed; will retry on next refresh.",
    };
  }
}
