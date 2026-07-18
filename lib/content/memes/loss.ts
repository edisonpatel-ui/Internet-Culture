import type { MemeEntry } from "@/types";

const entry: MemeEntry = {
  id: "m48",
  slug: "loss",
  title: "Loss",
  category: "meme",
  description:
    "The Ctrl+Alt+Del 'Loss' comic distilled into four-panel geometry — | || || |_ — a long-running shitpost cipher.",
  imageGradient: "from-neutral-800 via-zinc-700 to-stone-600",
  scores: { relevance: 70, influence: 70, cringe: 30, brainrot: 65 },
  addedAt: "2026-07-18",
  historicalDate: "2008-06-02",
  views: 3500000,
  trendDirection: "stable",
  tags: ["ctrl-alt-del", "2008", "shitpost", "minimal", "classic", "comic"],
  meaning:
    "A meme based on Tim Buckley's Ctrl+Alt+Del comic 'Loss,' reduced to the iconic four-panel stick layout (often written | || || |_). Anything arranged in that pattern is a Loss reference — a meta joke about recognizing the structure itself.",
  origin:
    "On June 2, 2008, Tim Buckley published the melodramatic CAD comic 'Loss.' It was immediately mocked; over years the panels were abstracted into minimalist shapes and hidden in unrelated images as a recognition game.",
  timeline: [
    { date: "Jun 2008", event: "Original Loss comic published on Ctrl+Alt+Del" },
    { date: "2008–2010s", event: "Parodies and minimalist | || || |_ form spread" },
    { date: "2010s–2020s", event: "Loss becomes a perennial 'is this Loss?' shitpost" },
  ],
  examples: [
    "Four objects arranged | || || |_ in a photo — comments: 'is this loss?'",
    "ASCII: | || || |_",
  ],
  relatedSlugs: ["rage-comics", "trollface", "wojak", "pepe"],
  relationships: {
    sameEra: ["rage-comics", "trollface"],
    sameFormat: ["rage-comics"],
  },
  media: [
    // AI suggested — KYM Loss minimal icon; human must verify
    {
      role: "featured",
      type: "image",
      url: "https://i.kym-cdn.com/entries/icons/original/000/006/252/lossminimal.jpg",
      title: "Loss — minimal four-panel form",
      source: "Know Your Meme",
      sourceUrl: "https://knowyourmeme.com/memes/loss",
      platform: "knowyourmeme",
      attribution: "Ctrl+Alt+Del / via Know Your Meme documentation",
      description:
        "The abstracted | || || |_ panel geometry that defines Loss references.",
      date: "2008",
      verified: false,
    },
    {
      role: "reference",
      type: "embed",
      url: "https://knowyourmeme.com/memes/loss",
      title: "Loss — Know Your Meme",
      source: "Know Your Meme",
      sourceUrl: "https://knowyourmeme.com/memes/loss",
      platform: "knowyourmeme",
      attribution: "Know Your Meme / Literally Media",
      description: "History of the Loss comic meme and minimalist variants.",
      date: "2008",
      verified: false,
    },
  ],
  sources: [
    {
      title: "Loss — Know Your Meme",
      url: "https://knowyourmeme.com/memes/loss",
      domain: "knowyourmeme.com",
    },
  ],
};

export default entry;
