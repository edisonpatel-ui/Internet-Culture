/**
 * Curated Gen Alpha / brainrot hub clusters.
 * Only slugs that exist in the live catalog — resolve at render time.
 */

export interface HubCluster {
  title: string;
  description: string;
  slugs: readonly string[];
}

export const BRAINROT_HUB_OVERVIEW =
  "Gen Alpha internet culture — absurdist memes, streamer slang, and the creators who made chaos mainstream. This hub connects brainrot content into one knowledge graph.";

/** Featured cluster sections for /brainrot */
export const BRAINROT_CLUSTERS: readonly HubCluster[] = [
  {
    title: "Core Brainrot Memes",
    description: "The defining formats of Gen Alpha meme culture.",
    slugs: [
      "skibidi-toilet",
      "ohio-final-boss",
      "chicken-jockey",
      "npc-streaming",
      "tung-tung-tung-sahur",
    ],
  },
  {
    title: "Gen Alpha & Streamer Slang",
    description: "Words that traveled from Discord, Twitch, and TikTok into everyday speech.",
    slugs: [
      "brainrot",
      "rizz",
      "gyatt",
      "sigma",
      "aura",
      "fanum-tax",
      "glazing",
      "npc",
    ],
  },
  {
    title: "Creators & Collectives",
    description: "People and groups who popularized the culture.",
    slugs: ["kai-cenat", "amp", "dafuq-boom", "duke-dennis"],
  },
  {
    title: "Context & Era",
    description: "Platform shifts and moments that set the stage.",
    slugs: [
      "great-meme-reset",
      "short-form-takeover",
      "tiktok-rise",
      "minecraft-movie-premiere",
    ],
  },
];
