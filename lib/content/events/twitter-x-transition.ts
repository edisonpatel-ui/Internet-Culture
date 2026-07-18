import type { EventEntry } from "@/types";

const entry: EventEntry = {
  id: "e18",
  slug: "twitter-x-transition",
  title: "Twitter → X Transition",
  category: "event",
  description:
    "Elon Musk's takeover and rebrand of Twitter into X — layoffs, blue checks for sale, and a platform identity crisis.",
  imageGradient: "from-sky-500 via-neutral-800 to-black",
  scores: { relevance: 88, brainrot: 35, cringe: 40 },
  addedAt: "2026-07-18",
  historicalDate: "2022-10-27",
  views: 5000000,
  trendDirection: "stable",
  tags: ["twitter", "x", "elon-musk", "2022", "2023", "platform"],
  platform: "Twitter / X",
  impact:
    "Rewrote the norms of the internet's public square: verification became a paid product, moderation and advertiser trust shook, and rivals (notably Threads) tried to absorb displaced users. The bird logo's death became a meme about corporate identity and online power.",
  highlights: [
    "Musk completed the Twitter acquisition in October 2022",
    "Mass layoffs and product whiplash followed across 2022–2023",
    "July 2023 rebrand to X retired the Twitter bird as the public face",
    "Cultural fallout included migration talk, new slang around 'the app formerly known as Twitter,' and Threads' launch window",
  ],
  relatedSlugs: ["threads-launch", "ratio", "short-form-takeover", "ai-chatbot-wars"],
  relationships: {
    relatedEvent: ["threads-launch"],
    sameEra: ["threads-launch", "ai-chatbot-wars"],
  },
  media: [
    // AI suggested — X logo 2023 (Commons); defining rebrand mark
    {
      role: "featured",
      type: "image",
      url: "https://upload.wikimedia.org/wikipedia/commons/c/ce/X_logo_2023.svg",
      title: "X (Twitter) logo, 2023",
      source: "Wikimedia Commons",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:X_logo_2023.svg",
      platform: "wikimedia",
      attribution: "X Corp. (see Commons file page)",
      license: "See Commons file page",
      description: "The X wordmark that replaced the Twitter bird in the 2023 rebrand.",
      date: "2023",
      verified: false,
    },
    {
      role: "reference",
      type: "embed",
      url: "https://en.wikipedia.org/wiki/Twitter_under_Elon_Musk",
      title: "Twitter under Elon Musk — Wikipedia",
      source: "Wikipedia",
      sourceUrl: "https://en.wikipedia.org/wiki/Twitter_under_Elon_Musk",
      platform: "other",
      attribution: "Wikipedia contributors",
      description: "Acquisition, product changes, and rebrand overview.",
      date: "2022",
      verified: false,
    },
  ],
  sources: [
    {
      title: "Twitter under Elon Musk — Wikipedia",
      url: "https://en.wikipedia.org/wiki/Twitter_under_Elon_Musk",
      domain: "en.wikipedia.org",
    },
    {
      title: "X (Twitter) — Wikipedia",
      url: "https://en.wikipedia.org/wiki/Twitter",
      domain: "en.wikipedia.org",
    },
  ],
};

export default entry;
