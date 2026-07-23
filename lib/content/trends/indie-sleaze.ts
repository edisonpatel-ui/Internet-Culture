import type { BaseEntry } from "@/types";

const entry: BaseEntry = {
  id: "t42",
  slug: "indie-sleaze",
  title: "Indie Sleaze",
  category: "trend",
  description:
    "Late-2000s party flashback — American Apparel, flash photography, smudged eyeliner, and bloghouse nostalgia.",
  imageGradient: "from-zinc-700 via-neutral-800 to-black",
  scores: { relevance: 72, influence: 68, cringe: 45, brainrot: 15 },
  addedAt: "2026-07-23",
  historicalDate: "2006-01-01",
  views: 1100000,
  trendDirection: "rising",
  tags: ["fashion", "2000s", "nightlife", "revival", "2020s"],
  origin:
    "Indie sleaze names the 2006–2012 Tumblr-era aesthetic: messy parties, electroclash, hipster irony, and digital camera flash. TikTok revivalists labeled it around 2021–2022 as Gen Z romanticized a period they mostly missed — overlapping Y2K revival but grungier and more cigarette-and-warehouse than bubblegum pop.",
  summary:
    "Indie sleaze is nostalgia for when the internet felt grungy: American Apparel ads, Cobrasnake photos, and blog DJs. A fashion trend and playlist mood as much as a historical scene.",
  relatedSlugs: ["y2k-revival", "tumblr", "instagram-culture", "cottagecore"],
  relationships: {
    relatedEvent: ["tumblr"],
    sameEra: ["y2k-revival"],
  },
  sources: [
    {
      title: "Indie sleaze — Wikipedia",
      url: "https://en.wikipedia.org/wiki/Indie_sleaze",
      domain: "en.wikipedia.org",
    },
    {
      title: "Indie Sleaze — Know Your Meme",
      url: "https://knowyourmeme.com/memes/indie-sleaze",
      domain: "knowyourmeme.com",
    },
  ],
};

export default entry;
