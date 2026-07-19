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
  geeg: {
    editorialStatus: "needs-review",
    significanceLevel: "questionable",
    notes: "Niche GG variant — keep as upcoming slang; do not conflate with EZ",
  },
  "imagine-if-ninja-got-a-low-taper-fade": {
    editorialStatus: "strong",
    notes:
      "Canonical low-taper article — aliases cover Still Massive / Low Taper Fade Meme",
  },
  "hamster-dance": {
    significanceLevel: "landmark",
    notes: "Proto-meme / GeoCities era — aliases cover Hampster spelling",
  },
  "numa-numa": {
    significanceLevel: "landmark",
  },
  gg: {
    significanceLevel: "landmark",
    notes: "Canonical GG slang — Geeg is niche variant; EZ is related taunt",
  },
  "star-wars-kid": {
    editorialStatus: "needs-review",
    significanceLevel: "landmark",
    notes: "Sensitive cyberbullying history — keep encyclopedia tone",
  },
  "afro-ninja": {
    editorialStatus: "strong",
    notes:
      "TITLE_SIMILARITY vs creator/ninja is a false positive — fail video ≠ Tyler Blevins",
  },
  "charlie-bit-my-finger": {
    editorialStatus: "strong",
    significanceLevel: "landmark",
    notes:
      "Distinct from Charlie the Unicorn — YouTube home video ≠ FilmCow animation",
  },
  "charlie-the-unicorn": {
    notes: "Keep distinct from Charlie Bit My Finger",
  },
  shoes: {
    editorialStatus: "strong",
    notes: "Canonical title Shoes = Kelly / Liam Kyle Sullivan viral — not footwear slang",
  },
  "musical-ly": {
    editorialStatus: "strong",
    notes: "Platform article distinct from tiktok-rise — link, do not merge",
  },
  "4chan": {
    significanceLevel: "landmark",
  },
  myspace: {
    significanceLevel: "landmark",
  },
  tumblr: {
    significanceLevel: "landmark",
  },
  newgrounds: {
    significanceLevel: "landmark",
  },
  "old-money": {
    editorialStatus: "strong",
    notes:
      "Canonical for Quiet Luxury / stealth wealth — do not split Quiet Luxury into a second article",
  },
  "dupe-economy": {
    editorialStatus: "strong",
    notes:
      "Covers Dupe culture + Stanley Cup craze as defining product moment — aliases point here",
  },
  "streamer-culture": {
    editorialStatus: "strong",
    notes: "Canonical for Twitch culture + streamer culture — one article",
  },
  "influencer-culture": {
    editorialStatus: "needs-review",
    notes: "Keep distinct from influencer-marketing (culture vs ad practice)",
  },
  "influencer-marketing": {
    editorialStatus: "needs-review",
    notes: "Keep distinct from influencer-culture — typed links required",
  },
  "tiktok-rise": {
    notes: "Aliases cover 'TikTok culture' — no separate TikTok culture page",
  },
};

export function getEditorialOverride(
  slug: string,
): EditorialRegistryEntry | undefined {
  return EDITORIAL_REGISTRY[slug];
}
