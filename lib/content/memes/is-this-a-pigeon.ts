import type { MemeEntry } from "@/types";

const entry: MemeEntry = {
  id: "m46",
  slug: "is-this-a-pigeon",
  title: "Is This a Pigeon?",
  category: "meme",
  description:
    "Anime screenshot meme of a character misidentifying a butterfly as a pigeon — used for willful mislabeling jokes.",
  imageGradient: "from-sky-400 via-blue-400 to-indigo-500",
  scores: { relevance: 34, influence: 78, cringe: 21, brainrot: 41 },
  dynamicMetadata: {
    lastReviewed: "2026-07-25",
    currentRelevance: 34,
    currentStatus: "classic",
    activePlatforms: [
      "wikipedia",
    ],
    popularity: 38,
    trendingScore: 26,
    recentRevival: false,
    popularityNotes: "Status: classic · Relevance 34 (today's recognition, not influence) · Trending 26 (recent attention)",
    evidenceNotes: [
      "[wikipedia/search-interest] Wikimedia pageviews 30d=3,502 for “Is this a pigeon?”",
      "[wikipedia/editorial-trend] Pageviews WoW last7=745 prev7=855 (-13%)",
      "[know-your-meme/authority-documentation] Know Your Meme entry located",
      "[know-your-meme/platform-activity] KYM entry exists; last-updated date not parseable",
      "[dictionary/authority-documentation] Wiktionary page “Is”",
      "[dictionary/platform-activity] Wiktionary last revision 2026-05-12",
      "[news/recent-articles] Google News: 1 items in last 30d (40 returned) for “Is This a Pigeon?”",
      "[creator-pages/recent-uploads] No YouTube channel_id URLs on entry sources — creator RSS skipped",
      "[authority-sources/authority-documentation] Know Your Meme cited",
      "[google-trends/search-interest] Not on current Google US Trending RSS (10 topics) — not treated as zero search interest",
      "[google-trends/editorial-trend] Absence from daily trending list → not currently spiking",
      "[reddit/discussion-volume] Reddit search unavailable for “Is This a Pigeon?”",
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
  addedAt: "2026-07-18",
  lastUpdated: "2026-07-25",
  historicalDate: "2011-01-01",
  views: 4500000,
  trendDirection: "declining",
  tags: ["anime", "template", "mislabel", "classic", "2010s"],
  meaning:
    "A two-part caption format: something is shown, and a character asks 'Is this a [wrong thing]?' Used to mock bad takes, category errors, or people confidently misreading a situation.",
  origin:
    "Built from an anime still of a character examining a butterfly while asking if it is a pigeon. Know Your Meme tracks the 'Is This a Pigeon?' exploitable as a long-running misidentification joke that peaked again in the mid-2010s on Tumblr and Twitter.",
  timeline: [
    { date: "Early 2010s", event: "Screenshot begins circulating as a mislabel joke" },
    { date: "2016–2018", event: "Peaks as a reusable Twitter/Tumblr template" },
    { date: "2019+", event: "Remains a classic 'wrong category' reaction format" },
  ],
  examples: [
    "Photo of a dog: 'Is this a pigeon?'",
    "Corporate rebrand: 'Is this innovation?'",
  ],
  relatedSlugs: [
    "surprised-pikachu",
    "expanding-brain",
    "distracted-boyfriend",
    "two-buttons",
  ],
  relationships: {
    sameFormat: ["surprised-pikachu", "expanding-brain", "drake-hotline-bling"],
  },
  media: [
    // AI suggested — KYM Is This a Pigeon entry icon; human must verify
    {
      role: "featured",
      type: "image",
      url: "https://i.kym-cdn.com/entries/icons/original/000/017/299/DmbzJspWwAEprcQ.jpg",
      title: "Is This a Pigeon? — anime still template",
      source: "Know Your Meme",
      sourceUrl: "https://knowyourmeme.com/memes/is-this-a-pigeon",
      platform: "knowyourmeme",
      attribution: "Anime still via Know Your Meme documentation",
      description: "The butterfly / 'Is this a pigeon?' misidentification screenshot.",
      date: "2011",
      verified: false,
    },
    {
      role: "reference",
      type: "embed",
      url: "https://knowyourmeme.com/memes/is-this-a-pigeon",
      title: "Is This a Pigeon? — Know Your Meme",
      source: "Know Your Meme",
      sourceUrl: "https://knowyourmeme.com/memes/is-this-a-pigeon",
      platform: "knowyourmeme",
      attribution: "Know Your Meme / Literally Media",
      description: "Origin and variants of the pigeon mislabel meme.",
      date: "2011",
      verified: false,
    },
  ],
  sources: [
    {
      title: "Is This a Pigeon? — Wikipedia search",
      url: "https://en.wikipedia.org/w/index.php?search=Is%20This%20a%20Pigeon%3F&title=Special:Search&fulltext=1",
      domain: "en.wikipedia.org",
    },
  ],
};

export default entry;
