import type { BaseEntry } from "@/types";

const entry: BaseEntry = {
  id: "t44",
  slug: "podcast-boom",
  title: "Podcast Boom",
  category: "trend",
  description:
    "Everyone got a mic — Serial to Joe Rogan to niche Patreon shows reshaping how people consume long-form talk.",
  imageGradient: "from-purple-800 via-violet-700 to-indigo-800",
  scores: { relevance: 39, influence: 85, cringe: 35, brainrot: 34 },
  dynamicMetadata: {
    lastReviewed: "2026-07-25",
    currentRelevance: 39,
    currentStatus: "classic",
    activePlatforms: [
      "youtube",
      "wikipedia",
      "news",
    ],
    popularity: 38,
    trendingScore: 43,
    recentRevival: false,
    popularityNotes: "Status: classic · Relevance 39 (today's recognition, not influence) · Trending 43 (recent attention)",
    evidenceNotes: [
      "[wikipedia/search-interest] Wikimedia pageviews 30d=3,262 for “Boomtown (podcast)”",
      "[wikipedia/editorial-trend] Pageviews WoW last7=750 prev7=678 (11%)",
      "[know-your-meme/authority-documentation] Know Your Meme entry located",
      "[know-your-meme/platform-activity] KYM entry exists; last-updated date not parseable",
      "[dictionary/authority-documentation] Wiktionary page “Podcast”",
      "[dictionary/platform-activity] Wiktionary last revision 2026-01-08",
      "[news/recent-articles] Google News: 10 items in last 30d (40 returned) for “Podcast Boom”",
      "[creator-pages/recent-uploads] No YouTube channel_id URLs on entry sources — creator RSS skipped",
      "[authority-sources/authority-documentation] Wikipedia / Wikimedia cited",
      "[google-trends/search-interest] Not on current Google US Trending RSS (10 topics) — not treated as zero search interest",
      "[google-trends/editorial-trend] Absence from daily trending list → not currently spiking",
      "[reddit/discussion-volume] Reddit search unavailable for “Podcast Boom”",
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
      "youtube",
      "catalog-evidence",
    ],
    usedCatalogFallback: false,
  },
  addedAt: "2026-07-23",
  lastUpdated: "2026-07-25",
  historicalDate: "2014-01-01",
  views: 2600000,
  trendDirection: "declining",
  tags: ["audio", "media", "spotify", "youtube", "2010s"],
  origin:
    "Serial (2014) proved narrative podcasting could be mass entertainment. Spotify, Apple, and YouTube poured billions into exclusives; Joe Rogan, Call Her Daddy, and true-crime networks defined the 2010s–2020s audio economy. Cheap mics and RSS feeds meant anyone could launch — for better or worse.",
  summary:
    "The podcast boom is long-form talk as background culture: commutes, gym, and parasocial intimacy with hosts. It feeds creator economy, political discourse, and clip farms on TikTok — three-hour episodes distilled to 30-second hot takes.",
  relatedSlugs: ["creator-economy", "youtube-creator-era", "streamer-culture", "influencer-culture"],
  sources: [
    {
      title: "Podcast — Wikipedia",
      url: "https://en.wikipedia.org/wiki/Podcast",
      domain: "en.wikipedia.org",
    },
    {
      title: "History of podcasting — Wikipedia",
      url: "https://en.wikipedia.org/wiki/History_of_podcasting",
      domain: "en.wikipedia.org",
    },
  ],
};

export default entry;
