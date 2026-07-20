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
    { label: "Brainrot Hub", path: "/brainrot" },
    { label: "Brainrot", slug: "brainrot" },
    { label: "DaFuq!?Boom!", slug: "dafuq-boom" },
    { label: "Ohio Final Boss", slug: "ohio-final-boss" },
    { label: "Gen Alpha culture", path: "/brainrot" },
    { label: "Short-form video", slug: "short-form-takeover" },
  ],
  gyatt: [
    { label: "Rizz", slug: "rizz" },
    { label: "Fanum Tax", slug: "fanum-tax" },
    { label: "Kai Cenat", slug: "kai-cenat" },
    { label: "Brainrot Hub", path: "/brainrot" },
    { label: "Internet slang", path: "/slang" },
  ],
  rizz: [
    { label: "Gyatt", slug: "gyatt" },
    { label: "Kai Cenat", slug: "kai-cenat" },
    { label: "AMP", slug: "amp" },
    { label: "Brainrot Hub", path: "/brainrot" },
    { label: "Internet slang", path: "/slang" },
  ],
  "fanum-tax": [
    { label: "Rizz", slug: "rizz" },
    { label: "Gyatt", slug: "gyatt" },
    { label: "Kai Cenat", slug: "kai-cenat" },
    { label: "AMP", slug: "amp" },
  ],
  brainrot: [
    { label: "Brainrot Hub", path: "/brainrot" },
    { label: "Skibidi Toilet", slug: "skibidi-toilet" },
    { label: "Ohio Final Boss", slug: "ohio-final-boss" },
    { label: "NPC Streaming", slug: "npc-streaming" },
    { label: "Memes", path: "/memes" },
  ],
  sigma: [
    { label: "Sigma Grindset", slug: "sigma-grindset" },
    { label: "Aura", slug: "aura" },
    { label: "Brainrot Hub", path: "/brainrot" },
    { label: "Internet slang", path: "/slang" },
  ],
  aura: [
    { label: "Sigma", slug: "sigma" },
    { label: "Rizz", slug: "rizz" },
    { label: "Brainrot Hub", path: "/brainrot" },
  ],
  "ohio-final-boss": [
    { label: "Skibidi Toilet", slug: "skibidi-toilet" },
    { label: "Brainrot", slug: "brainrot" },
    { label: "Brainrot Hub", path: "/brainrot" },
    { label: "Chicken Jockey", slug: "chicken-jockey" },
    { label: "Tung Tung Tung Sahur", slug: "tung-tung-tung-sahur" },
  ],
  "chicken-jockey": [
    { label: "Minecraft Movie Premiere", slug: "minecraft-movie-premiere" },
    { label: "Brainrot Hub", path: "/brainrot" },
    { label: "Skibidi Toilet", slug: "skibidi-toilet" },
    { label: "Dream", slug: "dream" },
  ],
  mewing: [
    { label: "Looksmaxxing", slug: "looksmaxxing" },
    { label: "Sigma", slug: "sigma" },
    { label: "Brainrot Hub", path: "/brainrot" },
  ],
  looksmaxxing: [
    { label: "Mewing", slug: "mewing" },
    { label: "Sigma", slug: "sigma" },
    { label: "Mogging", slug: "mogging" },
    { label: "Brainrot Hub", path: "/brainrot" },
  ],
  ishowspeed: [
    { label: "Kai Cenat", slug: "kai-cenat" },
    { label: "Streamers", path: "/creators" },
    { label: "TikTok Rise", slug: "tiktok-rise" },
  ],
  "gta-6-release": [
    { label: "Internet history", path: "/events" },
    { label: "TikTok Rise", slug: "tiktok-rise" },
    { label: "Minecraft Movie Premiere", slug: "minecraft-movie-premiere" },
  ],
  barbenheimer: [
    { label: "Brat Summer", slug: "brat-summer" },
    { label: "Internet history", path: "/events" },
    { label: "Great Meme Reset", slug: "great-meme-reset" },
  ],
  "npc-streaming": [
    { label: "NPC (slang)", slug: "npc" },
    { label: "Brainrot Hub", path: "/brainrot" },
    { label: "TikTok Rise", slug: "tiktok-rise" },
  ],
  "sigma-grindset": [
    { label: "Sigma", slug: "sigma" },
    { label: "Looksmaxxing", slug: "looksmaxxing" },
    { label: "Mewing", slug: "mewing" },
  ],
  doge: [
    { label: "Classic memes", path: "/memes" },
    { label: "2010s internet", path: "/memes" },
    { label: "Rickroll", slug: "rickroll" },
    { label: "Nyan Cat", slug: "nyan-cat" },
  ],
  pewdiepie: [
    { label: "YouTubers", path: "/creators" },
    { label: "Internet history", path: "/events" },
    { label: "Markiplier", slug: "markiplier" },
  ],
  "harlem-shake": [
    { label: "Viral video events", path: "/events" },
    { label: "Gangnam Style", slug: "gangnam-style" },
    { label: "Ice Bucket Challenge", slug: "ice-bucket-challenge" },
  ],
  "kai-cenat": [
    { label: "AMP", slug: "amp" },
    { label: "Fanum Tax", slug: "fanum-tax" },
    { label: "Rizz", slug: "rizz" },
    { label: "Gyatt", slug: "gyatt" },
    { label: "Brainrot Hub", path: "/brainrot" },
    { label: "Streamers", path: "/creators" },
  ],
  amp: [
    { label: "Kai Cenat", slug: "kai-cenat" },
    { label: "Duke Dennis", slug: "duke-dennis" },
    { label: "Fanum Tax", slug: "fanum-tax" },
    { label: "Rizz", slug: "rizz" },
    { label: "Brainrot Hub", path: "/brainrot" },
  ],
  glazing: [
    { label: "Rizz", slug: "rizz" },
    { label: "Simp", slug: "simp" },
    { label: "Kai Cenat", slug: "kai-cenat" },
  ],
  "crash-out": [
    { label: "Cooked", slug: "cooked" },
    { label: "Touch Grass", slug: "touch-grass" },
    { label: "Internet slang", path: "/slang" },
  ],
  "distracted-boyfriend": [
    { label: "Woman Yelling at Cat", slug: "woman-yelling-at-cat" },
    { label: "Expanding Brain", slug: "expanding-brain" },
    { label: "Classic memes", path: "/memes" },
  ],
  "this-is-fine": [
    { label: "Hide the Pain Harold", slug: "hide-the-pain-harold" },
    { label: "Disaster Girl", slug: "disaster-girl" },
    { label: "Classic memes", path: "/memes" },
  ],
  "adin-ross": [
    { label: "xQc", slug: "xqc" },
    { label: "IShowSpeed", slug: "ishowspeed" },
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
        { href: "/memes", label: "Meme archive" },
        { href: "/brainrot", label: "Brainrot Hub" },
        { href: "/creators", label: "Creators" },
      ];
    case "slang":
      return [
        { href: "/slang", label: "Slang dictionary" },
        { href: "/brainrot", label: "Brainrot Hub" },
        { href: "/creators", label: "Creators" },
      ];
    case "event":
      return [
        { href: "/events", label: "Internet history" },
        { href: "/trending", label: "What's Rising" },
        { href: "/memes", label: "Meme archive" },
      ];
    case "creator":
      return [
        { href: "/creators", label: "Creator encyclopedia" },
        { href: "/brainrot", label: "Brainrot Hub" },
        { href: "/slang", label: "Slang dictionary" },
      ];
    case "trend":
      return [
        { href: "/trending#trends", label: "All Trends" },
        { href: "/memes", label: "Meme archive" },
        { href: "/slang", label: "Slang dictionary" },
      ];
    default:
      return [
        { href: "/trending", label: "What's Rising" },
        { href: "/memes", label: "Meme archive" },
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
