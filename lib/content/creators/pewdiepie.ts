import type { CreatorEntry } from "@/types";

const entry: CreatorEntry = {
  id: "cr6",
  slug: "pewdiepie",
  title: "PewDiePie",
  category: "creator",
  description:
    "Felix Kjellberg — Swedish YouTuber who held the most-subscribed individual channel title for years and defined the gaming commentary era of YouTube.",
  imageGradient: "from-red-600 via-rose-500 to-orange-400",
  scores: { relevance: 92, influence: 96, cringe: 30, brainrot: 45 },
  addedAt: "2026-07-16",
  views: 1200000,
  trendDirection: "stable",
  tags: ["youtube", "gaming", "commentary", "swedish", "video essays"],
  careerStart: "2010",
  platforms: [
    {
      platform: "youtube",
      handle: "PewDiePie",
      url: "https://www.youtube.com/@PewDiePie",
    },
  ],
  followers: {
    youtube: "~110M+",
  },
  notableMoments: [
    "Most-subscribed individual YouTube channel from 2013 through multiple years",
    "'Subscribe to PewDiePie' campaign against T-Series in 2018–2019 — a defining YouTube cultural moment",
    "Transitioned from gaming commentary to meme reviews, commentary, and video essays",
    "Married Marzia Bisognin in 2019",
  ],
  relatedSlugs: ["harlem-shake", "doge"],
  media: [
    {
      role: "featured",
      type: "image",
      url: "https://upload.wikimedia.org/wikipedia/commons/5/53/Pewdiepie_head_shot.jpg",
      title: "PewDiePie — 2019",
      source: "Wikimedia Commons / Cold Ones Clips (YouTube)",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Pewdiepie_head_shot.jpg",
      platform: "wikimedia",
      attribution: "Cold Ones Clips (CC BY 3.0)",
      license: "CC BY 3.0",
      description: "Felix Kjellberg (PewDiePie) photographed from the Cold Ones podcast, July 2019.",
      date: "2019-07-13",
      verified: true,
    },
    // ── REFERENCE ──────────────────────────────────────────────────────────────
    {
      role: "reference",
      type: "embed",
      url: "https://en.wikipedia.org/wiki/PewDiePie",
      title: "PewDiePie — Wikipedia",
      source: "Wikipedia",
      sourceUrl: "https://en.wikipedia.org/wiki/PewDiePie",
      platform: "wikimedia",
      attribution: "Wikipedia contributors",
      license: "CC BY-SA 4.0",
      description: "Wikipedia article covering Felix Kjellberg's YouTube career and cultural impact.",
      verified: false,
    },
  ],
  sources: [
    {
      title: "PewDiePie — YouTube Channel",
      url: "https://www.youtube.com/@PewDiePie",
      domain: "youtube.com",
    },
    {
      title: "PewDiePie — Wikipedia",
      url: "https://en.wikipedia.org/wiki/PewDiePie",
      domain: "en.wikipedia.org",
    },
  ],
};

export default entry;
