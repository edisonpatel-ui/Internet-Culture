import type { CreatorEntry } from "@/types";

const entry: CreatorEntry = {
  id: "cr31",
  slug: "david-dobrik",
  title: "David Dobrik",
  category: "creator",
  personType: "Creator",
  description:
    "Slovak-born Vlog Squad leader whose fast-cut four-minute vlogs, Tesla giveaways, and prank energy defined late-2010s YouTube spectacle — before sponsorship scandals slowed the machine.",
  imageGradient: "from-yellow-400 via-amber-300 to-orange-400",
  scores: { relevance: 68, influence: 82, cringe: 65, brainrot: 45 },
  addedAt: "2026-07-23",
  views: 2400000,
  trendDirection: "declining",
  tags: ["youtube", "vlog squad", "vlogs", "pranks", "giveaways"],
  careerStart: "2015",
  platforms: [
    { platform: "youtube", handle: "David Dobrik", url: "https://www.youtube.com/@DavidDobrik" },
  ],
  followers: {
    youtube: "~17M+ (main vlog channel, era-dependent)",
  },
  notableMoments: [
    "Four-minute vlog format with Vlog Squad ensemble became a YouTube template",
    "Known for elaborate giveaways — cars, cash, and surprise stunts",
    "Stepped back from frequent posting amid 2021–2022 sponsor and safety controversies",
    "Embodied peak \"Vlog Squad era\" creator-as-party-host culture",
  ],
  relatedSlugs: ["youtube-creator-era", "logan-paul", "jake-paul", "influencer-culture"],
  media: [
    // AI suggested — human must verify URL and set verified: true
    {
      role: "featured",
      type: "image",
      url: "https://upload.wikimedia.org/wikipedia/commons/8/8c/David_Dobrik.jpg",
      title: "David Dobrik (2018)",
      source: "Wikimedia Commons / ADHD w/ Travis Mills",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:David_Dobrik.jpg",
      platform: "wikimedia",
      attribution: "ADHD w/ Travis Mills (CC BY 3.0)",
      license: "CC BY 3.0",
      description: "David Dobrik during a 2018 podcast interview.",
      date: "2018",
      verified: false,
    },
    {
      role: "reference",
      type: "embed",
      url: "https://en.wikipedia.org/wiki/David_Dobrik",
      title: "David Dobrik — Wikipedia",
      source: "Wikipedia",
      sourceUrl: "https://en.wikipedia.org/wiki/David_Dobrik",
      platform: "other",
      attribution: "Wikipedia contributors",
      verified: false,
    },
  ],
  sources: [
    {
      title: "David Dobrik — Wikipedia",
      url: "https://en.wikipedia.org/wiki/David_Dobrik",
      domain: "en.wikipedia.org",
    },
    {
      title: "David Dobrik — YouTube",
      url: "https://www.youtube.com/@DavidDobrik",
      domain: "youtube.com",
    },
  ],
};

export default entry;
