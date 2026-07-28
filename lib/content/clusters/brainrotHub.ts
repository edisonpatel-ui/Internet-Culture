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
  "A guide to things on the Internet target to Gen Alpha - absurd memes, slang, and the creators who made mainstream chaos.";

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
      "crash-out",
      "locked-in",
      "npc",
    ],
  },
  {
    title: "Looksmaxxing Culture",
    description: "Appearance-optimization slang and related irony.",
    slugs: ["mewing", "looksmaxxing", "sigma", "mogging"],
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
