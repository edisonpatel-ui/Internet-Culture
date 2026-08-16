import type { MemeEntry } from "@/types";

const entry: MemeEntry = {
  id: "m78",
  slug: "the-cake-is-a-lie",
  title: "The Cake Is a Lie",
  category: "meme",
  description:
    "Portal's graffiti promise of cake — the gaming catchphrase for bait rewards and false incentives.",
  imageGradient: "from-orange-300 via-rose-400 to-stone-700",
  scores: { relevance: 36, influence: 88, cringe: 21, brainrot: 32 },
  dynamicMetadata: {
    lastReviewed: "2026-08-16",
    currentRelevance: 36,
    currentStatus: "classic",
    activePlatforms: [
      "wikipedia",
      "news",
    ],
    popularity: 25,
    trendingScore: 32,
    recentRevival: false,
    popularityNotes: "Relevance: Recent creation signals rose modestly. Signals: news/recent-articles=25 (Google News: 2 items in last 60d (40 returned) for “The Cake Is a Lie”) Influence: Permanent cultural impact is not changed by a dynamic refresh. Brainrot: Absurdity / cohort character cues still match the prior brainrot reading. Cringe: Not enough mockery / social-awkwardness signals to reassess cringe.",
    evidenceNotes: [
      "[wikipedia/search-interest] Wikimedia pageviews 30d=5,967 for “The cake is a lie”",
      "[wikipedia/editorial-trend] Pageviews WoW last7=1342 prev7=1692 (-21%)",
      "[know-your-meme/authority-documentation] Know Your Meme entry located",
      "[know-your-meme/platform-activity] KYM entry exists; last-updated date not parseable",
      "[dictionary/authority-documentation] No Wiktionary page for “The”",
      "[news/recent-articles] Google News: 2 items in last 60d (40 returned) for “The Cake Is a Lie”",
      "[creator-pages/recent-uploads] No YouTube channel_id URLs on entry sources — creator RSS skipped",
      "[authority-sources/authority-documentation] Know Your Meme cited",
      "[google-trends/search-interest] Not on current Google US Trending RSS (10 topics) — not treated as zero search interest",
      "[google-trends/editorial-trend] Absence from daily trending list → not currently spiking",
      "[reddit/discussion-volume] Reddit search unavailable for “The Cake Is a Lie”",
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
      relevance: "Recent creation signals rose modestly. Signals: news/recent-articles=25 (Google News: 2 items in last 60d (40 returned) for “The Cake Is a Lie”)",
      influence: "Permanent cultural impact is not changed by a dynamic refresh.",
      brainrot: "Absurdity / cohort character cues still match the prior brainrot reading.",
      cringe: "Not enough mockery / social-awkwardness signals to reassess cringe.",
    },
  },
  addedAt: "2026-07-19",
  lastUpdated: "2026-08-16",
  historicalDate: "2007-10-10",
  views: 5400000,
  trendDirection: "declining",
  tags: ["gaming","portal","2007","catchphrase","valve"],
  meaning:
    "Graffiti in Portal warns that 'the cake is a lie' — the promised reward is fake. Online it means any dangling incentive, corporate promise, or bait-and-switch.",
  origin:
    "Valve's Portal (2007) hides the phrase in Rat Man dens; it escaped the game almost immediately onto forums, shirts, and image macros (Know Your Meme).",
  timeline: [
    {
        "date": "Oct 2007",
        "event": "Portal releases; cake graffiti becomes an instant meme"
    },
    {
        "date": "2008–10s",
        "event": "Phrase enters general internet slang beyond gamers"
    },
    {
        "date": "Later",
        "event": "Still used for any promised reward that will not arrive"
    }
],
  examples: [
    "Calling a scam giveaway 'the cake is a lie'",
    "Office jokes about performance-bonus cake",
    "Graffiti-style image macros quoting the line"
],
  relatedSlugs: ["arrow-to-the-knee","can-it-run-crysis","all-your-base-are-belong-to-us","do-a-barrel-roll"],
  relationships: {
    "sameEra": [
        "can-it-run-crysis",
        "arrow-to-the-knee"
    ],
    "relatedTo": [
        "all-your-base-are-belong-to-us",
        "do-a-barrel-roll"
    ]
},
  media: [
    {
        "role": "featured",
        "type": "image",
        "url": "https://i.kym-cdn.com/entries/icons/original/000/001/707/thecakeisalie.jpg",
        "title": "The Cake Is a Lie — Portal graffiti",
        "source": "Know Your Meme",
        "sourceUrl": "https://knowyourmeme.com/memes/the-cake-is-a-lie",
        "platform": "knowyourmeme",
        "attribution": "Know Your Meme / Literally Media",
        "description": "Defining Portal cake graffiti meme image.",
        "date": "2007",
        "verified": false
    },
    {
        "role": "reference",
        "type": "embed",
        "url": "https://knowyourmeme.com/memes/the-cake-is-a-lie",
        "title": "The Cake Is a Lie — Know Your Meme",
        "source": "Know Your Meme",
        "sourceUrl": "https://knowyourmeme.com/memes/the-cake-is-a-lie",
        "platform": "knowyourmeme",
        "attribution": "Know Your Meme / Literally Media",
        "description": "Origin and spread documentation.",
        "date": "2007",
        "verified": false
    }
],
  sources: [
    {
        "title": "The Cake Is a Lie — Know Your Meme",
        "url": "https://knowyourmeme.com/memes/the-cake-is-a-lie",
        "domain": "knowyourmeme.com"
    }
],
};

export default entry;
