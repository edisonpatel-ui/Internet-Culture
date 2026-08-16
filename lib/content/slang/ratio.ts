import type { SlangEntry } from "@/types";

const entry: SlangEntry = {
  id: "s33",
  slug: "ratio",
  title: "Ratio",
  category: "slang",
  description:
    "On X (formerly Twitter), when a reply gets significantly more likes or engagement than the original post — the reply has 'ratioed' the original, signaling broad disagreement with the tweet.",
  imageGradient: "from-blue-500 via-sky-400 to-cyan-400",
  scores: { relevance: 25, influence: 73, cringe: 62, brainrot: 41 },
  dynamicMetadata: {
    lastReviewed: "2026-08-16",
    currentRelevance: 25,
    currentStatus: "classic",
    activePlatforms: [
      "x",
      "wikipedia",
    ],
    popularity: 16,
    trendingScore: 35,
    recentRevival: false,
    popularityNotes: "Relevance: Little recent creation activity detected. Signals: news/recent-articles=16 (Google News: 1 items in last 60d (40 returned) for “Ratio slang”) Influence: Permanent cultural impact is not changed by a dynamic refresh. Brainrot: Absurdity / cohort character cues still match the prior brainrot reading. Cringe: Not enough mockery / social-awkwardness signals to reassess cringe.",
    evidenceNotes: [
      "[wikipedia/search-interest] Wikimedia pageviews 30d=23,408 for “Glossary of 2020s slang”",
      "[wikipedia/editorial-trend] Pageviews WoW last7=5560 prev7=5286 (5%)",
      "[know-your-meme/authority-documentation] Know Your Meme entry located",
      "[know-your-meme/platform-activity] KYM entry exists; last-updated date not parseable",
      "[dictionary/authority-documentation] Wiktionary page “Ratio”",
      "[dictionary/platform-activity] Wiktionary last revision 2026-02-23",
      "[news/recent-articles] Google News: 1 items in last 60d (40 returned) for “Ratio slang”",
      "[creator-pages/recent-uploads] No YouTube channel_id URLs on entry sources — creator RSS skipped",
      "[authority-sources/authority-documentation] No Wikipedia / KYM / dictionary / major-news URLs on entry sources",
      "[google-trends/search-interest] Not on current Google US Trending RSS (10 topics) — not treated as zero search interest",
      "[google-trends/editorial-trend] Absence from daily trending list → not currently spiking",
      "[reddit/discussion-volume] Reddit search unavailable for “Ratio slang”",
      "[bluesky/discussion-volume] Bluesky search unavailable for \"Ratio slang\"",
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
      relevance: "Little recent creation activity detected. Signals: news/recent-articles=16 (Google News: 1 items in last 60d (40 returned) for “Ratio slang”)",
      influence: "Permanent cultural impact is not changed by a dynamic refresh.",
      brainrot: "Absurdity / cohort character cues still match the prior brainrot reading.",
      cringe: "Not enough mockery / social-awkwardness signals to reassess cringe.",
    },
  },
  addedAt: "2026-07-17",
  lastUpdated: "2026-08-16",
  views: 1800000,
  trendDirection: "stable",
  tags: ["twitter", "x", "social-media", "reply", "engagement", "2019"],
  definition:
    "To 'ratio' someone is to have your reply receive more likes than their original tweet — a public metric of community disagreement. A 'ratio' (used as a noun: 'getting a ratio') indicates a post is so bad or wrong that the engagement on the pushback exceeds the original. Posting just 'ratio' as a reply became a strategy to actively try to ratio someone — essentially rallying others to like the reply over the original. The concept is specific to platforms where likes are publicly displayed on both tweets and replies. A clean ratio is considered a form of public humiliation.",
  usageExamples: [
    "A company's dismissive tweet gets 500 likes and the angry reply gets 50,000 likes: 'Absolute ratio'",
    "Replying 'ratio' alone as a challenge: 'you're wrong and I'm calling it'",
    "'They got ratio'd so hard they deleted the tweet'",
    "A politician's defensive post being ratio'd by a journalist's fact-check: 'Community note AND a ratio? Cooked.'",
  ],
  origin:
    "The 'ratio' concept developed organically on Twitter around 2017–2019 as users noticed that particularly bad tweets would have more replies than likes, and particularly good replies would have more engagement than the tweet itself. The term crystallized as Twitter's user base grew political and combative. Posting 'ratio' as a single-word reply became a recognized tactic around 2020–2021, and the word was formally documented on Know Your Meme and entered mainstream media coverage of social media culture.",
  relatedSlugs: ["w-dub", "touch-grass", "pessi-penaldo"],
  sources: [
    {
      title: "Ratio — Wiktionary",
      url: "https://en.wiktionary.org/wiki/Ratio",
      domain: "en.wiktionary.org",
    },
  ],
};

export default entry;
