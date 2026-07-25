import type { BaseEntry } from "@/types";

const entry: BaseEntry = {
  id: "t21",
  slug: "creator-economy",
  title: "Creator Economy",
  category: "trend",
  description:
    "The internet economy where individuals monetize audiences — ads, memberships, merch, brand deals — and platforms compete to host them.",
  imageGradient: "from-violet-500 via-fuchsia-600 to-amber-400",
  scores: { relevance: 44, influence: 92, cringe: 20, brainrot: 41 },
  dynamicMetadata: {
    lastReviewed: "2026-07-25",
    currentRelevance: 44,
    currentStatus: "classic",
    activePlatforms: [
      "youtube",
      "tiktok",
      "twitch",
      "wikipedia",
      "news",
    ],
    popularity: 39,
    trendingScore: 55,
    recentRevival: false,
    popularityNotes: "Status: classic · Relevance 44 (today's recognition, not influence) · Trending 55 (recent attention)",
    evidenceNotes: [
      "[wikipedia/search-interest] Wikimedia pageviews 30d=2,611 for “Creator economy”",
      "[wikipedia/editorial-trend] Pageviews WoW last7=473 prev7=477 (-1%)",
      "[know-your-meme/authority-documentation] Know Your Meme entry located",
      "[know-your-meme/platform-activity] KYM entry exists; last-updated date not parseable",
      "[dictionary/authority-documentation] Wiktionary page “Creator”",
      "[dictionary/platform-activity] Wiktionary last revision 2026-05-13",
      "[news/recent-articles] Google News: 37 items in last 30d (40 returned) for “Creator Economy”",
      "[creator-pages/recent-uploads] No YouTube channel_id URLs on entry sources — creator RSS skipped",
      "[authority-sources/authority-documentation] Wikipedia / Wikimedia cited",
      "[google-trends/search-interest] Not on current Google US Trending RSS (10 topics) — not treated as zero search interest",
      "[google-trends/editorial-trend] Absence from daily trending list → not currently spiking",
      "[reddit/discussion-volume] Reddit search unavailable for “Creator Economy”",
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
  historicalDate: "2010-01-01",
  views: 4200000,
  trendDirection: "declining",
  tags: ["creator economy","youtube","tiktok","twitch","monetization"],
  origin:
    "Named in tech/business discourse of the late 2010s, the creator economy describes how YouTube, Twitch, TikTok, Patreon, and similar platforms turned audience attention into livelihoods. Culturally it reframed 'hobby content' as career infrastructure (Wikipedia: Creator economy).",
  summary:
    "Umbrella for how internet fame became a job market: AdSense eras, SubStack newsletters, TikTok Shop, Twitch subs. Related to influencer culture (the social performance) but focused on the economic system underneath.",
  relatedSlugs: ["influencer-culture","youtube-creator-era","streamer-culture","tiktok-rise","influencer-marketing","mrbeast"],
  relationships: {
  "relatedTo": [
    "influencer-culture",
    "youtube-creator-era",
    "streamer-culture",
    "influencer-marketing",
    "mrbeast"
  ],
  "relatedEvent": [
    "tiktok-rise",
    "youtube-rewind"
  ],
  "community": [
    "influencer-culture",
    "streamer-culture"
  ]
},
  media: [
  {
    "role": "featured",
    "type": "image",
    "url": "https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg",
    "title": "YouTube logo — creator-economy platform mark",
    "source": "Wikimedia Commons",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:YouTube_Logo_2017.svg",
    "platform": "wikimedia",
    "attribution": "Google / YouTube (see Commons file page)",
    "license": "See Commons file page",
    "description": "YouTube mark representing the platform that pioneered scalable creator monetization.",
    "date": "2010",
    "verified": false
  },
  {
    "role": "reference",
    "type": "embed",
    "url": "https://en.wikipedia.org/wiki/Creator_economy",
    "title": "Creator Economy — Wikipedia",
    "source": "Wikipedia",
    "sourceUrl": "https://en.wikipedia.org/wiki/Creator_economy",
    "platform": "other",
    "attribution": "Wikipedia contributors",
    "license": "CC BY-SA 4.0",
    "description": "Encyclopedic background.",
    "verified": false
  }
],
  sources: [
  {
    "title": "Creator Economy — Wikipedia",
    "url": "https://en.wikipedia.org/wiki/Creator_economy",
    "domain": "en.wikipedia.org"
  }
],
};

export default entry;
