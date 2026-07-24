/**
 * Cultural score documentation — four dimensions only.
 *
 * Why these four:
 * - Relevance  → answers “does this matter now?”
 * - Influence  → answers “did this shape culture?”
 * - Cringe     → answers “how is this received socially?”
 * - Brainrot   → answers “how chaotic / absurdist is it?”
 *
 * Avoid overcomplicated scoring. No blended mega-score, no live analytics
 * proxies disguised as encyclopedia truth.
 */

export const SCORE_DEFINITIONS = {
  relevance: {
    label: "Relevance",
    question: "How culturally current / actively discussed is this right now?",
    changesFrequently: true,
    evidence: [
      "Dynamic methodology (lib/dynamicMetadata) — search / discussion / platform / age signals",
      "Refresh Dynamic Metadata editorial action",
      "trendDirection as a soft catalog signal when live providers are unwired",
    ],
    doesNotMean: "Historical importance or lasting influence",
  },
  influence: {
    label: "Influence",
    question: "How much did this shape internet culture?",
    changesFrequently: false,
    evidence: [
      "Editorial scores.influence on the entry",
      "Authority documentation (Wikipedia / Know Your Meme) as research input when editing",
    ],
    doesNotMean: "This week's attention or view count",
  },
  cringe: {
    label: "Cringe",
    question: "How is this generally framed online?",
    changesFrequently: true,
    evidence: [
      "Dynamic methodology — mockery / outdatedness / ironic remix signals",
      "Refresh Dynamic Metadata editorial action",
    ],
    doesNotMean: "Personal dislike by encyclopedia editors",
  },
  brainrot: {
    label: "Brainrot",
    question: "How absurdist / chaotic is the associated content?",
    changesFrequently: true,
    evidence: [
      "Dynamic methodology — absurdity / remix / cohort / platform signals",
      "Refresh Dynamic Metadata editorial action",
    ],
    doesNotMean: "Importance or current relevance",
  },
} as const;

export type ScoreDefinitionKey = keyof typeof SCORE_DEFINITIONS;

/** Allowed keys on Scores — validation rejects anything else. */
export const ALLOWED_SCORE_KEYS = [
  "relevance",
  "influence",
  "cringe",
  "brainrot",
] as const;
