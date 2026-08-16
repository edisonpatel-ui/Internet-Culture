import type { BaseEntry } from "@/types";

const entry: BaseEntry = {
  id: "t13",
  slug: "old-money",
  title: "Old Money",
  category: "trend",
  description:
    "The refined fashion aesthetic of inherited wealth — polo shirts, quiet luxury, boat shoes, and timeless classics that dominated TikTok from 2022–2024.",
  imageGradient: "from-amber-700 via-yellow-700 to-stone-600",
  scores: { relevance: 74, influence: 79, cringe: 24, brainrot: 45 },
  dynamicMetadata: {
    lastReviewed: "2026-08-16",
    currentRelevance: 74,
    currentStatus: "highly-active",
    activePlatforms: [
      "tiktok",
      "news",
    ],
    popularity: 74,
    trendingScore: 74,
    recentRevival: "unknown",
    popularityNotes: "Relevance: Ongoing new posts/uploads/discussion support steady Current Relevance. Signals: news/recent-articles=74 (Google News: 25 items in last 60d (40 returned) for “Old Money”) Influence: Permanent cultural impact is not changed by a dynamic refresh. Brainrot: Character signals still mark this as strongly representative of chaotic internet brainrot culture. Cringe: Not enough mockery / social-awkwardness signals to reassess cringe.",
    evidenceNotes: [
      "[wikipedia/search-interest] Wikipedia page “Old money” found but pageviews unavailable",
      "[know-your-meme/authority-documentation] Know Your Meme entry located",
      "[know-your-meme/platform-activity] KYM entry exists; last-updated date not parseable",
      "[dictionary/authority-documentation] Wiktionary page “Old”",
      "[dictionary/platform-activity] Wiktionary last revision 2024-09-02",
      "[news/recent-articles] Google News: 25 items in last 60d (40 returned) for “Old Money”",
      "[creator-pages/recent-uploads] No YouTube channel_id URLs on entry sources — creator RSS skipped",
      "[authority-sources/authority-documentation] Wikipedia / Wikimedia cited",
      "[google-trends/search-interest] Not on current Google US Trending RSS (10 topics) — not treated as zero search interest",
      "[google-trends/editorial-trend] Absence from daily trending list → not currently spiking",
      "[reddit/discussion-volume] Reddit search unavailable for “Old Money”",
      "[bluesky/discussion-volume] Bluesky search unavailable for \"Old Money\"",
      "[youtube/recent-uploads] YOUTUBE_DATA_API_KEY not set — YouTube live search skipped",
      "[catalog-evidence/gen-cohort-adoption] Cohort cue from tags/title (brainrot character only)",
      "Weak corroboration — blended heuristic (93) with AI double-check (55): While documentation and past coverage are strong, low Google Trends activity and modest recent cohort signals indicate the trend is no longer at a peak.",
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
      relevance: "Ongoing new posts/uploads/discussion support steady Current Relevance. Signals: news/recent-articles=74 (Google News: 25 items in last 60d (40 returned) for “Old Money”)",
      influence: "Permanent cultural impact is not changed by a dynamic refresh.",
      brainrot: "Character signals still mark this as strongly representative of chaotic internet brainrot culture.",
      cringe: "Not enough mockery / social-awkwardness signals to reassess cringe.",
    },
  },
  addedAt: "2026-07-16",
  lastUpdated: "2026-08-16",
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
