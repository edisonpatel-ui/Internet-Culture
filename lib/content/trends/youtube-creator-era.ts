import type { BaseEntry } from "@/types";

const entry: BaseEntry = {
  id: "t23",
  slug: "youtube-creator-era",
  title: "YouTube Creator Era",
  category: "trend",
  description:
    "The cultural period when YouTube personalities became the default internet celebrities — vlogs, multi-channel networks, Rewinds, and Adpocalypse scars.",
  imageGradient: "from-red-600 via-rose-600 to-zinc-900",
  scores: { relevance: 70, influence: 90, cringe: 35, brainrot: 30 },
  addedAt: "2026-07-19",
  historicalDate: "2006-01-01",
  views: 3800000,
  trendDirection: "stable",
  tags: ["youtube","creators","2000s","2010s","vlog"],
  origin:
    "From early viral uploads through the mid-2010s partnership/MCN boom, YouTube minted a creator class (PewDiePie-scale fame, beauty vloggers, commentary channels). Cultural milestones include Rewind spectacles, demonetization waves, and the shift toward long-form brands like MrBeast.",
  summary:
    "Not a single platform page — a cultural era: bedroom fame → industry. Distinct from YouTube Rewind (the annual show) and from today's multi-platform creator economy, though they overlap.",
  relatedSlugs: ["youtube-rewind","creator-economy","pewdiepie","mrbeast","annoying-orange","charlie-bit-my-finger"],
  relationships: {
  "relatedEvent": [
    "youtube-rewind"
  ],
  "relatedTo": [
    "creator-economy",
    "pewdiepie",
    "mrbeast",
    "annoying-orange",
    "charlie-bit-my-finger"
  ],
  "community": [
    "pewdiepie",
    "mrbeast"
  ]
},
  media: [
  {
    "role": "featured",
    "type": "image",
    "url": "https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg",
    "title": "YouTube logo — creator-era platform mark",
    "source": "Wikimedia Commons",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:YouTube_Logo_2017.svg",
    "platform": "wikimedia",
    "attribution": "Google / YouTube (see Commons file page)",
    "license": "See Commons file page",
    "description": "YouTube branding for the platform's creator-celebrity era.",
    "date": "2006",
    "verified": false
  },
  {
    "role": "reference",
    "type": "embed",
    "url": "https://en.wikipedia.org/wiki/YouTube",
    "title": "YouTube Creator Era — Wikipedia",
    "source": "Wikipedia",
    "sourceUrl": "https://en.wikipedia.org/wiki/YouTube",
    "platform": "other",
    "attribution": "Wikipedia contributors",
    "license": "CC BY-SA 4.0",
    "description": "Encyclopedic background.",
    "verified": false
  }
],
  sources: [
  {
    "title": "YouTube Creator Era — Wikipedia",
    "url": "https://en.wikipedia.org/wiki/YouTube",
    "domain": "en.wikipedia.org"
  },
  {
    "title": "YouTube Rewind — Know Your Meme",
    "url": "https://knowyourmeme.com/memes/youtube-rewind",
    "domain": "knowyourmeme.com"
  }
],
};

export default entry;
