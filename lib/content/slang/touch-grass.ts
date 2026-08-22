import type { SlangEntry } from "@/types";

const entry: SlangEntry = {
  id: "s32",
  slug: "touch-grass",
  title: "Touch Grass",
  category: "slang",
  description:
    "'Touch grass' is a dismissal telling someone to go outside and experience the real world — used when someone is clearly spending too much time online or getting too worked up about internet events.",
  imageGradient: "from-green-500 via-lime-400 to-emerald-400",
  scores: { relevance: 80, influence: 75, cringe: 50, brainrot: 50 },
  dynamicMetadata: {
    lastReviewed: "2026-08-16",
    currentRelevance: 97,
    currentStatus: "highly-active",
    activePlatforms: [
      "reddit",
      "x",
      "wikipedia",
      "news",
    ],
    popularity: 77,
    trendingScore: 65,
    recentRevival: false,
    popularityNotes: "Relevance: Ongoing new posts/uploads/discussion support steady Current Relevance. Signals: news/recent-articles=77 (Google News: 28 items in last 60d (40 returned) for “Touch Grass”) Influence: Permanent cultural impact is not changed by a dynamic refresh. Brainrot: Absurdity / cohort character cues still match the prior brainrot reading. Cringe: Not enough mockery / social-awkwardness signals to reassess cringe.",
    evidenceNotes: [
      "[wikipedia/search-interest] Wikimedia pageviews 30d=23,408 for “Glossary of 2020s slang”",
      "[wikipedia/editorial-trend] Pageviews WoW last7=5560 prev7=5286 (5%)",
      "[know-your-meme/authority-documentation] Know Your Meme entry located",
      "[know-your-meme/platform-activity] KYM entry exists; last-updated date not parseable",
      "[dictionary/authority-documentation] Wiktionary page “Touch”",
      "[dictionary/platform-activity] Wiktionary last revision 2026-05-11",
      "[news/recent-articles] Google News: 28 items in last 60d (40 returned) for “Touch Grass”",
      "[creator-pages/recent-uploads] No YouTube channel_id URLs on entry sources — creator RSS skipped",
      "[authority-sources/authority-documentation] No Wikipedia / KYM / dictionary / major-news URLs on entry sources",
      "[google-trends/search-interest] Google Trending RSS unavailable",
      "[reddit/discussion-volume] Reddit search unavailable for “Touch Grass”",
      "[bluesky/discussion-volume] Bluesky search unavailable for \"Touch Grass\"",
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
      relevance: "Ongoing new posts/uploads/discussion support steady Current Relevance. Signals: news/recent-articles=77 (Google News: 28 items in last 60d (40 returned) for “Touch Grass”)",
      influence: "Permanent cultural impact is not changed by a dynamic refresh.",
      brainrot: "Absurdity / cohort character cues still match the prior brainrot reading.",
      cringe: "Not enough mockery / social-awkwardness signals to reassess cringe.",
    },
  },
  addedAt: "2026-07-17",
  lastUpdated: "2026-08-16",
  views: 1500000,
  trendDirection: "rising",
  tags: ["dismissal", "internet", "outside", "reddit", "twitter", "2020"],
  definition:
    "A blunt directive — 'touch grass' — telling someone to get offline, go outside, and reconnect with the physical world. It implies the target is so deep in internet culture or so agitated about something purely online that they have lost touch with reality. The 'grass' being literal — dewy, actual outdoor grass — underlines the irony: this is the most basic real-world experience. Often deployed as a final, conversation-ending response when someone is too invested in an online debate.",
  usageExamples: [
    "Someone tweets 47 consecutive times about a fandom drama: 'You need to touch grass right now'",
    "Having a meltdown over a fictional character: 'Touch grass' (as a full reply)",
    "'I haven't been outside in five days' → 'Brother go touch some grass'",
    "As self-deprecating humor: 'I spent six hours in a Discord argument about fonts, I need to touch grass'",
  ],
  origin:
    "The phrase rose to prominence on Reddit and Twitter around 2020–2021, coinciding with COVID lockdowns that literally kept people inside and online for extended periods. The concept — 'go interact with the real world' — predates internet slang, but the specific 'touch grass' phrasing became a consistent meme format in this period. It captures the post-pandemic awareness of how extreme internet consumption had become, and the self-aware humor of online communities telling each other to log off.",
  relatedSlugs: ["ratio", "cringe", "unc"],
  sources: [
    {
      title: "Touch — Wiktionary",
      url: "https://en.wiktionary.org/wiki/Touch",
      domain: "en.wiktionary.org",
    },
  ],
};

export default entry;
