import type { SlangEntry } from "@/types";

const entry: SlangEntry = {
  id: "s101",
  slug: "jit",
  title: "Jit",
  category: "slang",
  description:
    "AAVE and Florida street slang for a young or inexperienced person, roughly equivalent to 'kid' or 'rookie,' popularized nationally by Florida rap.",
  imageGradient: "from-teal-600 via-cyan-500 to-blue-500",
  scores: { relevance: 42, influence: 35, cringe: 20, brainrot: 20 },
  addedAt: "2026-09-12",
  views: 500000,
  trendDirection: "rising",
  tags: ["aave", "florida slang", "hip-hop", "gen z", "rookie"],
  definition:
    "Jit is slang for a young person or kid, and by extension someone new or inexperienced at something (similar to 'rookie'). It's usually neutral or affectionate but can carry a mildly negative edge implying the young person in question is acting unwise or impertinent.",
  origin:
    "Jit originated in African American Vernacular English, most strongly associated with Florida — its likely root is 'jitterbug,' older slang for an energetic young person. It moved online in the early 2000s and gained wider national reach through the lyrics of Florida rappers like Kodak Black, YNW Melly, and Smokepurpp, before spreading further through TikTok and Instagram in the 2020s.",
  usageExamples: [
    "\"This jit is putting Gainesville on the map\" — praising a young talent",
    "\"Can't even tell these jits how to handle shit anymore\" — a mild complaint about younger people",
    "\"Lil jit\" used affectionately for a younger sibling or friend",
  ],
  relatedSlugs: ["unc", "npc", "huzz"],
  sources: [
    {
      title: "JIT Slang Meaning — Merriam-Webster",
      url: "https://www.merriam-webster.com/slang/jit",
      domain: "merriam-webster.com",
    },
  ],
};

export default entry;
