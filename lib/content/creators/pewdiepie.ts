import type { CreatorEntry } from "@/types";

const entry: CreatorEntry = {
  id: "cr6",
  slug: "pewdiepie",
  title: "PewDiePie",
  category: "creator",
  description:
    "Felix Kjellberg — Swedish YouTuber who held the most-subscribed individual channel title for years and defined the gaming commentary era of YouTube.",
  imageGradient: "from-red-600 via-rose-500 to-orange-400",
  scores: { relevance: 92, brainrot: 45, cringe: 30 },
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
