import type { EventEntry } from "@/types";

const entry: EventEntry = {
  id: "e1",
  slug: "brat-summer",
  title: "Brat Summer",
  category: "event",
  description:
    "Charli XCX's lime-green album era that defined a chaotic, party-forward cultural movement in 2024.",
  imageGradient: "from-lime-400 via-green-400 to-emerald-500",
  scores: { relevance: 85, influence: 85, cringe: 29, brainrot: 55 },
  addedAt: "2026-06-20",
  views: 650000,
  trendDirection: "declining",
  platform: "TikTok, X, Instagram",
  impact:
    "Redefined how music eras become internet personalities. 'Brat' became a political endorsement, a beauty aesthetic, and a lifestyle philosophy simultaneously.",
  highlights: [
    "Kamala Harris's campaign used 'brat' branding, endorsed by Charli XCX",
    "The lime green became one of the most recognizable brand colors of 2024",
    "\"Brat girl\" became a recognizable archetype across fashion and music",
    "Sparked debate about what 'brat' actually means across generations",
  ],
  relatedSlugs: ["delulu", "slay"],
  tags: ["music", "charli xcx", "2024", "album era", "aesthetic"],
  // Defining visual: lime-green Brat wordmark cover (Commons PD-textlogo).
  media: [
    {
      role: "featured",
      type: "image",
      url: "https://upload.wikimedia.org/wikipedia/commons/6/60/Charli_XCX_-_Brat_%28album_cover%29.png",
      title: "Brat — Charli XCX album cover (lime-green wordmark)",
      source: "Wikimedia Commons",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Charli_XCX_-_Brat_(album_cover).png",
      platform: "wikimedia",
      attribution: "Asylum / Atlantic / Warner UK (PD-textlogo)",
      license: "Public domain (textlogo)",
      description:
        "Official Brat album cover — the lime-green wordmark that defined Brat Summer 2024.",
      date: "2024-02-28",
      verified: true,
    },
    {
      role: "video",
      type: "video",
      url: "https://www.youtube.com/watch?v=WJW-VvmRKsE",
      title: "Charli xcx — 360 (official video)",
      source: "YouTube / Charli xcx",
      sourceUrl: "https://www.youtube.com/watch?v=WJW-VvmRKsE",
      platform: "youtube",
      attribution: "Charli xcx",
      license: "YouTube Standard License",
      description:
        "Official Brat-era music video for 360 — a defining clip of the album's cultural moment.",
      date: "2024-05-09",
      verified: true,
    },
    {
      role: "reference",
      type: "embed",
      url: "https://en.wikipedia.org/wiki/Brat_(album)",
      title: "Brat (album) — Wikipedia",
      source: "Wikipedia",
      sourceUrl: "https://en.wikipedia.org/wiki/Brat_(album)",
      platform: "other",
      attribution: "Wikipedia contributors",
      description:
        "Album page for Charli XCX's Brat — the lime-green era that defined Brat Summer.",
      date: "2024",
      verified: true,
    },
  ],
  sources: [
    {
      title: "Brat (album) — Wikipedia",
      url: "https://en.wikipedia.org/wiki/Brat_(album)",
      domain: "en.wikipedia.org",
    },
  ],
};

export default entry;
