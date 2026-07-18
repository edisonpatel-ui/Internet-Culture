import type { EventEntry } from "@/types";

const entry: EventEntry = {
  id: "e14",
  slug: "gamestop-wallstreetbets",
  title: "GameStop / WallStreetBets",
  category: "event",
  description:
    "The January 2021 GameStop short squeeze — Reddit's r/WallStreetBets vs. hedge funds, memes, and retail-trader chaos.",
  imageGradient: "from-red-600 via-rose-500 to-amber-400",
  scores: { relevance: 82, brainrot: 40, cringe: 28 },
  addedAt: "2026-07-18",
  historicalDate: "2021-01-01",
  views: 4500000,
  trendDirection: "stable",
  tags: ["reddit", "finance", "2021", "gamestop", "wallstreetbets", "meme-stocks"],
  platform: "Reddit, Twitter, Robinhood",
  impact:
    "Showed how coordinated internet communities could move markets and force institutional attention. Popularized diamond-hands / to-the-moon slang, meme-stock culture, and debates about retail brokerage power — a defining late-2010s/early-2020s internet-finance collision.",
  highlights: [
    "r/WallStreetBets pushed GameStop (GME) into a historic short squeeze in January 2021",
    "Trading apps briefly restricted buying — sparking outrage and congressional attention",
    "Spawned a wave of meme-stock discourse, livestreams, and finance memes",
    "Cemented WSB language (apes, diamond hands, tendies) in mainstream media",
  ],
  relatedSlugs: ["ratio", "great-meme-reset", "short-form-takeover", "based"],
  relationships: {
    sameEra: ["great-meme-reset", "among-us-era"],
    community: ["ratio"],
  },
  media: [
    // AI suggested — GameStop retail interior (Commons); represents the company at the center of the squeeze
    {
      role: "featured",
      type: "image",
      url: "https://upload.wikimedia.org/wikipedia/commons/a/a8/GameStop_interior_2019.jpg",
      title: "GameStop store interior",
      source: "Wikimedia Commons",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:GameStop_interior_2019.jpg",
      platform: "wikimedia",
      attribution: "Photograph on Wikimedia Commons (see file page)",
      license: "See Commons file page",
      description:
        "GameStop retail floor — the brick-and-mortar brand at the center of the 2021 squeeze.",
      date: "2019",
      verified: false,
    },
    {
      role: "reference",
      type: "embed",
      url: "https://en.wikipedia.org/wiki/GameStop_short_squeeze",
      title: "GameStop short squeeze — Wikipedia",
      source: "Wikipedia",
      sourceUrl: "https://en.wikipedia.org/wiki/GameStop_short_squeeze",
      platform: "other",
      attribution: "Wikipedia contributors",
      description: "Timeline and market impact of the January 2021 squeeze.",
      date: "2021",
      verified: false,
    },
  ],
  sources: [
    {
      title: "GameStop short squeeze — Wikipedia",
      url: "https://en.wikipedia.org/wiki/GameStop_short_squeeze",
      domain: "en.wikipedia.org",
    },
  ],
};

export default entry;
