import type { BaseEntry } from "@/types";

const entry: BaseEntry = {
  id: "t27",
  slug: "snapchat-culture",
  title: "Snapchat Culture",
  category: "trend",
  description:
    "Streaks, Stories, Bitmoji, and ephemeral selfies — the app that taught Gen Z disappearing photos and FOMO counters.",
  imageGradient: "from-yellow-300 via-yellow-400 to-zinc-900",
  scores: { relevance: 59, influence: 83, cringe: 35, brainrot: 32 },
  dynamicMetadata: {
    lastReviewed: "2026-07-25",
    currentRelevance: 33,
    currentStatus: "classic",
    activePlatforms: [
      "wikipedia",
    ],
    popularity: 39,
    trendingScore: 20,
    recentRevival: false,
    popularityNotes: "Status: classic · Relevance 33 (today's recognition, not influence) · Trending 20 (recent attention)",
    evidenceNotes: [
      "[wikipedia/search-interest] Wikimedia pageviews 30d=3,962 for “Internet culture”",
      "[wikipedia/editorial-trend] Pageviews WoW last7=835 prev7=858 (-3%)",
      "[know-your-meme/authority-documentation] Know Your Meme entry located",
      "[know-your-meme/platform-activity] KYM entry exists; last-updated date not parseable",
      "[dictionary/authority-documentation] Wiktionary page “Snapchat”",
      "[dictionary/platform-activity] Wiktionary last revision 2026-06-19",
      "[news/recent-articles] Google News: 0 items in last 30d (40 returned) for “Snapchat Culture”",
      "[creator-pages/recent-uploads] No YouTube channel_id URLs on entry sources — creator RSS skipped",
      "[authority-sources/authority-documentation] Wikipedia / Wikimedia cited",
      "[google-trends/search-interest] Not on current Google US Trending RSS (10 topics) — not treated as zero search interest",
      "[google-trends/editorial-trend] Absence from daily trending list → not currently spiking",
      "[reddit/discussion-volume] Reddit search unavailable for “Snapchat Culture”",
      "[youtube/recent-uploads] YOUTUBE_DATA_API_KEY not set — YouTube live search skipped",
      "[catalog-evidence/gen-cohort-adoption] Cohort cue from tags (not used for relevance/trending)",
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
      "youtube",
      "catalog-evidence",
    ],
    usedCatalogFallback: false,
  },
  addedAt: "2026-07-19",
  lastUpdated: "2026-07-25",
  historicalDate: "2011-09-01",
  views: 2800000,
  trendDirection: "declining",
  tags: ["snapchat","stories","streaks","gen z","ephemeral"],
  origin:
    "Snapchat (2011) made ephemeral messaging mainstream, then Stories (later copied by Instagram). Streaks gamified friendship maintenance; filters and Bitmoji shaped selfie culture (Wikipedia: Snapchat).",
  summary:
    "A platform culture of impermanence and daily obligation (streaks). Important precursor to Stories-everywhere and to teenage private-graph social life distinct from public Instagram grids.",
  relatedSlugs: ["instagram-culture","fomo","tiktok-rise","musical-ly","bereal-wave"],
  relationships: {
  "relatedTo": [
    "instagram-culture",
    "fomo",
    "bereal-wave"
  ],
  "relatedEvent": [
    "tiktok-rise",
    "musical-ly",
    "bereal-wave"
  ],
  "relatedSlang": [
    "fomo"
  ]
},
  media: [
  {
    "role": "reference",
    "type": "embed",
    "url": "https://en.wikipedia.org/wiki/Snapchat",
    "title": "Snapchat Culture — Wikipedia",
    "source": "Wikipedia",
    "sourceUrl": "https://en.wikipedia.org/wiki/Snapchat",
    "platform": "other",
    "attribution": "Wikipedia contributors",
    "license": "CC BY-SA 4.0",
    "description": "Encyclopedic background.",
    "verified": false
  }
],
  sources: [
  {
    "title": "Snapchat Culture — Wikipedia",
    "url": "https://en.wikipedia.org/wiki/Snapchat",
    "domain": "en.wikipedia.org"
  }
],
};

export default entry;
