import type { FilterOption } from "./types";

/**
 * Category filter presets.
 * Only include chips that map to tags/platforms already present in content.
 * Do not invent taxonomy not backed by data.
 */

export const MEME_FILTERS: FilterOption[] = [
  { id: "classic", label: "Classic", tags: ["classic"] },
  { id: "reaction", label: "Reaction", tags: ["reaction"] },
  { id: "gaming", label: "Gaming", tags: ["gaming"] },
  { id: "tiktok", label: "TikTok", tags: ["tiktok"] },
  { id: "viral", label: "Viral", tags: ["viral"] },
  { id: "character", label: "Character", tags: ["character"] },
];

export const CREATOR_FILTERS: FilterOption[] = [
  {
    id: "streamer",
    label: "Streamer",
    tags: ["streaming", "twitch", "kick"],
    platforms: ["twitch", "kick"],
  },
  {
    id: "youtuber",
    label: "YouTuber",
    tags: ["youtube"],
    platforms: ["youtube"],
  },
  {
    id: "tiktok",
    label: "TikTok",
    tags: ["tiktok"],
    platforms: ["tiktok"],
  },
  {
    id: "group",
    label: "Group",
    tags: ["amp", "sidemen", "hype-house", "offline-tv"],
  },
];

export const EVENT_FILTERS: FilterOption[] = [
  { id: "challenge", label: "Challenge", tags: ["challenge"] },
  {
    id: "platform",
    label: "Platform Event",
    tags: ["vine", "short-form video", "algorithm", "social media"],
  },
  {
    id: "cultural",
    label: "Cultural Moment",
    tags: [
      "cultural-event",
      "music",
      "album era",
      "cinema",
      "film",
      "concert",
      "kiss cam",
    ],
  },
];

export const SLANG_FILTERS: FilterOption[] = [
  { id: "gaming", label: "Gaming", tags: ["gaming"] },
  { id: "tiktok", label: "TikTok", tags: ["tiktok"] },
  {
    id: "sports",
    label: "Sports",
    tags: ["sports", "football", "soccer"],
  },
  {
    id: "dating",
    label: "Dating",
    tags: ["dating", "relationships"],
  },
  { id: "aave", label: "AAVE", tags: ["aave"] },
];

export const TREND_FILTERS: FilterOption[] = [
  { id: "fashion", label: "Fashion", tags: ["fashion"] },
  { id: "aesthetic", label: "Aesthetic", tags: ["aesthetic"] },
  { id: "tiktok", label: "TikTok", tags: ["tiktok"] },
  { id: "beauty", label: "Beauty", tags: ["beauty", "makeup"] },
];
