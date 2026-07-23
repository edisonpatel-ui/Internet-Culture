import type { MemeEntry } from "@/types";

const entry: MemeEntry = {
  id: "m109",
  slug: "crying-cat",
  title: "Crying Cat / Thumbs Up Cat",
  category: "meme",
  description:
    "A teary-eyed cat giving a thumbs up — the perfect image for 'I'm dying inside but everything is fine.'",
  imageGradient: "from-orange-400 via-amber-300 to-yellow-200",
  scores: { relevance: 80, influence: 72, cringe: 35, brainrot: 48 },
  addedAt: "2026-07-23",
  historicalDate: "2019-06-01",
  views: 3100000,
  trendDirection: "stable",
  tags: ["cat", "reaction", "crying", "wholesome-sad", "2019", "classic"],
  meaning:
    "A photoshopped cat with teary, pleading eyes and a human thumbs-up gesture. It expresses forced optimism through pain — smiling on the outside while falling apart. Often captioned with contradictory text ('I'm fine :)') or used as a reply when someone shares bad news you must pretend to accept.",
  origin:
    "Know Your Meme traces the Thumbs Up Crying Cat to a June 2019 tweet by @MISSINGEGO, which combined a sad cat face with a thumbs-up stock hand. The image spread quickly on Twitter and Reddit as a reaction macro. It sits in the same emotional lane as 'This Is Fine' but with more explicit performative positivity.",
  timeline: [
    { date: "Jun 2019", event: "@MISSINGEGO tweets the Thumbs Up Crying Cat composite" },
    { date: "2019", event: "Spreads across Twitter, Reddit, and Instagram reaction pages" },
    { date: "2020", event: "Peak use during lockdown 'I'm fine' coping posts" },
    { date: "2021+", event: "Remains a standard sad-wholesome reaction image" },
  ],
  examples: [
    "Boss assigns weekend work — [crying cat thumbs up] 'Can't wait!'",
    "Me pretending to enjoy small talk — thumbs up crying cat",
    "Reply image when a friend shares trauma and you don't know what to say",
  ],
  relatedSlugs: ["hide-the-pain-harold", "this-is-fine", "woman-yelling-at-cat"],
  media: [
    {
      role: "reference",
      type: "embed",
      url: "https://knowyourmeme.com/memes/crying-cat",
      title: "Crying Cat — Know Your Meme",
      source: "Know Your Meme",
      sourceUrl: "https://knowyourmeme.com/memes/crying-cat",
      platform: "knowyourmeme",
      attribution: "Know Your Meme / Literally Media",
      description: "Documentation of the Thumbs Up Crying Cat meme origin.",
      verified: false,
    },
    {
      role: "reference",
      type: "embed",
      url: "https://knowyourmeme.com/memes/thumbs-up-crying-cat",
      title: "Thumbs Up Crying Cat — Know Your Meme",
      source: "Know Your Meme",
      sourceUrl: "https://knowyourmeme.com/memes/thumbs-up-crying-cat",
      platform: "knowyourmeme",
      attribution: "Know Your Meme / Literally Media",
      verified: false,
    },
  ],
  sources: [
    {
      title: "Thumbs Up Crying Cat — Know Your Meme",
      url: "https://knowyourmeme.com/memes/thumbs-up-crying-cat",
      domain: "knowyourmeme.com",
    },
    {
      title: "Crying Cat — Know Your Meme",
      url: "https://knowyourmeme.com/memes/crying-cat",
      domain: "knowyourmeme.com",
    },
  ],
};

export default entry;
