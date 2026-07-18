import type { SlangEntry } from "@/types";

const entry: SlangEntry = {
  id: "s11",
  slug: "based",
  title: "Based",
  category: "slang",
  description:
    "Holding an opinion confidently without caring about social approval — used online as high praise.",
  imageGradient: "from-blue-700 via-blue-500 to-sky-400",
  scores: { relevance: 78, influence: 78, cringe: 35, brainrot: 42 },
  addedAt: "2026-07-16",
  historicalDate: "2010-01-01",
  views: 680000,
  trendDirection: "stable",
  tags: ["4chan", "lil b", "opinion", "internet culture", "slang"],
  definition:
    "Describes someone who expresses an authentic or unconventional opinion without concern for social approval or peer pressure. Can be used sincerely (high praise) or ironically. Opposite of 'cringe' in internet culture scoring.",
  origin:
    "Originally used by rapper Lil B 'The BasedGod' around 2009–2010 as a positive self-description meaning authentic and free-spirited. 4chan later adopted the term to describe someone who holds opinions independent of others' approval.",
  usageExamples: [
    "Respectfully, this take is incredibly based",
    "Based and redpilled (ironic combination phrase)",
    "He just said vegetables are overrated — based",
  ],
  relatedSlugs: ["sigma", "no-cap", "sus", "pepe", "rage-comics"],
  relationships: {
    relatedSlang: ["sigma", "no-cap", "sus"],
    relatedTo: ["pepe", "rage-comics"],
  },
  sources: [
    {
      title: "Based — Know Your Meme",
      url: "https://knowyourmeme.com/memes/based",
      domain: "knowyourmeme.com",
    },
    {
      title: "based — Wiktionary",
      url: "https://en.wiktionary.org/wiki/based",
      domain: "en.wiktionary.org",
    },
  ],
};

export default entry;
