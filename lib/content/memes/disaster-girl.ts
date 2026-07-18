import type { MemeEntry } from "@/types";

const entry: MemeEntry = {
  id: "m36",
  slug: "disaster-girl",
  title: "Disaster Girl",
  category: "meme",
  description:
    "Zoë Roth's childhood photo in front of a burning house — the smirk that launched a thousand photoshopped disasters.",
  imageGradient: "from-orange-600 via-red-500 to-rose-600",
  scores: { relevance: 65, brainrot: 38, cringe: 25 },
  addedAt: "2026-07-17",
  historicalDate: "2005-01-01",
  views: 3600000,
  trendDirection: "declining",
  tags: ["photoshop", "classic", "2005", "2008", "reaction", "fire"],
  meaning:
    "A photo of a young girl smirking at the camera with a house fire behind her, used as an exploitable template implying she caused (or is enjoying) chaos. Often photoshopped onto historic disasters or personal failures.",
  origin:
    "Taken in 2005 by Dave Roth of his daughter Zoë during a controlled firefighter-training burn in Mebane, North Carolina. The photo won a JPG Magazine Emotion Capture contest (published 2008) and went viral; photoshoppers placed Zoë in front of the Titanic, dinosaur extinctions, and other calamities. In 2021 Zoë Roth sold an NFT of the photograph.",
  timeline: [
    { date: "2005", event: "Dave Roth photographs Zoë at a controlled burn in Mebane, NC" },
    { date: "2008", event: "Photo wins JPG Magazine contest and spreads as Disaster Girl" },
    { date: "2008–2010s", event: "Photoshop variants place Disaster Girl at historic disasters" },
    { date: "Apr 2021", event: "Zoë Roth sells an NFT of the original photograph" },
  ],
  examples: [
    "When your group project fails but your part was fine [Disaster Girl]",
    "Me watching my code delete the database",
    "Photoshop of Disaster Girl in front of [any catastrophe]",
  ],
  relatedSlugs: ["success-kid", "bad-luck-brian"],
  media: [
    {
      role: "featured",
      type: "image",
      url: "https://upload.wikimedia.org/wikipedia/en/1/11/Disaster_Girl.jpg",
      title: "Disaster Girl — original Zoë Roth photograph (2005)",
      source: "Wikipedia",
      sourceUrl: "https://en.wikipedia.org/wiki/File:Disaster_Girl.jpg",
      platform: "wikimedia",
      attribution: "Dave Roth (fair use for identification)",
      license: "Fair use",
      description:
        "The original Disaster Girl photo — Zoë Roth smirking in front of a controlled training fire.",
      date: "2005",
      verified: true,
    },
    {
      role: "reference",
      type: "embed",
      url: "https://knowyourmeme.com/memes/disaster-girl",
      title: "Disaster Girl — Know Your Meme",
      source: "Know Your Meme",
      sourceUrl: "https://knowyourmeme.com/memes/disaster-girl",
      platform: "knowyourmeme",
      attribution: "Know Your Meme / Literally Media",
      description: "Origin of the Roth family photo and photoshop meme wave.",
      date: "2008",
      verified: true,
    },
  ],
  sources: [
    {
      title: "Disaster Girl — Know Your Meme",
      url: "https://knowyourmeme.com/memes/disaster-girl",
      domain: "knowyourmeme.com",
    },
    {
      title: "Disaster Girl — Wikipedia",
      url: "https://en.wikipedia.org/wiki/Disaster_Girl",
      domain: "en.wikipedia.org",
    },
  ],
};

export default entry;
