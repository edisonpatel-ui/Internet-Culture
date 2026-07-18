import type { EventEntry } from "@/types";

const entry: EventEntry = {
  id: "e17",
  slug: "threads-launch",
  title: "Threads Launch",
  category: "event",
  description:
    "Meta's July 2023 Threads app launch — a Twitter rival that set download records overnight, then faced the hard part: retention.",
  imageGradient: "from-zinc-900 via-neutral-800 to-stone-700",
  scores: { relevance: 76, influence: 76, cringe: 18, brainrot: 20 },
  addedAt: "2026-07-18",
  historicalDate: "2023-07-05",
  views: 2100000,
  trendDirection: "stable",
  tags: ["threads", "meta", "2023", "twitter", "social-apps"],
  platform: "Threads, Instagram, Twitter/X",
  impact:
    "Proved Meta could weaponize Instagram's graph for an instant text-app audience during the Twitter/X turmoil. Sparked platform-migration discourse, brand land-grabs, and a short-lived 'Twitter is over' narrative — then became a slower competition for daily habit.",
  highlights: [
    "Threads launched July 5, 2023, tied to Instagram accounts",
    "Reached record sign-ups within days amid dissatisfaction with Twitter/X",
    "Celebrities, brands, and journalists opened accounts en masse",
    "Engagement cooled after the novelty week — the culture story shifted to whether it could stick",
  ],
  relatedSlugs: ["twitter-x-transition", "short-form-takeover", "tiktok-rise", "bereal-wave"],
  relationships: {
    relatedEvent: ["twitter-x-transition", "bereal-wave"],
    sameEra: ["twitter-x-transition"],
  },
  media: [
    // AI suggested — Threads app logo (Commons)
    {
      role: "featured",
      type: "image",
      url: "https://upload.wikimedia.org/wikipedia/commons/9/9d/Threads_%28app%29_logo.svg",
      title: "Threads app logo",
      source: "Wikimedia Commons",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Threads_(app)_logo.svg",
      platform: "wikimedia",
      attribution: "Meta / Threads (see Commons file page)",
      license: "See Commons file page",
      description: "Official Threads mark from the 2023 launch era.",
      date: "2023",
      verified: false,
    },
    {
      role: "reference",
      type: "embed",
      url: "https://en.wikipedia.org/wiki/Threads_(social_network)",
      title: "Threads (social network) — Wikipedia",
      source: "Wikipedia",
      sourceUrl: "https://en.wikipedia.org/wiki/Threads_(social_network)",
      platform: "other",
      attribution: "Wikipedia contributors",
      description: "Launch history and platform overview.",
      date: "2023",
      verified: false,
    },
  ],
  sources: [
    {
      title: "Threads (social network) — Wikipedia",
      url: "https://en.wikipedia.org/wiki/Threads_(social_network)",
      domain: "en.wikipedia.org",
    },
  ],
};

export default entry;
