import type { BaseEntry } from "@/types";

const entry: BaseEntry = {
  id: "t14",
  slug: "clean-girl-aesthetic",
  title: "Clean Girl Aesthetic",
  category: "trend",
  description:
    "A 2022–2023 TikTok beauty and lifestyle trend defined by slicked-back buns, glowing skin, minimal gold jewelry, and the appearance of effortless, natural beauty.",
  imageGradient: "from-stone-300 via-amber-200 to-yellow-100",
  scores: { relevance: 55, influence: 71, cringe: 35, brainrot: 45 },
  dynamicMetadata: {
    lastReviewed: "2026-08-16",
    currentRelevance: 55,
    currentStatus: "current",
    activePlatforms: [
      "tiktok",
      "wikipedia",
      "news",
    ],
    popularity: 50,
    trendingScore: 53,
    recentRevival: false,
    popularityNotes: "Relevance: Ongoing new posts/uploads/discussion support steady Current Relevance. Signals: news/recent-articles=50 (Google News: 8 items in last 60d (40 returned) for “Clean Girl Aesthetic”) Influence: Permanent cultural impact is not changed by a dynamic refresh. Brainrot: Character signals still mark this as strongly representative of chaotic internet brainrot culture. Cringe: Not enough mockery / social-awkwardness signals to reassess cringe.",
    evidenceNotes: [
      "[wikipedia/search-interest] Wikimedia pageviews 30d=1,530 for “Clean girl aesthetic”",
      "[wikipedia/editorial-trend] Pageviews WoW last7=392 prev7=361 (9%)",
      "[know-your-meme/authority-documentation] Know Your Meme entry located",
      "[know-your-meme/platform-activity] KYM entry exists; last-updated date not parseable",
      "[dictionary/authority-documentation] Wiktionary page “Clean”",
      "[dictionary/platform-activity] Wiktionary last revision 2022-07-09",
      "[news/recent-articles] Google News: 8 items in last 60d (40 returned) for “Clean Girl Aesthetic”",
      "[creator-pages/recent-uploads] No YouTube channel_id URLs on entry sources — creator RSS skipped",
      "[authority-sources/authority-documentation] Wikipedia / Wikimedia cited",
      "[google-trends/search-interest] Not on current Google US Trending RSS (10 topics) — not treated as zero search interest",
      "[google-trends/editorial-trend] Absence from daily trending list → not currently spiking",
      "[reddit/discussion-volume] Reddit search unavailable for “Clean Girl Aesthetic”",
      "[bluesky/discussion-volume] Bluesky search unavailable for \"Clean Girl Aesthetic\"",
      "[youtube/recent-uploads] YOUTUBE_DATA_API_KEY not set — YouTube live search skipped",
      "[catalog-evidence/gen-cohort-adoption] Cohort cue from tags/title (brainrot character only)",
      "Weak corroboration — blended heuristic (65) with AI double-check (45): Mixed signals show modest interest but low Google Trends and recent activity indicate the Clean Girl Aesthetic is fading rather than peaking.",
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
      relevance: "Ongoing new posts/uploads/discussion support steady Current Relevance. Signals: news/recent-articles=50 (Google News: 8 items in last 60d (40 returned) for “Clean Girl Aesthetic”)",
      influence: "Permanent cultural impact is not changed by a dynamic refresh.",
      brainrot: "Character signals still mark this as strongly representative of chaotic internet brainrot culture.",
      cringe: "Not enough mockery / social-awkwardness signals to reassess cringe.",
    },
  },
  addedAt: "2026-07-17",
  lastUpdated: "2026-08-16",
  views: 1800000,
  trendDirection: "stable",
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
