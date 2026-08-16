import type { EventEntry } from "@/types";

const entry: EventEntry = {
  id: "e23",
  slug: "myspace",
  title: "Myspace",
  category: "event",
  description:
    "The mid-2000s social network of Top 8s, profile songs, and HTML chaos — internet identity before Facebook flattened the feed.",
  imageGradient: "from-blue-700 via-sky-500 to-zinc-900",
  scores: { relevance: 40, influence: 90, cringe: 45, brainrot: 25 },
  dynamicMetadata: {
    lastReviewed: "2026-08-16",
    currentRelevance: 40,
    currentStatus: "occasionally-referenced",
    activePlatforms: [
      "news",
    ],
    popularity: 32,
    trendingScore: 32,
    recentRevival: "unknown",
    popularityNotes: "Relevance: Recent creation signals rose modestly. Signals: news/recent-articles=32 (Google News: 3 items in last 60d (40 returned) for “Myspace event”) Influence: Permanent cultural impact is not changed by a dynamic refresh. Brainrot: Absurdity / cohort character cues still match the prior brainrot reading. Cringe: Not enough mockery / social-awkwardness signals to reassess cringe.",
    evidenceNotes: [
      "[wikipedia/search-interest] No confident English Wikipedia match for “Myspace event”",
      "[know-your-meme/authority-documentation] Know Your Meme entry located",
      "[know-your-meme/platform-activity] KYM entry exists; last-updated date not parseable",
      "[dictionary/authority-documentation] No Wiktionary page for “Myspace”",
      "[news/recent-articles] Google News: 3 items in last 60d (40 returned) for “Myspace event”",
      "[creator-pages/recent-uploads] No YouTube channel_id URLs on entry sources — creator RSS skipped",
      "[authority-sources/authority-documentation] Wikipedia / Wikimedia cited; Know Your Meme cited",
      "[google-trends/search-interest] Not on current Google US Trending RSS (10 topics) — not treated as zero search interest",
      "[google-trends/editorial-trend] Absence from daily trending list → not currently spiking",
      "[reddit/discussion-volume] Reddit search unavailable for “Myspace event”",
      "[bluesky/discussion-volume] Bluesky search unavailable for \"Myspace event\"",
      "[youtube/recent-uploads] YOUTUBE_DATA_API_KEY not set — YouTube live search skipped",
      "Weak corroboration — blended heuristic (44) with AI double-check (35): Recent news, search trends, and platform activity are low, indicating only modest nostalgic interest despite strong historical documentation.",
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
      relevance: "Recent creation signals rose modestly. Signals: news/recent-articles=32 (Google News: 3 items in last 60d (40 returned) for “Myspace event”)",
      influence: "Permanent cultural impact is not changed by a dynamic refresh.",
      brainrot: "Absurdity / cohort character cues still match the prior brainrot reading.",
      cringe: "Not enough mockery / social-awkwardness signals to reassess cringe.",
    },
  },
  addedAt: "2026-07-19",
  lastUpdated: "2026-08-16",
  historicalDate: "2003-08-01",
  views: 4100000,
  trendDirection: "declining",
  tags: ["myspace","social media","2000s","platform","history"],
  platform: "Myspace",
  impact:
    "Taught a generation to build public identity online: custom CSS, profile music, friend rankings, and scene/emo aesthetics. Its peak and decline became the template for social-platform succession stories.",
  highlights: [
  "Myspace (MySpace) dominated global social networking around 2005–2008",
  "Top Friends / Top 8 drama and profile songs defined teen internet culture",
  "Custom HTML/CSS profiles made personal pages a creative medium",
  "Facebook's rise and ownership changes ended its cultural monopoly"
],
  relatedSlugs: ["tumblr","newgrounds","cringe","y2k-revival","twitter-x-transition"],
  relationships: {
  "sameEra": [
    "newgrounds",
    "tumblr"
  ],
  "relatedTo": [
    "cringe",
    "y2k-revival"
  ],
  "relatedEvent": [
    "twitter-x-transition"
  ]
},
  media: [
  {
    "role": "featured",
    "type": "image",
    "url": "https://upload.wikimedia.org/wikipedia/commons/2/20/MySpace_logo.svg",
    "title": "Myspace logo",
    "source": "Wikimedia Commons",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:MySpace_logo.svg",
    "platform": "wikimedia",
    "attribution": "Myspace / see Commons file page",
    "license": "See Commons file page",
    "description": "Official Myspace wordmark from Wikimedia Commons.",
    "date": "2003",
    "verified": false
  },
  {
    "role": "reference",
    "type": "embed",
    "url": "https://knowyourmeme.com/memes/sites/myspace",
    "title": "Myspace — Know Your Meme",
    "source": "Know Your Meme",
    "sourceUrl": "https://knowyourmeme.com/memes/sites/myspace",
    "platform": "knowyourmeme",
    "attribution": "Know Your Meme / Literally Media",
    "description": "Platform / culture documentation.",
    "date": "2003",
    "verified": false
  },
  {
    "role": "reference",
    "type": "embed",
    "url": "https://en.wikipedia.org/wiki/Myspace",
    "title": "Myspace — Wikipedia",
    "source": "Wikipedia",
    "sourceUrl": "https://en.wikipedia.org/wiki/Myspace",
    "platform": "other",
    "attribution": "Wikipedia contributors",
    "license": "CC BY-SA 4.0",
    "description": "Encyclopedic background.",
    "verified": false
  }
],
  sources: [
  {
    "title": "Myspace — Wikipedia",
    "url": "https://en.wikipedia.org/wiki/Myspace",
    "domain": "en.wikipedia.org"
  },
  {
    "title": "Myspace — Know Your Meme",
    "url": "https://knowyourmeme.com/memes/sites/myspace",
    "domain": "knowyourmeme.com"
  }
],
};

export default entry;
