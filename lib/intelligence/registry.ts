/**
 * Internal intelligence overrides — keyed by slug.
 *
 * Seed structured metadata here without rewriting every article file.
 * Entry-level `intelligence?: CulturalIntelligence` still wins when present.
 *
 * Never import this from client UI components.
 */

import type { CulturalIntelligence } from "@/types";

/**
 * Curated intelligence seeds for high-signal entries.
 * Expand gradually — do not bulk-generate guesses.
 */
export const INTELLIGENCE_REGISTRY: Record<string, CulturalIntelligence> = {
  // skibidi-toilet: seeded on the entry file as the in-catalog example
  doge: {
    era: ["social", "web-2"],
    originPlatform: ["tumblr", "reddit"],
    culturalCategory: ["meme", "animal-meme"],
    audience: ["cross-generational", "mainstream"],
    formatType: "image-macro",
    lifecycleStage: "legacy",
    signals: ["Classic meme", "Shiba Inu", "Image macro"],
  },
  "tiktok-rise": {
    era: "short-form",
    originPlatform: "tiktok",
    culturalCategory: ["event", "platform-culture"],
    audience: ["gen-z", "gen-alpha", "mainstream"],
    formatType: "event",
    signals: ["Short-form video", "Algorithm culture", "Platform shift"],
  },
  "creator-economy": {
    era: ["social", "short-form"],
    originPlatform: ["youtube", "tiktok", "twitch"],
    culturalCategory: ["trend", "platform-culture", "business-culture"],
    audience: ["mainstream", "gen-z"],
    formatType: "platform-culture",
    signals: ["Creator economy", "Monetization", "Influencer adjacent"],
  },
  "4chan": {
    era: ["web-2", "social"],
    originPlatform: "4chan",
    culturalCategory: ["event", "platform-culture", "imageboard"],
    audience: ["niche", "millennial", "gen-z"],
    formatType: "platform-culture",
    lifecycleStage: "legacy",
    signals: ["Imageboard", "Anonymous culture", "Meme incubator"],
  },
  rizz: {
    era: ["short-form", "gen-alpha"],
    originPlatform: ["twitch", "tiktok"],
    culturalCategory: ["slang", "streaming"],
    audience: ["gen-z", "gen-alpha", "gaming"],
    formatType: "slang-term",
    signals: ["Streaming slang", "Gen Z", "Charisma slang"],
  },
};

export function getIntelligenceOverride(
  slug: string,
): CulturalIntelligence | undefined {
  return INTELLIGENCE_REGISTRY[slug];
}
