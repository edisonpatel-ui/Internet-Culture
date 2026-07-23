import type { CreatorEntry } from "@/types";

const entry: CreatorEntry = {
  id: "cr29",
  slug: "corpse-husband",
  title: "Corpse Husband",
  category: "creator",
  description:
    "Anonymous YouTuber and musician known for deep-voice Among Us streams, horror narration, and faceless mystique — a defining voice of 2020 gaming crossover fame.",
  imageGradient: "from-neutral-950 via-zinc-900 to-red-950",
  scores: { relevance: 55, influence: 72, cringe: 28, brainrot: 38 },
  addedAt: "2026-07-23",
  views: 890000,
  trendDirection: "declining",
  tags: ["youtube", "anonymous", "among us", "music", "faceless"],
  careerStart: "2015",
  platforms: [
    { platform: "youtube", handle: "Corpse Husband", url: "https://www.youtube.com/@Corpse_Husband" },
    { platform: "x", handle: "CORPSE", url: "https://twitter.com/CORPSE" },
  ],
  followers: {
    youtube: "~7M+",
  },
  notableMoments: [
    "Horror story narration built a loyal YouTube audience before streaming crossover",
    "Among Us streams with PewDiePie, Sykkuno, and others exploded during 2020 lockdown",
    "Maintained strict anonymity — rare faceless brand at mainstream scale",
    "Music releases including \"E-Girls Are Ruining My Life\" charted on streaming platforms",
  ],
  relatedSlugs: ["among-us-era", "pewdiepie", "pokimane", "great-meme-reset"],
  media: [
    {
      role: "reference",
      type: "embed",
      url: "https://en.wikipedia.org/wiki/Corpse_Husband",
      title: "Corpse Husband — Wikipedia",
      source: "Wikipedia",
      sourceUrl: "https://en.wikipedia.org/wiki/Corpse_Husband",
      platform: "other",
      attribution: "Wikipedia contributors",
      description: "Biography — no verified public portrait; anonymity is central to the brand.",
      verified: false,
    },
  ],
  sources: [
    {
      title: "Corpse Husband — Wikipedia",
      url: "https://en.wikipedia.org/wiki/Corpse_Husband",
      domain: "en.wikipedia.org",
    },
    {
      title: "Corpse Husband — YouTube",
      url: "https://www.youtube.com/@Corpse_Husband",
      domain: "youtube.com",
    },
  ],
};

export default entry;
