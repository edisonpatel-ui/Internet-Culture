import type { PromptTemplate } from "../types";

export interface MediaSuggestionsPromptInput {
  slug: string;
  title: string;
  category: string;
  description: string;
  /** Allowed platforms reminder for the model. */
  allowedPlatforms?: string[];
}

/**
 * Media suggestions prompt template — reusable string only.
 * All suggestions must remain verified: false until a human confirms URLs.
 */
export function buildMediaSuggestionsPrompt(
  input: MediaSuggestionsPromptInput,
): PromptTemplate {
  const platforms = (
    input.allowedPlatforms ?? [
      "wikimedia",
      "youtube",
      "knowyourmeme",
      "original",
      "other",
    ]
  ).join(", ");

  return {
    id: "editorial.media-suggestions",
    label: "Media Suggestions",
    system: [
      "You suggest MediaItem candidates for Internet Culture Hub.",
      "Prefer Wikimedia Commons full-file URLs and YouTube hqdefault thumbnails.",
      "Never invent URLs. If unsure, describe what to search — do not fabricate links.",
      "Every AI-suggested item must be marked verified:false for human confirmation.",
      "Forbidden: Google Images, social CDNs, Wikimedia /thumb/ paths, maxresdefault.",
    ].join(" "),
    user: [
      `Entry: ${input.title} (${input.slug})`,
      `Category: ${input.category}`,
      `Description: ${input.description}`,
      `Allowed platforms: ${platforms}`,
      "",
      "Suggest featured / supporting / video / reference roles with title, source, and search hints.",
      "Do not claim URLs are verified.",
    ].join("\n"),
  };
}
