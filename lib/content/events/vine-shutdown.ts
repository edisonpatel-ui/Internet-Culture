import type { EventEntry } from "@/types";

const entry: EventEntry = {
  id: "e6",
  slug: "vine-shutdown",
  title: "Vine Shutdown",
  category: "event",
  description:
    "Twitter's decision to shut down Vine in 2016 ended the first great short-form video era and scattered a generation of creators who went on to dominate YouTube and TikTok.",
  imageGradient: "from-lime-500 via-green-500 to-emerald-600",
  scores: { relevance: 82, brainrot: 40, cringe: 15 },
  addedAt: "2026-07-16",
  historicalDate: "2017-01-17",
  views: 890000,
  trendDirection: "declining",
  platform: "Vine, Twitter",
  impact:
    "Vine's closure proved that even culturally essential platforms are not permanent. The creators it produced — Logan Paul, King Bach, David Dobrik, Lele Pons — became the first cohort of internet-native superstars and defined the creator economy that followed.",
  highlights: [
    "Twitter acquired Vine in October 2012 before it had even launched publicly",
    "Vine launched on January 24, 2013 — 6-second looping videos",
    "Twitter announced the shutdown on October 27, 2016",
    "Vine went offline on January 17, 2017 — archives were preserved",
    "Many Vine creators immediately migrated to YouTube and later TikTok",
  ],
  relatedSlugs: ["short-form-takeover", "yeet"],
  tags: ["vine", "twitter", "short-form video", "creators", "2016", "2017"],
  media: [
    // Official Vine wordmark — PD-textlogo on Commons (simple geometric logo).
    {
      role: "featured",
      type: "image",
      url: "https://upload.wikimedia.org/wikipedia/commons/e/e0/Vine_logo.svg",
      title: "Vine — official logo",
      source: "Wikimedia Commons",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Vine_logo.svg",
      platform: "wikimedia",
      attribution: "Vine Labs, Inc. (PD-textlogo)",
      license: "Public domain (textlogo)",
      description:
        "Official Vine app logo — the visual identity of the short-form platform shut down in 2017.",
      date: "2013",
      verified: true,
    },
    {
      role: "reference",
      type: "embed",
      url: "https://en.wikipedia.org/wiki/Vine_(service)",
      title: "Vine (service) — Wikipedia",
      source: "Wikipedia",
      sourceUrl: "https://en.wikipedia.org/wiki/Vine_(service)",
      platform: "other",
      attribution: "Wikipedia contributors",
      description: "History of Vine from launch through the 2016–2017 shutdown.",
      date: "2017",
      verified: true,
    },
  ],
  sources: [
    {
      title: "Vine — Wikipedia",
      url: "https://en.wikipedia.org/wiki/Vine_(service)",
      domain: "en.wikipedia.org",
    },
  ],
};

export default entry;
