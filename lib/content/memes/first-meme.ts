import type { MemeEntry } from "@/types";

const entry: MemeEntry = {
  id: "m133",
  slug: "first-meme",
  title: "First Meme",
  category: "meme",
  description:
    "The debated hunt for the 'first meme' — from 1920s Expectations vs Reality print cartoons to Dancing Baby, with no single agreed answer.",
  imageGradient: "from-stone-500 via-amber-600 to-yellow-800",
  scores: { relevance: 50, influence: 75, cringe: 15, brainrot: 30 },
  addedAt: "2026-07-23",
  historicalDate: "1921-01-01",
  views: 1200000,
  trendDirection: "stable",
  tags: ["history", "meta", "debate", "1920s", "proto-meme", "expectations-vs-reality"],
  meaning:
    "Not one image but a recurring internet argument: what counts as the first meme? Candidates include pre-internet cartoons that copy a two-panel 'Expectations vs. Reality' joke, early email GIFs like Dancing Baby, and forum catchphrases like All Your Base. The meme is the debate itself — people want a origin story, but memes need copying and variation, not just a single funny picture.",
  origin:
    "BBC Trending investigated a 1921 cartoon in satirical magazine The Judge (reprinted from the Wisconsin Octopus) showing a two-panel Expectations vs. Reality gag. Researchers found an earlier version in 1919–1920 using the same template — copied and remixed in print, which fits Richard Dawkins's 'meme' idea if not today's image-macro definition. The article stresses one cartoon alone is not a meme until the format spreads with variations — which is why Dancing Baby, Hamster Dance, and forum-era jokes remain separate contenders.",
  timeline: [
    { date: "1919–1920", event: "Wisconsin Octopus prints an Expectations vs. Reality cartoon" },
    { date: "1921", event: "Similar cartoon appears in The Judge; later shared on Tumblr/Twitter" },
    { date: "Apr 2018", event: "BBC Trending article asks if this is the first meme; debate goes viral" },
    { date: "1996–1998", event: "Separate lineage: Dancing Baby email GIF and Hamster Dance web fad" },
    { date: "2000s+", event: "Forum memes (All Your Base, etc.) enter 'first meme' lists" },
  ],
  examples: [
    "Twitter thread arguing 1921 cartoon vs Dancing Baby vs Kilroy",
    "Expectations vs. Reality panel reused with modern caption templates",
    "Documentary-style TikTok listing five 'first meme' candidates with no winner",
  ],
  relatedSlugs: [
    "dancing-baby",
    "hamster-dance",
    "all-your-base-are-belong-to-us",
    "rickroll",
    "numa-numa",
  ],
  relationships: {
    relatedTo: ["dancing-baby", "hamster-dance", "all-your-base-are-belong-to-us"],
    sameEra: ["hamster-dance", "all-your-base-are-belong-to-us"],
  },
  media: [
    {
      role: "reference",
      type: "embed",
      url: "https://www.bbc.com/news/blogs-trending-43783521",
      title: "Is this 1921 cartoon the first ever meme? — BBC Trending",
      source: "BBC News",
      sourceUrl: "https://www.bbc.com/news/blogs-trending-43783521",
      platform: "other",
      attribution: "BBC / Tom Gerken",
      description: "2018 investigation of the 1921 Expectations vs. Reality cartoon debate.",
      date: "2018",
      verified: false,
    },
    {
      role: "reference",
      type: "embed",
      url: "https://en.wikipedia.org/wiki/Meme",
      title: "Meme — Wikipedia",
      source: "Wikipedia",
      sourceUrl: "https://en.wikipedia.org/wiki/Meme",
      platform: "wikimedia",
      attribution: "Wikipedia contributors",
      license: "CC BY-SA 4.0",
      description: "Dawkins definition and internet meme evolution.",
      verified: false,
    },
  ],
  sources: [
    {
      title: "Is this 1921 cartoon the first ever meme? — BBC Trending",
      url: "https://www.bbc.com/news/blogs-trending-43783521",
      domain: "bbc.com",
    },
    {
      title: "Meme — Wikipedia",
      url: "https://en.wikipedia.org/wiki/Meme",
      domain: "en.wikipedia.org",
    },
    {
      title: "Dancing Baby — Know Your Meme",
      url: "https://knowyourmeme.com/memes/dancing-baby",
      domain: "knowyourmeme.com",
    },
  ],
};

export default entry;
