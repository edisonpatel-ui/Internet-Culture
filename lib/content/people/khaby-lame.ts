import type { CreatorEntry } from "@/types";

const entry: CreatorEntry = {
  id: "cr17",
  slug: "khaby-lame",
  title: "Khaby Lame",
  category: "creator",
  personType: "Creator",
  description:
    "Senegalese-Italian TikToker who became the most-followed person on TikTok through silent, deadpan reaction videos — mocking overcomplicated 'life hacks' with simple common-sense solutions.",
  imageGradient: "from-black via-gray-800 to-gray-700",
  scores: { relevance: 76, influence: 87, cringe: 22, brainrot: 29 },
  addedAt: "2026-07-17",
  views: 2800000,
  trendDirection: "stable",
  tags: ["tiktok", "viral", "silent-comedy", "life-hacks", "italian", "senegalese"],
  careerStart: "2020",
  platforms: [
    { platform: "tiktok", handle: "@khaby.lame", url: "https://www.tiktok.com/@khaby.lame" },
    { platform: "instagram", handle: "@khaby00", url: "https://www.instagram.com/khaby00/" },
  ],
  followers: {
    tiktok: "~162M+",
    instagram: "~80M+",
  },
  notableMoments: [
    "Lost his factory job during COVID-19 lockdowns in 2020 and started posting on TikTok",
    "Became the most-followed creator on TikTok in June 2022, overtaking Charli D'Amelio",
    "His silent deadpan reaction format transcended language barriers — viral in every country",
    "Appeared at the Cannes Film Festival 2022 and multiple major brand campaigns",
    "Italian citizenship granted in August 2022 (was previously a legal resident from Senegal)",
  ],
  relatedSlugs: ["charli-damelio", "zach-king"],
  media: [
    {
      role: "featured",
      type: "image",
      url: "https://upload.wikimedia.org/wikipedia/commons/1/15/KhabyLame.jpg",
      title: "Khaby Lame — Cannes 2022",
      source: "Wikimedia Commons / Gilzetbase",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:KhabyLame.jpg",
      platform: "wikimedia",
      attribution: "Gilzetbase (CC BY-SA 4.0)",
      license: "CC BY-SA 4.0",
      description: "Khaby Lame photographed at the Cannes Film Festival, May 2022.",
      date: "2022-05-18",
      verified: true,
    },
    // ── REFERENCE ──────────────────────────────────────────────────────────────
    {
      role: "reference",
      type: "embed",
      url: "https://en.wikipedia.org/wiki/Khaby_Lame",
      title: "Khaby Lame — Wikipedia",
      source: "Wikipedia",
      sourceUrl: "https://en.wikipedia.org/wiki/Khaby_Lame",
      platform: "wikimedia",
      attribution: "Wikipedia contributors",
      license: "CC BY-SA 4.0",
      description: "Wikipedia article covering Khaby Lame's TikTok career and silent-comedy format.",
      verified: false,
    },
  ],
  sources: [
    {
      title: "Khaby Lame — TikTok",
      url: "https://www.tiktok.com/@khaby.lame",
      domain: "tiktok.com",
    },
    {
      title: "Khaby Lame — Wikipedia",
      url: "https://en.wikipedia.org/wiki/Khaby_Lame",
      domain: "en.wikipedia.org",
    },
  ],
};

export default entry;
