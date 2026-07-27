import type { MemeEntry } from "@/types";

const entry: MemeEntry = {
  id: "m48",
  slug: "loss",
  title: "Loss",
  category: "meme",
  description:
    "The Ctrl+Alt+Del 'Loss' comic distilled into four-panel geometry — | || || |_ — a long-running shitpost cipher.",
  imageGradient: "from-neutral-800 via-zinc-700 to-stone-600",
  scores: { relevance: 39, influence: 70, cringe: 21, brainrot: 32 },
  dynamicMetadata: {
    lastReviewed: "2026-07-25",
    currentRelevance: 39,
    currentStatus: "historical",
    activePlatforms: [
      "wikipedia",
      "news",
    ],
    popularity: 31,
    trendingScore: 51,
    recentRevival: false,
    popularityNotes: "Status: historical · Relevance 39 (today's recognition, not influence) · Trending 51 (recent attention)",
    evidenceNotes: [
      "[wikipedia/search-interest] Wikimedia pageviews 30d=659 for “Loss”",
      "[wikipedia/editorial-trend] Pageviews WoW last7=121 prev7=167 (-28%)",
      "[know-your-meme/authority-documentation] Know Your Meme entry located",
      "[know-your-meme/platform-activity] KYM entry exists; last-updated date not parseable",
      "[dictionary/authority-documentation] No Wiktionary page for “Loss”",
      "[news/recent-articles] Google News: 40 items in last 30d (40 returned) for “Loss”",
      "[creator-pages/recent-uploads] No YouTube channel_id URLs on entry sources — creator RSS skipped",
      "[authority-sources/authority-documentation] Know Your Meme cited",
      "[google-trends/search-interest] Not on current Google US Trending RSS (10 topics) — not treated as zero search interest",
      "[google-trends/editorial-trend] Absence from daily trending list → not currently spiking",
      "[reddit/discussion-volume] Reddit search unavailable for “Loss”",
      "[youtube/recent-uploads] YOUTUBE_DATA_API_KEY not set — YouTube live search skipped",
      "[catalog-evidence/absurdity] Tag/category absurdity cue (not used for relevance/trending)",
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
  addedAt: "2026-07-18",
  lastUpdated: "2026-07-25",
  historicalDate: "2008-06-02",
  views: 3500000,
  trendDirection: "declining",
  tags: ["ctrl-alt-del", "2008", "shitpost", "minimal", "classic", "comic"],
  meaning:
    "A meme based on Tim Buckley's Ctrl+Alt+Del comic 'Loss,' reduced to the iconic four-panel stick layout (often written | || || |_). Anything arranged in that pattern is a Loss reference — a meta joke about recognizing the structure itself.",
  origin:
    "On June 2, 2008, Tim Buckley published the melodramatic CAD comic 'Loss.' It was immediately mocked; over years the panels were abstracted into minimalist shapes and hidden in unrelated images as a recognition game.",
  timeline: [
    { date: "Jun 2008", event: "Original Loss comic published on Ctrl+Alt+Del" },
    { date: "2008–2010s", event: "Parodies and minimalist | || || |_ form spread" },
    { date: "2010s–2020s", event: "Loss becomes a perennial 'is this Loss?' shitpost" },
  ],
  examples: [
    "Four objects arranged | || || |_ in a photo — comments: 'is this loss?'",
    "ASCII: | || || |_",
  ],
  relatedSlugs: ["rage-comics", "trollface", "wojak", "pepe"],
  relationships: {
    sameEra: ["rage-comics", "trollface"],
    sameFormat: ["rage-comics"],
  },
  media: [
    // AI suggested — KYM Loss minimal icon; human must verify
    {
      role: "featured",
      type: "image",
      url: "https://i.kym-cdn.com/entries/icons/original/000/006/252/lossminimal.jpg",
      title: "Loss — minimal four-panel form",
      source: "Know Your Meme",
      sourceUrl: "https://knowyourmeme.com/memes/loss",
      platform: "knowyourmeme",
      attribution: "Ctrl+Alt+Del / via Know Your Meme documentation",
      description:
        "The abstracted | || || |_ panel geometry that defines Loss references.",
      date: "2008",
      verified: false,
    },
    {
      role: "reference",
      type: "embed",
      url: "https://knowyourmeme.com/memes/loss",
      title: "Loss — Know Your Meme",
      source: "Know Your Meme",
      sourceUrl: "https://knowyourmeme.com/memes/loss",
      platform: "knowyourmeme",
      attribution: "Know Your Meme / Literally Media",
      description: "History of the Loss comic meme and minimalist variants.",
      date: "2008",
      verified: false,
    },
  ],
  sources: [
    {
      title: "Loss — Wikipedia search",
      url: "https://en.wikipedia.org/w/index.php?search=Loss&title=Special:Search&fulltext=1",
      domain: "en.wikipedia.org",
    },
  ],
};

export default entry;
