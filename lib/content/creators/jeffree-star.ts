import type { CreatorEntry } from "@/types";

const entry: CreatorEntry = {
  id: "cr38",
  slug: "jeffree-star",
  title: "Jeffree Star",
  category: "creator",
  personType: "Creator",
  description:
    "MySpace-era musician turned beauty mogul — Jeffree Star Cosmetics, mansion tour vlogs, and central role in 2010s YouTube beauty drama before controversies reshaped his brand.",
  imageGradient: "from-pink-500 via-fuchsia-400 to-purple-600",
  scores: { relevance: 58, influence: 82, cringe: 75, brainrot: 38 },
  addedAt: "2026-07-23",
  views: 1600000,
  trendDirection: "declining",
  tags: ["youtube", "beauty", "myspace", "cosmetics", "drama"],
  careerStart: "2006",
  platforms: [
    { platform: "youtube", handle: "Jeffree Star", url: "https://www.youtube.com/@JeffreeStar" },
  ],
  followers: {
    youtube: "~16M+ (era-dependent)",
  },
  notableMoments: [
    "Rose on MySpace as a musician before pivoting to beauty YouTube",
    "Built Jeffree Star Cosmetics into a major influencer-owned makeup line",
    "Tati Westbrook and James Charles feuds placed him at center of beauty drama",
    "Stepped back from prominence amid 2020 controversy and brand restructuring",
  ],
  relatedSlugs: ["james-charles", "shane-dawson", "myspace", "influencer-culture"],
  media: [
    {
      role: "reference",
      type: "embed",
      url: "https://en.wikipedia.org/wiki/Jeffree_Star",
      title: "Jeffree Star — Wikipedia",
      source: "Wikipedia",
      sourceUrl: "https://en.wikipedia.org/wiki/Jeffree_Star",
      platform: "other",
      attribution: "Wikipedia contributors",
      verified: false,
    },
  ],
  sources: [
    {
      title: "Jeffree Star — Wikipedia",
      url: "https://en.wikipedia.org/wiki/Jeffree_Star",
      domain: "en.wikipedia.org",
    },
    {
      title: "Jeffree Star — YouTube",
      url: "https://www.youtube.com/@JeffreeStar",
      domain: "youtube.com",
    },
  ],
};

export default entry;
