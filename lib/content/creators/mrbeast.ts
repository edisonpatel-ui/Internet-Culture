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
  media: [
    // ── FEATURED ───────────────────────────────────────────────────────────────
    // Wikimedia Commons — extracted from a CC BY YouTube video by NickRewind.
    {
      role: "featured",
      type: "image",
      url: "https://upload.wikimedia.org/wikipedia/commons/2/26/MrBeast_at_the_Kids_Choice_Awards_2022.jpg",
      title: "MrBeast at the Kids Choice Awards 2022",
      source: "Wikimedia Commons / NickRewind",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:MrBeast_at_the_Kids_Choice_Awards_2022.jpg",
      platform: "wikimedia",
      attribution: "NickRewind (CC BY 3.0)",
      license: "CC BY 3.0",
      description: "MrBeast (Jimmy Donaldson) giving a speech after winning Favorite Male Creator at the 2022 Kids Choice Awards.",
      date: "2022",
      verified: true,
    },
    // ── REFERENCE ──────────────────────────────────────────────────────────────
    {
      role: "reference",
      type: "embed",
      url: "https://en.wikipedia.org/wiki/MrBeast",
      title: "MrBeast — Wikipedia",
      source: "Wikipedia",
      sourceUrl: "https://en.wikipedia.org/wiki/MrBeast",
      platform: "wikimedia",
      attribution: "Wikipedia contributors",
      license: "CC BY-SA 4.0",
      description: "Wikipedia article covering MrBeast's career, philanthropy, and cultural impact.",
      verified: true,
    },
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
