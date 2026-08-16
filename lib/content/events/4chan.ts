import type { EventEntry } from "@/types";

const entry: EventEntry = {
  id: "e25",
  slug: "4chan",
  title: "4chan",
  category: "event",
  description:
    "The anonymous English imageboard that forged Pepe, rickrolls, rage comics, and a huge share of modern meme grammar.",
  imageGradient: "from-red-700 via-orange-600 to-zinc-900",
  scores: { relevance: 0, influence: 95, cringe: 45, brainrot: 40 },
  dynamicMetadata: {
    lastReviewed: "2026-08-16",
    currentRelevance: 0,
    currentStatus: "historical",
    activePlatforms: [],
    popularity: 0,
    trendingScore: 0,
    recentRevival: "unknown",
    popularityNotes: "Relevance: Little recent creation activity detected. Signals: news/recent-articles=0 (Google News: 0 items in last 60d (40 returned) for “4chan event”) Influence: Permanent cultural impact is not changed by a dynamic refresh. Brainrot: Character signals still mark this as strongly representative of chaotic internet brainrot culture. Cringe: Not enough mockery / social-awkwardness signals to reassess cringe.",
    evidenceNotes: [
      "[wikipedia/search-interest] No confident English Wikipedia match for “4chan event”",
      "[know-your-meme/authority-documentation] Know Your Meme entry located",
      "[know-your-meme/platform-activity] KYM entry exists; last-updated date not parseable",
      "[dictionary/authority-documentation] No Wiktionary page for “4chan”",
      "[news/recent-articles] Google News: 0 items in last 60d (40 returned) for “4chan event”",
      "[creator-pages/recent-uploads] No YouTube channel_id URLs on entry sources — creator RSS skipped",
      "[authority-sources/authority-documentation] Wikipedia / Wikimedia cited; Know Your Meme cited",
      "[google-trends/search-interest] Not on current Google US Trending RSS (10 topics) — not treated as zero search interest",
      "[google-trends/editorial-trend] Absence from daily trending list → not currently spiking",
      "[reddit/discussion-volume] Reddit search unavailable for “4chan event”",
      "[bluesky/discussion-volume] Bluesky search unavailable for \"4chan event\"",
      "[youtube/recent-uploads] YOUTUBE_DATA_API_KEY not set — YouTube live search skipped",
      "[catalog-evidence/absurdity] Tag/title absurdity cue (brainrot character only)",
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
      relevance: "Little recent creation activity detected. Signals: news/recent-articles=0 (Google News: 0 items in last 60d (40 returned) for “4chan event”)",
      influence: "Permanent cultural impact is not changed by a dynamic refresh.",
      brainrot: "Character signals still mark this as strongly representative of chaotic internet brainrot culture.",
      cringe: "Not enough mockery / social-awkwardness signals to reassess cringe.",
    },
  },
  addedAt: "2026-07-19",
  lastUpdated: "2026-08-16",
  historicalDate: "2003-10-01",
  views: 6800000,
  trendDirection: "declining",
  tags: ["4chan","imageboard","anonymous","memes","platform"],
  platform: "4chan",
  impact:
    "Industrialized anonymous meme production: rapid iteration, reaction faces, raids, and board culture (/b/, /v/, etc.). Downstream platforms spent a decade remixing formats born on 4chan.",
  highlights: [
  "Founded 2003 as an English-language imageboard inspired by Japanese boards",
  "Boards like /b/ became engines for early viral formats and copypasta",
  "Incubated or amplified Pepe, Wojak culture, rickrolling, rage comics, and more",
  "Remains culturally influential even as mainstream meme hubs shifted to Reddit/TikTok"
],
  relatedSlugs: ["pepe","wojak","rage-comics","rickroll","trollface","longcat"],
  relationships: {
  "relatedTo": [
    "pepe",
    "wojak",
    "rage-comics",
    "rickroll",
    "trollface",
    "longcat",
    "ceiling-cat",
    "o-rly-owl"
  ],
  "community": [
    "pepe",
    "wojak",
    "rage-comics"
  ],
  "sameEra": [
    "myspace",
    "newgrounds"
  ]
},
  media: [
  {
    "role": "featured",
    "type": "image",
    "url": "https://i.kym-cdn.com/entries/icons/original/000/000/618/home4chan.PNG",
    "title": "4chan — site documentation image",
    "source": "Know Your Meme",
    "sourceUrl": "https://knowyourmeme.com/memes/sites/4chan",
    "platform": "knowyourmeme",
    "attribution": "Know Your Meme / Literally Media",
    "description": "Recognizable 4chan homepage documentation imagery.",
    "date": "2003",
    "verified": false
  },
  {
    "role": "reference",
    "type": "embed",
    "url": "https://knowyourmeme.com/memes/sites/4chan",
    "title": "4chan — Know Your Meme",
    "source": "Know Your Meme",
    "sourceUrl": "https://knowyourmeme.com/memes/sites/4chan",
    "platform": "knowyourmeme",
    "attribution": "Know Your Meme / Literally Media",
    "description": "Platform / culture documentation.",
    "date": "2003",
    "verified": false
  },
  {
    "role": "reference",
    "type": "embed",
    "url": "https://en.wikipedia.org/wiki/4chan",
    "title": "4chan — Wikipedia",
    "source": "Wikipedia",
    "sourceUrl": "https://en.wikipedia.org/wiki/4chan",
    "platform": "other",
    "attribution": "Wikipedia contributors",
    "license": "CC BY-SA 4.0",
    "description": "Encyclopedic background.",
    "verified": false
  }
],
  sources: [
  {
    "title": "4chan — Wikipedia",
    "url": "https://en.wikipedia.org/wiki/4chan",
    "domain": "en.wikipedia.org"
  },
  {
    "title": "4chan — Know Your Meme",
    "url": "https://knowyourmeme.com/memes/sites/4chan",
    "domain": "knowyourmeme.com"
  }
],
};

export default entry;
