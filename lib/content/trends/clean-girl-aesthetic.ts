import type { BaseEntry } from "@/types";

const entry: BaseEntry = {
  id: "t14",
  slug: "clean-girl-aesthetic",
  title: "Clean Girl Aesthetic",
  category: "trend",
  description:
    "A 2022–2023 TikTok beauty and lifestyle trend defined by slicked-back buns, glowing skin, minimal gold jewelry, and the appearance of effortless, natural beauty.",
  imageGradient: "from-stone-300 via-amber-200 to-yellow-100",
  scores: { relevance: 33, influence: 72, cringe: 28, brainrot: 21 },
  dynamicMetadata: {
    lastReviewed: "2026-07-25",
    currentRelevance: 33,
    currentStatus: "occasionally-referenced",
    activePlatforms: [
      "tiktok",
      "wikipedia",
      "news",
    ],
    popularity: 34,
    trendingScore: 31,
    recentRevival: false,
    popularityNotes: "Status: occasionally-referenced · Relevance 33 (today's recognition, not influence) · Trending 31 (recent attention)",
    evidenceNotes: [
      "[wikipedia/search-interest] Wikimedia pageviews 30d=1,352 for “Clean girl aesthetic”",
      "[wikipedia/editorial-trend] Pageviews WoW last7=346 prev7=276 (25%)",
      "[know-your-meme/authority-documentation] Know Your Meme entry located",
      "[know-your-meme/platform-activity] KYM entry exists; last-updated date not parseable",
      "[dictionary/authority-documentation] Wiktionary page “Clean”",
      "[dictionary/platform-activity] Wiktionary last revision 2022-07-09",
      "[news/recent-articles] Google News: 3 items in last 30d (40 returned) for “Clean Girl Aesthetic”",
      "[creator-pages/recent-uploads] No YouTube channel_id URLs on entry sources — creator RSS skipped",
      "[authority-sources/authority-documentation] Wikipedia / Wikimedia cited",
      "[google-trends/search-interest] Not on current Google US Trending RSS (10 topics) — not treated as zero search interest",
      "[google-trends/editorial-trend] Absence from daily trending list → not currently spiking",
      "[reddit/discussion-volume] Reddit search unavailable for “Clean Girl Aesthetic”",
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
  addedAt: "2026-07-17",
  lastUpdated: "2026-07-25",
  views: 1800000,
  trendDirection: "declining",
  tags: ["beauty", "tiktok", "aesthetic", "makeup", "fashion", "2022"],
  origin:
    "TikTok beauty communities, 2022. The aesthetic emerged as a reaction to heavily filtered, maximalist makeup trends — emphasizing 'no-makeup makeup,' gold hoop earrings, silk pillowcases, and wellness routines. Popularized by creators like Hailey Bieber and spread through TikTok's #cleangirl hashtag.",
  relatedSlugs: [
    "y2k-revival",
    "old-money",
    "cottagecore",
    "dark-academia",
    "instagram-culture",
    "performative",
  ],
  relationships: {
    sameEra: ["y2k-revival", "old-money", "cottagecore", "dark-academia"],
    relatedTo: ["instagram-culture", "performative"],
  },
  // DEFINING VISUAL PASS — HERO EMPTY:
  // Target: slicked-bun Clean Girl still. Sources checked: Commons/Wikipedia
  // (no usable image); influencer CDNs forbidden. Stock beauty photos mislead.
  media: [
    {
      role: "reference",
      type: "embed",
      url: "https://en.wikipedia.org/wiki/Clean_girl_aesthetic",
      title: "Clean Girl Aesthetic — Wikipedia",
      source: "Wikipedia",
      sourceUrl: "https://en.wikipedia.org/wiki/Clean_girl_aesthetic",
      platform: "other",
      attribution: "Wikipedia contributors",
      description: "Encyclopedia overview of the Clean Girl beauty/lifestyle aesthetic.",
      date: "2022",
      verified: true,
    },
  ],
  sources: [
    {
      title: "Clean Girl Aesthetic — Wikipedia",
      url: "https://en.wikipedia.org/wiki/Clean_girl_aesthetic",
      domain: "en.wikipedia.org",
    },
    {
      title: "What Is the Clean Girl Aesthetic? — Vogue",
      url: "https://www.vogue.com/article/clean-girl-aesthetic",
      domain: "vogue.com",
    },
  ],
};

export default entry;
