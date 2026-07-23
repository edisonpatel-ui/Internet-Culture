import type { MemeEntry } from "@/types";

const entry: MemeEntry = {
  id: "m123",
  slug: "soyjak",
  title: "Soyjak",
  category: "meme",
  description:
    "The open-mouthed, excited Wojak variant — Soyjak — used to mock over-the-top enthusiasm and the endless Wojak derivative wars.",
  imageGradient: "from-yellow-300 via-amber-200 to-orange-300",
  scores: { relevance: 70, influence: 65, cringe: 45, brainrot: 62 },
  addedAt: "2026-07-23",
  historicalDate: "2017-01-01",
  views: 2200000,
  trendDirection: "stable",
  tags: ["wojak", "4chan", "reaction", "irony", "imageboard", "variant"],
  meaning:
    "A Wojak derivative with a wide-open mouth and exaggerated excited expression — the visual shorthand for nerdy hype, cringe fandom, or performative joy. Often contrasted with stoic or Chad Wojaks in multi-panel edits. Distinct from base Wojak (Feels Guy): Soyjak is specifically the gaping, soy-faced reaction archetype.",
  origin:
    "Soyjak emerged from the Wojak ecosystem on 4chan and related boards in the late 2010s as users remixed the base Feels Guy template. Know Your Meme traces 'soyjak' naming to mockery of overly enthusiastic online behavior; the face spread alongside other Wojak variants like Doomer and NPC. It is a derivative meme, not a separate character origin — the joke is how one simple line drawing spawned an entire cast of emotional stereotypes.",
  timeline: [
    { date: "~2017", event: "Open-mouth excited Wojak edits circulate in Wojak threads" },
    { date: "2018–2019", event: "'Soyjak' name sticks; used in contrast panels with Chad archetypes" },
    { date: "2020–2022", event: "Explosion of Wojak subvariants; Soyjak remains a core reaction type" },
    { date: "2023+", event: "Still actively edited in political and fandom meme wars" },
  ],
  examples: [
    "Soyjak cheering a mediocre product announcement vs Chad unimpressed",
    "Reply image when someone gets overly excited about a minor patch note",
    "Multi-panel Wojak comics pairing Soyjak with Doomer and Gigachad",
  ],
  relatedSlugs: ["wojak", "gigachad", "virgin-vs-chad", "npc", "pepe"],
  relationships: {
    memberOf: ["wojak"],
    sameFormat: ["gigachad", "virgin-vs-chad"],
  },
  media: [
    {
      role: "reference",
      type: "embed",
      url: "https://knowyourmeme.com/memes/soyjak",
      title: "Soyjak — Know Your Meme",
      source: "Know Your Meme",
      sourceUrl: "https://knowyourmeme.com/memes/soyjak",
      platform: "knowyourmeme",
      attribution: "Know Your Meme / Literally Media",
      description: "Documentation of the open-mouth Wojak variant and naming.",
      verified: false,
    },
    {
      role: "reference",
      type: "embed",
      url: "https://knowyourmeme.com/memes/wojak",
      title: "Wojak — Know Your Meme",
      source: "Know Your Meme",
      sourceUrl: "https://knowyourmeme.com/memes/wojak",
      platform: "knowyourmeme",
      attribution: "Know Your Meme / Literally Media",
      description: "Parent template for the Soyjak derivative.",
      verified: false,
    },
  ],
  sources: [
    {
      title: "Soyjak — Know Your Meme",
      url: "https://knowyourmeme.com/memes/soyjak",
      domain: "knowyourmeme.com",
    },
    {
      title: "Wojak — Know Your Meme",
      url: "https://knowyourmeme.com/memes/wojak",
      domain: "knowyourmeme.com",
    },
  ],
};

export default entry;
