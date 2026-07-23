import type { CreatorEntry } from "@/types";

const entry: CreatorEntry = {
  id: "cr3",
  slug: "jools-lebron",
  title: "Jools Lebron",
  category: "creator",
  description:
    "TikTok creator who launched 'very demure, very mindful' into mainstream culture in 2024.",
  imageGradient: "from-violet-500 via-purple-500 to-fuchsia-500",
  scores: { relevance: 79, influence: 79, cringe: 12, brainrot: 32 },
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
  relatedSlugs: ["demure-mindful", "brat-summer", "clean-girl-aesthetic", "girl-dinner"],
  media: [
    // AI suggested — KYM demure entry icon includes Jools (right panel). No Commons
    // portrait; TikTok CDN forbidden. Human must verify and set verified: true.
    {
      role: "featured",
      type: "image",
      url: "https://i.kym-cdn.com/entries/icons/original/000/050/925/demure.jpg",
      title: "Jools Lebron — Very Demure, Very Mindful",
      source: "Know Your Meme",
      sourceUrl: "https://knowyourmeme.com/memes/very-demure-very-mindful",
      platform: "knowyourmeme",
      attribution: "Jools Lebron / @joolieannie (via Know Your Meme documentation)",
      description:
        "Still of Jools Lebron from the viral 'very demure, very mindful' workplace makeup videos.",
      date: "2024",
      verified: false,
    },
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
