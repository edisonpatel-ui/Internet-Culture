import type { BaseEntry } from "@/types";

const entry: BaseEntry = {
  id: "t3",
  slug: "demure-mindful",
  title: "Very Demure, Very Mindful",
  category: "trend",
  description:
    "TikTok catchphrase about understated elegance that became ironic workplace satire overnight.",
  imageGradient: "from-rose-500 via-pink-500 to-purple-500",
  scores: { relevance: 91, influence: 91, cringe: 38, brainrot: 42 },
  addedAt: "2026-07-08",
  views: 890000,
  trendDirection: "declining",
  // DEFINING VISUAL PASS — HERO EMPTY:
  // Target: Jools demure TikTok still. Sources checked: Commons/Wikipedia
  // (no portrait; wrong Seattle file); TikTok CDN forbidden.
  media: [
    {
      role: "reference",
      type: "embed",
      url: "https://en.wikipedia.org/wiki/Jools_Lebron",
      title: "Jools Lebron — Wikipedia",
      source: "Wikipedia",
      sourceUrl: "https://en.wikipedia.org/wiki/Jools_Lebron",
      platform: "other",
      attribution: "Wikipedia contributors",
      description:
        "Coverage of Jools Lebron and the 'very demure, very mindful' viral phrase.",
      date: "2024",
      verified: true,
    },
  ],
  sources: [
    {
      title: "Jools Lebron — Wikipedia",
      url: "https://en.wikipedia.org/wiki/Jools_Lebron",
      domain: "en.wikipedia.org",
    },
  ],
  relatedSlugs: ["jools-lebron", "slay"],
};

export default entry;
