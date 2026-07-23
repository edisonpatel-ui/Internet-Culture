import type { MemeEntry } from "@/types";

const entry: MemeEntry = {
  id: "m135",
  slug: "crumbl-cookie",
  title: "Crumbl Cookie",
  category: "meme",
  description:
    "The TikTok-era Crumbl cookie hype cycle — weekly menu drops, long lines, and dupe discourse that turned a bakery into a meme brand.",
  imageGradient: "from-pink-300 via-rose-200 to-amber-100",
  scores: { relevance: 58, influence: 52, cringe: 42, brainrot: 55 },
  addedAt: "2026-07-23",
  historicalDate: "2020-01-01",
  views: 1900000,
  trendDirection: "stable",
  tags: ["tiktok", "food", "brand", "hype", "dupe", "2020s"],
  meaning:
    "Memes about Crumbl Cookies — oversized rotating flavors, review TikToks, queue brags, and backlash ('it's just a cookie'). The brand became a symbol of algorithm-driven food hype: filming the pink box opening, rating weekly drops, and debating whether any cookie deserves a two-hour wait.",
  origin:
    "Crumbl Cookies expanded rapidly from Utah starting in 2017, but its meme status crystallized during 2020–2022 TikTok when weekly flavor announcements drove ritual unboxing videos. Know Your Meme and food-media coverage note how Crumbl sat at the center of 'dupe' culture — fans recreating flavors at home while critics mocked the frenzy. The meme is the social performance around the product as much as the cookie itself.",
  timeline: [
    { date: "2017", event: "Crumbl Cookies founded; rapid franchise expansion begins" },
    { date: "2020–2021", event: "TikTok unboxing and review format drives mainstream hype" },
    { date: "2022–2023", event: "Backlash and dupe-recipe trend peak alongside fan devotion" },
    { date: "2024+", event: "Settles into recognizable 'Crumbl review' meme vocabulary" },
  ],
  examples: [
    "TikTok split-screen: Crumbl line vs 'homemade dupe' in twenty minutes",
    "Ironically rating a basic chocolate chip like a wine critic",
    "Meme about weekly menu FOMO when friends post the pink box",
  ],
  relatedSlugs: ["dupe-economy", "salt-bae", "hydro-flask", "prime-hydration"],
  relationships: {
    relatedEvent: ["dupe-economy"],
    sameEra: ["hydro-flask", "prime-hydration"],
  },
  media: [
    {
      role: "reference",
      type: "embed",
      url: "https://knowyourmeme.com/memes/crumbl-cookies",
      title: "Crumbl Cookies — Know Your Meme",
      source: "Know Your Meme",
      sourceUrl: "https://knowyourmeme.com/memes/crumbl-cookies",
      platform: "knowyourmeme",
      attribution: "Know Your Meme / Literally Media",
      description: "TikTok hype and review-culture documentation.",
      verified: false,
    },
    {
      role: "reference",
      type: "embed",
      url: "https://en.wikipedia.org/wiki/Crumbl_Cookies",
      title: "Crumbl Cookies — Wikipedia",
      source: "Wikipedia",
      sourceUrl: "https://en.wikipedia.org/wiki/Crumbl_Cookies",
      platform: "other",
      attribution: "Wikipedia contributors",
      license: "CC BY-SA 4.0",
      description: "Company background for the viral bakery brand.",
      verified: false,
    },
  ],
  sources: [
    {
      title: "Crumbl Cookies — Know Your Meme",
      url: "https://knowyourmeme.com/memes/crumbl-cookies",
      domain: "knowyourmeme.com",
    },
    {
      title: "Crumbl Cookies — Wikipedia",
      url: "https://en.wikipedia.org/wiki/Crumbl_Cookies",
      domain: "en.wikipedia.org",
    },
  ],
};

export default entry;
