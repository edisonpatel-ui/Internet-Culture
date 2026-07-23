import type { MemeEntry } from "@/types";

const entry: MemeEntry = {
  id: "m137",
  slug: "prime-hydration",
  title: "Prime Hydration",
  category: "meme",
  description:
    "Logan Paul and KSI's Prime drink — schoolyard resale hype, taste-test wars, and influencer merch culture turned energy-drink meme.",
  imageGradient: "from-blue-600 via-cyan-400 to-yellow-400",
  scores: { relevance: 62, influence: 58, cringe: 50, brainrot: 60 },
  addedAt: "2026-07-23",
  historicalDate: "2022-01-01",
  views: 2800000,
  trendDirection: "stable",
  tags: ["logan-paul", "ksi", "youtube", "brand", "2022", "hype"],
  meaning:
    "Memes about Prime Hydration — the brightly packaged sports drink co-founded by Logan Paul and KSI. Jokes cover scalping at school, blind taste tests, 'Prime vs Gatorade' loyalty wars, and skepticism that YouTubers can sell anything. A case study in creator-led CPG going viral through fan armies and controversy.",
  origin:
    "Prime launched in 2022 with massive YouTube promotion from Paul and KSI. Know Your Meme and business press documented shortages, resale markup memes, and UK school bans making headlines. The product sat alongside Lunchly and other creator brands as meme fodder about influencer economies — fans defending it, critics calling it overpriced electrolyte water with hype.",
  timeline: [
    { date: "2022", event: "Prime Hydration launches with Paul and KSI promotion" },
    { date: "2022–2023", event: "School resale and shortage memes spread on TikTok" },
    { date: "2023", event: "Regulatory scrutiny and taste-test backlash cycles in news" },
    { date: "2024+", event: "Settles into creator-brand meme vocabulary with Feastables and Lunchly" },
  ],
  examples: [
    "Kid selling Prime out of a backpack at markup — meme caption 'entrepreneur'",
    "TikTok blind taste test: Prime vs tap water drama",
    "Comment section war: 'KSI carried' vs 'Logan carried'",
  ],
  relatedSlugs: ["logan-paul", "ksi", "feastables", "lunchly", "dupe-economy", "salt-bae"],
  relationships: {
    popularized: ["logan-paul", "ksi"],
    relatedEvent: ["dupe-economy"],
    sameEra: ["feastables", "lunchly"],
  },
  media: [
    {
      role: "reference",
      type: "embed",
      url: "https://knowyourmeme.com/memes/cultures/prime-energy-hydration-drink",
      title: "Prime Energy / Hydration Drink — Know Your Meme",
      source: "Know Your Meme",
      sourceUrl: "https://knowyourmeme.com/memes/cultures/prime-energy-hydration-drink",
      platform: "knowyourmeme",
      attribution: "Know Your Meme / Literally Media",
      description: "Prime Hydration hype and meme documentation.",
      verified: false,
    },
    {
      role: "reference",
      type: "embed",
      url: "https://en.wikipedia.org/wiki/Prime_(drink)",
      title: "Prime (drink) — Wikipedia",
      source: "Wikipedia",
      sourceUrl: "https://en.wikipedia.org/wiki/Prime_(drink)",
      platform: "other",
      attribution: "Wikipedia contributors",
      license: "CC BY-SA 4.0",
      description: "Product launch and cultural reception.",
      verified: false,
    },
  ],
  sources: [
    {
      title: "Prime Energy / Hydration Drink — Know Your Meme",
      url: "https://knowyourmeme.com/memes/cultures/prime-energy-hydration-drink",
      domain: "knowyourmeme.com",
    },
    {
      title: "Prime (drink) — Wikipedia",
      url: "https://en.wikipedia.org/wiki/Prime_(drink)",
      domain: "en.wikipedia.org",
    },
  ],
};

export default entry;
