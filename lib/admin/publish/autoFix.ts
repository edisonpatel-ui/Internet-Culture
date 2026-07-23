/**
 * Deterministic publish fixes — technical only.
 * Never invent sources, related entries, or other encyclopedia knowledge
 * just to satisfy validators.
 */

import { getAllEntriesSync } from "@/lib/services/entries";
import type { AIDraftCategory } from "@/lib/ai/types";
import type { ApprovedDraft, DraftPackage } from "@/lib/ai/packages";

export interface PublishAutoFixReport {
  fixes: string[];
  judgmentRequired: string[];
  category: AIDraftCategory;
  slug: string;
  relatedSlugs: string[];
  sources: Array<{ title: string; url?: string; domain?: string }>;
}

function slugify(title: string): string {
  return (
    title
      .toLowerCase()
      .replace(/\s*—\s*.*$/, "")
      .replace(/\s*\(.*?\)\s*/g, " ")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "") || "untitled"
  );
}

function domainFromUrl(url?: string): string | undefined {
  if (!url) return undefined;
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return undefined;
  }
}

function ensureUniqueSlug(desired: string, existing: Set<string>): string {
  const slug = desired || "untitled";
  if (!existing.has(slug)) return slug;
  let n = 2;
  while (existing.has(`${slug}-${n}`)) n += 1;
  return `${slug}-${n}`;
}

function resolveRelatedSlugs(
  topics: string[],
  catalogSlugs: Set<string>,
): { related: string[]; dropped: string[] } {
  const related: string[] = [];
  const dropped: string[] = [];
  for (const topic of topics) {
    const asSlug = slugify(topic);
    if (catalogSlugs.has(asSlug)) {
      if (!related.includes(asSlug)) related.push(asSlug);
      continue;
    }
    const hit = [...catalogSlugs].find(
      (s) => s === asSlug || topic.toLowerCase().includes(s.replace(/-/g, " ")),
    );
    if (hit && !related.includes(hit)) related.push(hit);
    else dropped.push(topic);
  }
  return { related, dropped };
}

/**
 * Technical fixes only. Block publish when knowledge is missing.
 */
export function autoFixForPublish(
  approved: ApprovedDraft,
): PublishAutoFixReport {
  const fixes: string[] = [];
  const judgmentRequired: string[] = [];
  const pkg: DraftPackage = approved.draftPackage;

  let category = pkg.category;
  if (category === "brainrot") {
    category = "meme";
    fixes.push(
      'Mapped category "brainrot" → "meme" for catalog registration (no brainrot content folder yet).',
    );
  }

  const catalog = getAllEntriesSync();
  const existingSlugs = new Set(catalog.map((e) => e.slug));
  const desired = pkg.slugSuggestion?.trim() || slugify(pkg.title);
  const slug = ensureUniqueSlug(desired, existingSlugs);
  if (slug !== desired) {
    fixes.push(`Slug "${desired}" already existed — publishing as "${slug}".`);
  }

  const { related, dropped } = resolveRelatedSlugs(
    pkg.relatedTopics,
    existingSlugs,
  );
  if (dropped.length > 0) {
    fixes.push(
      `Dropped ${dropped.length} related topic(s) with no live catalog match (not replaced with fillers).`,
    );
  }

  if (
    related.length === 0 &&
    (category === "meme" || category === "slang" || category === "event")
  ) {
    judgmentRequired.push(
      "relatedSlugs required for this category, but research did not resolve any live catalog matches. Refusing to invent filler related entries.",
    );
  }

  const sources = pkg.suggestedSources
    .filter((s) => s.url?.trim() && /^https?:\/\//i.test(s.url.trim()))
    .map((s) => ({
      title: s.title,
      url: s.url,
      domain: s.domain ?? domainFromUrl(s.url),
    }));

  if (sources.length === 0) {
    judgmentRequired.push(
      "No URL-backed sources. Refusing placeholder citations — encyclopedia quality over validator satisfaction.",
    );
  }

  if (!pkg.summary.trim()) {
    judgmentRequired.push("Summary/description is empty — cannot publish.");
  }
  if (!pkg.title.trim()) {
    judgmentRequired.push("Title is empty — cannot publish.");
  }
  if (!pkg.origin.trim()) {
    judgmentRequired.push("Origin is empty — use Unknown if undetermined, but field must be present.");
  }

  const research = pkg.groundedOnResearch?.completeness;
  if (research?.researchFailed) {
    judgmentRequired.push(
      "Underlying research marked researchFailed — do not publish incomplete knowledge.",
    );
  }

  return {
    fixes,
    judgmentRequired,
    category,
    slug,
    relatedSlugs: related,
    sources,
  };
}
