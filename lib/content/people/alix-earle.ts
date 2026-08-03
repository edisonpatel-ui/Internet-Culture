import type { CreatorEntry } from "@/types";

const entry: CreatorEntry = {
  id: "cr27",
  slug: "alix-earle",
  title: "Alix Earle",
  category: "creator",
  personType: "Creator",
  description:
    "University of Miami student-turned-TikTok phenomenon whose \"Get Ready With Me\" videos and candid tone made her one of 2023's breakout influencer names.",
  imageGradient: "from-rose-300 via-pink-200 to-amber-100",
  scores: { relevance: 53, influence: 65, cringe: 38, brainrot: 40 },
  addedAt: "2026-07-23",
  views: 980000,
  trendDirection: "stable",
  tags: ["tiktok", "grwm", "beauty", "college", "influencer"],
  careerStart: "2022",
  platforms: [
    { platform: "tiktok", handle: "alixearle", url: "https://www.tiktok.com/@alixearle" },
    { platform: "instagram", handle: "alixearle", url: "https://www.instagram.com/alixearle/" },
  ],
  followers: {
    tiktok: "~7M+ (2023 breakout)",
    instagram: "~3M+",
  },
  notableMoments: [
    "GRWM and nightlife vlogs exploded in late 2022–2023 on TikTok",
    "Dubbed \"TikTok's new It Girl\" across beauty and tabloid coverage",
    "Brand deals with major beauty and fashion labels followed rapid follower growth",
    "Represented TikTok's shift toward personality-driven, lo-fi creator fame",
  ],
  relatedSlugs: ["tiktok-rise", "influencer-culture", "instagram-culture", "charli-damelio"],
  media: [
    // AI suggested — 2023 portrait (CC BY 3.0). Human must verify.
    {
      role: "featured",
      type: "image",
      url: "https://upload.wikimedia.org/wikipedia/commons/a/a5/Alix_Earle_in_2023.png",
      title: "Alix Earle in 2023",
      source: "Wikimedia Commons",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Alix_Earle_in_2023.png",
      platform: "wikimedia",
      attribution: "Sonali Prabhu (CC BY 3.0)",
      license: "CC BY 3.0",
      description: "Alix Earle, 2023.",
      verified: false,
    },
    {
      role: "reference",
      type: "embed",
      url: "https://en.wikipedia.org/wiki/Alix_Earle",
      title: "Alix Earle — Wikipedia",
      source: "Wikipedia",
      sourceUrl: "https://en.wikipedia.org/wiki/Alix_Earle",
      platform: "other",
      attribution: "Wikipedia contributors",
      verified: false,
    },
  ],
  sources: [
    {
      title: "Alix Earle — Wikipedia",
      url: "https://en.wikipedia.org/wiki/Alix_Earle",
      domain: "en.wikipedia.org",
    },
    {
      title: "Alix Earle — TikTok",
      url: "https://www.tiktok.com/@alixearle",
      domain: "tiktok.com",
    },
  ],
};

export default entry;
