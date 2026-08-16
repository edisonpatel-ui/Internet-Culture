import type { SlangEntry } from "@/types";

const entry: SlangEntry = {
  id: "s55",
  slug: "fomo",
  title: "FOMO",
  category: "slang",
  description:
    "Fear of missing out — the social anxiety that keeps you refreshing Stories, streaks, and drop calendars.",
  imageGradient: "from-yellow-400 via-orange-500 to-rose-500",
  scores: { relevance: 74, influence: 85, cringe: 40, brainrot: 25 },
  dynamicMetadata: {
    lastReviewed: "2026-08-16",
    currentRelevance: 74,
    currentStatus: "current",
    activePlatforms: [
      "wikipedia",
      "news",
    ],
    popularity: 58,
    trendingScore: 56,
    recentRevival: false,
    popularityNotes: "Relevance: Creation volume is not peaking, but new content is still being produced regularly. Signals: news/recent-articles=58 (Google News: 12 items in last 60d (40 returned) for “FOMO slang”) Influence: Permanent cultural impact is not changed by a dynamic refresh. Brainrot: Absurdity / cohort character cues still match the prior brainrot reading. Cringe: Not enough mockery / social-awkwardness signals to reassess cringe.",
    evidenceNotes: [
      "[wikipedia/search-interest] Wikimedia pageviews 30d=23,408 for “Glossary of 2020s slang”",
      "[wikipedia/editorial-trend] Pageviews WoW last7=5560 prev7=5286 (5%)",
      "[know-your-meme/authority-documentation] Know Your Meme entry located",
      "[know-your-meme/platform-activity] KYM entry exists; last-updated date not parseable",
      "[dictionary/authority-documentation] Wiktionary page “FOMO”",
      "[dictionary/platform-activity] Wiktionary last revision 2026-05-04",
      "[news/recent-articles] Google News: 12 items in last 60d (40 returned) for “FOMO slang”",
      "[creator-pages/recent-uploads] No YouTube channel_id URLs on entry sources — creator RSS skipped",
      "[authority-sources/authority-documentation] Know Your Meme cited; Wikipedia / Wikimedia cited",
      "[google-trends/search-interest] Not on current Google US Trending RSS (10 topics) — not treated as zero search interest",
      "[google-trends/editorial-trend] Absence from daily trending list → not currently spiking",
      "[reddit/discussion-volume] Reddit search unavailable for “FOMO slang”",
      "[bluesky/discussion-volume] Bluesky search unavailable for \"FOMO slang\"",
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
      relevance: "Creation volume is not peaking, but new content is still being produced regularly. Signals: news/recent-articles=58 (Google News: 12 items in last 60d (40 returned) for “FOMO slang”)",
      influence: "Permanent cultural impact is not changed by a dynamic refresh.",
      brainrot: "Absurdity / cohort character cues still match the prior brainrot reading.",
      cringe: "Not enough mockery / social-awkwardness signals to reassess cringe.",
    },
  },
  addedAt: "2026-07-19",
  lastUpdated: "2026-08-16",
  historicalDate: "2004-01-01",
  views: 5200000,
  trendDirection: "stable",
  tags: ["slang","anxiety","social media","acronym","consumer"],
  definition:
    "FOMO means fear of missing out: anxiety that others are having rewarding experiences without you. Online it drives streak maintenance, limited drops, live events, and compulsive checking.",
  origin:
    "Popularized in early-2000s student/marketing discourse and later mainstreamed with social media feeds; documented as internet slang and psychology crossover term (Know Your Meme, Wikipedia).",
  usageExamples: [
  "I only opened the app out of FOMO",
  "Drop culture runs on FOMO",
  "Streaks are just FOMO with a counter"
],
  relatedSlugs: ["snapchat-culture","instagram-culture","dupe-economy","bereal-wave","unboxing-culture"],
  relationships: {
  "relatedTo": [
    "snapchat-culture",
    "instagram-culture",
    "dupe-economy",
    "bereal-wave",
    "unboxing-culture"
  ],
  "community": [
    "snapchat-culture",
    "instagram-culture"
  ]
},
  media: [
  {
    "role": "featured",
    "type": "image",
    "url": "https://i.kym-cdn.com/entries/icons/original/000/016/685/fomo.jpg",
    "title": "FOMO — meme documentation cover",
    "source": "Know Your Meme",
    "sourceUrl": "https://knowyourmeme.com/memes/fomo",
    "platform": "knowyourmeme",
    "attribution": "Know Your Meme / Literally Media",
    "description": "KYM cover imagery for FOMO slang documentation.",
    "date": "2004",
    "verified": false
  },
  {
    "role": "reference",
    "type": "embed",
    "url": "https://knowyourmeme.com/memes/fomo",
    "title": "FOMO — Know Your Meme",
    "source": "Know Your Meme",
    "sourceUrl": "https://knowyourmeme.com/memes/fomo",
    "platform": "knowyourmeme",
    "attribution": "Know Your Meme / Literally Media",
    "description": "Slang documentation.",
    "date": "2004",
    "verified": false
  },
  {
    "role": "reference",
    "type": "embed",
    "url": "https://en.wikipedia.org/wiki/Fear_of_missing_out",
    "title": "FOMO — Wikipedia",
    "source": "Wikipedia",
    "sourceUrl": "https://en.wikipedia.org/wiki/Fear_of_missing_out",
    "platform": "other",
    "attribution": "Wikipedia contributors",
    "license": "CC BY-SA 4.0",
    "description": "Encyclopedic background.",
    "verified": false
  }
],
  sources: [
  {
    "title": "FOMO — Know Your Meme",
    "url": "https://knowyourmeme.com/memes/fomo",
    "domain": "knowyourmeme.com"
  },
  {
    "title": "FOMO — Wikipedia",
    "url": "https://en.wikipedia.org/wiki/Fear_of_missing_out",
    "domain": "en.wikipedia.org"
  }
],
};

export default entry;
