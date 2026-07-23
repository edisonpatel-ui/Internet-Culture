import type { MemeEntry } from "@/types";

const entry: MemeEntry = {
  id: "m138",
  slug: "lunchly",
  title: "Lunchly",
  category: "meme",
  description:
    "The Logan Paul and KSI lunch-kit brand mocked as overpriced Lunchables — unboxing roasts and influencer CPG fatigue in one box.",
  imageGradient: "from-orange-400 via-red-400 to-yellow-300",
  scores: { relevance: 55, influence: 45, cringe: 55, brainrot: 58 },
  addedAt: "2026-07-23",
  historicalDate: "2024-09-16",
  views: 1500000,
  trendDirection: "declining",
  tags: ["logan-paul", "ksi", "youtube", "food", "brand", "2023"],
  meaning:
    "Memes about Lunchly — pre-packaged lunch kits co-created by Logan Paul and KSI with Prime tie-ins. Jokes focus on price vs Lunchables, tiny portions, and the pattern of YouTubers launching snack brands. Often grouped with Prime and Feastables as creator-merch satire.",
  origin:
    "On September 16, 2024, Logan Paul, KSI, and MrBeast announced Lunchly as a Lunchables competitor bundling Prime and Feastables. Food YouTubers and TikTok critics quickly meme'd unboxings comparing value to grocery-store kits. Know Your Meme documents the DanTDM backlash cycle and mold-controversy memes as peak roast-review season.",
  timeline: [
    { date: "Sep 16, 2024", event: "Lunchly announced by Paul, KSI, and MrBeast with Prime and Feastables bundles" },
    { date: "Sep 2024", event: "TikTok unboxing roasts and DanTDM criticism go viral" },
    { date: "Oct 2024", event: "Mold reports and FDA complaint discourse fuel meme backlash" },
    { date: "2024+", event: "Remains shorthand for overpriced influencer snack launches" },
  ],
  examples: [
    "Side-by-side Lunchly vs Lunchables cost meme",
    "Review thumbnail: 'I paid HOW much for this?'",
    "Comment: 'They'll sell you air next' under a Prime + Lunchly promo",
  ],
  relatedSlugs: ["logan-paul", "ksi", "prime-hydration", "feastables", "dupe-economy", "mrbeast"],
  relationships: {
    popularized: ["logan-paul", "ksi"],
    relatedEvent: ["dupe-economy"],
    sameEra: ["prime-hydration", "feastables"],
  },
  media: [
    {
      role: "reference",
      type: "embed",
      url: "https://knowyourmeme.com/memes/subcultures/dantdm-vs-mrbeast-ksi-and-logan-pauls-lunchly",
      title: "DanTDM vs. Lunchly — Know Your Meme",
      source: "Know Your Meme",
      sourceUrl: "https://knowyourmeme.com/memes/subcultures/dantdm-vs-mrbeast-ksi-and-logan-pauls-lunchly",
      platform: "knowyourmeme",
      attribution: "Know Your Meme / Literally Media",
      description: "September 2024 launch backlash and cash-grab meme discourse.",
      verified: false,
    },
    {
      role: "reference",
      type: "embed",
      url: "https://en.wikipedia.org/wiki/Lunchly",
      title: "Lunchly — Wikipedia",
      source: "Wikipedia",
      sourceUrl: "https://en.wikipedia.org/wiki/Lunchly",
      platform: "other",
      attribution: "Wikipedia contributors",
      license: "CC BY-SA 4.0",
      description: "Product background and reception.",
      verified: false,
    },
  ],
  sources: [
    {
      title: "DanTDM vs. MrBeast, KSI and Logan Paul's Lunchly — Know Your Meme",
      url: "https://knowyourmeme.com/memes/subcultures/dantdm-vs-mrbeast-ksi-and-logan-pauls-lunchly",
      domain: "knowyourmeme.com",
    },
    {
      title: "Lunchly — Wikipedia",
      url: "https://en.wikipedia.org/wiki/Lunchly",
      domain: "en.wikipedia.org",
    },
  ],
};

export default entry;
