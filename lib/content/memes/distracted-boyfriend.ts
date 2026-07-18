import type { MemeEntry } from "@/types";

const entry: MemeEntry = {
  id: "m38",
  slug: "distracted-boyfriend",
  title: "Distracted Boyfriend",
  category: "meme",
  description:
    "The 2015 stock photo turned object-labeling meme — a man glances at another woman while his girlfriend looks shocked.",
  imageGradient: "from-sky-400 via-red-400 to-rose-500",
  scores: { relevance: 74, brainrot: 36, cringe: 28 },
  addedAt: "2026-07-17",
  historicalDate: "2017-08-19",
  views: 5100000,
  trendDirection: "stable",
  tags: ["object-labeling", "stock-photo", "2017", "twitter", "classic"],
  meaning:
    "An object-labeling template: the boyfriend is whoever is tempted, the girlfriend is the current commitment, and the woman in red is the distraction. Used for everything from politics to tech preferences to personal vices.",
  origin:
    "Photographed in Girona, Spain in mid-2015 by Antonio Guillem for a stock series about playful 'infidelity.' First meme uses appeared in early 2017; it went massively viral in August 2017 after labeled versions (including a capitalism/socialism joke) spread on Twitter. It won Best Meme of 2017 at the Shorty Awards.",
  timeline: [
    { date: "2015", event: "Antonio Guillem shoots the stock photo in Girona with models 'Mario' and 'Laura'" },
    { date: "Jan 2017", event: "Early meme use in a Turkish progressive-rock Facebook group" },
    { date: "Aug 2017", event: "Labeled versions explode on Twitter — meme goes mainstream" },
    { date: "Apr 2018", event: "Wins Best Meme of 2017 at the Shorty Awards" },
    { date: "2018+", event: "Spin-offs include historical painting comparisons and other stock-photo sequels" },
  ],
  examples: [
    "Boyfriend: Me · Girlfriend: My responsibilities · Woman in red: Sleeping in",
    "Youth distracted from capitalism by socialism (classic 2017 variant)",
    "Any 'supposed to want X / actually want Y' joke",
  ],
  relatedSlugs: ["woman-yelling-at-cat", "expanding-brain", "surprised-pikachu"],
  media: [
    // AI suggested — KYM entry icon is the defining stock scene; human should confirm and set verified: true
    {
      role: "featured",
      type: "image",
      url: "https://i.kym-cdn.com/entries/icons/original/000/023/732/damngina.jpg",
      title: "Distracted Boyfriend — original stock template",
      source: "Know Your Meme",
      sourceUrl: "https://knowyourmeme.com/memes/distracted-boyfriend",
      platform: "knowyourmeme",
      attribution: "Antonio Guillem / stock models (via Know Your Meme documentation)",
      license: "Copyrighted stock photograph — used for identification",
      description:
        "The defining Guillem stock photograph used as the Distracted Boyfriend object-labeling template.",
      date: "2015",
      verified: false,
    },
    // Historical parallel often cited alongside the meme — not a substitute for the stock photo
    {
      role: "supporting",
      type: "image",
      url: "https://upload.wikimedia.org/wikipedia/commons/7/7a/Reynolds-Garrick_between_tragedy_and_comedy.jpg",
      title: "David Garrick Between Tragedy and Comedy (1760–61)",
      source: "Wikimedia Commons",
      sourceUrl:
        "https://commons.wikimedia.org/wiki/File:Reynolds-Garrick_between_tragedy_and_comedy.jpg",
      platform: "wikimedia",
      attribution: "Joshua Reynolds (public domain)",
      license: "Public domain",
      description:
        "18th-century painting frequently compared online as a historical 'distracted boyfriend' composition — supporting context only.",
      date: "1761",
      verified: false,
    },
    {
      role: "reference",
      type: "embed",
      url: "https://knowyourmeme.com/memes/distracted-boyfriend",
      title: "Distracted Boyfriend — Know Your Meme",
      source: "Know Your Meme",
      sourceUrl: "https://knowyourmeme.com/memes/distracted-boyfriend",
      platform: "knowyourmeme",
      attribution: "Know Your Meme / Literally Media",
      description: "Full origin, spread timeline, and notable variants.",
      date: "2017",
      verified: false,
    },
    {
      role: "reference",
      type: "embed",
      url: "https://en.wikipedia.org/wiki/Distracted_boyfriend_meme",
      title: "Distracted boyfriend meme — Wikipedia",
      source: "Wikipedia",
      sourceUrl: "https://en.wikipedia.org/wiki/Distracted_boyfriend_meme",
      platform: "wikimedia",
      attribution: "Wikipedia contributors",
      license: "CC BY-SA 4.0",
      description: "Encyclopedic summary of the stock photo and meme history.",
      verified: false,
    },
  ],
  sources: [
    {
      title: "Distracted Boyfriend — Know Your Meme",
      url: "https://knowyourmeme.com/memes/distracted-boyfriend",
      domain: "knowyourmeme.com",
    },
    {
      title: "Distracted boyfriend meme — Wikipedia",
      url: "https://en.wikipedia.org/wiki/Distracted_boyfriend_meme",
      domain: "en.wikipedia.org",
    },
    {
      title: "The Story Behind That Viral 'Distracted Boyfriend' Meme Photo — PetaPixel",
      url: "https://petapixel.com/2017/09/18/story-behind-viral-distracted-boyfriend-meme-photo/",
      domain: "petapixel.com",
    },
  ],
};

export default entry;
