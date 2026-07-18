import type { BaseEntry } from "@/types";

const entry: BaseEntry = {
  id: "t13",
  slug: "old-money",
  title: "Old Money",
  category: "trend",
  description:
    "The refined fashion aesthetic of inherited wealth — polo shirts, quiet luxury, boat shoes, and timeless classics that dominated TikTok from 2022–2024.",
  imageGradient: "from-amber-700 via-yellow-700 to-stone-600",
  scores: { relevance: 85, brainrot: 22, cringe: 18 },
  addedAt: "2026-07-16",
  historicalDate: "2022-06-01",
  views: 1800000,
  trendDirection: "declining",
  tags: ["fashion", "aesthetic", "tiktok", "luxury", "style", "2022", "2023", "2024"],
  origin:
    "Emerged on TikTok fashion communities as a counter-aesthetic to flashy new money and streetwear. Characterized by understated wealth — classic cuts, neutral tones (beige, cream, navy, hunter green), vintage prep school styling, and 'quiet luxury.' Related to the broader 'stealth wealth' and 'quiet luxury' aesthetics that followed.",
  // Quiet-luxury brand storefront used on Wikipedia's Quiet luxury article —
  // understated heritage luxury without flashy logos (Old Money / stealth wealth).
  media: [
    {
      role: "featured",
      type: "image",
      url: "https://upload.wikimedia.org/wikipedia/commons/f/fe/Loro_Piana.jpg",
      title: "Loro Piana storefront — quiet luxury aesthetic",
      source: "Wikimedia Commons / Elvert Barnes",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Loro_Piana.jpg",
      platform: "wikimedia",
      attribution: "Elvert Barnes (CC BY-SA 2.0)",
      license: "CC BY-SA 2.0",
      description:
        "Loro Piana boutique windows — understated heritage luxury associated with quiet luxury / Old Money aesthetics.",
      date: "2015-04-02",
      verified: true,
    },
    {
      role: "reference",
      type: "embed",
      url: "https://en.wikipedia.org/wiki/Quiet_luxury",
      title: "Quiet luxury — Wikipedia",
      source: "Wikipedia",
      sourceUrl: "https://en.wikipedia.org/wiki/Quiet_luxury",
      platform: "other",
      attribution: "Wikipedia contributors",
      description:
        "Encyclopedia overview of quiet luxury / stealth wealth / Old Money aesthetic.",
      date: "2023",
      verified: true,
    },
    {
      role: "reference",
      type: "embed",
      url: "https://knowyourmeme.com/memes/old-money-aesthetic",
      title: "Old Money Aesthetic — Know Your Meme",
      source: "Know Your Meme",
      sourceUrl: "https://knowyourmeme.com/memes/old-money-aesthetic",
      platform: "knowyourmeme",
      attribution: "Know Your Meme / Literally Media",
      description: "Documentation of the Old Money / quiet luxury TikTok aesthetic.",
      date: "2022",
      verified: true,
    },
  ],
  sources: [
    {
      title: "Old Money Aesthetic — Know Your Meme",
      url: "https://knowyourmeme.com/memes/old-money-aesthetic",
      domain: "knowyourmeme.com",
    },
  ],
};

export default entry;
