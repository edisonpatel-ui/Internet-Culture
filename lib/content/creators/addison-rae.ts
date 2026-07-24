import type { CreatorEntry } from "@/types";

const entry: CreatorEntry = {
  id: "cr26",
  slug: "addison-rae",
  title: "Addison Rae",
  category: "creator",
  personType: "Creator",
  description:
    "Louisiana-born TikToker who became one of the platform's first megastars — dance clips, Hype House era fame, and a path from For You pages to music and film.",
  imageGradient: "from-pink-400 via-rose-300 to-orange-300",
  scores: { relevance: 78, influence: 75, cringe: 42, brainrot: 48 },
  addedAt: "2026-07-23",
  views: 2100000,
  trendDirection: "stable",
  tags: ["tiktok", "dance", "hype house", "influencer", "gen-z"],
  careerStart: "2019",
  platforms: [
    { platform: "tiktok", handle: "addisonre", url: "https://www.tiktok.com/@addisonre" },
    { platform: "youtube", handle: "Addison Rae", url: "https://www.youtube.com/@AddisonRae" },
  ],
  followers: {
    tiktok: "~88M+ (peak era)",
    instagram: "~35M+",
  },
  notableMoments: [
    "Rose with early TikTok dance trends and Hype House collective visibility",
    "Signed with talent agency WME; expanded into music and Netflix's He's All That",
    "Became a reference face for TikTok's 2019–2021 creator boom",
    "Helped normalize TikTok stars crossing into traditional Hollywood pipelines",
  ],
  relatedSlugs: ["charli-damelio", "tiktok-rise", "influencer-culture", "bella-poarch"],
  media: [
    // Replaces prior illustration (File:Addison_Rae_portrait.jpg — drawing, not a photo).
    // AI suggested — concert photograph; human must verify and set verified: true.
    {
      role: "featured",
      type: "image",
      url: "https://upload.wikimedia.org/wikipedia/commons/a/aa/Addison_Rae_for_The_Addison_Tour_in_Toronto%2C_Oct._8_2025.jpg",
      title: "Addison Rae on The Addison Tour (Toronto, 2025)",
      source: "Wikimedia Commons",
      sourceUrl:
        "https://commons.wikimedia.org/wiki/File:Addison_Rae_for_The_Addison_Tour_in_Toronto,_Oct._8_2025.jpg",
      platform: "wikimedia",
      attribution: "Luka0188 (CC BY 4.0)",
      license: "CC BY 4.0",
      description:
        "Addison Rae performing on The Addison Tour at Coca-Cola Coliseum in Toronto, October 8, 2025.",
      date: "2025-10-08",
      verified: false,
    },
    {
      role: "reference",
      type: "embed",
      url: "https://en.wikipedia.org/wiki/Addison_Rae",
      title: "Addison Rae — Wikipedia",
      source: "Wikipedia",
      sourceUrl: "https://en.wikipedia.org/wiki/Addison_Rae",
      platform: "other",
      attribution: "Wikipedia contributors",
      verified: false,
    },
  ],
  sources: [
    {
      title: "Addison Rae — Wikipedia",
      url: "https://en.wikipedia.org/wiki/Addison_Rae",
      domain: "en.wikipedia.org",
    },
    {
      title: "Addison Rae — TikTok",
      url: "https://www.tiktok.com/@addisonre",
      domain: "tiktok.com",
    },
  ],
};

export default entry;
