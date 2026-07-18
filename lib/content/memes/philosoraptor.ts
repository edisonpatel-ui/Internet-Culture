import type { MemeEntry } from "@/types";

const entry: MemeEntry = {
  id: "m32",
  slug: "philosoraptor",
  title: "Philosoraptor",
  category: "meme",
  description:
    "The contemplative dinosaur advice animal that asks half-profound, half-absurd philosophical questions in Impact font.",
  imageGradient: "from-emerald-700 via-green-600 to-lime-500",
  scores: { relevance: 55, influence: 55, cringe: 35, brainrot: 40 },
  addedAt: "2026-07-17",
  historicalDate: "2008-01-01",
  views: 2800000,
  trendDirection: "declining",
  tags: ["advice-animal", "classic", "dinosaur", "philosophy", "reddit", "2008"],
  meaning:
    "An advice-animal template showing a thoughtful dinosaur (often a velociraptor-style illustration) posing rhetorical or pseudo-philosophical questions — from wordplay to mock-deep life musings.",
  origin:
    "Emerged in the late 2000s as part of the advice-animal boom on sites like Reddit and meme generators. The dinosaur illustration was paired with captions that parody philosophical inquiry, helping define the 'deep question' image-macro style of early 2010s internet humor.",
  timeline: [
    { date: "Late 2000s", event: "Philosoraptor appears among early advice-animal templates" },
    { date: "2010–2012", event: "Peaks on Reddit and meme-generator sites with viral caption variants" },
    { date: "Mid-2010s+", event: "Usage fades with the broader advice-animal decline; remains a nostalgia reference" },
  ],
  examples: [
    "If nothing is impossible… is nothing possible? [Philosoraptor]",
    "Do fish get thirsty?",
    "If you try to fail and succeed, which have you done?",
  ],
  relatedSlugs: ["bad-luck-brian", "success-kid", "one-does-not-simply"],
  media: [
    // AI suggested — canonical Philosoraptor advice-animal template; human must verify and set verified: true
    {
      role: "featured",
      type: "image",
      url: "https://i.kym-cdn.com/entries/icons/original/000/000/106/Philoso.jpg",
      title: "Philosoraptor — advice-animal template",
      source: "Know Your Meme",
      sourceUrl: "https://knowyourmeme.com/memes/philosoraptor",
      platform: "knowyourmeme",
      attribution: "Know Your Meme / Literally Media",
      description:
        "The contemplative dinosaur illustration used as the Philosoraptor image-macro template.",
      date: "2008",
      verified: false,
    },
    {
      role: "reference",
      type: "embed",
      url: "https://knowyourmeme.com/memes/philosoraptor",
      title: "Philosoraptor — Know Your Meme",
      source: "Know Your Meme",
      sourceUrl: "https://knowyourmeme.com/memes/philosoraptor",
      platform: "knowyourmeme",
      attribution: "Know Your Meme / Literally Media",
      description: "History and examples of the Philosoraptor advice-animal format.",
      date: "2008",
      verified: true,
    },
  ],
  sources: [
    {
      title: "Philosoraptor — Know Your Meme",
      url: "https://knowyourmeme.com/memes/philosoraptor",
      domain: "knowyourmeme.com",
    },
  ],
};

export default entry;
