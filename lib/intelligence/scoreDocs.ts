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
      "Editorial scores.relevance on the entry",
      "trendDirection as a soft editorial signal",
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
    changesFrequently: false,
    evidence: ["scores.cringe as cultural perception, not editorial taste"],
    doesNotMean: "Personal dislike by encyclopedia editors",
  },
  brainrot: {
    label: "Brainrot",
    question: "How absurdist / chaotic is the associated content?",
    changesFrequently: false,
    evidence: ["scores.brainrot"],
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
