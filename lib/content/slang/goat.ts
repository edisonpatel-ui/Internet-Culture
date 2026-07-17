import type { SlangEntry } from "@/types";

const entry: SlangEntry = {
  id: "s12",
  slug: "goat",
  title: "GOAT",
  category: "slang",
  description: "Greatest Of All Time — the internet's highest possible compliment.",
  imageGradient: "from-yellow-500 via-amber-500 to-orange-400",
  scores: { relevance: 88, brainrot: 20, cringe: 10 },
  addedAt: "2026-07-16",
  historicalDate: "2000-01-01",
  views: 1900000,
  trendDirection: "stable",
  tags: ["sports", "hip-hop", "compliment", "achievement", "ranking"],
  definition:
    "Acronym for 'Greatest Of All Time.' The highest possible compliment — reserved for individuals considered the undisputed best in their field. Used across sports, music, gaming, and internet culture broadly.",
  origin:
    "The phrase has roots in sports commentary and was embraced by Muhammad Ali. LL Cool J released an album titled 'G.O.A.T.' in 2000, cementing the acronym in hip-hop vocabulary. The term spread widely across internet culture through the 2010s and 2020s.",
  usageExamples: [
    "LeBron or Jordan — who's the real GOAT?",
    "She cooked that meal — absolute GOAT behavior",
    "The GOAT debate never ends and that's the whole point",
  ],
  relatedSlugs: ["sigma", "rizz"],
  sources: [
    {
      title: "GOAT — Know Your Meme",
      url: "https://knowyourmeme.com/memes/goat",
      domain: "knowyourmeme.com",
    },
  ],
};

export default entry;
