import type { MemeEntry } from "@/types";

const entry: MemeEntry = {
  id: "m42",
  slug: "drake-hotline-bling",
  title: "Drake Hotline Bling / Drakeposting",
  category: "meme",
  description:
    "The Hotline Bling music-video stills that became the internet's default yes/no preference template — better known as Drakeposting.",
  imageGradient: "from-orange-500 via-amber-400 to-yellow-300",
  scores: { relevance: 90, influence: 90, cringe: 22, brainrot: 35 },
  addedAt: "2026-07-18",
  historicalDate: "2015-10-19",
  views: 8000000,
  trendDirection: "stable",
  tags: ["drake", "reaction", "template", "2015", "hotline-bling", "classic"],
  meaning:
    "A two-panel (or dual-image) template using Drake from the Hotline Bling video: one frame for disapproval/rejection, another for approval. Labels turn any A-vs-B preference into an instant meme. Also covers dance parodies of the video itself.",
  origin:
    "Drake's 'Hotline Bling' video (October 2015) spawned dance memes and reaction stills. On 4chan the disgusted/approving gestures became 'Drakeposting,' then a universal object-labeling format across Reddit, Twitter, and Instagram.",
  timeline: [
    { date: "Oct 2015", event: "Hotline Bling music video released — dance memes begin" },
    { date: "Late 2015–2016", event: "Drakeposting reaction format spreads on 4chan and Reddit" },
    { date: "2016+", event: "Becomes a default preference / ranking meme template" },
  ],
  examples: [
    "Top: waking up early / Bottom: sleeping in [Drake approve]",
    "Rejecting homework, approving snacks — classic Drakeposting layout",
  ],
  relatedSlugs: [
    "expanding-brain",
    "distracted-boyfriend",
    "two-buttons",
    "woman-yelling-at-cat",
    "change-my-mind",
  ],
  relationships: {
    sameFormat: ["expanding-brain", "two-buttons", "change-my-mind"],
    sameEra: ["distracted-boyfriend", "expanding-brain"],
  },
  media: [
    // AI suggested — Drakeposting KYM icon (defining yes/no stills); human must verify
    {
      role: "featured",
      type: "image",
      url: "https://i.kym-cdn.com/entries/icons/original/000/020/147/drake.jpg",
      title: "Drakeposting — Hotline Bling reaction template",
      source: "Know Your Meme",
      sourceUrl: "https://knowyourmeme.com/memes/drakeposting",
      platform: "knowyourmeme",
      attribution: "Drake / Cash Money / via Know Your Meme documentation",
      description:
        "The approving/disapproving Drake stills that define the Hotline Bling meme format.",
      date: "2015",
      verified: false,
    },
    {
      role: "reference",
      type: "embed",
      url: "https://knowyourmeme.com/memes/drakeposting",
      title: "Drakeposting — Know Your Meme",
      source: "Know Your Meme",
      sourceUrl: "https://knowyourmeme.com/memes/drakeposting",
      platform: "knowyourmeme",
      attribution: "Know Your Meme / Literally Media",
      description: "Origin of the Hotline Bling reaction format.",
      date: "2015",
      verified: false,
    },
  ],
  sources: [
    {
      title: "Drakeposting — Know Your Meme",
      url: "https://knowyourmeme.com/memes/drakeposting",
      domain: "knowyourmeme.com",
    },
    {
      title: "Hotline Bling — Know Your Meme",
      url: "https://knowyourmeme.com/memes/hotline-bling",
      domain: "knowyourmeme.com",
    },
  ],
};

export default entry;
