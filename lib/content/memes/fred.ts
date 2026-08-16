import type { MemeEntry } from "@/types";

const entry: MemeEntry = {
  id: "m87",
  slug: "fred",
  title: "Fred",
  category: "meme",
  description:
    "Lucas Cruikshank's high-pitched Fred Figglehorn — early YouTube's hyperactive kid character who crossed into Nickelodeon movies.",
  imageGradient: "from-orange-400 via-amber-500 to-red-600",
  scores: { relevance: 44, influence: 68, cringe: 50, brainrot: 34 },
  dynamicMetadata: {
    lastReviewed: "2026-08-16",
    currentRelevance: 44,
    currentStatus: "occasionally-referenced",
    activePlatforms: [
      "youtube",
      "wikipedia",
      "news",
    ],
    popularity: 32,
    trendingScore: 43,
    recentRevival: false,
    popularityNotes: "Relevance: Recent creation signals rose modestly. Signals: news/recent-articles=32 (Google News: 3 items in last 60d (40 returned) for “Fred meme”) Influence: Permanent cultural impact is not changed by a dynamic refresh. Brainrot: Absurdity / cohort character cues still match the prior brainrot reading. Cringe: Not enough mockery / social-awkwardness signals to reassess cringe.",
    evidenceNotes: [
      "[wikipedia/search-interest] Wikimedia pageviews 30d=15,679 for “List of Internet phenomena”",
      "[wikipedia/editorial-trend] Pageviews WoW last7=3905 prev7=3683 (6%)",
      "[know-your-meme/authority-documentation] Know Your Meme entry located",
      "[know-your-meme/platform-activity] KYM entry exists; last-updated date not parseable",
      "[dictionary/authority-documentation] Wiktionary page “Fred”",
      "[dictionary/platform-activity] Wiktionary last revision 2025-12-04",
      "[news/recent-articles] Google News: 3 items in last 60d (40 returned) for “Fred meme”",
      "[creator-pages/recent-uploads] No YouTube channel_id URLs on entry sources — creator RSS skipped",
      "[authority-sources/authority-documentation] Know Your Meme cited",
      "[google-trends/search-interest] Not on current Google US Trending RSS (10 topics) — not treated as zero search interest",
      "[google-trends/editorial-trend] Absence from daily trending list → not currently spiking",
      "[reddit/discussion-volume] Reddit search unavailable for “Fred meme”",
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
    scoreReasons: {
      relevance: "Recent creation signals rose modestly. Signals: news/recent-articles=32 (Google News: 3 items in last 60d (40 returned) for “Fred meme”)",
      influence: "Permanent cultural impact is not changed by a dynamic refresh.",
      brainrot: "Absurdity / cohort character cues still match the prior brainrot reading.",
      cringe: "Not enough mockery / social-awkwardness signals to reassess cringe.",
    },
  },
  addedAt: "2026-07-19",
  lastUpdated: "2026-08-16",
  historicalDate: "2006-01-01",
  views: 3900000,
  trendDirection: "stable",
  tags: ["youtube","fred","2006","character","classic"],
  meaning:
    "A squeaky-voiced, chaotic kid character (Fred Figglehorn) whose catchphrases and orange aesthetic defined a slice of late-2000s kid YouTube — loved by fans, grating to critics.",
  origin:
    "Lucas Cruikshank launched the Fred character on YouTube in the mid-2000s; the channel became a massive youth hit and later spun into Nickelodeon films (Know Your Meme).",
  timeline: [
  {
    "date": "Mid-2000s",
    "event": "Fred Figglehorn videos take off on YouTube"
  },
  {
    "date": "2009–11",
    "event": "Nickelodeon Fred movies expand the character offline"
  },
  {
    "date": "2010s+",
    "event": "Remembered as peak early kid-YouTube character comedy"
  }
],
  examples: [
  "Imitating Fred's high-pitched scream as a joke",
  "Nostalgia posts about late-2000s kid YouTube",
  "Comparing modern kidfluencers to the Fred era"
],
  relatedSlugs: ["annoying-orange","shoes","evolution-of-dance","youtube-rewind"],
  relationships: {
  "sameEra": [
    "annoying-orange",
    "shoes",
    "evolution-of-dance"
  ],
  "relatedEvent": [
    "youtube-rewind"
  ],
  "relatedTo": [
    "annoying-orange"
  ]
},
  media: [
  {
    "role": "featured",
    "type": "image",
    "url": "https://i.kym-cdn.com/entries/icons/original/000/007/329/qqAQM.png",
    "title": "Fred Figglehorn — character still",
    "source": "Know Your Meme",
    "sourceUrl": "https://knowyourmeme.com/memes/people/fred-lucas-cruikshank",
    "platform": "knowyourmeme",
    "attribution": "Know Your Meme / Literally Media",
    "description": "Defining Fred / Lucas Cruikshank YouTube character imagery.",
    "date": "2006",
    "verified": false
  },
  {
    "role": "reference",
    "type": "embed",
    "url": "https://knowyourmeme.com/memes/people/fred-lucas-cruikshank",
    "title": "Fred — Know Your Meme",
    "source": "Know Your Meme",
    "sourceUrl": "https://knowyourmeme.com/memes/people/fred-lucas-cruikshank",
    "platform": "knowyourmeme",
    "attribution": "Know Your Meme / Literally Media",
    "description": "Origin and spread documentation.",
    "date": "2006",
    "verified": false
  }
],
  sources: [
  {
    "title": "Fred — Know Your Meme",
    "url": "https://knowyourmeme.com/memes/people/fred-lucas-cruikshank",
    "domain": "knowyourmeme.com"
  }
],
};

export default entry;
