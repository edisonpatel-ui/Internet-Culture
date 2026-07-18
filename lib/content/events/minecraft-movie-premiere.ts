import type { EventEntry } from "@/types";

const entry: EventEntry = {
  id: "e2",
  slug: "minecraft-movie-premiere",
  title: "Minecraft Movie Premiere",
  category: "event",
  description:
    "The A Minecraft Movie opening weekend became a live theatrical meme event — audiences went feral for the Chicken Jockey.",
  imageGradient: "from-green-500 via-lime-400 to-yellow-300",
  scores: { relevance: 94, influence: 94, cringe: 40, brainrot: 82 },
  addedAt: "2026-07-12",
  views: 1800000,
  trendDirection: "new",
  platform: "Theaters, TikTok, YouTube",
  impact:
    "Redefined the movie premiere experience for Gen Alpha. Theater reaction compilations became their own genre of content, spawning a new form of participatory cinema.",
  highlights: [
    "Theater audiences screaming, standing, and throwing popcorn at the Chicken Jockey scene",
    "IMAX screenings sold out in minutes across multiple cities",
    "TikTok compilations of theater reactions hit 500M+ total views",
    "'Chicken Jockey' became the shorthand for unexpected viral cinema moments",
  ],
  relatedSlugs: [
    "chicken-jockey",
    "skibidi-toilet",
    "brainrot",
    "dream",
    "tiktok-rise",
  ],
  relationships: {
    relatedTo: ["chicken-jockey", "skibidi-toilet", "brainrot"],
    community: ["dream"],
    sameEra: ["tiktok-rise"],
  },
  tags: ["minecraft", "movie", "cinema", "gen alpha", "jack black"],
  media: [
    // Official WB movie trailer — premiere/promotional identity for the event.
    {
      role: "featured",
      type: "image",
      url: "https://i.ytimg.com/vi/wJO_vIDZn-I/hqdefault.jpg",
      title: "A Minecraft Movie — Official Trailer thumbnail",
      source: "YouTube / Warner Bros.",
      sourceUrl: "https://www.youtube.com/watch?v=wJO_vIDZn-I",
      platform: "youtube",
      attribution: "Warner Bros. Pictures",
      license: "YouTube Standard License",
      description:
        "Official Warner Bros. trailer thumbnail for A Minecraft Movie — the promotional face of the premiere event.",
      date: "2024-11-19",
      verified: true,
    },
    {
      role: "video",
      type: "video",
      url: "https://www.youtube.com/watch?v=wJO_vIDZn-I",
      title: "A Minecraft Movie | Official Trailer",
      source: "YouTube / Warner Bros.",
      sourceUrl: "https://www.youtube.com/watch?v=wJO_vIDZn-I",
      platform: "youtube",
      attribution: "Warner Bros. Pictures",
      license: "YouTube Standard License",
      description: "Official theatrical trailer for A Minecraft Movie.",
      date: "2024-11-19",
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
        "Official Chicken Jockey clip — the scene that turned opening weekend into a live meme event.",
      date: "2025",
      verified: true,
    },
  ],
  sources: [
    {
      title: "A Minecraft Movie — Wikipedia",
      url: "https://en.wikipedia.org/wiki/A_Minecraft_Movie",
      domain: "en.wikipedia.org",
    },
  ],
};

export default entry;
