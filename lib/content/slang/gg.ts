import type { SlangEntry } from "@/types";

const entry: SlangEntry = {
  id: "s54",
  slug: "gg",
  title: "GG",
  category: "slang",
  description:
    "Gaming acronym for 'good game' — sportsmanship closer, resignation, or sarcastic salt depending on tone.",
  imageGradient: "from-emerald-400 via-teal-600 to-slate-800",
  scores: { relevance: 25, influence: 93, cringe: 25, brainrot: 20 },
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
    popularityNotes: "Relevance: Little recent creation activity detected. Signals: news/recent-articles=16 (Google News: 1 items in last 60d (26 returned) for “GG slang”) Influence: Permanent cultural impact is not changed by a dynamic refresh. Brainrot: Absurdity / cohort character cues still match the prior brainrot reading. Cringe: Not enough mockery / social-awkwardness signals to reassess cringe.",
    evidenceNotes: [
      "[wikipedia/search-interest] Wikimedia pageviews 30d=2,253 for “Chinese Internet slang”",
      "[wikipedia/editorial-trend] Pageviews WoW last7=468 prev7=463 (1%)",
      "[know-your-meme/authority-documentation] Know Your Meme entry located",
      "[know-your-meme/platform-activity] KYM entry exists; last-updated date not parseable",
      "[dictionary/authority-documentation] Wiktionary page “GG”",
      "[dictionary/platform-activity] Wiktionary last revision 2026-06-20",
      "[news/recent-articles] Google News: 1 items in last 60d (26 returned) for “GG slang”",
      "[creator-pages/recent-uploads] No YouTube channel_id URLs on entry sources — creator RSS skipped",
      "[authority-sources/authority-documentation] Know Your Meme cited; Dictionary / Britannica cited",
      "[google-trends/search-interest] Not on current Google US Trending RSS (10 topics) — not treated as zero search interest",
      "[google-trends/editorial-trend] Absence from daily trending list → not currently spiking",
      "[reddit/discussion-volume] Reddit search unavailable for “GG slang”",
      "[bluesky/discussion-volume] Bluesky search unavailable for \"GG slang\"",
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
      relevance: "Little recent creation activity detected. Signals: news/recent-articles=16 (Google News: 1 items in last 60d (26 returned) for “GG slang”)",
      influence: "Permanent cultural impact is not changed by a dynamic refresh.",
      brainrot: "Absurdity / cohort character cues still match the prior brainrot reading.",
      cringe: "Not enough mockery / social-awkwardness signals to reassess cringe.",
    },
  },
  addedAt: "2026-07-19",
  lastUpdated: "2026-08-16",
  historicalDate: "2003-01-18",
  views: 8500000,
  trendDirection: "stable",
  tags: ["gaming","classic","acronym","esports","chat"],
  definition:
    "GG means 'good game.' Typed at match end as polite sportsmanship, acknowledgment of defeat, or sarcastically after a stomp. Often paired with EZ as the rude variant 'gg ez.'",
  origin:
    "Competitive multiplayer chat culture; defined on Urban Dictionary by 2003 and documented across esports and forums as the default end-of-match phrase (Know Your Meme).",
  usageExamples: [
    "Lobby chat after a close match: 'gg'",
    "Resigning mid-match: 'gg wp'",
    "Sarcastic after a cheese win: 'gg'"
],
  relatedSlugs: ["ez","geeg","press-f-to-pay-respects","noob","git-gud","w-dub"],
  relationships: {
    "relatedSlang": [
        "ez",
        "geeg",
        "noob",
        "git-gud",
        "w-dub"
    ],
    "relatedTo": [
        "press-f-to-pay-respects"
    ],
    "community": [
        "ez",
        "geeg"
    ],
    "spawnedVariants": [
        "geeg"
    ]
},
  media: [
    {
        "role": "reference",
        "type": "embed",
        "url": "https://knowyourmeme.com/memes/gg",
        "title": "GG — Know Your Meme",
        "source": "Know Your Meme",
        "sourceUrl": "https://knowyourmeme.com/memes/gg",
        "platform": "knowyourmeme",
        "attribution": "Know Your Meme / Literally Media",
        "description": "Slang origin and usage documentation.",
        "date": "2003",
        "verified": false
    }
],
  sources: [
    {
        "title": "GG — Know Your Meme",
        "url": "https://knowyourmeme.com/memes/gg",
        "domain": "knowyourmeme.com"
    },
    {
        "title": "GG — Urban Dictionary",
        "url": "https://www.urbandictionary.com/define.php?term=GG",
        "domain": "urbandictionary.com"
    }
],
};

export default entry;
