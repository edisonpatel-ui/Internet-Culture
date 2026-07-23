import type { MemeEntry } from "@/types";

const entry: MemeEntry = {
  id: "m115",
  slug: "gorilla-glue-girl",
  title: "Gorilla Glue Girl",
  category: "meme",
  description:
    "Tessica Brown's 2021 viral video about Gorilla Glue in her hair — a cautionary tale that broke the internet for weeks.",
  imageGradient: "from-yellow-600 via-amber-500 to-orange-400",
  scores: { relevance: 65, influence: 68, cringe: 78, brainrot: 55 },
  addedAt: "2026-07-23",
  historicalDate: "2021-02-03",
  views: 3800000,
  trendDirection: "declining",
  tags: ["viral", "tiktok", "2021", "hair", "cautionary", "news"],
  meaning:
    "Meme shorthand for Tessica Brown, who went viral after posting that she used Gorilla Glue spray adhesive as hairspray and could not wash it out. The story became instant meme fodder — disbelief, sympathy, brand crisis, and jokes about never skipping the label. It also sparked copycat stunts and a larger discourse about clout-chasing vs. genuine mistakes.",
  origin:
    "On February 3, 2021, Tessica Brown posted a TikTok explaining she had used Gorilla Glue Heavy Duty Spray on her hair for a month. The video spread to Twitter and mainstream news within days. Gorilla Glue issued statements warning against hair use; a LA surgeon eventually helped remove the adhesive in a procedure covered by media. Know Your Meme and outlets like BBC documented the viral arc.",
  timeline: [
    { date: "Feb 3, 2021", event: "Tessica Brown posts TikTok about Gorilla Glue in her hair" },
    { date: "Feb 2021", event: "Video goes viral; Gorilla Glue and medical experts respond publicly" },
    { date: "Feb 2021", event: "Surgical removal procedure performed; story dominates news cycle" },
    { date: "2021", event: "Copycat incidents and meme jokes about reading product labels" },
    { date: "2022+", event: "Referenced as peak early-2021 viral absurdity" },
  ],
  examples: [
    "Using the wrong product and realizing too late — 'Gorilla Glue girl moment'",
    "Brand Twitter responding to viral crisis in real time",
    "Meme reactions: 'She used WHAT on her hair?!'",
  ],
  relatedSlugs: ["hawk-tuah", "this-is-fine", "side-eyeing-chloe"],
  media: [
    {
      role: "reference",
      type: "embed",
      url: "https://knowyourmeme.com/memes/gorilla-glue-girl",
      title: "Gorilla Glue Girl — Know Your Meme",
      source: "Know Your Meme",
      sourceUrl: "https://knowyourmeme.com/memes/gorilla-glue-girl",
      platform: "knowyourmeme",
      attribution: "Know Your Meme / Literally Media",
      description: "Documentation of the Tessica Brown viral incident.",
      verified: false,
    },
    {
      role: "reference",
      type: "embed",
      url: "https://www.bbc.com/news/world-us-canada-55998952",
      title: "Gorilla Glue in hair — BBC News",
      source: "BBC",
      sourceUrl: "https://www.bbc.com/news/world-us-canada-55998952",
      platform: "other",
      attribution: "BBC",
      description: "News coverage of the viral Gorilla Glue hair incident.",
      date: "2021",
      verified: false,
    },
  ],
  sources: [
    {
      title: "Gorilla Glue Girl — Know Your Meme",
      url: "https://knowyourmeme.com/memes/gorilla-glue-girl",
      domain: "knowyourmeme.com",
    },
    {
      title: "Woman who used Gorilla Glue on hair — BBC",
      url: "https://www.bbc.com/news/world-us-canada-55998952",
      domain: "bbc.com",
    },
  ],
};

export default entry;
