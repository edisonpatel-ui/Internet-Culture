import type { MemeEntry } from "@/types";

const entry: MemeEntry = {
  id: "m1",
  slug: "chicken-jockey",
  title: "Chicken Jockey",
  category: "meme",
  description:
    "A Minecraft movie scene that triggered legendary live-audience reactions worldwide.",
  imageGradient: "from-green-500 via-lime-400 to-yellow-300",
  scores: { relevance: 96, brainrot: 84, cringe: 45 },
  addedAt: "2026-07-12",
  views: 2100000,
  trendDirection: "new",
  meaning:
    "Refers to a brief Minecraft Movie cameo where a baby zombie rides a chicken — audiences screamed, memed, and made it a cultural event.",
  origin:
    "The A Minecraft Movie trailer and early screenings surfaced the chicken jockey mob. TikTok and Twitter amplified theater reaction compilations within hours.",
  timeline: [
    { date: "Mar 2025", event: "First trailer teases chicken jockey mob" },
    { date: "Apr 2026", event: "Opening weekend reactions flood social media" },
    { date: "Jul 2026", event: "Peak meme saturation — remixes and cosplay" },
  ],
  examples: [
    "Bro stood up in IMAX for a 3-second chicken jockey 💀",
    "My theater went feral — full chicken jockey standing ovation",
    "POV: you're the chicken jockey of your friend group",
  ],
  relatedSlugs: ["ohio-final-boss", "skibidi-toilet"],
  affiliateProduct: {
    name: "Minecraft Plush Chicken",
    description: "Collectible plush — affiliate link coming soon.",
    priceLabel: "$24.99",
  },
  media: [
    // Official Warner Bros. Chicken Jockey movie clip — oembed + hqdefault verified.
    {
      role: "featured",
      type: "image",
      url: "https://i.ytimg.com/vi/EY4h38NaXwU/hqdefault.jpg",
      title: "A Minecraft Movie — Chicken Jockey clip thumbnail",
      source: "YouTube / Warner Bros. Entertainment",
      sourceUrl: "https://www.youtube.com/watch?v=EY4h38NaXwU",
      platform: "youtube",
      attribution: "Warner Bros. Entertainment",
      license: "YouTube Standard License",
      description:
        "Official Warner Bros. movie-clip thumbnail for the Chicken Jockey scene that drove theater reaction memes.",
      date: "2025",
      verified: true,
    },
    {
      role: "video",
      type: "video",
      url: "https://www.youtube.com/watch?v=EY4h38NaXwU",
      title: "A Minecraft Movie | Chicken Jockey | Movie Clip",
      source: "YouTube / Warner Bros. Entertainment",
      sourceUrl: "https://www.youtube.com/watch?v=EY4h38NaXwU",
      platform: "youtube",
      attribution: "Warner Bros. Entertainment",
      license: "YouTube Standard License",
      description:
        "Official Warner Bros. Chicken Jockey clip from A Minecraft Movie — the defining visual of the meme.",
      date: "2025",
      verified: true,
    },
  ],
  sources: [
    {
      title: "Chicken Jockey — Know Your Meme",
      url: "https://knowyourmeme.com/memes/chicken-jockey",
      domain: "knowyourmeme.com",
    },
    {
      title: "A Minecraft Movie — Official Site",
      url: "https://www.minecraftmovie.com",
      domain: "minecraftmovie.com",
    },
  ],
};

export default entry;
