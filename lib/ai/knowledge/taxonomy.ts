/**
 * Internet Culture Taxonomy — master category knowledge (RC3-D).
 *
 * Reusable definitions for AI/editorial/search/recommendation systems.
 * Not prompts. Not content files. Not live routing.
 */

export type TaxonomyTopLevel =
  | "meme"
  | "slang"
  | "event"
  | "creator"
  | "platform"
  | "community"
  | "trend"
  | "format"
  | "technology"
  | "movement"
  | "subculture"
  | "media";

export interface TaxonomyNode {
  id: TaxonomyTopLevel;
  label: string;
  definition: string;
  examples: string[];
  commonRelationships: string[];
  typicalArticleStructure: string[];
  requiredResearchAreas: string[];
}

export const INTERNET_CULTURE_TAXONOMY: Record<
  TaxonomyTopLevel,
  TaxonomyNode
> = {
  meme: {
    id: "meme",
    label: "Meme",
    definition:
      "A shareable cultural unit — image, video, catchphrase, or template — remixed and circulated online.",
    examples: ["Doge", "Rickroll", "Distracted Boyfriend", "Skibidi Toilet"],
    commonRelationships: [
      "same_format",
      "parody",
      "inspired",
      "same_era",
      "same_platform",
    ],
    typicalArticleStructure: [
      "identity (what it is)",
      "origin",
      "timeline",
      "usage examples",
      "spread / platforms",
      "legacy",
      "sources",
    ],
    requiredResearchAreas: [
      "first known appearance",
      "format / template rules",
      "platform path",
      "notable variants",
      "Know Your Meme / archive corroboration",
    ],
  },
  slang: {
    id: "slang",
    label: "Slang",
    definition:
      "A word or phrase with a specific internet-culture meaning used by communities online.",
    examples: ["Rizz", "GOAT", "Based", "Brainrot"],
    commonRelationships: [
      "shared_terminology",
      "same_community",
      "same_era",
      "related_to",
    ],
    typicalArticleStructure: [
      "definition",
      "origin",
      "usage examples",
      "spread",
      "status / longevity",
      "sources",
    ],
    requiredResearchAreas: [
      "earliest credible uses",
      "community of origin",
      "cross-platform adoption",
      "dictionary / press recognition",
      "confusable terms",
    ],
  },
  event: {
    id: "event",
    label: "Event",
    definition:
      "A specific internet or culture moment with a bounded time, actors, and outcome.",
    examples: ["Barbenheimer", "Harambe", "Great Meme Reset"],
    commonRelationships: [
      "same_event",
      "reaction",
      "inspired",
      "same_era",
      "related_to",
    ],
    typicalArticleStructure: [
      "what happened",
      "impact",
      "timeline / highlights",
      "participants",
      "aftermath",
      "sources",
    ],
    requiredResearchAreas: [
      "date window",
      "primary reporting",
      "participants",
      "cultural aftermath",
      "disputed narratives",
    ],
  },
  creator: {
    id: "creator",
    label: "Creator",
    definition:
      "A person or channel whose output shaped internet culture or community language.",
    examples: ["PewDiePie", "MrBeast", "Markiplier"],
    commonRelationships: [
      "same_creator",
      "influenced",
      "same_platform",
      "predecessor",
      "successor",
    ],
    typicalArticleStructure: [
      "who they are",
      "platforms",
      "notable moments",
      "cultural influence",
      "sources",
    ],
    requiredResearchAreas: [
      "career start",
      "primary platforms",
      "signature formats",
      "controversies (sourced)",
      "influence on memes/slang",
    ],
  },
  platform: {
    id: "platform",
    label: "Platform",
    definition:
      "A product or network where culture is created, discovered, and remixed.",
    examples: ["TikTok", "Reddit", "YouTube", "4chan"],
    commonRelationships: [
      "same_platform",
      "originated",
      "popularized",
      "same_era",
    ],
    typicalArticleStructure: [
      "what it is",
      "culture / norms",
      "discovery model",
      "historical role",
      "typical content",
      "sources",
    ],
    requiredResearchAreas: [
      "launch / peak eras",
      "moderation norms",
      "algorithm / feed shape",
      "export paths to other platforms",
    ],
  },
  community: {
    id: "community",
    label: "Community",
    definition:
      "A group with shared language, jokes, platforms, and content norms.",
    examples: ["Gaming", "Anime", "Gen Alpha", "Crypto Twitter"],
    commonRelationships: [
      "same_community",
      "shared_terminology",
      "same_platform",
    ],
    typicalArticleStructure: [
      "identity",
      "language",
      "platforms",
      "content types",
      "culture",
      "sources",
    ],
    requiredResearchAreas: [
      "core platforms",
      "insider vocabulary",
      "gatekeeping / norms",
      "crossover into mainstream",
    ],
  },
  trend: {
    id: "trend",
    label: "Trend",
    definition:
      "A broader aesthetic, behavior, or movement that spans formats and platforms.",
    examples: ["Cottagecore", "Clean Girl", "Performative"],
    commonRelationships: [
      "same_era",
      "inspired",
      "same_community",
      "related_to",
    ],
    typicalArticleStructure: [
      "summary",
      "origin",
      "markers / aesthetics",
      "spread",
      "legacy",
      "sources",
    ],
    requiredResearchAreas: [
      "defining visual/behavioral markers",
      "origin communities",
      "commercialization",
      "adjacent aesthetics",
    ],
  },
  format: {
    id: "format",
    label: "Format",
    definition:
      "A reusable content pattern or template (challenge, POV, bait, reaction cut).",
    examples: ["React video", "Storytime", "NPC streaming", "Unboxing"],
    commonRelationships: [
      "same_format",
      "spin_off",
      "parody",
      "same_platform",
    ],
    typicalArticleStructure: [
      "rules of the format",
      "origin examples",
      "variants",
      "platforms",
      "sources",
    ],
    requiredResearchAreas: [
      "template constraints",
      "first breakout examples",
      "algorithm fit",
      "fatigue signals",
    ],
  },
  technology: {
    id: "technology",
    label: "Technology",
    definition:
      "Tools and infrastructure that enable creation, discovery, or remix of culture.",
    examples: ["AI image generators", "Shorts/Reels", "Photoshop"],
    commonRelationships: ["influenced", "enabled", "same_era"],
    typicalArticleStructure: [
      "what it enables",
      "adoption timeline",
      "cultural effects",
      "sources",
    ],
    requiredResearchAreas: [
      "capability vs hype",
      "access barriers",
      "downstream meme/slang effects",
    ],
  },
  movement: {
    id: "movement",
    label: "Movement",
    definition:
      "An organized or loosely coordinated cultural push with goals beyond a single meme.",
    examples: ["Open-source culture", "Creator economy"],
    commonRelationships: ["inspired", "same_era", "same_community"],
    typicalArticleStructure: [
      "aims",
      "origins",
      "key moments",
      "outcomes",
      "sources",
    ],
    requiredResearchAreas: [
      "stated goals vs outcomes",
      "lead figures",
      "media framing",
      "backlash",
    ],
  },
  subculture: {
    id: "subculture",
    label: "Subculture",
    definition:
      "A durable identity group with shared aesthetics, slang, and social norms online and/or offline.",
    examples: ["E-girls/e-boys", "K-pop stans", "Speedrunners"],
    commonRelationships: [
      "same_community",
      "shared_terminology",
      "same_platform",
    ],
    typicalArticleStructure: [
      "identity markers",
      "history",
      "platforms",
      "language",
      "sources",
    ],
    requiredResearchAreas: [
      "in-group signals",
      "cross-platform homes",
      "commercial co-option",
    ],
  },
  media: {
    id: "media",
    label: "Media",
    definition:
      "Coverage systems and outlets that amplify, frame, or archive internet culture.",
    examples: ["Know Your Meme", "Tech press", "Tabloid viral desks"],
    commonRelationships: ["popularized", "reacted_to", "same_era"],
    typicalArticleStructure: [
      "role in amplification",
      "examples",
      "biases / incentives",
      "sources",
    ],
    requiredResearchAreas: [
      "amplification vs origin",
      "framing patterns",
      "archival value",
    ],
  },
};

export function getTaxonomyNode(id: TaxonomyTopLevel): TaxonomyNode {
  return INTERNET_CULTURE_TAXONOMY[id];
}

export const TAXONOMY_TOP_LEVEL_IDS = Object.keys(
  INTERNET_CULTURE_TAXONOMY,
) as TaxonomyTopLevel[];
