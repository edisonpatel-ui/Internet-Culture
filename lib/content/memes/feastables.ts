import type { MemeEntry } from "@/types";

const entry: MemeEntry = {
  id: "m139",
  slug: "feastables",
  title: "Feastables",
  category: "meme",
  description:
    "MrBeast's Feastables chocolate brand — golden ticket hunts, store cleanouts, and YouTube merch culture as meme material.",
  imageGradient: "from-amber-700 via-yellow-500 to-orange-600",
  scores: { relevance: 65, influence: 60, cringe: 40, brainrot: 55 },
  addedAt: "2026-07-23",
  historicalDate: "2022-01-01",
  views: 2600000,
  trendDirection: "stable",
  tags: ["mrbeast", "youtube", "brand", "chocolate", "2022", "hype"],
  meaning:
    "Memes about Feastables — Jimmy Donaldson (MrBeast)'s chocolate bar line promoted through massive YouTube integrations, golden ticket contests, and fan raids on Walmart shelves. Jokes cover 'I bought every bar in the store,' taste-test loyalty, and whether creator chocolate is just hype packaging.",
  origin:
    "Feastables launched in 2022 as part of MrBeast's expanding consumer brand empire. Know Your Meme and business coverage note videos of fans clearing retail displays and hunting rare bars — turning shopping into content. The meme parallels Prime/Lunchly creator-CPG satire but with MrBeast's scale and philanthropy-adjacent branding.",
  timeline: [
    { date: "2022", event: "Feastables launches with MrBeast video integrations" },
    { date: "2022–2023", event: "Golden ticket hunts and store-emptying clips go viral" },
    { date: "2023–2024", event: "Formula reformulations spark taste-test meme wars" },
    { date: "2024+", event: "Remains a flagship example of YouTuber-as-CPG-brand" },
  ],
  examples: [
    "TikTok: clearing every Feastables bar from a Walmart shelf",
    "Meme comparing Feastables hunt to Willy Wonka golden ticket",
    "Taste test: 'MrBeast chocolate vs Hershey's' rage bait",
  ],
  relatedSlugs: ["mrbeast", "prime-hydration", "lunchly", "dupe-economy", "salt-bae"],
  relationships: {
    popularized: ["mrbeast"],
    relatedEvent: ["dupe-economy"],
    sameEra: ["prime-hydration", "lunchly"],
  },
  media: [
    {
      role: "reference",
      type: "embed",
      url: "https://knowyourmeme.com/memes/events/mrbeast-feastables-display-controversy",
      title: "MrBeast Feastables Display Controversy — Know Your Meme",
      source: "Know Your Meme",
      sourceUrl: "https://knowyourmeme.com/memes/events/mrbeast-feastables-display-controversy",
      platform: "knowyourmeme",
      attribution: "Know Your Meme / Literally Media",
      description: "MrBeast chocolate brand hype and fan-hunt memes.",
      verified: false,
    },
    {
      role: "reference",
      type: "embed",
      url: "https://en.wikipedia.org/wiki/Feastables",
      title: "Feastables — Wikipedia",
      source: "Wikipedia",
      sourceUrl: "https://en.wikipedia.org/wiki/Feastables",
      platform: "other",
      attribution: "Wikipedia contributors",
      license: "CC BY-SA 4.0",
      description: "Brand launch and retail phenomenon context.",
      verified: false,
    },
  ],
  sources: [
    {
      title: "MrBeast Feastables Display Controversy — Know Your Meme",
      url: "https://knowyourmeme.com/memes/events/mrbeast-feastables-display-controversy",
      domain: "knowyourmeme.com",
    },
    {
      title: "Feastables — Wikipedia",
      url: "https://en.wikipedia.org/wiki/Feastables",
      domain: "en.wikipedia.org",
    },
  ],
};

export default entry;
