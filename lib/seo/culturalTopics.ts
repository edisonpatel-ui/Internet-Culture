import type { BaseEntry } from "@/types";
import { getDetailHref } from "@/lib/utils";

export interface CulturalTopicLink {
  href: string;
  label: string;
}

/**
 * Curated cultural topic bridges for SEO internal linking.
 * Only real relationships — resolved against the live catalog when a slug is used.
 * Do not invent pages; path-only hubs must be real category routes.
 */
const CURATED_TOPICS: Record<
  string,
  Array<{ label: string; slug?: string; path?: string }>
> = {
  "skibidi-toilet": [
    { label: "Brainrot", slug: "brainrot" },
    { label: "DaFuq!?Boom!", slug: "dafuq-boom" },
    { label: "Short-form video culture", slug: "short-form-takeover" },
    { label: "Ohio Final Boss", slug: "ohio-final-boss" },
  ],
  gyatt: [
    { label: "Rizz", slug: "rizz" },
    { label: "Fanum Tax", slug: "fanum-tax" },
    { label: "Gen Alpha slang", path: "/slang" },
    { label: "Twitch creators", path: "/creators" },
  ],
  rizz: [
    { label: "Gyatt", slug: "gyatt" },
    { label: "Kai Cenat", slug: "kai-cenat" },
    { label: "Internet slang", path: "/slang" },
  ],
  "fanum-tax": [
    { label: "Rizz", slug: "rizz" },
    { label: "Gyatt", slug: "gyatt" },
    { label: "Kai Cenat", slug: "kai-cenat" },
  ],
  brainrot: [
    { label: "Skibidi Toilet", slug: "skibidi-toilet" },
    { label: "NPC Streaming", slug: "npc-streaming" },
    { label: "Memes", path: "/memes" },
  ],
  "sigma-grindset": [
    { label: "Sigma", slug: "sigma" },
    { label: "Looksmaxxing", slug: "looksmaxxing" },
    { label: "Mewing", slug: "mewing" },
  ],
  doge: [
    { label: "Classic memes", path: "/memes" },
    { label: "Rickroll", slug: "rickroll" },
    { label: "Nyan Cat", slug: "nyan-cat" },
  ],
  "harlem-shake": [
    { label: "Viral video events", path: "/events" },
    { label: "Gangnam Style", slug: "gangnam-style" },
    { label: "Ice Bucket Challenge", slug: "ice-bucket-challenge" },
  ],
  "kai-cenat": [
    { label: "Rizz", slug: "rizz" },
    { label: "Fanum Tax", slug: "fanum-tax" },
    { label: "Streamers", path: "/creators" },
  ],
  "dafuq-boom": [
    { label: "Skibidi Toilet", slug: "skibidi-toilet" },
    { label: "Brainrot", slug: "brainrot" },
    { label: "YouTube creators", path: "/creators" },
  ],
  "brat-summer": [
    { label: "Slay", slug: "slay" },
    { label: "Delulu", slug: "delulu" },
    { label: "Cultural events", path: "/events" },
  ],
  "short-form-takeover": [
    { label: "TikTok Rise", slug: "tiktok-rise" },
    { label: "Vine Shutdown", slug: "vine-shutdown" },
    { label: "Skibidi Toilet", slug: "skibidi-toilet" },
  ],
};

/** Category hubs that reinforce topical clusters without random linking. */
function categoryHubs(entry: BaseEntry): CulturalTopicLink[] {
  switch (entry.category) {
    case "meme":
      return [
        { href: "/memes", label: "All Memes" },
        { href: "/trending", label: "Trending" },
        { href: "/creators", label: "Creators" },
      ];
    case "slang":
      return [
        { href: "/slang", label: "All Slang" },
        { href: "/brainrot", label: "Brainrot" },
        { href: "/creators", label: "Creators" },
      ];
    case "event":
      return [
        { href: "/events", label: "All Events" },
        { href: "/trending", label: "Trending" },
        { href: "/memes", label: "Memes" },
      ];
    case "creator":
      return [
        { href: "/creators", label: "All Creators" },
        { href: "/memes", label: "Memes" },
        { href: "/slang", label: "Slang" },
      ];
    case "trend":
      return [
        { href: "/trending", label: "All Trends" },
        { href: "/memes", label: "Memes" },
        { href: "/slang", label: "Slang" },
      ];
    default:
      return [
        { href: "/trending", label: "Trending" },
        { href: "/memes", label: "Memes" },
      ];
  }
}

/**
 * Build cultural topic links for an entry:
 * 1) Curated bridges (slug-resolved against catalog)
 * 2) relatedSlugs resolved to real entries
 * 3) Category hubs
 */
export function getCulturalTopicLinks(
  entry: BaseEntry,
  catalog: readonly BaseEntry[],
  limit = 8,
): CulturalTopicLink[] {
  const bySlug = new Map(catalog.map((e) => [e.slug, e]));
  const seen = new Set<string>([
    getDetailHref(entry.category, entry.slug),
    `/trending/${entry.slug}`,
  ]);
  const out: CulturalTopicLink[] = [];

  const push = (href: string, label: string) => {
    if (seen.has(href) || out.length >= limit) return;
    seen.add(href);
    out.push({ href, label });
  };

  for (const topic of CURATED_TOPICS[entry.slug] ?? []) {
    if (topic.path) {
      push(topic.path, topic.label);
      continue;
    }
    if (topic.slug) {
      const target = bySlug.get(topic.slug);
      if (target) {
        push(getDetailHref(target.category, target.slug), topic.label);
      }
    }
  }

  for (const slug of entry.relatedSlugs ?? []) {
    const target = bySlug.get(slug);
    if (!target || target.slug === entry.slug) continue;
    push(getDetailHref(target.category, target.slug), target.title);
  }

  for (const hub of categoryHubs(entry)) {
    push(hub.href, hub.label);
  }

  return out.slice(0, limit);
}
