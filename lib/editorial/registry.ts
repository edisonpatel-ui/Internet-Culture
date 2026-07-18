/**
 * Internal editorial overrides — keyed by slug.
 *
 * Audit scripts merge these with computed assessments.
 * Keep this file small: only entries that need a human decision recorded.
 *
 * Never import this from UI / client components.
 */

import type { EditorialRegistryEntry } from "./types";

export const EDITORIAL_REGISTRY: Record<string, EditorialRegistryEntry> = {
  // Known concept pairs — keep distinct for now; link via relationships
  sigma: {
    editorialStatus: "needs-review",
    notes: "Overlaps Sigma Grindset — keep slang vs trend distinct; ensure typed links",
  },
  "sigma-grindset": {
    editorialStatus: "needs-review",
    notes: "Pair with slang/sigma via relationships, not a merge unless meanings collapse",
  },
  aura: {
    editorialStatus: "needs-review",
    notes: "Overlaps Aura Farming — slang vs practice",
  },
  "aura-farming": {
    editorialStatus: "needs-review",
    notes: "Pair with slang/aura",
  },
  npc: {
    editorialStatus: "needs-review",
    notes: "Overlaps NPC Streaming — term vs format",
  },
  "npc-streaming": {
    editorialStatus: "needs-review",
    notes: "Pair with slang/npc",
  },
  mogging: {
    editorialStatus: "needs-review",
    notes: "Overlaps Frame-mogging — general vs specific",
  },
  "frame-mogging": {
    editorialStatus: "needs-review",
    notes: "Pair with slang/mogging",
  },
};

export function getEditorialOverride(
  slug: string,
): EditorialRegistryEntry | undefined {
  return EDITORIAL_REGISTRY[slug];
}
