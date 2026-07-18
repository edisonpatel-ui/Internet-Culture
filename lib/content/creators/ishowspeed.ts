import type { CreatorEntry } from "@/types";

const entry: CreatorEntry = {
  id: "cr5",
  slug: "ishowspeed",
  title: "IShowSpeed",
  category: "creator",
  description:
    "Unpredictable live streamer known for chaotic reactions, viral clips, and a passionate connection to soccer culture.",
  imageGradient: "from-red-500 via-rose-500 to-pink-600",
  scores: { relevance: 89, brainrot: 84, cringe: 58 },
  addedAt: "2026-07-04",
  views: 385000,
  trendDirection: "rising",
  tags: ["streaming", "youtube", "viral", "soccer", "chaos"],
  careerStart: "2016",
  platforms: [
    {
      platform: "youtube",
      handle: "IShowSpeed",
      url: "https://www.youtube.com/@ishowspeed",
    },
    {
      platform: "tiktok",
      handle: "@ishowspeed",
      url: "https://www.tiktok.com/@ishowspeed",
    },
  ],
  followers: {
    youtube: "~25M+",
  },
  notableMoments: [
    "Known for explosive live stream reactions that consistently generate viral clips",
    "Strong public association with Cristiano Ronaldo and soccer culture",
    "Traveled to Portugal and met Ronaldo — widely covered moment",
    "Multiple high-profile collaborations with international creators",
  ],
  media: [
    // ── FEATURED ───────────────────────────────────────────────────────────────
    // Wikimedia Commons — CC BY 2.0 photo by James Parker.
    {
      role: "featured",
      type: "image",
      url: "https://upload.wikimedia.org/wikipedia/commons/a/a2/IShowSpeed_November_2021_(52502829419).jpg",
      title: "IShowSpeed — November 2021",
      source: "Wikimedia Commons / James Parker",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:IShowSpeed_November_2021_(52502829419).jpg",
      platform: "wikimedia",
      attribution: "James Parker (CC BY 2.0)",
      license: "CC BY 2.0",
      description: "IShowSpeed (Darren Watkins Jr.) posing for a photoshoot in November 2021.",
      date: "2021-11-26",
      verified: true,
    },
    // ── REFERENCE ──────────────────────────────────────────────────────────────
    {
      role: "reference",
      type: "embed",
      url: "https://www.youtube.com/@ishowspeed",
      title: "IShowSpeed — YouTube channel",
      source: "YouTube",
      sourceUrl: "https://www.youtube.com/@ishowspeed",
      platform: "youtube",
      attribution: "IShowSpeed",
      description: "Official IShowSpeed YouTube channel — chaotic live streams and viral clips.",
      verified: false,
    },
  ],
  sources: [
    {
      title: "IShowSpeed — YouTube Channel",
      url: "https://www.youtube.com/@ishowspeed",
      domain: "youtube.com",
    },
  ],
};

export default entry;
