import type { CreatorEntry } from "@/types";

const entry: CreatorEntry = {
  id: "cr19",
  slug: "charli-damelio",
  title: "Charli D'Amelio",
  category: "creator",
  personType: "Creator",
  description:
    "Connecticut-born dancer who became TikTok's most followed creator and the face of the platform's explosive 2019–2020 growth — known for the Renegade dance and a remarkably rapid rise to cultural stardom.",
  imageGradient: "from-pink-400 via-rose-400 to-fuchsia-400",
  scores: { relevance: 82, influence: 82, cringe: 25, brainrot: 35 },
  addedAt: "2026-07-17",
  views: 2400000,
  trendDirection: "stable",
  tags: ["tiktok", "dance", "viral", "gen-z", "hype-house", "2020"],
  careerStart: "2019",
  platforms: [
    { platform: "tiktok", handle: "@charlidamelio", url: "https://www.tiktok.com/@charlidamelio" },
    { platform: "youtube", handle: "Charli D'Amelio", url: "https://www.youtube.com/@charlidamelio" },
    { platform: "instagram", handle: "@charlidamelio", url: "https://www.instagram.com/charlidamelio/" },
  ],
  followers: {
    tiktok: "~155M+",
    instagram: "~55M+",
  },
  notableMoments: [
    "Became TikTok's most-followed creator in just over a year, reaching 50M followers faster than anyone before her",
    "Popularized 'The Renegade' dance — a viral choreography originally created by Jalaiah Harmon",
    "Featured in Hype House — the influencer collective that defined early TikTok culture",
    "Starred in Hulu docuseries 'The D'Amelio Show' with her family (2021–2023)",
    "First TikTok creator to reach 100M followers",
    "Participated in Dancing with the Stars Season 31 (2022) — finished as runner-up",
  ],
  relatedSlugs: ["bella-poarch", "khaby-lame"],
  media: [
    {
      role: "featured",
      type: "image",
      url: "https://upload.wikimedia.org/wikipedia/commons/6/6c/Charli_D%27Amelio_in_Nov_2020_5.jpg",
      title: "Charli D'Amelio — November 2020",
      source: "Wikimedia Commons",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Charli_D'Amelio_in_Nov_2020_5.jpg",
      platform: "wikimedia",
      attribution: "Wikimedia Commons contributors",
      license: "CC BY-SA 4.0",
      description: "Charli D'Amelio photographed in November 2020.",
      date: "2020-11",
      verified: true,
    },
    // ── REFERENCE ──────────────────────────────────────────────────────────────
    {
      role: "reference",
      type: "embed",
      url: "https://en.wikipedia.org/wiki/Charli_D%27Amelio",
      title: "Charli D'Amelio — Wikipedia",
      source: "Wikipedia",
      sourceUrl: "https://en.wikipedia.org/wiki/Charli_D%27Amelio",
      platform: "wikimedia",
      attribution: "Wikipedia contributors",
      license: "CC BY-SA 4.0",
      description: "Wikipedia article covering Charli D'Amelio's TikTok rise and cultural influence.",
      verified: false,
    },
  ],
  sources: [
    {
      title: "Charli D'Amelio — TikTok",
      url: "https://www.tiktok.com/@charlidamelio",
      domain: "tiktok.com",
    },
    {
      title: "Charli D'Amelio — Wikipedia",
      url: "https://en.wikipedia.org/wiki/Charli_D%27Amelio",
      domain: "en.wikipedia.org",
    },
  ],
};

export default entry;
