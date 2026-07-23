import type { BaseEntry } from "@/types";

const entry: BaseEntry = {
  id: "t45",
  slug: "stan-twitter-culture",
  title: "Stan Twitter Culture",
  category: "trend",
  description:
    "Fandom as infrastructure on Twitter/X — fancams, ratio wars, streaming parties, and 24/7 idol defense.",
  imageGradient: "from-blue-500 via-sky-500 to-cyan-400",
  scores: { relevance: 90, influence: 88, cringe: 55, brainrot: 40 },
  addedAt: "2026-07-23",
  historicalDate: "2012-01-01",
  views: 2900000,
  trendDirection: "stable",
  tags: ["twitter", "stan", "fandom", "k-pop", "2010s"],
  origin:
    "Stan Twitter crystallized in the 2010s as music fandoms weaponized the platform's reply and quote-tweet mechanics — fancams under unrelated news, hashtag campaigns, and 'stan list' social graphs. Beyhive, Swifties, ARMY, and Barbz set templates K-pop and gaming stans copied.",
  summary:
    "Stan Twitter is fandom operating like a political campaign: metrics matter, receipts are ammunition, and every trending topic is a recruitment opportunity. It produced slang (stan, ratio, ship) and constant meta-debate about toxicity vs. joy.",
  relatedSlugs: ["stan", "k-pop-fandom-wars", "ratio", "receipts", "ship"],
  relationships: {
    relatedSlang: ["stan", "ratio", "receipts"],
    relatedTo: ["k-pop-fandom-wars"],
  },
  sources: [
    {
      title: "Stan Twitter — Know Your Meme",
      url: "https://knowyourmeme.com/memes/stan-twitter",
      domain: "knowyourmeme.com",
    },
    {
      title: "Stan (slang) — Wikipedia",
      url: "https://en.wikipedia.org/wiki/Stan_(slang)",
      domain: "en.wikipedia.org",
    },
  ],
};

export default entry;
