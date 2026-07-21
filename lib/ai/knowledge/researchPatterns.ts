/**
 * Research patterns — category-specific research playbooks (RC3-D).
 */

export type ResearchPatternId =
  | "meme"
  | "slang"
  | "creator"
  | "platform"
  | "event"
  | "community";

export interface ResearchPattern {
  id: ResearchPatternId;
  label: string;
  recommendedSources: string[];
  verificationOrder: string[];
  commonPitfalls: string[];
  missingEvidenceWarnings: string[];
}

export const RESEARCH_PATTERNS: Record<ResearchPatternId, ResearchPattern> = {
  meme: {
    id: "meme",
    label: "Researching a meme",
    recommendedSources: [
      "Know Your Meme (with cited primaries)",
      "Wikimedia / original upload pages",
      "Contemporaneous forum/social posts",
      "Reputable explainers",
    ],
    verificationOrder: [
      "Identify the artifact",
      "Find earliest credible appearance",
      "Map template rules",
      "Trace platform path",
      "Note variants and decline/revival",
    ],
    commonPitfalls: [
      "Confusing popularizer with creator",
      "Using undated screenshot dumps as origin",
      "Ignoring format precursors",
    ],
    missingEvidenceWarnings: [
      "No dated first appearance",
      "Only secondary blogs without citations",
      "Conflicting origin stories unresolved",
    ],
  },
  slang: {
    id: "slang",
    label: "Researching slang",
    recommendedSources: [
      "Earliest public posts",
      "Dictionary updates",
      "Community glossaries",
      "Press explainers (late-stage only)",
    ],
    verificationOrder: [
      "Write a one-sentence definition",
      "Locate earliest uses",
      "Check meaning drift across platforms",
      "Confirm dictionary/mainstream stage if claimed",
    ],
    commonPitfalls: [
      "Urban Dictionary as sole source",
      "Assuming one sense worldwide",
      "Backdating from viral clips",
    ],
    missingEvidenceWarnings: [
      "No pre-viral examples",
      "Only celebrity usage known",
      "Homographs with unrelated meanings",
    ],
  },
  creator: {
    id: "creator",
    label: "Researching a creator",
    recommendedSources: [
      "Official channels",
      "Interviews",
      "Platform about pages",
      "Reputable profiles",
      "Primary uploads",
    ],
    verificationOrder: [
      "Confirm identity / channel ownership",
      "Career start milestones",
      "Signature formats",
      "Cultural influence (memes/slang they spawned)",
      "Sourced controversies only",
    ],
    commonPitfalls: [
      "Fan-wiki inflation",
      "Unverified follower counts as influence",
      "Collapsing multiple eras into one narrative",
    ],
    missingEvidenceWarnings: [
      "No primary channel link",
      "Influence claimed without derivatives",
      "Unsourced biography details",
    ],
  },
  platform: {
    id: "platform",
    label: "Researching a platform",
    recommendedSources: [
      "Official docs / blogs",
      "Launch coverage",
      "Academic/platform studies",
      "Creator testimonies",
    ],
    verificationOrder: [
      "Product identity",
      "Discovery model",
      "Cultural norms",
      "Historical role in meme/slang pipelines",
    ],
    commonPitfalls: [
      "Nostalgia bias",
      "Treating algorithm myths as facts",
      "US-only framing",
    ],
    missingEvidenceWarnings: [
      "No launch/peak window",
      "Culture claims without examples",
      "Unverified user-count legends",
    ],
  },
  event: {
    id: "event",
    label: "Researching an event",
    recommendedSources: [
      "Primary reporting",
      "Official statements",
      "Contemporaneous posts",
      "Later investigative pieces",
    ],
    verificationOrder: [
      "Time window",
      "Actors",
      "What happened",
      "Immediate impact",
      "Longer cultural aftermath",
    ],
    commonPitfalls: [
      "Collapsing rumor into fact",
      "Single partisan narrative",
      "Missing end date / outcome",
    ],
    missingEvidenceWarnings: [
      "Undated 'what happened'",
      "No primary sources",
      "Contradictory outcomes unresolved",
    ],
  },
  community: {
    id: "community",
    label: "Researching a community",
    recommendedSources: [
      "Primary community spaces (ethical observation)",
      "Lexicons",
      "Platform histories",
      "Outsider ethnography with caution",
    ],
    verificationOrder: [
      "Boundaries of the community",
      "Core platforms",
      "Language",
      "Content norms",
      "Crossover moments",
    ],
    commonPitfalls: [
      "Stereotype collapse",
      "One subreddit = whole community",
      "Extracting private spaces without care",
    ],
    missingEvidenceWarnings: [
      "No platform homes listed",
      "Language claims without examples",
      "No inside/outside distinction",
    ],
  },
};

export function getResearchPattern(id: ResearchPatternId): ResearchPattern {
  return RESEARCH_PATTERNS[id];
}
