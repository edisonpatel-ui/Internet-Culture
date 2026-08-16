import type { BaseEntry } from "@/types";

const entry: BaseEntry = {
  id: "t34",
  slug: "booktok",
  title: "BookTok",
  category: "trend",
  description:
    "TikTok's reader community — crying reviews, aesthetic shelves, and bestseller lists driven by short video.",
  imageGradient: "from-amber-700 via-orange-600 to-rose-500",
  scores: { relevance: 65, influence: 80, cringe: 30, brainrot: 45 },
  dynamicMetadata: {
    lastReviewed: "2026-08-16",
    currentRelevance: 65,
    currentStatus: "current",
    activePlatforms: [
      "tiktok",
      "news",
    ],
    popularity: 50,
    trendingScore: 50,
    recentRevival: "unknown",
    popularityNotes: "Relevance: Ongoing new posts/uploads/discussion support steady Current Relevance. Signals: news/recent-articles=50 (Google News: 8 items in last 60d (40 returned) for “BookTok trend”) Influence: Permanent cultural impact is not changed by a dynamic refresh. Brainrot: Character signals still mark this as strongly representative of chaotic internet brainrot culture. Cringe: Not enough mockery / social-awkwardness signals to reassess cringe.",
    evidenceNotes: [
      "[wikipedia/search-interest] No confident English Wikipedia match for “BookTok trend”",
      "[know-your-meme/authority-documentation] Know Your Meme entry located",
      "[know-your-meme/platform-activity] KYM entry exists; last-updated date not parseable",
      "[dictionary/authority-documentation] Wiktionary page “BookTok”",
      "[dictionary/platform-activity] Wiktionary last revision 2026-07-25",
      "[news/recent-articles] Google News: 8 items in last 60d (40 returned) for “BookTok trend”",
      "[creator-pages/recent-uploads] No YouTube channel_id URLs on entry sources — creator RSS skipped",
      "[authority-sources/authority-documentation] Wikipedia / Wikimedia cited",
      "[google-trends/search-interest] Not on current Google US Trending RSS (10 topics) — not treated as zero search interest",
      "[google-trends/editorial-trend] Absence from daily trending list → not currently spiking",
      "[reddit/discussion-volume] Reddit search unavailable for “BookTok trend”",
      "[bluesky/discussion-volume] Bluesky search unavailable for \"BookTok trend\"",
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
      relevance: "Ongoing new posts/uploads/discussion support steady Current Relevance. Signals: news/recent-articles=50 (Google News: 8 items in last 60d (40 returned) for “BookTok trend”)",
      influence: "Permanent cultural impact is not changed by a dynamic refresh.",
      brainrot: "Character signals still mark this as strongly representative of chaotic internet brainrot culture.",
      cringe: "Not enough mockery / social-awkwardness signals to reassess cringe.",
    },
  },
  addedAt: "2026-07-23",
  lastUpdated: "2026-08-16",
  historicalDate: "2020-01-01",
  views: 1900000,
  trendDirection: "declining",
  tags: ["tiktok", "books", "publishing", "fandom", "2020s"],
  origin:
    "BookTok emerged around 2020 when pandemic readers filmed emotional reactions, bookshelf tours, and trope rankings on TikTok. Publishers and bookstores labeled displays 'BookTok picks'; titles like Colleen Hoover's backlist surged from recommendation cascades rather than traditional review channels.",
  summary:
    "BookTok turned reading into vertical video: tropes (enemies-to-lovers), sobbing reaction clips, and 'if you liked X read Y.' It reshaped publishing marketing — cover design, trope tags, and indie authors breaking out from hashtag momentum.",
  relatedSlugs: ["tiktok-rise", "influencer-culture", "creator-economy", "stan"],
  sources: [
    {
      title: "BookTok — Wikipedia",
      url: "https://en.wikipedia.org/wiki/BookTok",
      domain: "en.wikipedia.org",
    },
    {
      title: "How BookTok rewrote publishing — NPR",
      url: "https://www.npr.org/2022/08/12/1116804750/booktok-publishing",
      domain: "npr.org",
    },
  ],
};

export default entry;
