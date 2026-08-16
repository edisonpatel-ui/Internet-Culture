import type { SlangEntry } from "@/types";

const entry: SlangEntry = {
  id: "s52",
  slug: "noob",
  title: "Noob",
  category: "slang",
  description:
    "Pejorative for a new or unskilled player — from 'newbie,' written n00b in classic leetspeak.",
  imageGradient: "from-green-500 via-lime-600 to-zinc-800",
  scores: { relevance: 25, influence: 88, cringe: 43, brainrot: 25 },
  dynamicMetadata: {
    lastReviewed: "2026-08-16",
    currentRelevance: 25,
    currentStatus: "classic",
    activePlatforms: [
      "wikipedia",
    ],
    popularity: 16,
    trendingScore: 34,
    recentRevival: false,
    popularityNotes: "Relevance: Little recent creation activity detected. Signals: news/recent-articles=16 (Google News: 1 items in last 60d (40 returned) for “Noob slang”) Influence: Permanent cultural impact is not changed by a dynamic refresh. Brainrot: Absurdity / cohort character cues still match the prior brainrot reading. Cringe: Not enough mockery / social-awkwardness signals to reassess cringe.",
    evidenceNotes: [
      "[wikipedia/search-interest] Wikimedia pageviews 30d=575 for “Owned (slang)”",
      "[wikipedia/editorial-trend] Pageviews WoW last7=120 prev7=119 (1%)",
      "[know-your-meme/authority-documentation] Know Your Meme entry located",
      "[know-your-meme/platform-activity] KYM entry exists; last-updated date not parseable",
      "[dictionary/authority-documentation] Wiktionary page “Noob”",
      "[dictionary/platform-activity] Wiktionary last revision 2026-05-11",
      "[news/recent-articles] Google News: 1 items in last 60d (40 returned) for “Noob slang”",
      "[creator-pages/recent-uploads] No YouTube channel_id URLs on entry sources — creator RSS skipped",
      "[authority-sources/authority-documentation] Know Your Meme cited",
      "[google-trends/search-interest] Not on current Google US Trending RSS (10 topics) — not treated as zero search interest",
      "[google-trends/editorial-trend] Absence from daily trending list → not currently spiking",
      "[reddit/discussion-volume] Reddit search unavailable for “Noob slang”",
      "[bluesky/discussion-volume] Bluesky search unavailable for \"Noob slang\"",
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
      relevance: "Little recent creation activity detected. Signals: news/recent-articles=16 (Google News: 1 items in last 60d (40 returned) for “Noob slang”)",
      influence: "Permanent cultural impact is not changed by a dynamic refresh.",
      brainrot: "Absurdity / cohort character cues still match the prior brainrot reading.",
      cringe: "Not enough mockery / social-awkwardness signals to reassess cringe.",
    },
  },
  addedAt: "2026-07-19",
  lastUpdated: "2026-08-16",
  historicalDate: "1990-01-01",
  views: 7200000,
  trendDirection: "stable",
  tags: ["gaming","classic","leet","slang","newcomer"],
  definition:
    "Noob (also newbie, n00b) labels someone as inexperienced — especially in games or tech. Can describe a true newcomer or insult someone playing poorly regardless of tenure.",
  origin:
    "From 'newbie' in early online communities and MUDs; 'noob'/'n00b' leetspeak variants became standard gaming insults through the 1990s–2000s (Know Your Meme).",
  usageExamples: [
    "Stop noob-tubing with the grenade launcher",
    "I'm still a noob at this MOBA — go easy",
    "Calling out 'noob mistake' after a basic misplay"
],
  relatedSlugs: ["git-gud","gg","ez","lag","leeroy-jenkins"],
  relationships: {
    "relatedSlang": [
        "git-gud",
        "gg",
        "ez",
        "lag"
    ],
    "relatedTo": [
        "leeroy-jenkins"
    ],
    "community": [
        "git-gud",
        "gg"
    ]
},
  media: [
    {
        "role": "featured",
        "type": "image",
        "url": "https://i.kym-cdn.com/entries/icons/original/000/001/304/n00b.png",
        "title": "Noob — classic n00b graphic",
        "source": "Know Your Meme",
        "sourceUrl": "https://knowyourmeme.com/memes/noob",
        "platform": "knowyourmeme",
        "attribution": "Know Your Meme / Literally Media",
        "description": "Classic leetspeak n00b imagery associated with the term.",
        "date": "1990",
        "verified": false
    },
    {
        "role": "reference",
        "type": "embed",
        "url": "https://knowyourmeme.com/memes/noob",
        "title": "Noob — Know Your Meme",
        "source": "Know Your Meme",
        "sourceUrl": "https://knowyourmeme.com/memes/noob",
        "platform": "knowyourmeme",
        "attribution": "Know Your Meme / Literally Media",
        "description": "Slang origin and usage documentation.",
        "date": "1990",
        "verified": false
    }
],
  sources: [
    {
        "title": "Noob — Know Your Meme",
        "url": "https://knowyourmeme.com/memes/noob",
        "domain": "knowyourmeme.com"
    }
],
};

export default entry;
