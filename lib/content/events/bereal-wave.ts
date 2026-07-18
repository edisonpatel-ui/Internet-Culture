import type { EventEntry } from "@/types";

const entry: EventEntry = {
  id: "e16",
  slug: "bereal-wave",
  title: "BeReal Wave",
  category: "event",
  description:
    "The early-2020s BeReal boom — a once-a-day authentic photo app that briefly challenged polished Instagram culture.",
  imageGradient: "from-yellow-300 via-amber-200 to-stone-300",
  scores: { relevance: 70, brainrot: 25, cringe: 22 },
  addedAt: "2026-07-18",
  historicalDate: "2022-01-01",
  views: 1800000,
  trendDirection: "declining",
  tags: ["bereal", "2022", "authenticity", "social-apps", "gen-z"],
  platform: "BeReal, TikTok, Instagram",
  impact:
    "Briefly repositioned 'authenticity' as a product feature: one daily dual-camera capture, no filters, FOMO via timed notifications. Sparked discourse about performative casualness and showed how fast Gen Z can elevate — then abandon — a social app.",
  highlights: [
    "BeReal downloads surged in 2022 among teens and college students",
    "Daily notification + front/back camera format became a recognizable ritual",
    "Influencer and brand accounts struggled with the 'unpolished' aesthetic",
    "Hype cooled as engagement habituated and competitors copied the format",
  ],
  relatedSlugs: ["short-form-takeover", "tiktok-rise", "dupe-economy", "clean-girl-aesthetic"],
  relationships: {
    sameEra: ["short-form-takeover", "threads-launch"],
    relatedEvent: ["tiktok-rise"],
  },
  media: [
    // AI suggested — official BeReal wordmark (Commons SVG)
    {
      role: "featured",
      type: "image",
      url: "https://upload.wikimedia.org/wikipedia/commons/a/a6/BeReal._Logo.svg",
      title: "BeReal logo",
      source: "Wikimedia Commons",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:BeReal._Logo.svg",
      platform: "wikimedia",
      attribution: "BeReal (see Commons file page)",
      license: "See Commons file page",
      description: "Official BeReal wordmark — the app that defined the authenticity wave.",
      date: "2022",
      verified: false,
    },
    {
      role: "reference",
      type: "embed",
      url: "https://en.wikipedia.org/wiki/BeReal",
      title: "BeReal — Wikipedia",
      source: "Wikipedia",
      sourceUrl: "https://en.wikipedia.org/wiki/BeReal",
      platform: "other",
      attribution: "Wikipedia contributors",
      description: "App history and cultural reception.",
      date: "2022",
      verified: false,
    },
  ],
  sources: [
    {
      title: "BeReal — Wikipedia",
      url: "https://en.wikipedia.org/wiki/BeReal",
      domain: "en.wikipedia.org",
    },
  ],
};

export default entry;
