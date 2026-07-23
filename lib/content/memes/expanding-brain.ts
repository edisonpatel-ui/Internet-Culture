import type { MemeEntry } from "@/types";

const entry: MemeEntry = {
  id: "m40",
  slug: "expanding-brain",
  title: "Expanding Brain",
  category: "meme",
  description:
    "The multi-panel 'galaxy brain' template ranking ideas from basic to absurdly enlightened as the brain lights up.",
  imageGradient: "from-pink-400 via-fuchsia-500 to-violet-600",
  scores: { relevance: 72, influence: 72, cringe: 30, brainrot: 48 },
  addedAt: "2026-07-17",
  historicalDate: "2017-02-01",
  views: 3900000,
  trendDirection: "stable",
  tags: ["object-labeling", "iq", "galaxy-brain", "2017", "reddit", "classic"],
  meaning:
    "A vertical tier list of increasingly 'enlightened' (often ironic) takes. Each panel shows a more illuminated brain — from dim to rainbow cosmic — paired with labels that escalate from normal to ridiculous. Used to mock pretension or to jokingly crown a chaotic opinion as peak IQ.",
  origin:
    "An object-labeling / IQ-chart descendant that spread on Reddit and Twitter in early 2017 (Know Your Meme documents the Expanding Brain / galaxy-brain format's rise that year). It became one of the decade's default sarcasm formats, later remade on TikTok.",
  timeline: [
    { date: "Early 2017", event: "Expanding Brain / galaxy-brain panel formats begin circulating widely" },
    { date: "2017–2018", event: "Becomes a default Reddit and Twitter sarcasm template" },
    { date: "2018+", event: "Endless remixes; often paired with other object-labeling memes" },
  ],
  examples: [
    "Level 1: Using an alarm · Level 4: Trusting the vibes to wake you up",
    "Basic take → mid take → cursed take → galaxy-brain take",
    "Ranking increasingly unhinged opinions with glowing brains",
  ],
  relatedSlugs: ["distracted-boyfriend", "philosoraptor", "wojak"],
  media: [
    // AI suggested — KYM entry icon shows the classic expanding-brain panels
    {
      role: "featured",
      type: "image",
      url: "https://i.kym-cdn.com/entries/icons/original/000/022/266/brain.png",
      title: "Expanding Brain — classic panel template",
      source: "Know Your Meme",
      sourceUrl: "https://knowyourmeme.com/memes/expanding-brain",
      platform: "knowyourmeme",
      attribution: "Know Your Meme documentation of the expanding-brain format",
      license: "Copyrighted meme composite — used for identification",
      description:
        "The familiar multi-tier glowing-brain layout that defines the Expanding Brain meme.",
      date: "2017",
      verified: false,
    },
    {
      role: "reference",
      type: "embed",
      url: "https://knowyourmeme.com/memes/expanding-brain",
      title: "Expanding Brain — Know Your Meme",
      source: "Know Your Meme",
      sourceUrl: "https://knowyourmeme.com/memes/expanding-brain",
      platform: "knowyourmeme",
      attribution: "Know Your Meme / Literally Media",
      description: "Origin notes, examples, and related galaxy-brain variants.",
      date: "2017",
      verified: false,
    },
  ],
  sources: [
    {
      title: "Expanding Brain — Know Your Meme",
      url: "https://knowyourmeme.com/memes/expanding-brain",
      domain: "knowyourmeme.com",
    },
  ],
};

export default entry;
