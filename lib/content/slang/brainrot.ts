import type { SlangEntry } from "@/types";

const entry: SlangEntry = {
  id: "s21",
  slug: "brainrot",
  title: "Brainrot",
  category: "slang",
  description:
    "Mental deterioration from consuming too much chaotic internet content — also the content itself. Oxford's Word of the Year 2024.",
  imageGradient: "from-green-600 via-lime-500 to-yellow-400",
  scores: { relevance: 95, brainrot: 100, cringe: 30 },
  addedAt: "2026-07-17",
  historicalDate: "2023-01-01",
  views: 4200000,
  trendDirection: "rising",
  tags: ["gen alpha", "gen z", "tiktok", "internet culture", "2024", "oxford", "content"],
  definition:
    "Describes two related things: (1) the perceived deterioration of someone's mental state caused by prolonged consumption of chaotic, low-effort, or highly repetitive online content; and (2) the content itself — absurdist, fast-paced, algorithmically optimised material that feels designed to overwhelm rather than inform. Often used self-deprecatingly ('I have severe brainrot') or as a descriptor for content ('pure brainrot energy'). Oxford University Press declared it their Word of the Year 2024, defining it as: 'the supposed deterioration of a person's mental or intellectual state, especially viewed as the result of overconsumption of material considered to be trivial or unchallenging.'",
  origin:
    "The phrase 'brain rot' predates the internet — Henry David Thoreau used it in Walden (1854) to criticise shallow thinking. Modern internet usage emerged organically alongside the rise of short-form video and algorithmic feeds, accelerating dramatically in 2023–2024 as Gen Alpha and Gen Z began self-diagnosing their relationship with Skibidi Toilet, NPC streaming, and similar content. Oxford's selection of it as Word of the Year 2024 reflected a significant surge in usage across online platforms.",
  usageExamples: [
    "I watched Skibidi Toilet for 3 hours — my brainrot is terminal",
    "This TikTok is pure brainrot and I've watched it 15 times",
    "Brainrot test: if you understand this reference, you have it",
  ],
  relatedSlugs: ["skibidi-toilet", "npc-streaming", "sigma"],
  sources: [
    {
      title: "Brain Rot — Know Your Meme",
      url: "https://knowyourmeme.com/memes/brain-rot",
      domain: "knowyourmeme.com",
    },
    {
      title: "Oxford Word of the Year 2024: brain rot",
      url: "https://languages.oup.com/word-of-the-year/2024/",
      domain: "oup.com",
    },
  ],
};

export default entry;
