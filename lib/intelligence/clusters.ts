/**
 * Cultural cluster definitions (Phase 7B — internal).
 *
 * Clusters group entries by meaningful cultural neighborhoods.
 * Used by recommendation / coverage tooling — not public UI filters.
 */

import type { OriginPlatform } from "@/types";

export type CulturalClusterId =
  | "classic-internet"
  | "gaming-culture"
  | "creator-economy"
  | "brainrot-culture"
  | "tiktok-culture"
  | "youtube-culture"
  | "streaming-culture"
  | "animal-memes";

export interface CulturalCluster {
  id: CulturalClusterId;
  label: string;
  description: string;
  /** Hard members (canonical anchor slugs). */
  memberSlugs: readonly string[];
  /** Case-insensitive signal / category substrings for soft membership. */
  matchSignals: readonly string[];
  matchPlatforms?: readonly OriginPlatform[];
  matchTags?: readonly string[];
}

export const CULTURAL_CLUSTERS: readonly CulturalCluster[] = [
  {
    id: "classic-internet",
    label: "Classic Internet",
    description:
      "Early-web and Web 2.0 foundational memes, viral videos, and imageboard grammar.",
    memberSlugs: [
      "doge",
      "pepe",
      "wojak",
      "rickroll",
      "numa-numa",
      "hamster-dance",
      "all-your-base-are-belong-to-us",
      "4chan",
      "newgrounds",
      "myspace",
    ],
    matchSignals: ["classic meme", "early internet", "imageboard", "classic internet"],
    matchPlatforms: ["4chan", "newgrounds", "myspace"],
    matchTags: ["classic", "early internet"],
  },
  {
    id: "gaming-culture",
    label: "Gaming Culture",
    description:
      "Games, gaming slang, and memes born from play sessions and esports chat.",
    memberSlugs: [
      "leeroy-jenkins",
      "gg",
      "ez",
      "git-gud",
      "noob",
      "lag",
      "the-cake-is-a-lie",
      "press-f-to-pay-respects",
      "among-us-era",
      "can-it-run-crysis",
    ],
    matchSignals: ["gaming", "esports", "gaming slang", "gaming culture"],
    matchTags: ["gaming", "esports"],
  },
  {
    id: "creator-economy",
    label: "Creator Economy",
    description:
      "Monetized audience-building — YouTube/TikTok/Twitch careers and influencer systems.",
    memberSlugs: [
      "creator-economy",
      "influencer-culture",
      "influencer-marketing",
      "mrbeast",
      "kai-cenat",
      "pewdiepie",
      "youtube-creator-era",
      "unboxing-culture",
    ],
    matchSignals: ["creator economy", "monetization", "influencer"],
    matchTags: ["creator", "influencer", "monetization"],
  },
  {
    id: "brainrot-culture",
    label: "Brainrot Culture",
    description:
      "Absurdist Gen Alpha / short-form chaos — Skibidi-tier mythology and slang.",
    memberSlugs: [
      "skibidi-toilet",
      "brainrot",
      "ohio-final-boss",
      "tung-tung-tung-sahur",
      "chicken-jockey",
      "dafuq-boom",
    ],
    matchSignals: ["brainrot", "gen alpha"],
    matchTags: ["brainrot", "gen alpha"],
  },
  {
    id: "tiktok-culture",
    label: "TikTok Culture",
    description:
      "Algorithmic short-form taste, sounds, aesthetics, and TikTok-native slang.",
    memberSlugs: [
      "tiktok-rise",
      "musical-ly",
      "short-form-takeover",
      "demure-mindful",
      "performative",
      "rizz",
    ],
    matchSignals: ["tiktok", "short-form video", "algorithm culture"],
    matchPlatforms: ["tiktok"],
    matchTags: ["tiktok", "short-form"],
  },
  {
    id: "youtube-culture",
    label: "YouTube Culture",
    description:
      "YouTube as cultural OS — viral videos, creator celebrities, Rewind eras.",
    memberSlugs: [
      "youtube-creator-era",
      "youtube-rewind",
      "mrbeast",
      "pewdiepie",
      "charlie-bit-my-finger",
      "annoying-orange",
      "rickroll",
    ],
    matchSignals: ["youtube", "youtube shorts", "youtuber"],
    matchPlatforms: ["youtube", "youtube-shorts"],
    matchTags: ["youtube"],
  },
  {
    id: "streaming-culture",
    label: "Streaming Culture",
    description:
      "Live performance culture — Twitch/Kick chats, streamers, raids, emotes.",
    memberSlugs: [
      "streamer-culture",
      "kai-cenat",
      "xqc",
      "ninja",
      "amp",
      "npc-streaming",
      "gg",
    ],
    matchSignals: ["streaming", "twitch", "streamer"],
    matchPlatforms: ["twitch"],
    matchTags: ["twitch", "streaming"],
  },
  {
    id: "animal-memes",
    label: "Animal Memes",
    description:
      "Cats, dogs, and creature macros that became internet vernacular.",
    memberSlugs: [
      "doge",
      "cheems",
      "longcat",
      "ceiling-cat",
      "grumpy-cat",
      "nyan-cat",
      "popcat",
      "keyboard-cat",
    ],
    matchSignals: ["animal-meme", "shiba", "cat meme", "animal meme"],
    matchTags: ["animals", "cats", "dogs"],
  },
];

export const CLUSTER_LABELS: Record<CulturalClusterId, string> = Object.fromEntries(
  CULTURAL_CLUSTERS.map((c) => [c.id, c.label]),
) as Record<CulturalClusterId, string>;

export interface ClusterMembershipInput {
  slug: string;
  tags?: readonly string[];
  signals?: readonly string[];
  platforms?: readonly string[];
  culturalCategory?: readonly string[];
}

/**
 * Resolve cluster IDs for an entry from hard members + soft signal/platform/tag matches.
 * Requires at least one hard member hit OR two soft signals to avoid weak filler.
 */
export function resolveClusterIds(input: ClusterMembershipInput): CulturalClusterId[] {
  const slug = input.slug;
  const tags = (input.tags ?? []).map((t) => t.toLowerCase());
  const signals = (input.signals ?? []).map((s) => s.toLowerCase());
  const platforms = (input.platforms ?? []).map((p) => p.toLowerCase());
  const categories = (input.culturalCategory ?? []).map((c) => c.toLowerCase());
  const haystack = [...signals, ...categories, ...tags].join(" | ");

  const out: CulturalClusterId[] = [];

  for (const cluster of CULTURAL_CLUSTERS) {
    if (cluster.memberSlugs.includes(slug)) {
      out.push(cluster.id);
      continue;
    }

    let soft = 0;
    for (const sig of cluster.matchSignals) {
      if (haystack.includes(sig.toLowerCase())) soft += 1;
    }
    for (const platform of cluster.matchPlatforms ?? []) {
      if (platforms.includes(platform)) soft += 1;
    }
    for (const tag of cluster.matchTags ?? []) {
      if (tags.includes(tag.toLowerCase())) soft += 1;
    }

    // Soft membership needs stronger evidence than a single tag echo
    if (soft >= 2) out.push(cluster.id);
  }

  return out;
}

export function sharedClusterIds(
  a: ClusterMembershipInput,
  b: ClusterMembershipInput,
): CulturalClusterId[] {
  const setB = new Set(resolveClusterIds(b));
  return resolveClusterIds(a).filter((id) => setB.has(id));
}

export function getClusterById(id: CulturalClusterId): CulturalCluster | undefined {
  return CULTURAL_CLUSTERS.find((c) => c.id === id);
}
