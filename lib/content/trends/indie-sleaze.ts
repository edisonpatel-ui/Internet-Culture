import type { BaseEntry } from "@/types";

const entry: BaseEntry = {
  id: "t42",
  slug: "indie-sleaze",
  title: "Indie Sleaze",
  category: "trend",
  description:
    "Late-2000s party flashback — American Apparel, flash photography, smudged eyeliner, and bloghouse nostalgia.",
  imageGradient: "from-zinc-700 via-neutral-800 to-black",
  scores: { relevance: 39, influence: 68, cringe: 45, brainrot: 34 },
  dynamicMetadata: {
    lastReviewed: "2026-07-25",
    currentRelevance: 39,
    currentStatus: "historical",
    activePlatforms: [
      "wikipedia",
      "news",
    ],
    popularity: 37,
    trendingScore: 41,
    recentRevival: false,
    popularityNotes: "Status: historical · Relevance 39 (today's recognition, not influence) · Trending 41 (recent attention)",
    evidenceNotes: [
      "[wikipedia/search-interest] Wikimedia pageviews 30d=7,358 for “Indie sleaze”",
      "[wikipedia/editorial-trend] Pageviews WoW last7=1772 prev7=1743 (2%)",
      "[know-your-meme/authority-documentation] Know Your Meme entry located",
      "[know-your-meme/platform-activity] KYM entry exists; last-updated date not parseable",
      "[dictionary/authority-documentation] Wiktionary page “Indie”",
      "[dictionary/platform-activity] Wiktionary last revision 2025-11-01",
      "[news/recent-articles] Google News: 9 items in last 30d (40 returned) for “Indie Sleaze”",
      "[creator-pages/recent-uploads] No YouTube channel_id URLs on entry sources — creator RSS skipped",
      "[authority-sources/authority-documentation] Wikipedia / Wikimedia cited; Know Your Meme cited",
      "[google-trends/search-interest] Not on current Google US Trending RSS (10 topics) — not treated as zero search interest",
      "[google-trends/editorial-trend] Absence from daily trending list → not currently spiking",
      "[reddit/discussion-volume] Reddit search unavailable for “Indie Sleaze”",
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
  historicalDate: "2006-01-01",
  views: 1100000,
  trendDirection: "declining",
  tags: ["fashion", "2000s", "nightlife", "revival", "2020s"],
  origin:
    "Indie sleaze names the 2006–2012 Tumblr-era aesthetic: messy parties, electroclash, hipster irony, and digital camera flash. TikTok revivalists labeled it around 2021–2022 as Gen Z romanticized a period they mostly missed — overlapping Y2K revival but grungier and more cigarette-and-warehouse than bubblegum pop.",
  summary:
    "Indie sleaze is nostalgia for when the internet felt grungy: American Apparel ads, Cobrasnake photos, and blog DJs. A fashion trend and playlist mood as much as a historical scene.",
  relatedSlugs: ["y2k-revival", "tumblr", "instagram-culture", "cottagecore"],
  relationships: {
    relatedEvent: ["tumblr"],
    sameEra: ["y2k-revival"],
  },
  sources: [
    {
      title: "Indie sleaze — Wikipedia",
      url: "https://en.wikipedia.org/wiki/Indie_sleaze",
      domain: "en.wikipedia.org",
    },
    {
      title: "Indie Sleaze — Know Your Meme",
      url: "https://knowyourmeme.com/memes/indie-sleaze",
      domain: "knowyourmeme.com",
    },
  ],
};

export default entry;
