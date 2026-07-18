/**
 * Cultural score documentation — single source of truth for what each score means.
 *
 * IMPORTANT SEPARATION:
 * - Cultural Impact  = historical importance ("how much did this shape internet culture?")
 * - Current Relevance = present-day attention ("how much does this matter / get discussed today?")
 *
 * Never blend these into one number. Legacy `scores.relevance` on entries is treated as an
 * ambiguous prior and is decomposed by lib/intelligence/culturalScores.ts.
 */

export const SCORE_DEFINITIONS = {
  relevanceScore: {
    label: "Current Relevance",
    question: "How much attention does this receive today?",
    changesFrequently: true,
    evidence: [
      "trendDirection (rising / new / stable / declining)",
      "Age of the cultural moment (older + declining → lower current relevance)",
      "Site views band (weak proxy until live analytics exist)",
      "Optional SCORE_CALIBRATION overrides",
      "Future: Google Trends, platform discussion volume, recent search interest",
    ],
    doesNotMean: "Historical importance or all-time influence",
  },
  culturalImpactScore: {
    label: "Legacy Impact",
    question: "How historically important is this to internet culture?",
    changesFrequently: false,
    evidence: [
      "Era / historicalDate age (sustained recognition of landmark moments)",
      "Classic / legacy tags",
      "Authority citations (Wikipedia, Know Your Meme, dictionaries)",
      "scores.influence when explicitly set",
      "Optional SCORE_CALIBRATION overrides",
      "Legacy scores.relevance used only as a soft prior for impact — not as current attention",
    ],
    doesNotMean: "How viral it is this week",
  },
  searchInterestScore: {
    label: "Search Interest",
    question: "How much discovery / demand pressure exists right now?",
    changesFrequently: true,
    evidence: [
      "Current relevance band",
      "Catalog popularity / views proxy",
      "Rising / new trendDirection boost",
      "Future: real search volume APIs",
    ],
    doesNotMean: "Historical importance",
  },
  culturalInfluenceScore: {
    label: "Cultural Influence",
    question: "How many later ideas did this shape or enable?",
    changesFrequently: false,
    evidence: [
      "Legacy impact score",
      "Longevity / recognition over time",
      "Optional SCORE_CALIBRATION overrides",
    ],
    doesNotMean: "This week's view count",
  },
  popularityScore: {
    label: "Popularity",
    question: "How widely known / visited is this entry in our catalog signals?",
    changesFrequently: true,
    evidence: [
      "scores.popularity when set",
      "Log-scaled views (placeholder until real analytics)",
      "Future: platform follower reach, search volume",
    ],
    doesNotMean: "Cultural importance by itself",
  },
  longevityScore: {
    label: "Longevity",
    question: "Will people still recognize this years later?",
    changesFrequently: false,
    evidence: [
      "scores.longevity when set",
      "Classic/legacy tags and age",
      "Stable recognition despite declining trend spikes",
      "Temporary viral tags (gen alpha flash trends) lower expected longevity",
    ],
    doesNotMean: "Current weekly hype",
  },
  cringeLevel: {
    label: "Cringe (perception)",
    question: "How is this generally framed online?",
    changesFrequently: false,
    evidence: ["scores.cringe as cultural perception, not editorial taste"],
    doesNotMean: "Personal dislike by encyclopedia editors",
  },
  brainrotScore: {
    label: "Brainrot",
    question: "How absurdist / chaotic is the associated content?",
    changesFrequently: false,
    evidence: ["scores.brainrot"],
    doesNotMean: "Importance or current relevance",
  },
} as const;

export type ScoreDefinitionKey = keyof typeof SCORE_DEFINITIONS;
