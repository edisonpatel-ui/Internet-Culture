import type { BaseEntry } from "@/types";

const entry: BaseEntry = {
  id: "t21",
  slug: "creator-economy",
  title: "Creator Economy",
  category: "trend",
  description:
    "The internet economy where individuals monetize audiences — ads, memberships, merch, brand deals — and platforms compete to host them.",
  imageGradient: "from-violet-500 via-fuchsia-600 to-amber-400",
  scores: { relevance: 81, influence: 90, cringe: 20, brainrot: 45 },
  dynamicMetadata: {
    lastReviewed: "2026-08-16",
    currentRelevance: 81,
    currentStatus: "highly-active",
    activePlatforms: [
      "youtube",
      "tiktok",
      "twitch",
      "wikipedia",
      "news",
    ],
    popularity: 83,
    trendingScore: 69,
    recentRevival: false,
    popularityNotes: "Relevance: Ongoing new posts/uploads/discussion support steady Current Relevance. Signals: news/recent-articles=83 (Google News: 37 items in last 60d (40 returned) for “Creator Economy”) Influence: Permanent cultural impact is not changed by a dynamic refresh. Brainrot: Character signals still mark this as strongly representative of chaotic internet brainrot culture. Cringe: Not enough mockery / social-awkwardness signals to reassess cringe.",
    evidenceNotes: [
      "[wikipedia/search-interest] Wikimedia pageviews 30d=1,897 for “Creator economy”",
      "[wikipedia/editorial-trend] Pageviews WoW last7=456 prev7=421 (8%)",
      "[know-your-meme/authority-documentation] Know Your Meme entry located",
      "[know-your-meme/platform-activity] KYM entry exists; last-updated date not parseable",
      "[dictionary/authority-documentation] Wiktionary page “Creator”",
      "[dictionary/platform-activity] Wiktionary last revision 2026-05-13",
      "[news/recent-articles] Google News: 37 items in last 60d (40 returned) for “Creator Economy”",
      "[creator-pages/recent-uploads] No YouTube channel_id URLs on entry sources — creator RSS skipped",
      "[authority-sources/authority-documentation] Wikipedia / Wikimedia cited",
      "[google-trends/search-interest] Not on current Google US Trending RSS (10 topics) — not treated as zero search interest",
      "[google-trends/editorial-trend] Absence from daily trending list → not currently spiking",
      "[reddit/discussion-volume] Reddit search unavailable for “Creator Economy”",
      "[bluesky/discussion-volume] Bluesky search unavailable for \"Creator Economy\"",
      "[youtube/recent-uploads] YOUTUBE_DATA_API_KEY not set — YouTube live search skipped",
      "[catalog-evidence/gen-cohort-adoption] Cohort cue from tags/title (brainrot character only)",
      "Weak corroboration — blended heuristic (100) with AI double-check (62): News coverage is strong but search interest and trends are modest, so the creator‑economy is moderately popular rather than at a peak.",
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
      relevance: "Ongoing new posts/uploads/discussion support steady Current Relevance. Signals: news/recent-articles=83 (Google News: 37 items in last 60d (40 returned) for “Creator Economy”)",
      influence: "Permanent cultural impact is not changed by a dynamic refresh.",
      brainrot: "Character signals still mark this as strongly representative of chaotic internet brainrot culture.",
      cringe: "Not enough mockery / social-awkwardness signals to reassess cringe.",
    },
  },
  addedAt: "2026-07-19",
  lastUpdated: "2026-08-16",
  historicalDate: "2010-01-01",
  views: 4200000,
  trendDirection: "rising",
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
