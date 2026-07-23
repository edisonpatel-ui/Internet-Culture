import type { MemeEntry } from "@/types";

const entry: MemeEntry = {
  id: "m130",
  slug: "virgin-vs-chad",
  title: "Virgin vs Chad",
  category: "meme",
  description:
    "The Wojak comparison panels pitting a nervous Virgin against a confident Chad — internet archetyping turned into a meme factory.",
  imageGradient: "from-slate-400 via-gray-300 to-amber-400",
  scores: { relevance: 72, influence: 74, cringe: 48, brainrot: 58 },
  addedAt: "2026-07-23",
  historicalDate: "2017-10-01",
  views: 3200000,
  trendDirection: "stable",
  tags: ["wojak", "comparison", "4chan", "archetype", "2017", "template"],
  meaning:
    "Side-by-side panels contrasting 'The Virgin [X]' — anxious, awkward Wojak energy — with 'The Chad [Y]' — exaggerated confidence and jawline. Each row compares habits, hobbies, or opinions to imply one side is pathetic and the other absurdly superior. Often ironic; the Chad is as much parody as ideal.",
  origin:
    "Know Your Meme documents Virgin vs Chad emerging from /r9k/ and Wojak culture around October 2017, building on earlier 'virgin walk' jokes. The format merged with Gigachad imagery and Soyjak reactions, becoming one of the most remixed Wojak templates. It spread beyond incel forums into general-purpose comparison memes — sometimes edgy, often self-deprecating.",
  timeline: [
    { date: "Oct 2017", event: "Virgin vs Chad panels gain traction on 4chan and Reddit" },
    { date: "2018", event: "Gigachad edits merge with the format" },
    { date: "2019–2021", event: "Mainstream-adjacent variants for hobbies, fandoms, and jobs" },
    { date: "2020s", event: "Still used in Wojak ecosystem alongside Soyjak and Doomer" },
  ],
  examples: [
    "Virgin 'checks notifications' vs Chad 'phone on airplane mode forever'",
    "Virgin study playlist vs Chad listening to the same song on loop",
    "Ironic Chad labeled as the clearly worse life choice",
  ],
  relatedSlugs: ["wojak", "soyjak", "gigachad", "npc", "expanding-brain"],
  relationships: {
    memberOf: ["wojak"],
    sameFormat: ["gigachad", "soyjak"],
  },
  media: [
    {
      role: "reference",
      type: "embed",
      url: "https://knowyourmeme.com/memes/virgin-vs-chad",
      title: "Virgin vs Chad — Know Your Meme",
      source: "Know Your Meme",
      sourceUrl: "https://knowyourmeme.com/memes/virgin-vs-chad",
      platform: "knowyourmeme",
      attribution: "Know Your Meme / Literally Media",
      description: "Wojak comparison template origin and variants.",
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
      description: "Parent meme family for Virgin and Chad figures.",
      verified: false,
    },
  ],
  sources: [
    {
      title: "Virgin vs Chad — Know Your Meme",
      url: "https://knowyourmeme.com/memes/virgin-vs-chad",
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
