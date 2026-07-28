import type { SlangEntry } from "@/types";

const entry: SlangEntry = {
  id: "s49",
  slug: "geeg",
  title: "Geeg",
  category: "slang",
  description:
    "Niche gaming slang — a playful phonetic variation of GG ('good game').",
  imageGradient: "from-emerald-500 via-teal-600 to-slate-700",
  scores: { relevance: 59, influence: 16, cringe: 35, brainrot: 25 },
  addedAt: "2026-07-18",
  historicalDate: "2016-05-25",
  views: 45000,
  trendDirection: "stable",
  tags: ["gaming", "niche", "gg", "chat", "upcoming"],
  definition:
    "Geeg is a niche, playful spelling/pronunciation of GG — gaming shorthand for 'good game.' Used the same way you'd type GG at the end of a match, but with a goofier vibe: 'Geeg, guys. Geeg.'",
  origin:
    "Documented on Urban Dictionary on May 25, 2016 by user Bestdankboi as 'a variation of a term used in gaming, Good Game or GG.' Remains niche relative to standard GG; included here as upcoming/niche gaming slang rather than a mainstream term.",
  usageExamples: [
    "End of a chill ranked game: 'geeg everyone'",
    "Party chat after a wipe: 'geeg, we tried'",
    "Ironic good-sportsmanship: 'Geeg. Geeg.'",
  ],
  relatedSlugs: ["gg", "ez", "w-dub", "l", "goat"],
  relationships: {
    relatedSlang: ["gg", "ez", "w-dub", "l", "goat"],
    originatedFrom: ["gg"],
    community: ["gg", "ez"],
  },
  sources: [
    {
      title: "Geeg — Urban Dictionary (Bestdankboi, May 25, 2016)",
      url: "https://www.urbandictionary.com/define.php?term=Geeg",
      domain: "urbandictionary.com",
    },
  ],
};

export default entry;
