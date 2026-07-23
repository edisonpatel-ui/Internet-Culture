"use client";

import Link from "next/link";
import {
  getCulturalTopicLinks,
  type CulturalTopicLink,
} from "@/lib/seo/culturalTopics";
import { ANALYTICS_EVENTS, trackEvent } from "@/lib/analytics";
import type { BaseEntry, ContentCategory } from "@/types";

interface TopicClusterLinksProps {
  /** Prefer entry + catalog for cultural relationship links. */
  entry?: BaseEntry;
  catalog?: readonly BaseEntry[];
  /** Fallback: category hubs only */
  category?: ContentCategory;
  currentPath?: string;
}

const CATEGORY_FALLBACK: Record<
  ContentCategory,
  CulturalTopicLink[]
> = {
  meme: [
    { href: "/memes", label: "All Memes" },
    { href: "/trending", label: "What's Rising" },
    { href: "/creators", label: "Creators" },
  ],
  slang: [
    { href: "/slang", label: "All Slang" },
    { href: "/brainrot", label: "Brainrot Hub" },
    { href: "/creators", label: "Creators" },
  ],
  event: [
    { href: "/events", label: "All Events" },
    { href: "/trending", label: "What's Rising" },
    { href: "/memes", label: "Memes" },
  ],
  creator: [
    { href: "/creators", label: "All Creators" },
    { href: "/memes", label: "Memes" },
    { href: "/slang", label: "Slang" },
  ],
  trend: [
    { href: "/trending#trends", label: "All Trends" },
    { href: "/memes", label: "Memes" },
    { href: "/slang", label: "Slang" },
  ],
  brainrot: [
    { href: "/brainrot", label: "Brainrot Hub" },
    { href: "/memes", label: "Memes" },
    { href: "/slang", label: "Slang" },
  ],
};

/**
 * Cultural topic links for SEO + discovery.
 * Uses curated relationships and relatedSlugs when an entry is provided.
 */
export function TopicClusterLinks({
  entry,
  catalog,
  category,
  currentPath,
}: TopicClusterLinksProps) {
  const links: CulturalTopicLink[] =
    entry && catalog
      ? getCulturalTopicLinks(entry, catalog)
      : category
        ? CATEGORY_FALLBACK[category]
        : [];

  const filtered = links.filter((l) => l.href !== currentPath);

  if (filtered.length === 0) return null;

  return (
    <section className="mt-10 border-t border-white/5 pt-8">
      <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-zinc-400">
        Explore nearby
      </h2>
      <ul className="flex flex-wrap gap-2">
        {filtered.map((link) => (
          <li key={`${link.href}-${link.label}`}>
            <Link
              href={link.href}
              onClick={() => {
                const isHub =
                  link.href === "/brainrot" ||
                  link.href === "/memes" ||
                  link.href === "/slang" ||
                  link.href === "/creators" ||
                  link.href === "/events" ||
                  link.href === "/trending";
                trackEvent(
                  isHub
                    ? ANALYTICS_EVENTS.HUB_CLICK
                    : ANALYTICS_EVENTS.TOPIC_LINK_CLICK,
                  {
                    href: link.href,
                    label: link.label,
                    from_slug: entry?.slug ?? "",
                  },
                );
              }}
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
