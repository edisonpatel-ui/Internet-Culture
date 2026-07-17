import type { EventEntry } from "@/types";

const entry: EventEntry = {
  id: "e2",
  slug: "minecraft-movie-premiere",
  title: "Minecraft Movie Premiere",
  category: "event",
  description:
    "The A Minecraft Movie opening weekend became a live theatrical meme event — audiences went feral for the Chicken Jockey.",
  imageGradient: "from-green-500 via-lime-400 to-yellow-300",
  scores: { relevance: 94, brainrot: 82, cringe: 40 },
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
  relatedSlugs: ["chicken-jockey", "skibidi-toilet"],
  tags: ["minecraft", "movie", "cinema", "gen alpha", "jack black"],
  sources: [
    {
      title: "A Minecraft Movie — Wikipedia",
      url: "https://en.wikipedia.org/wiki/A_Minecraft_Movie",
      domain: "en.wikipedia.org",
    },
  ],
};

export default entry;
