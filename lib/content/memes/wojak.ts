import type { MemeEntry } from "@/types";

const entry: MemeEntry = {
  id: "m12",
  slug: "wojak",
  title: "Wojak",
  category: "meme",
  description:
    "The foundational 'Feels Guy' — a simple crying face that became the most versatile meme template on the internet.",
  imageGradient: "from-yellow-400 via-amber-400 to-orange-300",
  scores: { relevance: 82, brainrot: 58, cringe: 32 },
  addedAt: "2026-07-16",
  historicalDate: "2010-07-01",
  views: 3400000,
  trendDirection: "stable",
  tags: ["classic", "4chan", "imageboard", "reaction", "feels", "archetype"],
  meaning:
    "A simple bald figure, often pensive or crying, representing emotional vulnerability online. Has spawned a vast ecosystem of character variants — Doomer, Boomer, Zoomer, NPC, Chad, Virgin — each serving as a distinct internet archetype with its own community and meaning.",
  origin:
    "The original Wojak image is attributed to a user on European imageboards, spreading to the German imageboard Krautchan around 2010. The name is derived from a Polish word. The 'Feels Guy' variant became the universal internet expression of sadness.",
  timeline: [
    { date: "~2010", event: "Original Wojak image appears on European imageboards" },
    { date: "2011–2013", event: "'Feels Guy' becomes the default expression of internet sadness" },
    {
      date: "2016–2018",
      event: "First wave of variants emerge: Doomer, Boomer, Zoomer, NPC",
    },
    {
      date: "2019–2022",
      event:
        "Wojak template explodes — Chad vs Virgin, Coomer, Trad Wife, and countless more created",
    },
    {
      date: "2023+",
      event: "Remains one of the most actively used meme templates on the internet",
    },
  ],
  examples: [
    "Doomer Wojak staring into the void at 3am",
    "NPC Wojak — blank expression, repeated canned dialogue",
    "Chad vs Virgin — the foundational Wojak comparison format",
  ],
  relatedSlugs: ["pepe", "trollface"],
  sources: [
    {
      title: "Wojak / Feels Guy — Know Your Meme",
      url: "https://knowyourmeme.com/memes/wojak",
      domain: "knowyourmeme.com",
    },
    {
      title: "Wojak — Wikipedia",
      url: "https://en.wikipedia.org/wiki/Wojak",
      domain: "en.wikipedia.org",
    },
  ],
};

export default entry;
