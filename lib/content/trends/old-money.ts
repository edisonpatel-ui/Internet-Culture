import type { BaseEntry } from "@/types";

const entry: BaseEntry = {
  id: "t13",
  slug: "old-money",
  title: "Old Money",
  category: "trend",
  description:
    "The refined fashion aesthetic of inherited wealth — polo shirts, quiet luxury, boat shoes, and timeless classics that dominated TikTok from 2022–2024.",
  imageGradient: "from-amber-700 via-yellow-700 to-stone-600",
  scores: { relevance: 85, influence: 85, cringe: 18, brainrot: 22 },
  addedAt: "2026-07-16",
  historicalDate: "2022-06-01",
  views: 1800000,
  trendDirection: "declining",
  tags: ["fashion", "aesthetic", "tiktok", "luxury", "style", "2022", "2023", "2024"],
  origin:
    "Emerged on TikTok fashion communities as a counter-aesthetic to flashy new money and streetwear. Characterized by understated wealth — classic cuts, neutral tones (beige, cream, navy, hunter green), vintage prep school styling, and 'quiet luxury.' Related to the broader 'stealth wealth' and 'quiet luxury' aesthetics that followed.",
  // DEFINING VISUAL PASS — HERO EMPTY:
  // Target: TikTok Old Money / quiet-luxury outfit still (cream knit, loafers,
  // understated prep). Removed Loro Piana storefront — brand boutique ≠ the
  // fashion aesthetic users search for. Sources checked: Wikimedia Commons /
  // Wikipedia Quiet luxury (only Loro Piana + Brunello Cucinelli storefronts),
  // Know Your Meme (docs), polo/preppy Commons searches (yearbooks/PDFs, no
  // usable aesthetic still). Substitutes (luxury shop windows, random polo
  // ads) read as retail advertising, not the TikTok trend.
  media: [
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
