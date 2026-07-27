import type { BaseEntry } from "@/types";

const entry: BaseEntry = {
  id: "t13",
  slug: "old-money",
  title: "Old Money",
  category: "trend",
  description:
    "The refined fashion aesthetic of inherited wealth — polo shirts, quiet luxury, boat shoes, and timeless classics that dominated TikTok from 2022–2024.",
  imageGradient: "from-amber-700 via-yellow-700 to-stone-600",
  scores: { relevance: 37, influence: 85, cringe: 18, brainrot: 26 },
  dynamicMetadata: {
    lastReviewed: "2026-07-25",
    currentRelevance: 37,
    currentStatus: "occasionally-referenced",
    activePlatforms: [
      "tiktok",
      "wikipedia",
      "news",
    ],
    popularity: 33,
    trendingScore: 45,
    recentRevival: false,
    popularityNotes: "Status: occasionally-referenced · Relevance 37 (today's recognition, not influence) · Trending 45 (recent attention)",
    evidenceNotes: [
      "[wikipedia/search-interest] Wikimedia pageviews 30d=10,123 for “Old money”",
      "[wikipedia/editorial-trend] Pageviews WoW last7=2168 prev7=2450 (-12%)",
      "[know-your-meme/authority-documentation] Know Your Meme entry located",
      "[know-your-meme/platform-activity] KYM entry exists; last-updated date not parseable",
      "[dictionary/authority-documentation] Wiktionary page “Old”",
      "[dictionary/platform-activity] Wiktionary last revision 2024-09-02",
      "[news/recent-articles] Google News: 18 items in last 30d (40 returned) for “Old Money”",
      "[creator-pages/recent-uploads] No YouTube channel_id URLs on entry sources — creator RSS skipped",
      "[authority-sources/authority-documentation] Know Your Meme cited",
      "[google-trends/search-interest] Not on current Google US Trending RSS (10 topics) — not treated as zero search interest",
      "[google-trends/editorial-trend] Absence from daily trending list → not currently spiking",
      "[reddit/discussion-volume] Reddit search unavailable for “Old Money”",
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
  addedAt: "2026-07-16",
  lastUpdated: "2026-07-25",
  historicalDate: "2022-06-01",
  views: 1800000,
  trendDirection: "declining",
  tags: ["fashion", "aesthetic", "tiktok", "luxury", "style", "2022", "2023", "2024"],
  origin:
    "Emerged on TikTok fashion communities as a counter-aesthetic to flashy new money and streetwear. Characterized by understated wealth — classic cuts, neutral tones (beige, cream, navy, hunter green), vintage prep school styling, and 'quiet luxury.' Related to the broader 'stealth wealth' and 'quiet luxury' aesthetics that followed.",
  relatedSlugs: [
    "clean-girl-aesthetic",
    "dark-academia",
    "cottagecore",
    "y2k-revival",
    "performative",
    "dupe-economy",
  ],
  relationships: {
    sameEra: ["clean-girl-aesthetic", "dark-academia", "cottagecore"],
    relatedTo: ["performative", "dupe-economy", "y2k-revival"],
  },
  // DEFINING VISUAL PASS — HERO EMPTY:
  // Target: TikTok Old Money / quiet-luxury outfit still (cream knit, loafers,
  // understated prep). Removed Loro Piana storefront — brand boutique ≠ the
  // fashion aesthetic users search for. Sources checked: Wikimedia Commons /
  // Wikipedia Quiet luxury (only Loro Piana + Brunello Cucinelli storefronts),
  // Know Your Meme (docs), polo/preppy Commons searches (yearbooks/PDFs, no
  // usable aesthetic still). Substitutes (luxury shop windows, random polo
  // ads) read as retail advertising, not the TikTok trend.
  media: [
    {
      role: "reference",
      type: "embed",
      url: "https://en.wikipedia.org/wiki/Quiet_luxury",
      title: "Quiet luxury — Wikipedia",
      source: "Wikipedia",
      sourceUrl: "https://en.wikipedia.org/wiki/Quiet_luxury",
      platform: "other",
      attribution: "Wikipedia contributors",
      description:
        "Encyclopedia overview of quiet luxury / stealth wealth / Old Money aesthetic.",
      date: "2023",
      verified: true,
    },
    {
      role: "reference",
      type: "embed",
      url: "https://knowyourmeme.com/memes/old-money-aesthetic",
      title: "Old Money Aesthetic — Know Your Meme",
      source: "Know Your Meme",
      sourceUrl: "https://knowyourmeme.com/memes/old-money-aesthetic",
      platform: "knowyourmeme",
      attribution: "Know Your Meme / Literally Media",
      description: "Documentation of the Old Money / quiet luxury TikTok aesthetic.",
      date: "2022",
      verified: true,
    },
  ],
  sources: [
    {
      title: "Quiet luxury — Wikipedia",
      url: "https://en.wikipedia.org/wiki/Quiet_luxury",
      domain: "en.wikipedia.org",
    },
  ],
};

export default entry;
