import type { EventEntry } from "@/types";

const entry: EventEntry = {
  id: "e22",
  slug: "youtube-rewind",
  title: "YouTube Rewind",
  category: "event",
  description:
    "YouTube's annual year-in-review spectacle — from celebration of platform culture to the internet's favorite thing to hate-watch.",
  imageGradient: "from-red-600 via-rose-600 to-zinc-900",
  scores: { relevance: 36, influence: 80, cringe: 70, brainrot: 40 },
  dynamicMetadata: {
    lastReviewed: "2026-08-16",
    currentRelevance: 36,
    currentStatus: "classic",
    activePlatforms: [
      "youtube",
      "wikipedia",
      "news",
    ],
    popularity: 25,
    trendingScore: 40,
    recentRevival: false,
    popularityNotes: "Relevance: Little recent creation activity detected. Signals: news/recent-articles=25 (Google News: 2 items in last 60d (40 returned) for “YouTube Rewind”) Influence: Permanent cultural impact is not changed by a dynamic refresh. Brainrot: Absurdity / cohort character cues still match the prior brainrot reading. Cringe: Not enough mockery / social-awkwardness signals to reassess cringe.",
    evidenceNotes: [
      "[wikipedia/search-interest] Wikimedia pageviews 30d=5,148 for “YouTube Rewind”",
      "[wikipedia/editorial-trend] Pageviews WoW last7=1146 prev7=1079 (6%)",
      "[know-your-meme/authority-documentation] Know Your Meme entry located",
      "[know-your-meme/platform-activity] KYM entry exists; last-updated date not parseable",
      "[dictionary/authority-documentation] Wiktionary page “YouTube”",
      "[dictionary/platform-activity] Wiktionary last revision 2026-07-05",
      "[news/recent-articles] Google News: 2 items in last 60d (40 returned) for “YouTube Rewind”",
      "[creator-pages/recent-uploads] No YouTube channel_id URLs on entry sources — creator RSS skipped",
      "[authority-sources/authority-documentation] Wikipedia / Wikimedia cited; Know Your Meme cited",
      "[google-trends/search-interest] Not on current Google US Trending RSS (10 topics) — not treated as zero search interest",
      "[google-trends/editorial-trend] Absence from daily trending list → not currently spiking",
      "[reddit/discussion-volume] Reddit search unavailable for “YouTube Rewind”",
      "[bluesky/discussion-volume] Bluesky search unavailable for \"YouTube Rewind\"",
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
      relevance: "Little recent creation activity detected. Signals: news/recent-articles=25 (Google News: 2 items in last 60d (40 returned) for “YouTube Rewind”)",
      influence: "Permanent cultural impact is not changed by a dynamic refresh.",
      brainrot: "Absurdity / cohort character cues still match the prior brainrot reading.",
      cringe: "Not enough mockery / social-awkwardness signals to reassess cringe.",
    },
  },
  addedAt: "2026-07-19",
  lastUpdated: "2026-08-16",
  historicalDate: "2012-12-01",
  views: 5200000,
  trendDirection: "stable",
  tags: ["youtube","rewind","creators","2012","annual"],
  platform: "YouTube",
  impact:
    "Turned YouTube's year into a monoculture event: who got featured, which memes were blessed, and eventually how out-of-touch the montage felt. Rewind 2018 became a landmark 'most disliked' culture story and shifted how the platform talks about its own creators.",
  highlights: [
  "YouTube Rewind launched as an annual montage of viral moments and creators",
  "Mid-2010s Rewinds featured massive creator cameos and dance numbers",
  "Rewind 2018 drew historic dislike ratios and backlash for tone-deaf meme handling",
  "Later years scaled back or paused as YouTube rethought the format"
],
  relatedSlugs: ["mrbeast","pewdiepie","charlie-bit-my-finger","annoying-orange","gangnam-style"],
  relationships: {
  "popularizedBy": [
    "mrbeast",
    "pewdiepie"
  ],
  "relatedTo": [
    "charlie-bit-my-finger",
    "annoying-orange",
    "gangnam-style"
  ],
  "community": [
    "mrbeast",
    "pewdiepie"
  ]
},
  media: [
  {
    "role": "featured",
    "type": "image",
    "url": "https://i.kym-cdn.com/entries/icons/original/000/024/927/ytrewind.jpg",
    "title": "YouTube Rewind — series still",
    "source": "Know Your Meme",
    "sourceUrl": "https://knowyourmeme.com/memes/youtube-rewind",
    "platform": "knowyourmeme",
    "attribution": "Know Your Meme / Literally Media",
    "description": "Recognizable YouTube Rewind promotional imagery.",
    "date": "2012",
    "verified": false
  },
  {
    "role": "reference",
    "type": "embed",
    "url": "https://knowyourmeme.com/memes/youtube-rewind",
    "title": "YouTube Rewind — Know Your Meme",
    "source": "Know Your Meme",
    "sourceUrl": "https://knowyourmeme.com/memes/youtube-rewind",
    "platform": "knowyourmeme",
    "attribution": "Know Your Meme / Literally Media",
    "description": "Platform / culture documentation.",
    "date": "2012",
    "verified": false
  },
  {
    "role": "reference",
    "type": "embed",
    "url": "https://en.wikipedia.org/wiki/YouTube_Rewind",
    "title": "YouTube Rewind — Wikipedia",
    "source": "Wikipedia",
    "sourceUrl": "https://en.wikipedia.org/wiki/YouTube_Rewind",
    "platform": "other",
    "attribution": "Wikipedia contributors",
    "license": "CC BY-SA 4.0",
    "description": "Encyclopedic background.",
    "verified": false
  }
],
  sources: [
  {
    "title": "YouTube Rewind — Wikipedia",
    "url": "https://en.wikipedia.org/wiki/YouTube_Rewind",
    "domain": "en.wikipedia.org"
  },
  {
    "title": "YouTube Rewind — Know Your Meme",
    "url": "https://knowyourmeme.com/memes/youtube-rewind",
    "domain": "knowyourmeme.com"
  }
],
};

export default entry;
