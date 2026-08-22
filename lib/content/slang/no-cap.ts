import type { SlangEntry } from "@/types";

const entry: SlangEntry = {
  id: "s7",
  slug: "no-cap",
  title: "No Cap",
  category: "slang",
  description:
    "'No lie' / 'I'm being serious' — 'cap' means a lie, so 'no cap' means telling the truth.",
  imageGradient: "from-blue-500 via-indigo-500 to-violet-500",
  scores: { relevance: 56, influence: 72, cringe: 37, brainrot: 31 },
  dynamicMetadata: {
    lastReviewed: "2026-08-16",
    currentRelevance: 89,
    currentStatus: "highly-active",
    activePlatforms: [
      "wikipedia",
      "news",
    ],
    popularity: 70,
    trendingScore: 64,
    recentRevival: false,
    popularityNotes: "Relevance: Ongoing new posts/uploads/discussion support steady Current Relevance. Signals: news/recent-articles=70 (Google News: 21 items in last 60d (40 returned) for “No Cap”) Influence: Permanent cultural impact is not changed by a dynamic refresh. Brainrot: Absurdity / cohort character cues still match the prior brainrot reading. Cringe: Not enough mockery / social-awkwardness signals to reassess cringe.",
    evidenceNotes: [
      "[wikipedia/search-interest] Wikimedia pageviews 30d=70 for “No Cap”",
      "[wikipedia/editorial-trend] Pageviews WoW last7=17 prev7=15 (13%)",
      "[know-your-meme/authority-documentation] Know Your Meme entry located",
      "[know-your-meme/platform-activity] KYM entry exists; last-updated date not parseable",
      "[dictionary/authority-documentation] Wiktionary page “No”",
      "[dictionary/platform-activity] Wiktionary last revision 2026-05-12",
      "[news/recent-articles] Google News: 21 items in last 60d (40 returned) for “No Cap”",
      "[creator-pages/recent-uploads] No YouTube channel_id URLs on entry sources — creator RSS skipped",
      "[authority-sources/authority-documentation] No Wikipedia / KYM / dictionary / major-news URLs on entry sources",
      "[google-trends/search-interest] Not on current Google US Trending RSS (10 topics) — not treated as zero search interest",
      "[google-trends/editorial-trend] Absence from daily trending list → not currently spiking",
      "[reddit/discussion-volume] Reddit search unavailable for “No Cap”",
      "[bluesky/discussion-volume] Bluesky search unavailable for \"No Cap\"",
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
      relevance: "Ongoing new posts/uploads/discussion support steady Current Relevance. Signals: news/recent-articles=70 (Google News: 21 items in last 60d (40 returned) for “No Cap”)",
      influence: "Permanent cultural impact is not changed by a dynamic refresh.",
      brainrot: "Absurdity / cohort character cues still match the prior brainrot reading.",
      cringe: "Not enough mockery / social-awkwardness signals to reassess cringe.",
    },
  },
  addedAt: "2026-05-15",
  lastUpdated: "2026-08-16",
  views: 290000,
  trendDirection: "rising",
  definition:
    "No cap means 'no lie' or 'for real' — you're emphasizing that a statement is true. 'Cap' means a lie or exaggeration; 'capping' is lying; 'stop capping' means stop lying. Common in hip-hop and AAVE, then mainstream Gen Z speech via social media and music in the late 2010s.",
  origin:
    "From African American Vernacular English and Atlanta hip-hop (artists such as Young Thug helped popularize 'cap' / 'no cap' in lyrics). Broad internet adoption followed in the late 2010s.",
  usageExamples: [
    "That concert was fire, no cap",
    "No cap? (seeking confirmation)",
    "Stop capping — we know you're exaggerating",
  ],
  relatedSlugs: ["bussin", "based", "deadass", "bet", "sus"],
  relationships: {
    relatedSlang: ["based", "deadass", "bet", "sus", "bussin"],
    community: ["based"],
  },
  sources: [
    {
      title: "no cap — Wiktionary",
      url: "https://en.wiktionary.org/wiki/no_cap",
      domain: "en.wiktionary.org",
    },
  ],
};

export default entry;
