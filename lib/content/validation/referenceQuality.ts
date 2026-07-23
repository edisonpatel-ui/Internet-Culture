/**
 * Soft reference / source quality scoring and warnings.
 */

import type { BaseEntry, EntrySource } from "@/types";
import type { ValidationIssue } from "./types";
import { SOURCES_RECOMMENDED_MIN } from "@/lib/content/standards/articleSpec";

export type ReferenceTier =
  | "primary"
  | "archive"
  | "journalism"
  | "official"
  | "academic"
  | "other";

const DOMAIN_TIERS: Array<{ tier: ReferenceTier; test: (d: string) => boolean }> =
  [
    {
      tier: "archive",
      test: (d) =>
        d.includes("knowyourmeme.com") ||
        d.includes("wikipedia.org") ||
        d.includes("wikimedia.org"),
    },
    {
      tier: "academic",
      test: (d) =>
        d.endsWith(".edu") ||
        d.includes("jstor.org") ||
        d.includes("doi.org") ||
        d.includes("arxiv.org"),
    },
    {
      tier: "journalism",
      test: (d) =>
        /nytimes|washingtonpost|theguardian|bbc\.|reuters|apnews|bloomberg|wired\.com|theverge|arstechnica|newyorker|atlantic\.com|vice\.com|rollingstone|polygon\.com|kotaku/i.test(
          d,
        ),
    },
    {
      tier: "official",
      test: (d) =>
        /youtube\.com|youtu\.be|twitch\.tv|tiktok\.com|instagram\.com|x\.com|twitter\.com|merriam-webster|dictionary\.com/i.test(
          d,
        ),
    },
    {
      tier: "primary",
      test: (d) =>
        /github\.com|archive\.org|web\.archive|commons\.wikimedia/i.test(d),
    },
  ];

function domainOf(source: EntrySource): string {
  if (source.domain?.trim()) return source.domain.trim().toLowerCase();
  if (!source.url) return "";
  try {
    return new URL(source.url).hostname.replace(/^www\./, "").toLowerCase();
  } catch {
    return "";
  }
}

export function classifySource(source: EntrySource): ReferenceTier {
  const d = domainOf(source);
  if (!d) return "other";
  for (const row of DOMAIN_TIERS) {
    if (row.test(d)) return row.tier;
  }
  return "other";
}

export interface ReferenceScore {
  score: number;
  tierCounts: Record<ReferenceTier, number>;
  issues: string[];
}

export function scoreReferences(entry: BaseEntry): ReferenceScore {
  const sources = entry.sources ?? [];
  const issues: string[] = [];
  const tierCounts: Record<ReferenceTier, number> = {
    primary: 0,
    archive: 0,
    journalism: 0,
    official: 0,
    academic: 0,
    other: 0,
  };

  if (sources.length === 0) {
    return { score: 0, tierCounts, issues: ["No sources"] };
  }

  const urls = new Set<string>();
  const titles = new Set<string>();
  let withUrl = 0;

  for (const source of sources) {
    const tier = classifySource(source);
    tierCounts[tier] += 1;

    if (source.url?.trim()) {
      withUrl += 1;
      const norm = source.url.trim().toLowerCase().replace(/\/$/, "");
      if (urls.has(norm)) issues.push(`Duplicate source URL: ${source.url}`);
      urls.add(norm);
    } else {
      issues.push(`Source without URL: "${source.title}"`);
    }

    const t = (source.title || "").trim().toLowerCase();
    if (t) {
      if (titles.has(t)) issues.push(`Duplicate source title: "${source.title}"`);
      titles.add(t);
    }

    if (!source.title?.trim()) issues.push("Source missing title");
  }

  if (sources.length < SOURCES_RECOMMENDED_MIN) {
    issues.push(
      `Only ${sources.length} source(s) — prefer ≥ ${SOURCES_RECOMMENDED_MIN}`,
    );
  }
  if (sources.length === 1) {
    issues.push("Single-source entry — add a second independent reference when possible");
  }

  // Score: start 100, deduct for gaps; boost for quality tiers
  let score = 55;
  score += Math.min(25, withUrl * 12);
  score += Math.min(
    20,
    (tierCounts.archive +
      tierCounts.journalism +
      tierCounts.academic +
      tierCounts.official +
      tierCounts.primary) *
      5,
  );
  if (sources.length >= 3) score += 5;
  score -= Math.min(40, issues.length * 8);
  score = Math.max(0, Math.min(100, score));

  return { score, tierCounts, issues };
}

export function validateReferenceQuality(
  entries: BaseEntry[],
): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  let reported = 0;
  const maxReport = 80;

  for (const entry of entries) {
    const result = scoreReferences(entry);
    for (const msg of result.issues) {
      if (reported >= maxReport) break;
      // Skip "No sources" — already a hard MISSING_SOURCES error
      if (msg === "No sources") continue;
      reported += 1;
      issues.push({
        severity: "warning",
        code: "REFERENCE_QUALITY",
        slug: entry.slug,
        id: entry.id,
        message: msg,
      });
    }
  }

  if (reported >= maxReport) {
    issues.push({
      severity: "warning",
      code: "REFERENCE_QUALITY",
      message: `Additional reference-quality warnings omitted (cap ${maxReport})`,
    });
  }

  return issues;
}
