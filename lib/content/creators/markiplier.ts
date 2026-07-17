import type { CreatorEntry } from "@/types";

const entry: CreatorEntry = {
  id: "cr7",
  slug: "markiplier",
  title: "Markiplier",
  category: "creator",
  description:
    "Mark Fischbach — YouTube's most recognizable horror game narrator, known for dramatic reactions, emotional storytelling, and record-breaking charity work.",
  imageGradient: "from-rose-600 via-red-700 to-rose-800",
  scores: { relevance: 90, brainrot: 38, cringe: 20 },
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
  relatedSlugs: ["pewdiepie", "ninja"],
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
