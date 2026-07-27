import type { SlangEntry } from "@/types";

const entry: SlangEntry = {
  id: "s80",
  slug: "stan",
  title: "Stan",
  category: "slang",
  description:
    "An obsessive, loyal fan — from Eminem's stalker anthem to verb form for wholehearted support.",
  imageGradient: "from-purple-600 via-fuchsia-600 to-pink-600",
  scores: { relevance: 92, influence: 90, cringe: 40, brainrot: 25 },
  addedAt: "2026-07-23",
  historicalDate: "2000-01-01",
  views: 3200000,
  trendDirection: "stable",
  tags: ["fandom", "music", "twitter", "k-pop", "2000s"],
  definition:
    "As a noun, a stan is a devoted fan who knows every detail and defends their favorite fiercely. As a verb, 'I stan' means enthusiastic support ('I stan this album'). It sits between casual fan and unhealthy obsession — context decides if it is pride or warning. Stan culture includes fan wars, fancams, and streaming parties.",
  origin:
    "Eminem's 2000 track 'Stan' told the story of an dangerously obsessed fan named Stan. Online music forums adopted the name; Twitter stan armies crystallized the behavior in the 2010s, especially around pop and K-pop. 'Stan Twitter' became its own ecosystem of drama, shipping, and coordinated promotion.",
  usageExamples: [
    "I am not a fan, I am a stan — I bought three copies.",
    "She stans that group so hard she learned Korean.",
    "Stan wars in the replies ruined another innocent tweet.",
  ],
  relatedSlugs: ["stan-twitter-culture", "ship", "receipts", "iconic"],
  relationships: {
    relatedSlang: ["stan-twitter-culture"],
    community: ["k-pop-fandom-wars"],
  },
  sources: [
    {
      title: "Stan (slang) — Wikipedia",
      url: "https://en.wikipedia.org/wiki/Stan_(slang)",
      domain: "en.wikipedia.org",
    },
  ],
};

export default entry;
