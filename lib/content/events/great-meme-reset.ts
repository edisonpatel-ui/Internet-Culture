import type { EventEntry } from "@/types";

const entry: EventEntry = {
  id: "e13",
  slug: "great-meme-reset",
  title: "The Great Meme Reset",
  category: "event",
  description:
    "During the 2020 COVID-19 lockdowns, many pre-pandemic meme formats faded while TikTok-native and Gen Z formats rose — a widely discussed turnover in what felt funny online.",
  imageGradient: "from-gray-600 via-slate-500 to-zinc-700",
  scores: { relevance: 47, influence: 72, cringe: 35, brainrot: 38 },
  addedAt: "2026-07-17",
  historicalDate: "2020-03-15",
  views: 1200000,
  trendDirection: "stable",
  tags: ["covid", "2020", "meme-culture", "tiktok", "gen-z", "internet-history"],
  platform: "TikTok, Twitter, Reddit, YouTube",
  impact:
    "The 2020 lockdowns forced billions online simultaneously, compressing years of cultural evolution into months. Gen Z — already the primary creators on TikTok — became the dominant force in internet humor. Millennial meme formats (irony, wojak, stock photo macros) gave way to surreal, absurdist, and deeply niche content. The 'cursed' and 'brainrot' aesthetics rose to prominence. Traditional meme archives lost relevance as TikTok's audio-visual format became the primary meme medium.",
  highlights: [
    "TikTok gained 315 million downloads in Q1 2020 alone — the most for any app in a single quarter",
    "Reddit's r/memes and r/dankmemes shifted dramatically toward Gen Z humor patterns",
    "Millennial nostalgia memes ('early 2010s internet' content) emerged as a counterreaction",
    "YouTube's algorithm shifted toward longer-form commentary and 'essayist' content",
    "NFT meme speculation briefly made meme ownership a financial phenomenon (2021 follow-on)",
    "TikTok audio-driven meme formats replaced image macros as the dominant meme medium",
    "Brainrot and absurdist content ('Italian Brainrot,' 'NPC streaming') had their roots in this era",
  ],
  relatedSlugs: [
    "brainrot",
    "among-us-era",
    "coffin-dance",
    "tiktok-rise",
    "short-form-takeover",
    "sus",
  ],
  relationships: {
    relatedSlang: ["brainrot", "sus"],
    sameEra: ["among-us-era", "coffin-dance", "tiktok-rise"],
  },
  // DEFINING VISUAL PASS — HERO EMPTY:
  // Target: a period-defining 2020 meme-culture still (not a single app icon).
  // Removed TikTok_app.jpg — same branding as TikTok Rise / Short-Form; platform
  // proxy ≠ the cultural-period event. Sources checked: Wikimedia (lockdown posters,
  // TikTok logos — none depict the meme shift), The Atlantic article (text, no CC
  // image), Know Your Meme era docs, Wikipedia COVID culture pages. Substitutes
  // (TikTok icon, generic mask stock, Reddit alien) would be misleading platform/
  // pandemic stock rather than the meme-format reset.
  media: [
    {
      role: "reference",
      type: "embed",
      url: "https://www.theatlantic.com/culture/archive/2020/04/coronavirus-memes/609813/",
      title: "How COVID-19 Changed Meme Culture — The Atlantic",
      source: "The Atlantic",
      sourceUrl: "https://www.theatlantic.com/culture/archive/2020/04/coronavirus-memes/609813/",
      platform: "other",
      attribution: "The Atlantic",
      description: "Contemporary reporting on how the pandemic reshaped meme culture.",
      date: "2020",
      verified: true,
    },
  ],
  sources: [
    {
      title: "How COVID-19 Changed Meme Culture — The Atlantic",
      url: "https://www.theatlantic.com/culture/archive/2020/04/coronavirus-memes/609813/",
      domain: "theatlantic.com",
    },
    {
      title: "TikTok Q1 2020 Downloads — Sensor Tower",
      url: "https://sensortower.com/blog/tiktok-downloads-q1-2020",
      domain: "sensortower.com",
    },
  ],
};

export default entry;
