import type { SlangEntry } from "@/types";

const entry: SlangEntry = {
  id: "s11",
  slug: "based",
  title: "Based",
  category: "slang",
  description:
    "Holding an opinion confidently without caring about social approval — used online as high praise.",
  imageGradient: "from-blue-700 via-blue-500 to-sky-400",
  scores: { relevance: 5, influence: 78, cringe: 35, brainrot: 42 },
  dynamicMetadata: {
    lastReviewed: "2026-08-16",
    currentRelevance: 5,
    currentStatus: "historical",
    activePlatforms: [
      "wikipedia",
    ],
    popularity: 0,
    trendingScore: 25,
    recentRevival: false,
    popularityNotes: "Relevance: Little recent creation activity detected. Signals: news/recent-articles=0 (Google News: 0 items in last 60d (40 returned) for “Based slang”) Influence: Permanent cultural impact is not changed by a dynamic refresh. Brainrot: Absurdity / cohort character cues still match the prior brainrot reading. Cringe: Not enough mockery / social-awkwardness signals to reassess cringe.",
    evidenceNotes: [
      "[wikipedia/search-interest] Wikimedia pageviews 30d=4,379 for “Internet slang”",
      "[wikipedia/editorial-trend] Pageviews WoW last7=982 prev7=998 (-2%)",
      "[know-your-meme/authority-documentation] Know Your Meme entry located",
      "[know-your-meme/platform-activity] KYM entry exists; last-updated date not parseable",
      "[dictionary/authority-documentation] No Wiktionary page for “Based”",
      "[news/recent-articles] Google News: 0 items in last 60d (40 returned) for “Based slang”",
      "[creator-pages/recent-uploads] No YouTube channel_id URLs on entry sources — creator RSS skipped",
      "[authority-sources/authority-documentation] No Wikipedia / KYM / dictionary / major-news URLs on entry sources",
      "[google-trends/search-interest] Not on current Google US Trending RSS (10 topics) — not treated as zero search interest",
      "[google-trends/editorial-trend] Absence from daily trending list → not currently spiking",
      "[reddit/discussion-volume] Reddit search unavailable for “Based slang”",
      "[bluesky/discussion-volume] Bluesky search unavailable for \"Based slang\"",
      "[youtube/recent-uploads] YOUTUBE_DATA_API_KEY not set — YouTube live search skipped",
      "Weak corroboration — blended heuristic (0) with AI double-check (10): Sparse recent activity, no news coverage, low Google Trends and declining Wikipedia views indicate the slang 'Based' is currently not popular.",
    ],
    providersUsed: [
      "wikipedia",
      "know-your-meme",
      "dictionary",
      "news",
      "creator-pages",
      "authority-sources",
      "google-trends",
      "reddit",
      "bluesky",
      "youtube",
      "catalog-evidence",
    ],
    usedCatalogFallback: false,
    scoreReasons: {
      relevance: "Little recent creation activity detected. Signals: news/recent-articles=0 (Google News: 0 items in last 60d (40 returned) for “Based slang”)",
      influence: "Permanent cultural impact is not changed by a dynamic refresh.",
      brainrot: "Absurdity / cohort character cues still match the prior brainrot reading.",
      cringe: "Not enough mockery / social-awkwardness signals to reassess cringe.",
    },
  },
  addedAt: "2026-07-16",
  lastUpdated: "2026-08-16",
  historicalDate: "2010-01-01",
  views: 680000,
  trendDirection: "declining",
  tags: ["4chan", "lil b", "opinion", "internet culture", "slang"],
  definition:
    "Describes someone who expresses an authentic or unconventional opinion without concern for social approval or peer pressure. Can be used sincerely (high praise) or ironically. Opposite of 'cringe' in internet culture scoring.",
  origin:
    "Originally used by rapper Lil B 'The BasedGod' around 2009–2010 as a positive self-description meaning authentic and free-spirited. 4chan later adopted the term to describe someone who holds opinions independent of others' approval.",
  usageExamples: [
    "Respectfully, this take is incredibly based",
    "Based and redpilled (ironic combination phrase)",
    "He just said vegetables are overrated — based",
  ],
  relatedSlugs: ["sigma", "no-cap", "sus", "pepe", "rage-comics"],
  relationships: {
    relatedSlang: ["sigma", "no-cap", "sus"],
    relatedTo: ["pepe", "rage-comics"],
  },
  sources: [
    {
      title: "based — Wiktionary",
      url: "https://en.wiktionary.org/wiki/based",
      domain: "en.wiktionary.org",
    },
  ],
};

export default entry;
