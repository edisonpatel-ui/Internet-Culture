import type { CreatorEntry } from "@/types";

const entry: CreatorEntry = {
  id: "cr1",
  slug: "kai-cenat",
  title: "Kai Cenat",
  category: "creator",
  description:
    "Record-breaking Twitch streamer and cultural architect of modern internet slang.",
  imageGradient: "from-orange-500 via-red-500 to-rose-600",
  scores: { relevance: 94, brainrot: 65, cringe: 28 },
  addedAt: "2026-07-01",
  views: 420000,
  trendDirection: "stable",
  tags: ["streaming", "twitch", "slang", "gaming", "amp"],
  careerStart: "2019",
  platforms: [
    {
      platform: "twitch",
      handle: "KaiCenat",
      url: "https://www.twitch.tv/kaicenat",
    },
    {
      platform: "youtube",
      handle: "Kai Cenat",
      url: "https://www.youtube.com/@KaiCenat",
    },
  ],
  followers: {
    twitch: "~7M",
    youtube: "~8M",
  },
  notableMoments: [
    "Set the all-time Twitch subscriber record (2023)",
    "Hosted Mafiathon — a multi-day charity subathon event",
    "Central to popularizing 'rizz' and 'fanum tax' in mainstream vocabulary",
    "Co-founder of the AMP (Any Means Possible) content collective",
  ],
  relatedSlugs: ["rizz", "fanum-tax"],
  sources: [
    {
      title: "Kai Cenat — Twitch Channel",
      url: "https://www.twitch.tv/kaicenat",
      domain: "twitch.tv",
    },
    {
      title: "Kai Cenat breaks Twitch all-time subscriber record",
      domain: "variety.com",
    },
    {
      title: "Kai Cenat — Wikipedia",
      url: "https://en.wikipedia.org/wiki/Kai_Cenat",
      domain: "en.wikipedia.org",
    },
  ],
};

export default entry;
