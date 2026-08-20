/**
 * Missing-media detection + fix for Maintenance refresh.
 *
 * An entry with no "featured" media item renders with a broken/placeholder
 * hero image on the live site. This checks for that gap and, when found,
 * searches Wikimedia Commons (the same real, relevance-filtered search
 * used by Draft Studio) for a genuinely matching replacement.
 */

import type { BaseEntry, MediaItem } from "@/types";
import type { ResearchMediaSuggestion } from "@/lib/ai/packages";
import { findWikimediaMediaSet } from "@/lib/ai/research/wikimediaMedia";

export interface MaintenanceMediaFix {
  /** True only when a real, relevant replacement image was found. */
  found: boolean;
  /** The proposed new featured item — only present when found. */
  media?: MediaItem;
  reason: string;
}

function hasFeaturedMedia(entry: BaseEntry): boolean {
  return (entry.media ?? []).some((m) => m.role === "featured");
}

function toMediaItem(suggestion: ResearchMediaSuggestion): MediaItem {
  return {
    role: suggestion.role,
    type: suggestion.type === "gif" || suggestion.type === "embed" ? "image" : (suggestion.type ?? "image"),
    url: suggestion.url ?? "",
    title: suggestion.title,
    source: suggestion.source ?? "Wikimedia Commons",
    sourceUrl: suggestion.sourceUrl ?? suggestion.url ?? "",
    platform: "wikimedia",
    attribution: suggestion.attribution,
    verified: false,
  };
}

/**
 * Checks whether `entry` is missing a featured image and, if so, tries to
 * find one. Returns undefined when the entry already has one — meaning
 * there's nothing to report or apply, keeping ordinary refreshes exactly
 * as fast as before for articles that don't need this.
 */
export async function checkMissingMedia(
  entry: BaseEntry,
): Promise<MaintenanceMediaFix | undefined> {
  if (hasFeaturedMedia(entry)) return undefined;

  try {
    const found = await findWikimediaMediaSet(entry.title, entry.category);
    const featured = found.find((m) => m.role === "featured") ?? found[0];
    if (!featured || !featured.url) {
      return {
        found: false,
        reason: "No relevant, safely-licensed Wikimedia Commons image found.",
      };
    }
    return {
      found: true,
      media: toMediaItem(featured),
      reason: `Found via Wikimedia Commons: "${featured.title}"`,
    };
  } catch (e) {
    return {
      found: false,
      reason: e instanceof Error ? e.message : "Media search failed.",
    };
  }
}
