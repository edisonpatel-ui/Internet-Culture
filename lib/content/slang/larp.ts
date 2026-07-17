import type { SlangEntry } from "@/types";

const entry: SlangEntry = {
  id: "s15",
  slug: "larp",
  title: "LARP",
  category: "slang",
  description:
    "Live Action Role Play — used online to accuse someone of performing a persona they don't genuinely live.",
  imageGradient: "from-indigo-600 via-blue-500 to-sky-500",
  scores: { relevance: 72, brainrot: 33, cringe: 45 },
  addedAt: "2026-07-16",
  historicalDate: "2012-01-01",
  views: 520000,
  trendDirection: "stable",
  tags: ["gaming", "roleplay", "accusation", "identity", "twitter", "internet culture"],
  definition:
    "Originally refers to Live Action Role Playing — physical events where participants dress up and act out fictional scenarios. On the internet, 'LARPing' means performing or pretending to be something you're not. Calling someone a 'larper' accuses them of cosplaying an identity rather than genuinely living it.",
  origin:
    "LARP as an activity has existed since the 1970s–80s. The internet repurposed the term around 2012–2015 to describe inauthentic online behavior — particularly when someone claims to hold an identity, lifestyle, or ideology they don't genuinely inhabit.",
  usageExamples: [
    "He's LARPing as a tough guy online — would never say that in person",
    "The whole account is a LARP, nothing he posts is real",
    "Stop larping as a 1950s housewife, you live in a studio apartment",
  ],
  relatedSlugs: ["sigma", "based"],
  sources: [
    {
      title: "Live action role-playing game — Wikipedia",
      url: "https://en.wikipedia.org/wiki/Live_action_role-playing_game",
      domain: "en.wikipedia.org",
    },
  ],
};

export default entry;
