import type { BaseEntry } from "@/types";

const entry: BaseEntry = {
  id: "t32",
  slug: "ai-generated-content-boom",
  title: "AI-Generated Content Boom",
  category: "trend",
  description:
    "The flood of AI images, video, and text on feeds — from tools to 'AI slop' in ads and spam.",
  imageGradient: "from-indigo-500 via-blue-600 to-cyan-500",
  scores: { relevance: 57, influence: 90, cringe: 60, brainrot: 72 },
  dynamicMetadata: {
    lastReviewed: "2026-08-16",
    currentRelevance: 57,
    currentStatus: "occasionally-referenced",
    activePlatforms: [
      "wikipedia",
      "news",
    ],
    popularity: 44,
    trendingScore: 48,
    recentRevival: false,
    popularityNotes: "Relevance: Recent creation signals rose modestly. Signals: news/recent-articles=44 (Google News: 6 items in last 60d (40 returned) for “AI-Generated Content Boom”) Influence: Permanent cultural impact is not changed by a dynamic refresh. Brainrot: Absurdity / cohort character cues still match the prior brainrot reading. Cringe: Not enough mockery / social-awkwardness signals to reassess cringe.",
    evidenceNotes: [
      "[wikipedia/search-interest] Wikimedia pageviews 30d=3,831 for “AI-generated content in American politics”",
      "[wikipedia/editorial-trend] Pageviews WoW last7=986 prev7=967 (2%)",
      "[know-your-meme/authority-documentation] Know Your Meme entry located",
      "[know-your-meme/platform-activity] KYM entry exists; last-updated date not parseable",
      "[dictionary/authority-documentation] No Wiktionary page for “AI-Generated”",
      "[news/recent-articles] Google News: 6 items in last 60d (40 returned) for “AI-Generated Content Boom”",
      "[creator-pages/recent-uploads] No YouTube channel_id URLs on entry sources — creator RSS skipped",
      "[authority-sources/authority-documentation] Wikipedia / Wikimedia cited",
      "[google-trends/search-interest] Not on current Google US Trending RSS (10 topics) — not treated as zero search interest",
      "[google-trends/editorial-trend] Absence from daily trending list → not currently spiking",
      "[reddit/discussion-volume] Reddit search unavailable for “AI-Generated Content Boom”",
      "[bluesky/discussion-volume] Bluesky search unavailable for \"AI-Generated Content Boom\"",
      "[youtube/recent-uploads] YOUTUBE_DATA_API_KEY not set — YouTube live search skipped",
      "Weak corroboration — blended heuristic (58) with AI double-check (55): Signals show steady but modest interest across Wikipedia, news and authority sources, with low Google‑Trends activity, indicating a moderate current popularity rather than a spike.",
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
      relevance: "Recent creation signals rose modestly. Signals: news/recent-articles=44 (Google News: 6 items in last 60d (40 returned) for “AI-Generated Content Boom”)",
      influence: "Permanent cultural impact is not changed by a dynamic refresh.",
      brainrot: "Absurdity / cohort character cues still match the prior brainrot reading.",
      cringe: "Not enough mockery / social-awkwardness signals to reassess cringe.",
    },
  },
  addedAt: "2026-07-23",
  lastUpdated: "2026-08-16",
  historicalDate: "2022-11-01",
  views: 2500000,
  trendDirection: "stable",
  tags: ["ai", "midjourney", "deepfake", "spam", "2020s"],
  origin:
    "Public diffusion models (Stable Diffusion, Midjourney, DALL·E 2) in 2022–2023 democratized synthetic media overnight. Facebook spam pages, YouTube compilations, and ad networks filled with uncanny AI art ('Shrimp Jesus,' weird product shots). ChatGPT and video tools extended the boom into text and motion.",
  summary:
    "The AI content boom is not just artists experimenting — it is scale: recommendation feeds mixing human and synthetic posts, SEO farms, scam ads, and platform moderation struggling to label what is real. It connects to chatbot wars (who ships the best generator) and deepfake anxiety, but here the story is volume and trust erosion.",
  relatedSlugs: ["ai-chatbot-wars", "shrimp-jesus", "deepfake-concerns", "ai-companion-chatbot-culture"],
  relationships: {
    relatedEvent: ["ai-chatbot-wars"],
    relatedTo: ["deepfake-concerns", "ai-companion-chatbot-culture"],
  },
  sources: [
    {
      title: "Generative artificial intelligence — Wikipedia",
      url: "https://en.wikipedia.org/wiki/Generative_artificial_intelligence",
      domain: "en.wikipedia.org",
    },
    {
      title: "AI slop — Wikipedia",
      url: "https://en.wikipedia.org/wiki/AI_slop",
      domain: "en.wikipedia.org",
    },
  ],
};

export default entry;
