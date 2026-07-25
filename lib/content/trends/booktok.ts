import type { BaseEntry } from "@/types";

const entry: BaseEntry = {
  id: "t34",
  slug: "booktok",
  title: "BookTok",
  category: "trend",
  description:
    "TikTok's reader community — crying reviews, aesthetic shelves, and bestseller lists driven by short video.",
  imageGradient: "from-amber-700 via-orange-600 to-rose-500",
  scores: { relevance: 41, influence: 80, cringe: 30, brainrot: 41 },
  dynamicMetadata: {
    lastReviewed: "2026-07-25",
    currentRelevance: 41,
    currentStatus: "occasionally-referenced",
    activePlatforms: [
      "tiktok",
      "wikipedia",
      "news",
    ],
    popularity: 38,
    trendingScore: 48,
    recentRevival: false,
    popularityNotes: "Status: occasionally-referenced · Relevance 41 (today's recognition, not influence) · Trending 48 (recent attention)",
    evidenceNotes: [
      "[wikipedia/search-interest] Wikimedia pageviews 30d=6,237 for “BookTok”",
      "[wikipedia/editorial-trend] Pageviews WoW last7=1370 prev7=1680 (-18%)",
      "[know-your-meme/authority-documentation] Know Your Meme entry located",
      "[know-your-meme/platform-activity] KYM entry exists; last-updated date not parseable",
      "[dictionary/authority-documentation] Wiktionary page “BookTok”",
      "[dictionary/platform-activity] Wiktionary last revision 2026-03-01",
      "[news/recent-articles] Google News: 19 items in last 30d (40 returned) for “BookTok”",
      "[creator-pages/recent-uploads] No YouTube channel_id URLs on entry sources — creator RSS skipped",
      "[authority-sources/authority-documentation] Wikipedia / Wikimedia cited",
      "[google-trends/search-interest] Not on current Google US Trending RSS (10 topics) — not treated as zero search interest",
      "[google-trends/editorial-trend] Absence from daily trending list → not currently spiking",
      "[reddit/discussion-volume] Reddit search unavailable for “BookTok”",
      "[youtube/recent-uploads] YOUTUBE_DATA_API_KEY not set — YouTube live search skipped",
      "[catalog-evidence/gen-cohort-adoption] Cohort cue from tags (not used for relevance/trending)",
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
  },
  addedAt: "2026-07-23",
  lastUpdated: "2026-07-25",
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
