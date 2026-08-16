import type { EventEntry } from "@/types";

const entry: EventEntry = {
  id: "e24",
  slug: "newgrounds",
  title: "Newgrounds",
  category: "event",
  description:
    "The Flash portal that incubated early web animation, games, and viral weirdness — from Tankmen to Numa Numa mirrors.",
  imageGradient: "from-yellow-400 via-orange-500 to-red-700",
  scores: { relevance: 25, influence: 84, cringe: 25, brainrot: 30 },
  dynamicMetadata: {
    lastReviewed: "2026-08-16",
    currentRelevance: 25,
    currentStatus: "classic",
    activePlatforms: [],
    popularity: 16,
    trendingScore: 16,
    recentRevival: "unknown",
    popularityNotes: "Relevance: Little recent creation activity detected. Signals: news/recent-articles=16 (Google News: 1 items in last 60d (7 returned) for “Newgrounds event”) Influence: Permanent cultural impact is not changed by a dynamic refresh. Brainrot: Absurdity / cohort character cues still match the prior brainrot reading. Cringe: Not enough mockery / social-awkwardness signals to reassess cringe.",
    evidenceNotes: [
      "[wikipedia/search-interest] No confident English Wikipedia match for “Newgrounds event”",
      "[know-your-meme/authority-documentation] Know Your Meme entry located",
      "[know-your-meme/platform-activity] KYM entry exists; last-updated date not parseable",
      "[dictionary/authority-documentation] No Wiktionary page for “Newgrounds”",
      "[news/recent-articles] Google News: 1 items in last 60d (7 returned) for “Newgrounds event”",
      "[creator-pages/recent-uploads] No YouTube channel_id URLs on entry sources — creator RSS skipped",
      "[authority-sources/authority-documentation] Wikipedia / Wikimedia cited; Know Your Meme cited",
      "[google-trends/search-interest] Not on current Google US Trending RSS (10 topics) — not treated as zero search interest",
      "[google-trends/editorial-trend] Absence from daily trending list → not currently spiking",
      "[reddit/discussion-volume] Reddit search unavailable for “Newgrounds event”",
      "[bluesky/discussion-volume] Bluesky search unavailable for \"Newgrounds event\"",
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
      relevance: "Little recent creation activity detected. Signals: news/recent-articles=16 (Google News: 1 items in last 60d (7 returned) for “Newgrounds event”)",
      influence: "Permanent cultural impact is not changed by a dynamic refresh.",
      brainrot: "Absurdity / cohort character cues still match the prior brainrot reading.",
      cringe: "Not enough mockery / social-awkwardness signals to reassess cringe.",
    },
  },
  addedAt: "2026-07-19",
  lastUpdated: "2026-08-16",
  historicalDate: "1995-07-06",
  views: 3600000,
  trendDirection: "declining",
  tags: ["newgrounds","flash","animation","games","platform"],
  platform: "Newgrounds",
  impact:
    "Gave amateur animators and game makers a fame ladder before YouTube. Flash culture, submissions, and reviews shaped early internet comedy and indie game careers.",
  highlights: [
  "Newgrounds became the defining late-90s/2000s Flash entertainment portal",
  "Community submissions + review system minted viral animations and games",
  "Hosted or amplified early viral moments tied to Flash and web comedy",
  "Survived the Flash death era by pivoting while keeping portal identity"
],
  relatedSlugs: ["numa-numa","charlie-the-unicorn","badger-badger-badger","end-of-ze-world","all-your-base-are-belong-to-us"],
  relationships: {
  "relatedTo": [
    "numa-numa",
    "charlie-the-unicorn",
    "badger-badger-badger",
    "end-of-ze-world",
    "all-your-base-are-belong-to-us"
  ],
  "sameEra": [
    "myspace"
  ],
  "community": [
    "numa-numa",
    "charlie-the-unicorn"
  ]
},
  media: [
  {
    "role": "featured",
    "type": "image",
    "url": "https://upload.wikimedia.org/wikipedia/commons/8/87/Newgrounds-logo.png",
    "title": "Newgrounds logo",
    "source": "Wikimedia Commons",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Newgrounds-logo.png",
    "platform": "wikimedia",
    "attribution": "Newgrounds / see Commons file page",
    "license": "See Commons file page",
    "description": "Newgrounds portal logo from Wikimedia Commons.",
    "date": "1995",
    "verified": false
  },
  {
    "role": "reference",
    "type": "embed",
    "url": "https://knowyourmeme.com/memes/sites/newgrounds",
    "title": "Newgrounds — Know Your Meme",
    "source": "Know Your Meme",
    "sourceUrl": "https://knowyourmeme.com/memes/sites/newgrounds",
    "platform": "knowyourmeme",
    "attribution": "Know Your Meme / Literally Media",
    "description": "Platform / culture documentation.",
    "date": "1995",
    "verified": false
  },
  {
    "role": "reference",
    "type": "embed",
    "url": "https://en.wikipedia.org/wiki/Newgrounds",
    "title": "Newgrounds — Wikipedia",
    "source": "Wikipedia",
    "sourceUrl": "https://en.wikipedia.org/wiki/Newgrounds",
    "platform": "other",
    "attribution": "Wikipedia contributors",
    "license": "CC BY-SA 4.0",
    "description": "Encyclopedic background.",
    "verified": false
  }
],
  sources: [
  {
    "title": "Newgrounds — Wikipedia",
    "url": "https://en.wikipedia.org/wiki/Newgrounds",
    "domain": "en.wikipedia.org"
  },
  {
    "title": "Newgrounds — Know Your Meme",
    "url": "https://knowyourmeme.com/memes/sites/newgrounds",
    "domain": "knowyourmeme.com"
  }
],
};

export default entry;
