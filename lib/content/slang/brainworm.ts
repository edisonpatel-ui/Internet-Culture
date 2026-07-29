import type { SlangEntry } from "@/types";

const entry: SlangEntry = {
  id: "s57",
  slug: "brainworm",
  title: "Brainworm",
  category: "slang",
  description:
    "An idea, song, or phrase that gets stuck in your head and refuses to leave — cousin to earworm and brainrot.",
  imageGradient: "from-emerald-600 via-teal-500 to-cyan-400",
  scores: { relevance: 58, influence: 55, cringe: 20, brainrot: 31 },
  addedAt: "2026-07-23",
  views: 520000,
  trendDirection: "rising",
  tags: ["gen z", "tiktok", "psychology", "memes", "2020s"],
  definition:
    "A brainworm is a thought, lyric, soundbite, or meme that lodges in your mind and loops — stronger than a casual earworm because it can shape how you talk or think for days. People say 'that TikTok gave me a brainworm' when a random phrase keeps escaping their mouth. It overlaps with brainrot but emphasizes a single sticky idea rather than general content overload.",
  origin:
    "The term 'earworm' for stuck songs dates to at least the 1970s in English. Internet users stretched the metaphor into 'brainworm' on Reddit and TikTok in the early 2020s as short-form audio and meme phrases became harder to shake. Usage spiked alongside Skibidi-style repetitive content and 'just one more scroll' algorithm loops.",
  usageExamples: [
    "I have a brainworm of that 'very demure' audio — I cannot stop saying it.",
    "That NPC stream gave everyone a brainworm.",
    "The brainworm from that meme is living rent free in my head.",
  ],
  relatedSlugs: ["brainrot", "living-rent-free", "npc", "skibidi-toilet"],
  sources: [
    {
      title: "Earworm — Wikipedia",
      url: "https://en.wikipedia.org/wiki/Earworm",
      domain: "en.wikipedia.org",
    },
  ],
};

export default entry;
