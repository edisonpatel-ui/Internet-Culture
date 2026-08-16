import type { EventEntry } from "@/types";

const entry: EventEntry = {
  id: "e26",
  slug: "musical-ly",
  title: "Musical.ly",
  category: "event",
  description:
    "The lip-sync app that minted U.S. teen fame — then merged into TikTok and handed short-form culture its next engine.",
  imageGradient: "from-pink-500 via-fuchsia-600 to-violet-800",
  scores: { relevance: 44, influence: 84, cringe: 45, brainrot: 45 },
  dynamicMetadata: {
    lastReviewed: "2026-08-16",
    currentRelevance: 44,
    currentStatus: "occasionally-referenced",
    activePlatforms: [
      "tiktok",
      "news",
    ],
    popularity: 32,
    trendingScore: 32,
    recentRevival: "unknown",
    popularityNotes: "Relevance: Recent creation looks limited versus active internet topics. Signals: news/recent-articles=32 (Google News: 3 items in last 60d (40 returned) for “Musical.ly event”) Influence: Permanent cultural impact is not changed by a dynamic refresh. Brainrot: Character signals still mark this as strongly representative of chaotic internet brainrot culture. Cringe: Not enough mockery / social-awkwardness signals to reassess cringe.",
    evidenceNotes: [
      "[wikipedia/search-interest] No confident English Wikipedia match for “Musical.ly event”",
      "[know-your-meme/authority-documentation] Know Your Meme entry located",
      "[know-your-meme/platform-activity] KYM entry exists; last-updated date not parseable",
      "[dictionary/authority-documentation] No Wiktionary page for “Musical.ly”",
      "[news/recent-articles] Google News: 3 items in last 60d (40 returned) for “Musical.ly event”",
      "[creator-pages/recent-uploads] No YouTube channel_id URLs on entry sources — creator RSS skipped",
      "[authority-sources/authority-documentation] Wikipedia / Wikimedia cited; Know Your Meme cited",
      "[google-trends/search-interest] Not on current Google US Trending RSS (10 topics) — not treated as zero search interest",
      "[google-trends/editorial-trend] Absence from daily trending list → not currently spiking",
      "[reddit/discussion-volume] Reddit search unavailable for “Musical.ly event”",
      "[bluesky/discussion-volume] Bluesky search unavailable for \"Musical.ly event\"",
      "[youtube/recent-uploads] YOUTUBE_DATA_API_KEY not set — YouTube live search skipped",
      "[catalog-evidence/gen-cohort-adoption] Cohort cue from tags/title (brainrot character only)",
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
      relevance: "Recent creation looks limited versus active internet topics. Signals: news/recent-articles=32 (Google News: 3 items in last 60d (40 returned) for “Musical.ly event”)",
      influence: "Permanent cultural impact is not changed by a dynamic refresh.",
      brainrot: "Character signals still mark this as strongly representative of chaotic internet brainrot culture.",
      cringe: "Not enough mockery / social-awkwardness signals to reassess cringe.",
    },
  },
  addedAt: "2026-07-19",
  lastUpdated: "2026-08-16",
  historicalDate: "2014-04-01",
  views: 4400000,
  trendDirection: "declining",
  tags: ["musical.ly","tiktok","lip sync","2010s","platform"],
  platform: "Musical.ly",
  impact:
    "Normalized short lip-sync fame, creator duets, and teen influencer pipelines in the West. Its 2018 merger into TikTok transferred that audience into the app that would dominate 2020s meme culture.",
  highlights: [
  "Musical.ly popularized 15-second lip-sync videos among U.S. teens mid-2010s",
  "Built early fame for creators who later defined TikTok/mainstream influencer culture",
  "ByteDance merged Musical.ly into TikTok in August 2018",
  "Best understood as TikTok's Western on-ramp, not a footnote"
],
  relatedSlugs: ["tiktok-rise","short-form-takeover","charli-damelio","vine-shutdown","bereal-wave"],
  relationships: {
  "relatedEvent": [
    "tiktok-rise",
    "short-form-takeover",
    "vine-shutdown"
  ],
  "relatedTo": [
    "charli-damelio",
    "bereal-wave"
  ],
  "sameEra": [
    "vine-shutdown"
  ]
},
  media: [
  {
    "role": "featured",
    "type": "image",
    "url": "https://i.kym-cdn.com/entries/icons/original/000/024/859/music.jpg",
    "title": "Musical.ly — app documentation image",
    "source": "Know Your Meme",
    "sourceUrl": "https://knowyourmeme.com/memes/sites/musically",
    "platform": "knowyourmeme",
    "attribution": "Know Your Meme / Literally Media",
    "description": "Recognizable Musical.ly-era branding imagery.",
    "date": "2014",
    "verified": false
  },
  {
    "role": "reference",
    "type": "embed",
    "url": "https://knowyourmeme.com/memes/sites/musically",
    "title": "Musical.ly — Know Your Meme",
    "source": "Know Your Meme",
    "sourceUrl": "https://knowyourmeme.com/memes/sites/musically",
    "platform": "knowyourmeme",
    "attribution": "Know Your Meme / Literally Media",
    "description": "Platform / culture documentation.",
    "date": "2014",
    "verified": false
  },
  {
    "role": "reference",
    "type": "embed",
    "url": "https://en.wikipedia.org/wiki/Musical.ly",
    "title": "Musical.ly — Wikipedia",
    "source": "Wikipedia",
    "sourceUrl": "https://en.wikipedia.org/wiki/Musical.ly",
    "platform": "other",
    "attribution": "Wikipedia contributors",
    "license": "CC BY-SA 4.0",
    "description": "Encyclopedic background.",
    "verified": false
  }
],
  sources: [
  {
    "title": "Musical.ly — Wikipedia",
    "url": "https://en.wikipedia.org/wiki/Musical.ly",
    "domain": "en.wikipedia.org"
  },
  {
    "title": "Musical.ly — Know Your Meme",
    "url": "https://knowyourmeme.com/memes/sites/musically",
    "domain": "knowyourmeme.com"
  }
],
};

export default entry;
