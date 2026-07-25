import type { BaseEntry } from "@/types";

const entry: BaseEntry = {
  id: "t15",
  slug: "y2k-revival",
  title: "Y2K Revival",
  category: "trend",
  description:
    "A Gen Z-driven nostalgia wave reviving late 90s and early 2000s fashion — butterfly clips, low-rise jeans, Von Dutch, bedazzling, and the visual language of a pre-social-media digital era.",
  imageGradient: "from-pink-400 via-purple-400 to-blue-400",
  scores: { relevance: 42, influence: 70, cringe: 32, brainrot: 51 },
  dynamicMetadata: {
    lastReviewed: "2026-07-25",
    currentRelevance: 42,
    currentStatus: "occasionally-referenced",
    activePlatforms: [
      "tiktok",
      "news",
    ],
    popularity: 43,
    trendingScore: 39,
    recentRevival: false,
    popularityNotes: "Status: occasionally-referenced · Relevance 42 (today's recognition, not influence) · Trending 39 (recent attention)",
    evidenceNotes: [
      "[wikipedia/search-interest] No confident English Wikipedia match for “Y2K Revival”",
      "[know-your-meme/authority-documentation] Know Your Meme entry located",
      "[know-your-meme/platform-activity] KYM entry exists; last-updated date not parseable",
      "[dictionary/authority-documentation] Wiktionary page “Y2K”",
      "[dictionary/platform-activity] Wiktionary last revision 2026-07-18",
      "[news/recent-articles] Google News: 6 items in last 30d (40 returned) for “Y2K Revival”",
      "[creator-pages/recent-uploads] No YouTube channel_id URLs on entry sources — creator RSS skipped",
      "[authority-sources/authority-documentation] Wikipedia / Wikimedia cited",
      "[google-trends/search-interest] Not on current Google US Trending RSS (10 topics) — not treated as zero search interest",
      "[google-trends/editorial-trend] Absence from daily trending list → not currently spiking",
      "[reddit/discussion-volume] Reddit search unavailable for “Y2K Revival”",
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
  views: 2100000,
  trendDirection: "declining",
  tags: ["fashion", "nostalgia", "2000s", "gen-z", "tiktok", "style"],
  origin:
    "TikTok and Instagram fashion communities, 2020–2022. Generation Z, who grew up after the Y2K era, began romanticizing the visual language of late 90s/early 2000s pop culture: Paris Hilton's aesthetic, Von Dutch trucker hats, butterfly clips, low-rise jeans, platform sandals, velour tracksuits, and sparkly everything. Thrift stores and fast fashion both responded to the demand.",
  relatedSlugs: [
    "clean-girl-aesthetic",
    "old-money",
    "cottagecore",
    "instagram-culture",
    "myspace",
  ],
  relationships: {
    sameEra: ["clean-girl-aesthetic", "cottagecore"],
    relatedTo: ["old-money", "instagram-culture"],
    relatedEvent: ["myspace"],
  },
  // DEFINING VISUAL PASS — HERO EMPTY:
  // Target: encyclopedia-safe Y2K fashion still (butterfly clips, trucker hat,
  // velour — not midriff/booth-babe). Removed iPod Classic — era tech prop, not
  // the fashion revival users expect. Sources checked: Wikimedia (Late 2000s
  // fashion model shots — fail encyclopedia appropriateness; iPod PD product —
  // wrong subject), Wikipedia Y2K fashion (no usable page image), Vogue coverage
  // (copyright). Substitutes (iPod, random 2000s midriff fashion) mislead.
  media: [
    {
      role: "reference",
      type: "embed",
      url: "https://en.wikipedia.org/wiki/Y2K_fashion",
      title: "Y2K Fashion — Wikipedia",
      source: "Wikipedia",
      sourceUrl: "https://en.wikipedia.org/wiki/Y2K_fashion",
      platform: "other",
      attribution: "Wikipedia contributors",
      description: "Overview of Y2K fashion and its Gen Z revival cycle.",
      date: "2020",
      verified: true,
    },
  ],
  sources: [
    {
      title: "Y2K Fashion Revival — Wikipedia",
      url: "https://en.wikipedia.org/wiki/Y2K_fashion",
      domain: "en.wikipedia.org",
    },
    {
      title: "Y2K Revival: Everything You Need to Know — Vogue",
      url: "https://www.vogue.com/article/y2k-fashion-trend",
      domain: "vogue.com",
    },
  ],
};

export default entry;
