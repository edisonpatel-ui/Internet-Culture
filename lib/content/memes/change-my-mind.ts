import type { MemeEntry } from "@/types";

const entry: MemeEntry = {
  id: "m43",
  slug: "change-my-mind",
  title: "Change My Mind",
  category: "meme",
  description:
    "The folding-table sign meme — a man with coffee inviting debate under the caption 'Change My Mind.'",
  imageGradient: "from-sky-600 via-blue-500 to-cyan-400",
  scores: { relevance: 85, influence: 85, cringe: 40, brainrot: 30 },
  addedAt: "2026-07-18",
  historicalDate: "2018-02-16",
  views: 5500000,
  trendDirection: "stable",
  tags: ["template", "debate", "2018", "crowder", "exploitable"],
  meaning:
    "An exploitable photo of a man at a campus table with a sign ending in 'Change My Mind.' Users rewrite the top line to state a hot take, joke opinion, or absurd claim — inviting mock debate.",
  origin:
    "In February 2018, Steven Crowder posted a photo from a Texas Christian University campus segment with a sign reading 'Male Privilege is a myth / Change My Mind.' The image was immediately photoshopped across Twitter and Reddit into a durable opinion template.",
  timeline: [
    { date: "Feb 2018", event: "Original Crowder campus photo posted" },
    { date: "2018", event: "Explodes as an editable sign template on Twitter/Reddit" },
    { date: "2019+", event: "Becomes a standard 'hot take' macro format" },
  ],
  examples: [
    "Sign text swapped to any niche opinion + 'Change My Mind'",
    "Used ironically for silly takes, not just political ones",
  ],
  relatedSlugs: [
    "drake-hotline-bling",
    "expanding-brain",
    "two-buttons",
    "philosoraptor",
  ],
  relationships: {
    sameFormat: ["drake-hotline-bling", "two-buttons", "expanding-brain"],
  },
  media: [
    // AI suggested — KYM Change My Mind entry icon; human must verify
    {
      role: "featured",
      type: "image",
      url: "https://i.kym-cdn.com/entries/icons/original/000/025/500/crowder.jpg",
      title: "Change My Mind — campus table template",
      source: "Know Your Meme",
      sourceUrl:
        "https://knowyourmeme.com/memes/steven-crowders-change-my-mind-campus-sign",
      platform: "knowyourmeme",
      attribution: "Steven Crowder photo via Know Your Meme documentation",
      description: "The defining folding-table / 'Change My Mind' sign photograph.",
      date: "2018",
      verified: false,
    },
    {
      role: "reference",
      type: "embed",
      url: "https://knowyourmeme.com/memes/steven-crowders-change-my-mind-campus-sign",
      title: "Steven Crowder's Change My Mind Campus Sign — Know Your Meme",
      source: "Know Your Meme",
      sourceUrl:
        "https://knowyourmeme.com/memes/steven-crowders-change-my-mind-campus-sign",
      platform: "knowyourmeme",
      attribution: "Know Your Meme / Literally Media",
      description: "Origin and spread of the Change My Mind template.",
      date: "2018",
      verified: false,
    },
  ],
  sources: [
    {
      title: "Steven Crowder's Change My Mind Campus Sign — Know Your Meme",
      url: "https://knowyourmeme.com/memes/steven-crowders-change-my-mind-campus-sign",
      domain: "knowyourmeme.com",
    },
  ],
};

export default entry;
