import type { BaseEntry } from "@/types";

const entry: BaseEntry = {
  id: "t25",
  slug: "reddit-culture",
  title: "Reddit Culture",
  category: "trend",
  description:
    "Upvotes, subreddits, AMAs, and hive-mind humor — the forum that turns niche interests into front-page events.",
  imageGradient: "from-orange-500 via-red-500 to-zinc-800",
  scores: { relevance: 34, influence: 90, cringe: 75, brainrot: 41 },
  dynamicMetadata: {
    lastReviewed: "2026-07-25",
    currentRelevance: 34,
    currentStatus: "historical",
    activePlatforms: [
      "reddit",
      "news",
    ],
    popularity: 37,
    trendingScore: 31,
    recentRevival: "unknown",
    popularityNotes: "Status: historical · Relevance 34 (today's recognition, not influence) · Trending 31 (recent attention)",
    evidenceNotes: [
      "[wikipedia/search-interest] No confident English Wikipedia match for “Reddit Culture”",
      "[know-your-meme/authority-documentation] Know Your Meme entry located",
      "[know-your-meme/platform-activity] KYM entry exists; last-updated date not parseable",
      "[dictionary/authority-documentation] Wiktionary page “Reddit”",
      "[dictionary/platform-activity] Wiktionary last revision 2026-06-15",
      "[news/recent-articles] Google News: 3 items in last 30d (40 returned) for “Reddit Culture”",
      "[creator-pages/recent-uploads] No YouTube channel_id URLs on entry sources — creator RSS skipped",
      "[authority-sources/authority-documentation] Wikipedia / Wikimedia cited",
      "[google-trends/search-interest] Not on current Google US Trending RSS (10 topics) — not treated as zero search interest",
      "[google-trends/editorial-trend] Absence from daily trending list → not currently spiking",
      "[reddit/discussion-volume] Reddit search unavailable for “Reddit Culture”",
      "[youtube/recent-uploads] YOUTUBE_DATA_API_KEY not set — YouTube live search skipped",
      "[catalog-evidence/absurdity] Tag/category absurdity cue (not used for relevance/trending)",
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
  historicalDate: "2005-06-01",
  views: 4300000,
  trendDirection: "declining",
  tags: ["reddit","forums","upvote","amememe","communities"],
  origin:
    "Founded 2005, Reddit organized the internet into subreddits with voting as taste-making. Culture includes karma, cake days, raid energy, meme export to the rest of the web, and moments like the GameStop saga (Wikipedia: Reddit).",
  summary:
    "Distinct from 4chan's anonymity: pseudonymous communities with moderation norms and massive meme laundering. Connected to dupe discourse, AITA-style genres, and financial-meme events.",
  relatedSlugs: ["4chan","gamestop-wallstreetbets","doge","rickroll","dupe-economy"],
  relationships: {
  "relatedTo": [
    "4chan",
    "doge",
    "rickroll",
    "dupe-economy"
  ],
  "relatedEvent": [
    "gamestop-wallstreetbets",
    "4chan"
  ],
  "sameEra": [
    "4chan"
  ]
},
  media: [
  {
    "role": "featured",
    "type": "image",
    "url": "https://upload.wikimedia.org/wikipedia/commons/b/b4/Reddit_logo.svg",
    "title": "Reddit logo",
    "source": "Wikimedia Commons",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Reddit_logo.svg",
    "platform": "wikimedia",
    "attribution": "Reddit Inc. (see Commons file page)",
    "license": "See Commons file page",
    "description": "Reddit alien/mark for the platform culture entry.",
    "date": "2005",
    "verified": false
  },
  {
    "role": "reference",
    "type": "embed",
    "url": "https://en.wikipedia.org/wiki/Reddit",
    "title": "Reddit Culture — Wikipedia",
    "source": "Wikipedia",
    "sourceUrl": "https://en.wikipedia.org/wiki/Reddit",
    "platform": "other",
    "attribution": "Wikipedia contributors",
    "license": "CC BY-SA 4.0",
    "description": "Encyclopedic background.",
    "verified": false
  }
],
  sources: [
  {
    "title": "Reddit Culture — Wikipedia",
    "url": "https://en.wikipedia.org/wiki/Reddit",
    "domain": "en.wikipedia.org"
  }
],
};

export default entry;
