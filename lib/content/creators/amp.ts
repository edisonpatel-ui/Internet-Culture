import type { CreatorEntry } from "@/types";

const entry: CreatorEntry = {
  id: "cr23",
  slug: "amp",
  title: "AMP",
  category: "creator",
  description:
    "Any Means Possible — the Atlanta-based streamer collective behind Kai Cenat, Duke Dennis, Fanum, and co.",
  imageGradient: "from-orange-500 via-red-500 to-rose-600",
  scores: { relevance: 92, brainrot: 58, cringe: 30 },
  addedAt: "2026-07-17",
  views: 1100000,
  trendDirection: "rising",
  tags: ["twitch", "youtube", "collective", "atlanta", "irl", "gaming"],
  careerStart: "2019",
  platforms: [
    {
      platform: "youtube",
      handle: "AMPEXCLUSIVE",
      url: "https://www.youtube.com/@AMPEXCLUSIVE",
    },
    {
      platform: "twitch",
      handle: "KaiCenat",
      url: "https://www.twitch.tv/kaicenat",
    },
  ],
  followers: {
    youtube: "Millions across member channels",
    twitch: "Kai Cenat alone ~7M+",
  },
  notableMoments: [
    "Founded around 2019 as a gaming/IRL content collective; based in Atlanta",
    "Core members: Duke Dennis, Agent00, Fanum, Chrisnxtdoor, ImDavisss, and Kai Cenat (joined ~2020)",
    "Won Best Content Organization at the 2023 Streamer Awards; Streamy Award for Lifestyle (2023)",
    "Expanded into merch, a Bang Energy partnership (2024), and TONE skincare (2025)",
  ],
  relatedSlugs: [
    "kai-cenat",
    "duke-dennis",
    "rizz",
    "fanum-tax",
    "gyatt",
    "glazing",
    "brainrot",
  ],
  relationships: {
    community: ["kai-cenat", "duke-dennis"],
    popularized: ["fanum-tax", "rizz", "gyatt"],
    relatedSlang: ["glazing", "brainrot"],
  },
  media: [
    // AI suggested — Commons collage of the six core members (CC BY 3.0)
    {
      role: "featured",
      type: "image",
      url: "https://upload.wikimedia.org/wikipedia/commons/e/e2/AMP_Collage_3.jpg",
      title: "AMP collective collage",
      source: "Wikimedia Commons",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:AMP_Collage_3.jpg",
      platform: "wikimedia",
      attribution:
        "MILLION DOLLAZ WORTH OF GAME / Agent 00 Gaming / ImDavisss Live (CC BY 3.0); collage by Gamerfronts",
      license: "CC BY 3.0",
      description:
        "Composite of Kai Cenat, ImDavisss, Fanum, Duke Dennis, Agent00, and Chrisnxtdoor — the core AMP roster.",
      date: "2025",
      verified: false,
    },
    {
      role: "reference",
      type: "embed",
      url: "https://en.wikipedia.org/wiki/AMP_(streamer_collective)",
      title: "AMP (streamer collective) — Wikipedia",
      source: "Wikipedia",
      sourceUrl: "https://en.wikipedia.org/wiki/AMP_(streamer_collective)",
      platform: "wikimedia",
      attribution: "Wikipedia contributors",
      license: "CC BY-SA 4.0",
      description: "Members, history, and business ventures overview.",
      verified: false,
    },
    {
      role: "reference",
      type: "embed",
      url: "https://amp.shop/",
      title: "AMP Official Store",
      source: "AMP",
      sourceUrl: "https://amp.shop/",
      platform: "other",
      attribution: "AMP / Any Means Possible",
      description: "Official merch store for the collective.",
      verified: false,
    },
  ],
  sources: [
    {
      title: "AMP (streamer collective) — Wikipedia",
      url: "https://en.wikipedia.org/wiki/AMP_(streamer_collective)",
      domain: "en.wikipedia.org",
    },
    {
      title: "Meet AMP, the Brat Pack of the Streamer Era — Rolling Stone",
      url: "https://www.rollingstone.com/culture/culture-features/kai-cenat-amp-brat-pack-1235331441/",
      domain: "rollingstone.com",
    },
    {
      title: "AMP Official Store",
      url: "https://amp.shop/",
      domain: "amp.shop",
    },
  ],
};

export default entry;
