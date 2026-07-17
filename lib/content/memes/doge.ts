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
