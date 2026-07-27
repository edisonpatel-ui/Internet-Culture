import type { MemeEntry } from "@/types";

const entry: MemeEntry = {
  id: "m15",
  slug: "rage-comics",
  title: "Rage Comics",
  category: "meme",
  description:
    "The original internet storytelling format — stick-figure comics with expressive face characters that defined 2010-era meme culture.",
  imageGradient: "from-red-600 via-rose-500 to-red-400",
  scores: { relevance: 28, influence: 87, cringe: 21, brainrot: 41 },
  dynamicMetadata: {
    lastReviewed: "2026-07-25",
    currentRelevance: 28,
    currentStatus: "historical",
    activePlatforms: [
      "reddit",
    ],
    popularity: 37,
    trendingScore: 17,
    recentRevival: "unknown",
    popularityNotes: "Status: historical · Relevance 28 (today's recognition, not influence) · Trending 17 (recent attention)",
    evidenceNotes: [
      "[wikipedia/search-interest] Wikipedia page “Rage (Marvel Comics)” found but pageviews unavailable",
      "[know-your-meme/authority-documentation] Know Your Meme entry located",
      "[know-your-meme/platform-activity] KYM entry exists; last-updated date not parseable",
      "[dictionary/authority-documentation] Wiktionary page “Rage”",
      "[dictionary/platform-activity] Wiktionary last revision 2026-02-14",
      "[news/recent-articles] Google News: 0 items in last 30d (40 returned) for “Rage Comics”",
      "[creator-pages/recent-uploads] No YouTube channel_id URLs on entry sources — creator RSS skipped",
      "[authority-sources/authority-documentation] Know Your Meme cited; Wikipedia / Wikimedia cited",
      "[google-trends/search-interest] Not on current Google US Trending RSS (10 topics) — not treated as zero search interest",
      "[google-trends/editorial-trend] Absence from daily trending list → not currently spiking",
      "[reddit/discussion-volume] Reddit search unavailable for “Rage Comics”",
      "[youtube/recent-uploads] YOUTUBE_DATA_API_KEY not set — YouTube live search skipped",
      "[catalog-evidence/remix-activity] Format/remix cue (brainrot/cringe only)",
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
  historicalDate: "2008-01-01",
  views: 2600000,
  trendDirection: "declining",
  tags: ["classic", "4chan", "reddit", "storytelling", "reaction", "imageboard"],
  meaning:
    "Multi-panel comics using expressive stick-figure characters — Rage Guy, Forever Alone, Trollface, Me Gusta — to tell relatable or humorous stories. Each character represented a specific emotion or social archetype.",
  origin:
    "The original Rage Guy ('FFFUUUUU') comic was posted to 4chan's /b/ board around 2008. Reddit's r/fffffffuuuuuuuuuuuu subreddit (created 2009) massively spread the format. Online tools enabled anyone to build and share comics instantly.",
  timeline: [
    { date: "~2008", event: "Original 'Rage Guy' (FUUUUU) comic posted to 4chan" },
    {
      date: "2009",
      event:
        "Reddit's r/fffffffuuuuuuuuuuuu subreddit created — format spreads to the wider internet",
    },
    {
      date: "2010–2011",
      event:
        "Peak era: Memegenerator, Cheezburger Network, and FunnyJunk spread the format worldwide",
    },
    {
      date: "2012",
      event: "Format considered dated; 'this is so 2010' becomes common mockery",
    },
    {
      date: "2020s",
      event:
        "Ironic revival — Trollge and remixed rage comic formats return in Gen Z content",
    },
  ],
  examples: [
    "Me: I'll just have one cookie — Rage Guy face",
    "Forever Alone — goes to movies alone, eats dinner alone, talks to himself",
    "Me Gusta — enjoying something you absolutely should not enjoy",
  ],
  relatedSlugs: ["trollface", "pepe", "loss", "doge", "vine-shutdown"],
  relationships: {
    sameEra: ["trollface", "loss", "vine-shutdown"],
    sameFormat: ["trollface"],
  },
  media: [
    // Clean rage-face graphic (PD) — encyclopedia-safe hero. Rejected First Rage
    // Comic (bathroom humor) and HWY Cup strip (random user comic) as featured.
    {
      role: "featured",
      type: "image",
      url: "https://upload.wikimedia.org/wikipedia/commons/b/b3/Rage_face.png",
      title: "Classic Rage Face — FUUUU-era rage comic character",
      source: "Wikimedia Commons",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Rage_face.png",
      platform: "wikimedia",
      attribution: "Smurfy (public domain)",
      license: "Public domain",
      description:
        "A clean, recognizable rage-face drawing in the classic MS Paint rage-comics style — the emotional vocabulary of the format without a scenario strip.",
      date: "2009",
      verified: true,
    },
    {
      role: "reference",
      type: "embed",
      url: "https://knowyourmeme.com/memes/rage-comics",
      title: "Rage Comics — Know Your Meme",
      source: "Know Your Meme",
      sourceUrl: "https://knowyourmeme.com/memes/rage-comics",
      platform: "knowyourmeme",
      attribution: "Know Your Meme / Literally Media",
      description: "History of rage comics, Rage Guy, and related faces.",
      date: "2008",
      verified: true,
    },
  ],
  sources: [
    {
      title: "Rage Comics — Wikipedia",
      url: "https://en.wikipedia.org/wiki/Rage_comic",
      domain: "en.wikipedia.org",
    },
  ],
};

export default entry;
