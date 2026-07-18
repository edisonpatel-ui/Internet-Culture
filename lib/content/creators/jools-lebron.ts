import type { CreatorEntry } from "@/types";

const entry: CreatorEntry = {
  id: "cr3",
  slug: "jools-lebron",
  title: "Jools Lebron",
  category: "creator",
  description:
    "TikTok creator who launched 'very demure, very mindful' into mainstream culture in 2024.",
  imageGradient: "from-violet-500 via-purple-500 to-fuchsia-500",
  scores: { relevance: 79, brainrot: 32, cringe: 12 },
  addedAt: "2026-07-03",
  views: 195000,
  trendDirection: "declining",
  tags: ["tiktok", "viral", "phrase", "demure"],
  careerStart: "2024",
  platforms: [
    {
      platform: "tiktok",
      handle: "@joolieannie",
      url: "https://www.tiktok.com/@joolieannie",
    },
  ],
  notableMoments: [
    "Posted the original 'very demure, very mindful' TikTok in August 2024",
    "Phrase spread rapidly to brand marketing, news segments, and political commentary",
    "Became one of the most-quoted TikTok phrases of 2024",
  ],
  relatedSlugs: ["demure-mindful"],
  // No Wikimedia Commons portrait found. Channel reference only — do not use
  // social CDN screenshots or fan images as a fake featured photo.
  media: [
    {
      role: "reference",
      type: "embed",
      url: "https://www.tiktok.com/@joolieannie",
      title: "Jools Lebron — TikTok (@joolieannie)",
      source: "TikTok",
      sourceUrl: "https://www.tiktok.com/@joolieannie",
      platform: "tiktok",
      attribution: "Jools Lebron / @joolieannie",
      description:
        "Official TikTok account where the 'very demure, very mindful' videos were posted.",
      date: "2024",
      verified: true,
    },
    {
      role: "reference",
      type: "embed",
      url: "https://en.wikipedia.org/wiki/Jools_Lebron",
      title: "Jools Lebron — Wikipedia",
      source: "Wikipedia",
      sourceUrl: "https://en.wikipedia.org/wiki/Jools_Lebron",
      platform: "other",
      attribution: "Wikipedia contributors",
      description: "Biography and demure-trend coverage.",
      date: "2024",
      verified: true,
    },
  ],
  sources: [
    {
      title: "Jools Lebron — TikTok",
      url: "https://www.tiktok.com/@joolieannie",
      domain: "tiktok.com",
    },
  ],
};

export default entry;
