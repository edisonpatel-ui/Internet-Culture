import type { CreatorEntry } from "@/types";

const entry: CreatorEntry = {
  id: "cr40",
  slug: "keemstar",
  title: "Keemstar (DramaAlert)",
  category: "creator",
  description:
    "Daniel Keem — DramaAlert host whose daily YouTube drama coverage, Twitter feuds, and \"Dollar in the Studio\" memes made him a polarizing fixture of creator gossip culture.",
  imageGradient: "from-red-600 via-orange-500 to-yellow-400",
  scores: { relevance: 55, influence: 75, cringe: 80, brainrot: 45 },
  addedAt: "2026-07-23",
  views: 950000,
  trendDirection: "declining",
  tags: ["youtube", "drama", "news", "twitter", "controversy"],
  careerStart: "2009",
  platforms: [
    { platform: "youtube", handle: "DramaAlert", url: "https://www.youtube.com/@DramaAlert" },
    { platform: "x", handle: "KEEMSTAR", url: "https://twitter.com/KEEMSTAR" },
  ],
  followers: {
    youtube: "~6M+",
  },
  notableMoments: [
    "DramaAlert became a daily hub for YouTube feuds and streaming news",
    "Feuds with Ethan Klein, LeafyIsHere, and others defined mid-2010s drama cycles",
    "Hosted creator boxing and event coverage during influencer crossover era",
    "Polarizing reputation — credited with speed, criticized for accuracy and tone",
  ],
  relatedSlugs: ["h3h3-ethan-hila-klein", "pewdiepie", "youtube-creator-era", "jake-paul"],
  media: [
    {
      role: "reference",
      type: "embed",
      url: "https://en.wikipedia.org/wiki/Keemstar",
      title: "Keemstar — Wikipedia",
      source: "Wikipedia",
      sourceUrl: "https://en.wikipedia.org/wiki/Keemstar",
      platform: "other",
      attribution: "Wikipedia contributors",
      verified: false,
    },
  ],
  sources: [
    {
      title: "Keemstar — Wikipedia",
      url: "https://en.wikipedia.org/wiki/Keemstar",
      domain: "en.wikipedia.org",
    },
    {
      title: "DramaAlert — YouTube",
      url: "https://www.youtube.com/@DramaAlert",
      domain: "youtube.com",
    },
  ],
};

export default entry;
