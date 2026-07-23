import type { EventEntry } from "@/types";

const entry: EventEntry = {
  id: "e34",
  slug: "diddy-scandal",
  title: "Sean Combs Legal Cases",
  category: "event",
  description:
    "The 2023–2025 federal prosecution of Sean \"Diddy\" Combs — civil lawsuits, a Homeland Security raid, and sex-trafficking charges that dominated music and internet discourse.",
  imageGradient: "from-neutral-900 via-zinc-800 to-red-950",
  scores: { relevance: 88, influence: 90, cringe: 70, brainrot: 20 },
  addedAt: "2026-07-23",
  historicalDate: "2023-11-01",
  views: 4800000,
  trendDirection: "rising",
  tags: ["2024", "music", "legal", "news", "scandal"],
  platform: "X, Instagram, YouTube, news",
  impact:
    "Civil suits filed in late 2023 alleging abuse and coercion drew intense social-media coverage. Federal agents searched Combs's properties in March 2024; he was indicted in September 2024 on racketeering and sex-trafficking charges. The story intersected with years of behind-the-scenes music-industry rumors now discussed openly online. Coverage mixed documented court filings with speculation — a reminder of how serious criminal cases travel through the same meme-and-thread infrastructure as entertainment gossip.",
  highlights: [
    "November 2023: Cassie Ventura filed a civil suit against Combs, settled within days but amplified further claims",
    "March 2024: Homeland Security agents executed searches at Combs properties in New York, Miami, and Los Angeles",
    "September 2024: A federal indictment charged Combs with racketeering conspiracy and sex trafficking",
    "Case generated sustained news and social discourse about power in the music industry",
  ],
  relatedSlugs: ["influencer-culture", "tiktok-rise", "creator-economy", "instagram-culture"],
  media: [
    {
      role: "reference",
      type: "embed",
      url: "https://www.bbc.com/news/articles/clyrvp5vp20o",
      title: "Sean Combs indictment — BBC News",
      source: "BBC News",
      sourceUrl: "https://www.bbc.com/news/articles/clyrvp5vp20o",
      platform: "other",
      attribution: "BBC News",
      description: "Reporting on federal charges against Sean Combs.",
      verified: false,
    },
  ],
  sources: [
    {
      title: "Sean Combs indicted — BBC News",
      url: "https://www.bbc.com/news/articles/clyrvp5vp20o",
      domain: "bbc.com",
    },
    {
      title: "Sean Combs charged — The New York Times",
      url: "https://www.nytimes.com/2024/09/16/arts/music/sean-combs-diddy-charges.html",
      domain: "nytimes.com",
    },
    {
      title: "Sean Combs lawsuit timeline — The Guardian",
      url: "https://www.theguardian.com/music/2024/mar/26/sean-diddy-combs-lawsuits-allegations-timeline",
      domain: "theguardian.com",
    },
  ],
};

export default entry;
