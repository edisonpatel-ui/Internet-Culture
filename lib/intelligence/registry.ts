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
 * Curated intelligence seeds for high-signal cultural anchors (Phase 7B).
 * Expand gradually — do not bulk-generate guesses.
 *
 * Culture topics without a dedicated article (e.g. Classic Internet, Gaming Culture)
 * are modeled as clusters in `clusters.ts`, not orphan registry keys.
 */
export const INTELLIGENCE_REGISTRY: Record<string, CulturalIntelligence> = {
  // ── Creators ──────────────────────────────────────────────
  mrbeast: {
    era: ["social", "short-form"],
    originPlatform: "youtube",
    culturalCategory: ["creator", "youtube-culture", "creator-economy"],
    audience: ["mainstream", "gen-z", "gen-alpha"],
    formatType: "creator-persona",
    signals: ["YouTube", "Creator economy", "Viral challenges", "Philanthropy content"],
    importance: {
      historicalSignificance: 78,
      culturalLongevity: 72,
      platformImpact: 92,
      audienceReach: 95,
    },
  },
  "kai-cenat": {
    era: ["short-form", "gen-alpha"],
    originPlatform: "twitch",
    culturalCategory: ["creator", "streaming", "amp"],
    audience: ["gen-z", "gen-alpha", "gaming"],
    formatType: "creator-persona",
    signals: ["Twitch", "Streaming", "AMP", "Irl streaming"],
    importance: {
      historicalSignificance: 62,
      culturalLongevity: 55,
      platformImpact: 80,
      audienceReach: 88,
    },
  },
  pewdiepie: {
    era: ["social", "web-2"],
    originPlatform: "youtube",
    culturalCategory: ["creator", "youtube-culture", "gaming"],
    audience: ["millennial", "gen-z", "gaming", "mainstream"],
    formatType: "creator-persona",
    lifecycleStage: "legacy",
    signals: ["YouTube", "Gaming YouTuber", "Sub count wars", "Classic YouTube"],
    importance: {
      historicalSignificance: 90,
      culturalLongevity: 88,
      platformImpact: 90,
      audienceReach: 92,
    },
  },
  dream: {
    era: ["social", "short-form"],
    originPlatform: ["youtube", "twitter"],
    culturalCategory: ["creator", "gaming", "minecraft"],
    audience: ["gen-z", "gaming"],
    formatType: "creator-persona",
    signals: ["Minecraft", "Dream SMP", "Face reveal era", "Gaming YouTube"],
    importance: {
      historicalSignificance: 58,
      culturalLongevity: 50,
      platformImpact: 70,
      audienceReach: 82,
    },
  },
  amp: {
    era: ["short-form", "gen-alpha"],
    originPlatform: ["twitch", "youtube"],
    culturalCategory: ["creator", "streaming", "collective"],
    audience: ["gen-z", "gen-alpha", "gaming"],
    formatType: "creator-persona",
    signals: ["AMP", "Streaming collective", "Twitch", "NYC streaming"],
    importance: {
      historicalSignificance: 55,
      culturalLongevity: 48,
      platformImpact: 72,
      audienceReach: 80,
    },
  },

  // ── Memes ─────────────────────────────────────────────────
  doge: {
    era: ["social", "web-2"],
    originPlatform: ["tumblr", "reddit"],
    culturalCategory: ["meme", "animal-meme"],
    audience: ["cross-generational", "mainstream"],
    formatType: "image-macro",
    lifecycleStage: "legacy",
    signals: ["Classic meme", "Shiba Inu", "Image macro", "Animal meme"],
    importance: {
      historicalSignificance: 88,
      culturalLongevity: 90,
      platformImpact: 70,
      audienceReach: 92,
    },
  },
  pepe: {
    era: ["web-2", "social"],
    originPlatform: ["4chan", "tumblr"],
    culturalCategory: ["meme", "reaction", "imageboard"],
    audience: ["millennial", "gen-z", "niche", "mainstream"],
    formatType: "reaction",
    lifecycleStage: "legacy",
    signals: ["Classic meme", "Reaction face", "Imageboard", "Feels frog"],
    importance: {
      historicalSignificance: 92,
      culturalLongevity: 90,
      platformImpact: 75,
      audienceReach: 90,
    },
  },
  wojak: {
    era: ["web-2", "social"],
    originPlatform: "4chan",
    culturalCategory: ["meme", "reaction", "imageboard"],
    audience: ["millennial", "gen-z", "niche"],
    formatType: "reaction",
    lifecycleStage: "legacy",
    signals: ["Classic meme", "Reaction face", "Imageboard", "Feels guy"],
    importance: {
      historicalSignificance: 85,
      culturalLongevity: 88,
      platformImpact: 65,
      audienceReach: 82,
    },
  },
  "skibidi-toilet": {
    era: ["gen-alpha", "short-form"],
    originPlatform: "youtube-shorts",
    culturalCategory: ["meme", "brainrot", "serialized-web-series"],
    audience: ["gen-alpha", "gen-z"],
    formatType: "animated-meme",
    signals: ["Brainrot", "Gen Alpha", "Short-form video", "YouTube Shorts"],
    importance: {
      historicalSignificance: 60,
      culturalLongevity: 45,
      platformImpact: 78,
      audienceReach: 90,
    },
  },
  rickroll: {
    era: ["web-2", "social"],
    originPlatform: ["youtube", "4chan"],
    culturalCategory: ["meme", "video-meme", "bait-and-switch"],
    audience: ["cross-generational", "mainstream"],
    formatType: "video-meme",
    lifecycleStage: "legacy",
    signals: ["Classic meme", "Bait and switch", "YouTube", "Viral video"],
    importance: {
      historicalSignificance: 90,
      culturalLongevity: 95,
      platformImpact: 85,
      audienceReach: 95,
    },
  },

  // ── Platforms (mapped to existing encyclopedia entries) ───
  "youtube-creator-era": {
    era: ["social", "short-form"],
    originPlatform: "youtube",
    culturalCategory: ["trend", "platform-culture", "youtube-culture"],
    audience: ["mainstream", "millennial", "gen-z"],
    formatType: "platform-culture",
    signals: ["YouTube", "Creator economy", "Platform culture", "AdSense era"],
    importance: {
      historicalSignificance: 88,
      culturalLongevity: 85,
      platformImpact: 95,
      audienceReach: 90,
    },
  },
  "tiktok-rise": {
    era: "short-form",
    originPlatform: "tiktok",
    culturalCategory: ["event", "platform-culture", "tiktok-culture"],
    audience: ["gen-z", "gen-alpha", "mainstream"],
    formatType: "event",
    signals: ["Short-form video", "Algorithm culture", "Platform shift", "TikTok"],
    importance: {
      historicalSignificance: 85,
      culturalLongevity: 70,
      platformImpact: 95,
      audienceReach: 94,
    },
  },
  "streamer-culture": {
    era: ["social", "short-form"],
    originPlatform: "twitch",
    culturalCategory: ["trend", "platform-culture", "streaming"],
    audience: ["gaming", "gen-z", "gen-alpha"],
    formatType: "platform-culture",
    signals: ["Twitch", "Streaming", "Live culture", "Emote culture"],
    importance: {
      historicalSignificance: 75,
      culturalLongevity: 78,
      platformImpact: 88,
      audienceReach: 85,
    },
  },
  "reddit-culture": {
    era: ["web-2", "social"],
    originPlatform: "reddit",
    culturalCategory: ["trend", "platform-culture"],
    audience: ["millennial", "gen-z", "niche", "mainstream"],
    formatType: "platform-culture",
    lifecycleStage: "legacy",
    signals: ["Reddit", "Subreddit culture", "Upvote culture", "Ask Me Anything"],
    importance: {
      historicalSignificance: 82,
      culturalLongevity: 88,
      platformImpact: 80,
      audienceReach: 86,
    },
  },
  "4chan": {
    era: ["web-2", "social"],
    originPlatform: "4chan",
    culturalCategory: ["event", "platform-culture", "imageboard"],
    audience: ["niche", "millennial", "gen-z"],
    formatType: "platform-culture",
    lifecycleStage: "legacy",
    signals: ["Imageboard", "Anonymous culture", "Meme incubator", "Classic internet"],
    importance: {
      historicalSignificance: 94,
      culturalLongevity: 90,
      platformImpact: 88,
      audienceReach: 70,
    },
  },

  // ── Culture topics (existing articles) ────────────────────
  "creator-economy": {
    era: ["social", "short-form"],
    originPlatform: ["youtube", "tiktok", "twitch"],
    culturalCategory: ["trend", "platform-culture", "business-culture"],
    audience: ["mainstream", "gen-z"],
    formatType: "platform-culture",
    signals: ["Creator economy", "Monetization", "Influencer adjacent", "Platform labor"],
    importance: {
      historicalSignificance: 80,
      culturalLongevity: 75,
      platformImpact: 90,
      audienceReach: 85,
    },
  },
  brainrot: {
    era: ["gen-alpha", "short-form"],
    originPlatform: ["tiktok", "youtube-shorts"],
    culturalCategory: ["slang", "brainrot", "gen-alpha"],
    audience: ["gen-alpha", "gen-z"],
    formatType: "slang-term",
    signals: ["Brainrot", "Gen Alpha", "Short-form video", "Absurdist humor"],
    importance: {
      historicalSignificance: 55,
      culturalLongevity: 40,
      platformImpact: 70,
      audienceReach: 88,
    },
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
