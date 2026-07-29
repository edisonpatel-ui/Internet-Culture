import type { BaseEntry } from "@/types";

const entry: BaseEntry = {
  id: "t33",
  slug: "barbiecore",
  title: "Barbiecore",
  category: "trend",
  description:
    "Hot pink, plastic glamour, and Mattel nostalgia as a fashion and film moment — peaked with Barbie (2023).",
  imageGradient: "from-pink-400 via-rose-400 to-fuchsia-500",
  scores: { relevance: 22, influence: 75, cringe: 50, brainrot: 26 },
  dynamicMetadata: {
    lastReviewed: "2026-07-25",
    currentRelevance: 20,
    currentStatus: "occasionally-referenced",
    activePlatforms: [],
    popularity: 27,
    trendingScore: 14,
    recentRevival: false,
    popularityNotes: "Status: occasionally-referenced · Relevance 20 (today's recognition, not influence) · Trending 14 (recent attention)",
    evidenceNotes: [
      "[wikipedia/search-interest] No confident English Wikipedia match for “Barbiecore”",
      "[know-your-meme/authority-documentation] Know Your Meme entry located",
      "[know-your-meme/platform-activity] KYM entry exists; last-updated date not parseable",
      "[dictionary/authority-documentation] Wiktionary page “Barbiecore”",
      "[dictionary/platform-activity] Wiktionary last revision 2024-10-16",
      "[news/recent-articles] Google News: 0 items in last 30d (40 returned) for “Barbiecore”",
      "[creator-pages/recent-uploads] No YouTube channel_id URLs on entry sources — creator RSS skipped",
      "[authority-sources/authority-documentation] Wikipedia / Wikimedia cited",
      "[google-trends/search-interest] Not on current Google US Trending RSS (10 topics) — not treated as zero search interest",
      "[google-trends/editorial-trend] Absence from daily trending list → not currently spiking",
      "[reddit/discussion-volume] Reddit search unavailable for “Barbiecore”",
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
      "youtube",
      "catalog-evidence",
    ],
    usedCatalogFallback: false,
  },
  addedAt: "2026-07-23",
  lastUpdated: "2026-07-25",
  historicalDate: "2023-01-01",
  views: 2100000,
  trendDirection: "declining",
  tags: ["fashion", "film", "pink", "aesthetic", "2020s"],
  origin:
    "Barbiecore named the hot-pink, hyper-feminine aesthetic tied to Greta Gerwig's Barbie (2023) marketing blitz — Pantone-branded pink, Y2K callbacks, and Instagram grids turning monochromatic. The look drew on earlier pink waves (Valentino pink, Legally Blonde nostalgia) but synchronized with a global movie event (Barbenheimer summer).",
  summary:
    "Barbiecore is hot pink as identity: dresses, nails, filters, and brand collabs riding Mattel's moment. It sits next to coquette and Y2K revival but is louder and more commercial — fashion as movie tie-in and selfie backdrop.",
  relatedSlugs: ["coquette-aesthetic", "y2k-revival", "barbenheimer", "clean-girl-aesthetic"],
  relationships: {
    relatedTo: ["coquette-aesthetic", "y2k-revival"],
    relatedEvent: ["barbenheimer"],
  },
  media: [
    {
      role: "reference",
      type: "embed",
      url: "https://en.wikipedia.org/wiki/Barbiecore",
      title: "Barbiecore — Wikipedia",
      source: "Wikipedia",
      sourceUrl: "https://en.wikipedia.org/wiki/Barbiecore",
      platform: "other",
      attribution: "Wikipedia contributors",
      license: "CC BY-SA 4.0",
      description: "Encyclopedic background on the aesthetic.",
      verified: false,
    },
  ],
  sources: [
    {
      title: "Barbiecore — Wikipedia",
      url: "https://en.wikipedia.org/wiki/Barbiecore",
      domain: "en.wikipedia.org",
    },
    {
      title: "Barbie (film) — Wikipedia",
      url: "https://en.wikipedia.org/wiki/Barbie_(film)",
      domain: "en.wikipedia.org",
    },
  ],
};

export default entry;
