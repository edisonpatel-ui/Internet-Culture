import type { MemeEntry } from "@/types";

const entry: MemeEntry = {
  id: "m7",
  slug: "doge",
  title: "Doge",
  category: "meme",
  description:
    "The iconic Shiba Inu meme that defined an era — 'such wow, very internet' — and eventually inspired a cryptocurrency.",
  imageGradient: "from-yellow-400 via-amber-500 to-orange-400",
  scores: { relevance: 72, brainrot: 45, cringe: 22 },
  addedAt: "2026-07-16",
  views: 3800000,
  trendDirection: "stable",
  meaning:
    "A photo of Kabosu, a Shiba Inu dog, captioned with broken-English internal monologue in Comic Sans — 'such wow,' 'very internet,' 'much meme.' One of the most replicated meme formats in history.",
  origin:
    "Kabosu was photographed by owner Atsuko Sato in 2010. The image surfaced on Tumblr in 2012, then exploded on Reddit and 4chan in late 2013, spawning thousands of variations.",
  timeline: [
    { date: "2010", event: "Kabosu photographed by owner Atsuko Sato in Japan" },
    { date: "2012", event: "Image spreads on Tumblr under the 'Doge' label" },
    { date: "Oct 2013", event: "'Such wow' format peaks on Reddit — mainstream awareness" },
    { date: "Dec 2013", event: "Dogecoin cryptocurrency launched, inspired by the meme" },
    { date: "May 2024", event: "Kabosu passes away — internet mourns the original Doge" },
  ],
  examples: [
    "Such code. Very deploy. Wow.",
    "Much presentation. So slides. Very professional.",
    "Many coins. Such investment. Very to the moon.",
  ],
  relatedSlugs: ["rickroll", "nyan-cat"],
  media: [
    {
      role: "featured",
      type: "image",
      url: "https://upload.wikimedia.org/wikipedia/en/5/5f/Original_Doge_meme.jpg",
      title: "Original Doge meme — Kabosu (2010)",
      source: "Wikimedia / Wikipedia",
      sourceUrl: "https://en.wikipedia.org/wiki/File:Original_Doge_meme.jpg",
      platform: "wikimedia",
      attribution: "Photo by Atsuko Sato (2010)",
      license: "Fair use",
      description: "The original Kabosu photo by Atsuko Sato — the image that became one of the most replicated meme formats in internet history.",
      date: "2010",
      verified: true,
    },
    {
      role: "reference",
      type: "embed",
      url: "https://knowyourmeme.com/memes/doge",
      title: "Doge — Know Your Meme",
      source: "Know Your Meme",
      sourceUrl: "https://knowyourmeme.com/memes/doge",
      platform: "knowyourmeme",
      attribution: "Know Your Meme / Literally Media",
      description: "Comprehensive Doge documentation including format history, spread analysis, and cultural impact.",
      date: "2010",
      verified: true,
    },
  ],
  sources: [
    {
      title: "Doge — Know Your Meme",
      url: "https://knowyourmeme.com/memes/doge",
      domain: "knowyourmeme.com",
    },
    {
      title: "Doge — Wikipedia",
      url: "https://en.wikipedia.org/wiki/Doge_(meme)",
      domain: "en.wikipedia.org",
    },
  ],
};

export default entry;
