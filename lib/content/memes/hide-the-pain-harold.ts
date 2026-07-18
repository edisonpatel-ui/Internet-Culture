import type { MemeEntry } from "@/types";

const entry: MemeEntry = {
  id: "m35",
  slug: "hide-the-pain-harold",
  title: "Hide the Pain Harold",
  category: "meme",
  description:
    "Hungarian stock-photo model András Arató — whose forced smile became the internet's face of polite suffering and fake enthusiasm.",
  imageGradient: "from-blue-500 via-sky-400 to-cyan-400",
  scores: { relevance: 76, brainrot: 32, cringe: 38 },
  addedAt: "2026-07-17",
  historicalDate: "2011-01-01",
  views: 4500000,
  trendDirection: "stable",
  tags: ["stock-photo", "reaction", "classic", "hungary", "smile", "2011"],
  meaning:
    "Stock photos of András Arató smiling awkwardly are captioned to express internal pain, forced positivity, workplace misery, or 'I'm fine' energy — the smile that looks like it's hiding something.",
  origin:
    "Arató, a retired Hungarian electrical engineer, modeled for stock photography after being approached by a photographer. Around 2011–2012 internet users noticed his smile looked strained and nicknamed him 'Hide the Pain Harold.' The meme spread heavily on Reddit, 9GAG, and Russian social media; Arató later publicly embraced the persona.",
  timeline: [
    { date: "~2010–2011", event: "András Arató appears in stock-photo shoots" },
    { date: "2011–2012", event: "'Hide the Pain Harold' nickname and memes spread online" },
    { date: "Mid-2010s", event: "Arató reveals his identity and engages with fans" },
    { date: "2020s", event: "Remains a stable reaction image for forced smiles and quiet suffering" },
  ],
  examples: [
    "When the meeting could have been an email [Hide the Pain Harold]",
    "Smiling through a family dinner argument",
    "Customer service voice: activated",
  ],
  relatedSlugs: ["woman-yelling-at-cat", "chill-guy"],
  media: [
    {
      role: "featured",
      type: "image",
      url: "https://upload.wikimedia.org/wikipedia/en/a/a4/Hide_the_Pain_Harold_%28Andr%C3%A1s_Arat%C3%B3%29.jpg",
      title: "Hide the Pain Harold — András Arató stock photo",
      source: "Wikipedia",
      sourceUrl:
        "https://en.wikipedia.org/wiki/File:Hide_the_Pain_Harold_(Andr%C3%A1s_Arat%C3%B3).jpg",
      platform: "wikimedia",
      attribution: "Stock photo of András Arató (fair use for identification)",
      license: "Fair use",
      description:
        "The most recognized Hide the Pain Harold stock image — Arató's strained smile that defines the meme.",
      date: "2011",
      verified: true,
    },
    {
      role: "reference",
      type: "embed",
      url: "https://knowyourmeme.com/memes/hide-the-pain-harold",
      title: "Hide the Pain Harold — Know Your Meme",
      source: "Know Your Meme",
      sourceUrl: "https://knowyourmeme.com/memes/hide-the-pain-harold",
      platform: "knowyourmeme",
      attribution: "Know Your Meme / Literally Media",
      description: "Origin of the András Arató stock photos and meme nickname.",
      date: "2011",
      verified: true,
    },
  ],
  sources: [
    {
      title: "Hide the Pain Harold — Know Your Meme",
      url: "https://knowyourmeme.com/memes/hide-the-pain-harold",
      domain: "knowyourmeme.com",
    },
    {
      title: "Hide the Pain Harold — Wikipedia",
      url: "https://en.wikipedia.org/wiki/Hide_the_Pain_Harold",
      domain: "en.wikipedia.org",
    },
  ],
};

export default entry;
