import type { SlangEntry } from "@/types";

const entry: SlangEntry = {
  id: "s51",
  slug: "git-gud",
  title: "Git Gud",
  category: "slang",
  description:
    "Intentional misspelling of 'get good' — the blunt gaming heckle for struggling players (especially Soulsborne culture).",
  imageGradient: "from-red-700 via-stone-800 to-black",
  scores: { relevance: 70, influence: 75, cringe: 55, brainrot: 40 },
  addedAt: "2026-07-19",
  historicalDate: "2011-01-01",
  views: 2900000,
  trendDirection: "stable",
  tags: ["gaming","soulsborne","heckle","slang","difficulty"],
  definition:
    "Git Gud means 'get good' — improve your skill. Used to mock or challenge players who complain about difficulty, especially in hard action games. Can be sincere tough-love or pure toxicity depending on tone.",
  origin:
    "Intentional leetspeak/misspelling of 'get good' that spread in online gaming communities in the early 2010s and became closely associated with Dark Souls difficulty discourse (Know Your Meme).",
  usageExamples: [
    "Dying again in a boss fight: chat says 'git gud'",
    "Self-deprecating: 'time to git gud instead of complaining'",
    "Ironic: 'git gud' under a clearly unfair bug clip"
],
  relatedSlugs: ["noob","gg","ez","lag","can-it-run-crysis"],
  relationships: {
    "relatedSlang": [
        "noob",
        "gg",
        "ez",
        "lag"
    ],
    "relatedTo": [
        "can-it-run-crysis"
    ],
    "community": [
        "noob",
        "gg"
    ]
},
  media: [
    {
        "role": "featured",
        "type": "image",
        "url": "https://i.kym-cdn.com/entries/icons/original/000/014/792/unknown.png",
        "title": "Git Gud — meme documentation image",
        "source": "Know Your Meme",
        "sourceUrl": "https://knowyourmeme.com/memes/git-gud",
        "platform": "knowyourmeme",
        "attribution": "Know Your Meme / Literally Media",
        "description": "KYM cover art associated with the Git Gud phrase.",
        "date": "2011",
        "verified": false
    },
    {
        "role": "reference",
        "type": "embed",
        "url": "https://knowyourmeme.com/memes/git-gud",
        "title": "Git Gud — Know Your Meme",
        "source": "Know Your Meme",
        "sourceUrl": "https://knowyourmeme.com/memes/git-gud",
        "platform": "knowyourmeme",
        "attribution": "Know Your Meme / Literally Media",
        "description": "Slang origin and usage documentation.",
        "date": "2011",
        "verified": false
    }
],
  sources: [
    {
        "title": "Git Gud — Know Your Meme",
        "url": "https://knowyourmeme.com/memes/git-gud",
        "domain": "knowyourmeme.com"
    }
],
};

export default entry;
