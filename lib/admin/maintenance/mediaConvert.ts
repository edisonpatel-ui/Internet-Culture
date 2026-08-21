/**
 * Shared ResearchMediaSuggestion → MediaItem mapper. Pulled out to its own
 * file so both refreshDynamicMetadata.ts and mediaFix.ts can use it without
 * importing from each other.
 */

import type { MediaItem } from "@/types";
import type { ResearchMediaSuggestion } from "@/lib/ai/packages";

export function toMediaItem(m: ResearchMediaSuggestion): MediaItem {
  const platform = /wikimedia/i.test(m.source ?? "")
    ? "wikimedia"
    : /youtube/i.test(m.source ?? "")
      ? "youtube"
      : /know\s*your\s*meme/i.test(m.source ?? "")
        ? "knowyourmeme"
        : "other";
  return {
    role: m.role === "reference" ? "supporting" : m.role,
    type: m.type ?? "image",
    url: m.url ?? "",
    title: m.title,
    source: m.source ?? "Unknown",
    sourceUrl: m.sourceUrl ?? m.url ?? "",
    platform,
    attribution: m.attribution,
    verified: false,
  };
}
