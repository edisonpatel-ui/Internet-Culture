import type { EventEntry } from "@/types";

const entry: EventEntry = {
  id: "e11",
  slug: "one-chip-challenge",
  title: "One Chip Challenge",
  category: "event",
  description:
    "Paqui's infamous coffin-boxed chip — so spicy it put people in hospitals and was pulled from shelves following a teenager's death in 2023.",
  imageGradient: "from-red-600 via-orange-600 to-yellow-500",
  scores: { relevance: 82, brainrot: 65, cringe: 38 },
  addedAt: "2026-07-16",
  historicalDate: "2023-09-01",
  views: 2800000,
  trendDirection: "declining",
  platform: "TikTok, YouTube",
  impact:
    "Became one of the most discussed viral food challenges of the decade — raising urgent questions about content creator responsibility, food safety regulations, and the gamification of danger in social media culture. The challenge's tragic end led Paqui to withdraw the product entirely.",
  highlights: [
    "Paqui's One Chip Challenge featured a single chip coated in Carolina Reaper and Naga Viper peppers, sold in a coffin-shaped box",
    "Participants filmed themselves eating the chip and competing to see how long they could last without drinking anything",
    "Videos of participants in visible distress spread across TikTok and YouTube as both entertainment and cautionary content",
    "In September 2023, 14-year-old Harris Wolobah became ill at school after eating the chip and later died — the medical examiner noted the chip as a contributing factor",
    "Paqui voluntarily pulled the product from store shelves nationwide following the tragedy",
  ],
  relatedSlugs: ["short-form-takeover"],
  tags: ["challenge", "food", "spicy", "tiktok", "viral", "paqui", "2023", "safety"],
  sources: [
    {
      title: "One Chip Challenge — Know Your Meme",
      url: "https://knowyourmeme.com/memes/one-chip-challenge",
      domain: "knowyourmeme.com",
    },
  ],
};

export default entry;
