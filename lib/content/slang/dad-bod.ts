import type { SlangEntry } from "@/types";

const entry: SlangEntry = {
  id: "s85",
  slug: "dad-bod",
  title: "Dad Bod",
  category: "slang",
  description:
    "A soft, average male physique — once mocked, later reclaimed as approachable and even attractive.",
  imageGradient: "from-stone-500 via-amber-600 to-orange-400",
  scores: { relevance: 72, influence: 68, cringe: 45, brainrot: 5 },
  addedAt: "2026-07-23",
  historicalDate: "2015-03-01",
  views: 1400000,
  trendDirection: "stable",
  tags: ["body", "fashion", "2010s", "humor", "reclamation"],
  definition:
    "Dad bod describes a man with a bit of softness around the middle — not gym-sculpted, not extreme — often associated with comfortable clothes and 'I have kids or could have kids' energy. The term started as gentle ribbing but flipped into body-positive reclamation: less pressure than six-pack culture, more relatable.",
  origin:
    "A 2015 Clemson University student essay in The Odyssey ('Why Girls Love the Dad Bod') went viral, sparking think pieces and backlash alike. The phrase peaked in mid-2010s lifestyle media, then settled into everyday description of male body types in dating and comedy content.",
  usageExamples: [
    "He skipped the gym for pizza — classic dad bod.",
    "Dad bod summer: linen shirts and no shame.",
    "The reclamation of dad bod beat the gym bro era for a minute.",
  ],
  relatedSlugs: ["glow-up", "looksmaxxing", "mewing", "barbiecore", "coquette-aesthetic"],
  relationships: {
    relatedSlang: ["glow-up", "looksmaxxing"],
    relatedTo: ["barbiecore", "coquette-aesthetic"],
  },
  sources: [
    {
      title: "Dad bod — Wikipedia",
      url: "https://en.wikipedia.org/wiki/Dad_bod",
      domain: "en.wikipedia.org",
    },
  ],
};

export default entry;
