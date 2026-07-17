import type { CreatorEntry } from "@/types";

const entry: CreatorEntry = {
  id: "cr4",
  slug: "mrbeast",
  title: "MrBeast",
  category: "creator",
  description:
    "The most-subscribed individual creator on YouTube — known for large-scale philanthropy, stunts, and record-breaking productions.",
  imageGradient: "from-yellow-400 via-amber-500 to-orange-500",
  scores: { relevance: 98, brainrot: 38, cringe: 22 },
  addedAt: "2026-07-01",
  views: 860000,
  trendDirection: "stable",
  tags: ["youtube", "philanthropy", "stunts", "feastables"],
  careerStart: "2012",
  platforms: [
    {
      platform: "youtube",
      handle: "MrBeast",
      url: "https://www.youtube.com/@MrBeast",
    },
    {
      platform: "instagram",
      handle: "@mrbeast",
      url: "https://www.instagram.com/mrbeast",
    },
    {
      platform: "x",
      handle: "@MrBeast",
      url: "https://x.com/MrBeast",
    },
  ],
  followers: {
    youtube: "~350M+",
  },
  notableMoments: [
    "Became the most-subscribed individual YouTube channel",
    "Founded Feastables chocolate brand",
    "Produced Beast Games — a reality competition show on Amazon Prime",
    "Philanthropic productions have distributed tens of millions in prizes and donations",
  ],
  sources: [
    {
      title: "MrBeast — YouTube Channel",
      url: "https://www.youtube.com/@MrBeast",
      domain: "youtube.com",
    },
    {
      title: "MrBeast — Wikipedia",
      url: "https://en.wikipedia.org/wiki/MrBeast",
      domain: "en.wikipedia.org",
    },
  ],
};

export default entry;
