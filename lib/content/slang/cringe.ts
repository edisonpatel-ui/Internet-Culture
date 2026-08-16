import type { SlangEntry } from "@/types";

const entry: SlangEntry = {
  id: "s29",
  slug: "cringe",
  title: "Cringe",
  category: "slang",
  description:
    "Something that provokes secondhand embarrassment — a word repurposed from physical flinching to describe awkward, try-hard, or socially unaware behavior online.",
  imageGradient: "from-yellow-500 via-amber-400 to-orange-400",
  scores: { relevance: 50, influence: 86, cringe: 68, brainrot: 35 },
  dynamicMetadata: {
    lastReviewed: "2026-08-16",
    currentRelevance: 50,
    currentStatus: "occasionally-referenced",
    activePlatforms: [
      "reddit",
      "youtube",
      "wikipedia",
      "news",
    ],
    popularity: 37,
    trendingScore: 45,
    recentRevival: false,
    popularityNotes: "Relevance: Recent creation looks limited versus active internet topics. Signals: news/recent-articles=37 (Google News: 4 items in last 60d (40 returned) for “Cringe slang”) Influence: Permanent cultural impact is not changed by a dynamic refresh. Brainrot: Absurdity / cohort character cues still match the prior brainrot reading. Cringe: Mockery or dated-perception signals suggest higher social cringe today.",
    evidenceNotes: [
      "[wikipedia/search-interest] Wikimedia pageviews 30d=23,408 for “Glossary of 2020s slang”",
      "[wikipedia/editorial-trend] Pageviews WoW last7=5560 prev7=5286 (5%)",
      "[know-your-meme/authority-documentation] Know Your Meme entry located",
      "[know-your-meme/platform-activity] KYM entry exists; last-updated date not parseable",
      "[dictionary/authority-documentation] Wiktionary page “Cringe”",
      "[dictionary/platform-activity] Wiktionary last revision 2026-05-11",
      "[news/recent-articles] Google News: 4 items in last 60d (40 returned) for “Cringe slang”",
      "[creator-pages/recent-uploads] No YouTube channel_id URLs on entry sources — creator RSS skipped",
      "[authority-sources/authority-documentation] Wikipedia / Wikimedia cited",
      "[google-trends/search-interest] Not on current Google US Trending RSS (10 topics) — not treated as zero search interest",
      "[google-trends/editorial-trend] Absence from daily trending list → not currently spiking",
      "[reddit/discussion-volume] Reddit search unavailable for “Cringe slang”",
      "[bluesky/discussion-volume] Bluesky search unavailable for \"Cringe slang\"",
      "[youtube/recent-uploads] YOUTUBE_DATA_API_KEY not set — YouTube live search skipped",
      "[catalog-evidence/mockery-signal] Tag mockery cue (cringe only, 2 matches)",
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
      relevance: "Recent creation looks limited versus active internet topics. Signals: news/recent-articles=37 (Google News: 4 items in last 60d (40 returned) for “Cringe slang”)",
      influence: "Permanent cultural impact is not changed by a dynamic refresh.",
      brainrot: "Absurdity / cohort character cues still match the prior brainrot reading.",
      cringe: "Mockery or dated-perception signals suggest higher social cringe today.",
    },
  },
  addedAt: "2026-07-17",
  lastUpdated: "2026-08-16",
  views: 2800000,
  trendDirection: "stable",
  tags: ["embarrassment", "humor", "reddit", "youtube", "reaction"],
  definition:
    "In internet culture, 'cringe' is an adjective, noun, and reaction describing something that makes you feel embarrassed on behalf of someone else. A 'cringe video' makes you physically uncomfortable to watch. 'That's cringe' dismisses something as socially awkward or try-hard. The cringe genre became formalized on Reddit (r/cringe, r/cringetopia), YouTube, and later TikTok. The term carries power dynamics — what is labeled 'cringe' often reflects social hierarchies and in-group/out-group distinctions. What is cringe to one community is authentic self-expression to another.",
  usageExamples: [
    "Someone over-explaining a joke after it doesn't land: 'So cringe I had to look away'",
    "'Watching myself on video is painful cringe, why do I talk like that'",
    "An influencer doing a fake candid moment: 'The cringe is off the charts'",
    "Mid-2000s MySpace posts resurfacing: 'Pure uncut cringe from 2007'",
  ],
  origin:
    "The verb 'cringe' (to recoil in embarrassment or disgust) has existed in English for centuries. Its internet-specific usage as an adjective for content that induces secondhand embarrassment grew on 4chan in the late 2000s and formalized on Reddit with subreddits dedicated to 'cringe culture' around 2010–2012. The term became a central concept in internet culture criticism and has since been applied broadly, including meta-debates about whether labeling things 'cringe' is itself cringe.",
  relatedSlugs: ["simp", "w-dub"],
  sources: [
    {
      title: "Cringe Culture — Wikipedia",
      url: "https://en.wikipedia.org/wiki/Cringe_culture",
      domain: "en.wikipedia.org",
    },
  ],
};

export default entry;
