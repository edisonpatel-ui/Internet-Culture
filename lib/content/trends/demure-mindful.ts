import type { BaseEntry } from "@/types";

const entry: BaseEntry = {
  id: "t3",
  slug: "demure-mindful",
  title: "Very Demure, Very Mindful",
  category: "trend",
  description:
    "TikTok catchphrase about understated elegance that became ironic workplace satire overnight.",
  imageGradient: "from-rose-500 via-pink-500 to-purple-500",
  scores: { relevance: 91, brainrot: 42, cringe: 38 },
  addedAt: "2026-07-08",
  views: 890000,
  trendDirection: "declining",
  // Aesthetic/catchphrase trend — no reliable CC still of the demure look.
  // Jools Lebron portrait unavailable on Commons; references only.
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
};

export default entry;
