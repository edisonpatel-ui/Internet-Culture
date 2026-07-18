import Link from "next/link";
import type { ContentCategory } from "@/types";

/**
 * Intentional topic-cluster hubs — not random links.
 * Reinforces category relationships for users and crawlers.
 */
const CLUSTER_BY_CATEGORY: Record<
  ContentCategory,
  Array<{ href: string; label: string }>
> = {
  meme: [
    { href: "/memes", label: "All Memes" },
    { href: "/trending", label: "Trending" },
    { href: "/creators", label: "Creators" },
    { href: "/events", label: "Events" },
  ],
  slang: [
    { href: "/slang", label: "All Slang" },
    { href: "/trending", label: "Trending" },
    { href: "/memes", label: "Memes" },
    { href: "/creators", label: "Creators" },
  ],
  event: [
    { href: "/events", label: "All Events" },
    { href: "/trending", label: "Trending" },
    { href: "/memes", label: "Memes" },
    { href: "/slang", label: "Slang" },
  ],
  creator: [
    { href: "/creators", label: "All Creators" },
    { href: "/trending", label: "Trending" },
    { href: "/memes", label: "Memes" },
    { href: "/slang", label: "Slang" },
  ],
  trend: [
    { href: "/trending", label: "All Trends" },
    { href: "/memes", label: "Memes" },
    { href: "/slang", label: "Slang" },
    { href: "/events", label: "Events" },
  ],
  brainrot: [
    { href: "/brainrot", label: "Brainrot" },
    { href: "/trending", label: "Trending" },
    { href: "/memes", label: "Memes" },
    { href: "/slang", label: "Slang" },
  ],
};

interface TopicClusterLinksProps {
  category: ContentCategory;
  /** Current path to avoid self-link highlight noise */
  currentPath?: string;
}

export function TopicClusterLinks({
  category,
  currentPath,
}: TopicClusterLinksProps) {
  const links = CLUSTER_BY_CATEGORY[category].filter(
    (l) => l.href !== currentPath,
  );

  if (links.length === 0) return null;

  return (
    <section className="mt-10 border-t border-white/5 pt-8">
      <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-zinc-400">
        Explore related topics
      </h2>
      <ul className="flex flex-wrap gap-2">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="inline-flex rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-sm text-zinc-300 transition hover:border-white/20 hover:text-white"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
