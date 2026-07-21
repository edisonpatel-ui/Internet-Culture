/**
 * Meme lifecycle stages — structural knowledge only (RC3-D).
 * No automatic scoring or article generation.
 */

export type MemeLifecycleStageId =
  | "creation"
  | "early_sharing"
  | "community_adoption"
  | "rapid_growth"
  | "peak_popularity"
  | "mainstream_exposure"
  | "commercialization"
  | "decline"
  | "revival"
  | "legacy";

export interface MemeLifecycleStage {
  id: MemeLifecycleStageId;
  label: string;
  order: number;
  typicalCharacteristics: string[];
  expectedPlatforms: string[];
  /** Qualitative signals — not numeric KPIs to auto-compute. */
  commonMetrics: string[];
  historicalImportance: string;
}

export const MEME_LIFECYCLE_STAGES: readonly MemeLifecycleStage[] = [
  {
    id: "creation",
    label: "Creation",
    order: 1,
    typicalCharacteristics: [
      "First artifact appears",
      "Often niche or accidental",
      "Limited audience awareness",
    ],
    expectedPlatforms: ["forums", "imageboards", "Discord", "private chats"],
    commonMetrics: ["first known upload date", "original creator attribution"],
    historicalImportance: "Anchors origin claims — highest research priority.",
  },
  {
    id: "early_sharing",
    label: "Early sharing",
    order: 2,
    typicalCharacteristics: [
      "Passed among friends / small boards",
      "Little remix yet",
    ],
    expectedPlatforms: ["Reddit", "Tumblr", "Twitter/X", "group chats"],
    commonMetrics: ["early reposts", "same-file hashes / watermarks"],
    historicalImportance: "Separates creation from later viral myth-making.",
  },
  {
    id: "community_adoption",
    label: "Community adoption",
    order: 3,
    typicalCharacteristics: [
      "In-group recognition",
      "First templates / catchphrases",
    ],
    expectedPlatforms: ["subreddits", "fandom Discords", "TikTok niches"],
    commonMetrics: ["variant count", "in-joke density"],
    historicalImportance: "Shows the meme became a reusable format.",
  },
  {
    id: "rapid_growth",
    label: "Rapid growth",
    order: 4,
    typicalCharacteristics: [
      "Cross-community spillover",
      "Accelerating remixes",
    ],
    expectedPlatforms: ["TikTok", "Twitter/X", "YouTube Shorts", "Instagram"],
    commonMetrics: ["derivative volume", "hashtag velocity (qualitative)"],
    historicalImportance: "Often the hardest phase to date precisely.",
  },
  {
    id: "peak_popularity",
    label: "Peak popularity",
    order: 5,
    typicalCharacteristics: [
      "Saturation in feeds",
      "Widespread recognition",
    ],
    expectedPlatforms: ["major social feeds", "YouTube commentary"],
    commonMetrics: ["press mentions", "ubiquity in comments"],
    historicalImportance: "Marks cultural maximum awareness — not 'death'.",
  },
  {
    id: "mainstream_exposure",
    label: "Mainstream exposure",
    order: 6,
    typicalCharacteristics: [
      "TV / brands / politicians reference it",
      "Explainers for general audiences",
    ],
    expectedPlatforms: ["news sites", "late-night TV", "corporate social"],
    commonMetrics: ["non-internet media citations"],
    historicalImportance: "Signals crossover beyond native communities.",
  },
  {
    id: "commercialization",
    label: "Commercialization",
    order: 7,
    typicalCharacteristics: [
      "Merch, ads, IP claims",
      "Platform monetization of the format",
    ],
    expectedPlatforms: ["ad networks", "brand accounts", "stores"],
    commonMetrics: ["brand campaigns", "licensing disputes"],
    historicalImportance: "Often accelerates ironic backlash.",
  },
  {
    id: "decline",
    label: "Decline",
    order: 8,
    typicalCharacteristics: [
      "Fatigue / overuse",
      "Ironic or deadpan reuse only",
    ],
    expectedPlatforms: ["any — volume drops"],
    commonMetrics: ["falling derivative rate", "nostalgia framing"],
    historicalImportance: "Decline is not erasure — archive value remains.",
  },
  {
    id: "revival",
    label: "Revival",
    order: 9,
    typicalCharacteristics: [
      "Nostalgia waves",
      "New platform rediscovery",
    ],
    expectedPlatforms: ["TikTok", "YouTube retrospectives", "Twitter/X"],
    commonMetrics: ["revival edit spikes", "anniversary posts"],
    historicalImportance: "May create a second peak with new meaning.",
  },
  {
    id: "legacy",
    label: "Legacy",
    order: 10,
    typicalCharacteristics: [
      "Referenced as cultural shorthand",
      "Taught in explainers / encyclopedias",
    ],
    expectedPlatforms: ["archives", "wikis", "long-form essays"],
    commonMetrics: ["durable idiom use", "museum / book citations"],
    historicalImportance: "Defines lasting language or format influence.",
  },
] as const;

export function getMemeLifecycleStage(
  id: MemeLifecycleStageId,
): MemeLifecycleStage | undefined {
  return MEME_LIFECYCLE_STAGES.find((s) => s.id === id);
}
