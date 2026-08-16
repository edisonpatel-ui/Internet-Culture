import type { SlangEntry } from "@/types";

const entry: SlangEntry = {
  id: "s80",
  slug: "stan",
  title: "Stan",
  category: "slang",
  description:
    "An obsessive, loyal fan — from Eminem's stalker anthem to verb form for wholehearted support.",
  imageGradient: "from-purple-600 via-fuchsia-600 to-pink-600",
  scores: { relevance: 0, influence: 43, cringe: 60, brainrot: 25 },
  dynamicMetadata: {
    lastReviewed: "2026-08-16",
    currentRelevance: 0,
    currentStatus: "historical",
    activePlatforms: [
      "x",
      "wikipedia",
    ],
    popularity: 0,
    trendingScore: 27,
    recentRevival: false,
    popularityNotes: "Relevance: Little recent creation activity detected. Signals: news/recent-articles=0 (Google News: 0 items in last 60d (40 returned) for “Stan slang”) Influence: Permanent cultural impact is not changed by a dynamic refresh. Brainrot: Absurdity / cohort character cues still match the prior brainrot reading. Cringe: Not enough mockery / social-awkwardness signals to reassess cringe.",
    evidenceNotes: [
      "[wikipedia/search-interest] Wikimedia pageviews 30d=23,408 for “Glossary of 2020s slang”",
      "[wikipedia/editorial-trend] Pageviews WoW last7=5560 prev7=5286 (5%)",
      "[know-your-meme/authority-documentation] Know Your Meme entry located",
      "[know-your-meme/platform-activity] KYM entry exists; last-updated date not parseable",
      "[dictionary/authority-documentation] Wiktionary page “Stan”",
      "[dictionary/platform-activity] Wiktionary last revision 2026-05-09",
      "[news/recent-articles] Google News: 0 items in last 60d (40 returned) for “Stan slang”",
      "[creator-pages/recent-uploads] No YouTube channel_id URLs on entry sources — creator RSS skipped",
      "[authority-sources/authority-documentation] Wikipedia / Wikimedia cited",
      "[google-trends/search-interest] Not on current Google US Trending RSS (10 topics) — not treated as zero search interest",
      "[google-trends/editorial-trend] Absence from daily trending list → not currently spiking",
      "[reddit/discussion-volume] Reddit search unavailable for “Stan slang”",
      "[bluesky/discussion-volume] Bluesky search unavailable for \"Stan slang\"",
      "[youtube/recent-uploads] YOUTUBE_DATA_API_KEY not set — YouTube live search skipped",
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
      relevance: "Little recent creation activity detected. Signals: news/recent-articles=0 (Google News: 0 items in last 60d (40 returned) for “Stan slang”)",
      influence: "Permanent cultural impact is not changed by a dynamic refresh.",
      brainrot: "Absurdity / cohort character cues still match the prior brainrot reading.",
      cringe: "Not enough mockery / social-awkwardness signals to reassess cringe.",
    },
  },
  addedAt: "2026-07-23",
  lastUpdated: "2026-08-16",
  historicalDate: "2000-01-01",
  views: 3200000,
  trendDirection: "declining",
  tags: ["fandom", "music", "twitter", "k-pop", "2000s"],
  definition:
    "As a noun, a stan is a devoted fan who knows every detail and defends their favorite fiercely. As a verb, 'I stan' means enthusiastic support ('I stan this album'). It sits between casual fan and unhealthy obsession — context decides if it is pride or warning. Stan culture includes fan wars, fancams, and streaming parties.",
  origin:
    "Eminem's 2000 track 'Stan' told the story of an dangerously obsessed fan named Stan. Online music forums adopted the name; Twitter stan armies crystallized the behavior in the 2010s, especially around pop and K-pop. 'Stan Twitter' became its own ecosystem of drama, shipping, and coordinated promotion.",
  usageExamples: [
    "I am not a fan, I am a stan — I bought three copies.",
    "She stans that group so hard she learned Korean.",
    "Stan wars in the replies ruined another innocent tweet.",
  ],
  relatedSlugs: ["stan-twitter-culture", "ship", "receipts", "iconic"],
  relationships: {
    relatedSlang: ["stan-twitter-culture"],
    community: ["k-pop-fandom-wars"],
  },
  sources: [
    {
      title: "Stan (slang) — Wikipedia",
      url: "https://en.wikipedia.org/wiki/Stan_(slang)",
      domain: "en.wikipedia.org",
    },
  ],
};

export default entry;
