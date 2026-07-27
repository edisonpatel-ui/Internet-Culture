import type { CreatorEntry } from "@/types";

const entry: CreatorEntry = {
  id: "cr7",
  slug: "markiplier",
  title: "Markiplier",
  category: "creator",
  personType: "Creator",
  description:
    "Mark Fischbach — YouTube's most recognizable horror game narrator, known for dramatic reactions, emotional storytelling, and record-breaking charity work.",
  imageGradient: "from-rose-600 via-red-700 to-rose-800",
  scores: { relevance: 80, influence: 90, cringe: 38, brainrot: 37 },
  addedAt: "2026-07-16",
  views: 980000,
  trendDirection: "stable",
  tags: ["youtube", "gaming", "horror", "charity", "lets-play", "indie"],
  careerStart: "2012",
  platforms: [
    {
      platform: "youtube",
      handle: "Markiplier",
      url: "https://www.youtube.com/@markiplier",
    },
    {
      platform: "twitch",
      handle: "markiplier",
      url: "https://www.twitch.tv/markiplier",
    },
  ],
  followers: {
    youtube: "~35M+",
  },
  notableMoments: [
    "Horror gaming pioneer — his FNAF and Amnesia playthroughs defined the horror genre on YouTube",
    "'Unus Annus' — a channel created with CrankGameplays that produced one video per day for a year, then deleted everything permanently on schedule (2019–2020)",
    "Multiple charity livestreams raising millions of dollars for various organizations",
    "Wrote, directed, and starred in 'Iron Lung' (2023), an adaptation of the indie horror game",
  ],
  relatedSlugs: ["pewdiepie", "ninja", "lord-farquaad-e"],
  relationships: {
    spawnedVariants: ["lord-farquaad-e"],
  },
  media: [
    {
      role: "featured",
      type: "image",
      url: "https://upload.wikimedia.org/wikipedia/commons/8/8b/Markiplier_by_Gage_Skidmore.jpg",
      title: "Markiplier at PAX West 2018",
      source: "Wikimedia Commons / Gage Skidmore",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Markiplier_by_Gage_Skidmore.jpg",
      platform: "wikimedia",
      attribution: "Gage Skidmore (CC BY-SA 3.0)",
      license: "CC BY-SA 3.0",
      description: "Markiplier (Mark Fischbach) speaking at PAX West in Seattle, Washington, August 31, 2018.",
      date: "2018-08-31",
      verified: true,
    },
    // ── REFERENCE ──────────────────────────────────────────────────────────────
    {
      role: "reference",
      type: "embed",
      url: "https://en.wikipedia.org/wiki/Markiplier",
      title: "Markiplier — Wikipedia",
      source: "Wikipedia",
      sourceUrl: "https://en.wikipedia.org/wiki/Markiplier",
      platform: "wikimedia",
      attribution: "Wikipedia contributors",
      license: "CC BY-SA 4.0",
      description: "Wikipedia article covering Mark Fischbach's YouTube career and charity work.",
      verified: false,
    },
  ],
  sources: [
    {
      title: "Markiplier — YouTube Channel",
      url: "https://www.youtube.com/@markiplier",
      domain: "youtube.com",
    },
    {
      title: "Markiplier — Wikipedia",
      url: "https://en.wikipedia.org/wiki/Markiplier",
      domain: "en.wikipedia.org",
    },
  ],
};

export default entry;
