/**
 * Deterministic publish fixes — technical only.
 * Never invent sources, related entries, or other encyclopedia knowledge
 * just to satisfy validators. Missing/thin fields are published with a
 * clearly-flagged fallback and noted in `fixes` for later cleanup, instead
 * of blocking the publish button — one-click Publish → confirm is the
 * whole flow now; there is no separate "needs human judgment" gate.
 */

import { getAllEntriesSync } from "@/lib/services/entries";
import type { AIDraftCategory } from "@/lib/ai/types";
import type { ApprovedDraft, DraftPackage } from "@/lib/ai/packages";

export interface PublishAutoFixReport {
  fixes: string[];
  /** @deprecated Always empty — publish is never blocked. Kept only so
   * existing callers that read this field keep compiling. */
  judgmentRequired: string[];
  category: AIDraftCategory;
  slug: string;
  title: string;
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
 * Technical fixes only. Publish always proceeds — missing/thin knowledge is
 * flagged in `fixes` with a safe fallback instead of blocking.
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

  const resolved = resolveRelatedSlugs(pkg.relatedTopics, existingSlugs);
  let related = resolved.related;
  const dropped = resolved.dropped;
  if (dropped.length > 0) {
    fixes.push(
      `Dropped ${dropped.length} related topic(s) with no live catalog match (not replaced with fillers).`,
    );
  }

  // Soft link: same-category catalog entries sharing title tokens (real slugs only).
  if (
    related.length === 0 &&
    (category === "meme" || category === "slang" || category === "event")
  ) {
    const tokens = slugify(pkg.title)
      .split("-")
      .filter((t) => t.length >= 4);
    const soft: string[] = [];
    for (const entry of catalog) {
      if (entry.category !== category) continue;
      if (entry.slug === slug) continue;
      const hay = `${entry.slug} ${entry.title}`.toLowerCase();
      if (tokens.some((t) => hay.includes(t))) {
        soft.push(entry.slug);
        if (soft.length >= 2) break;
      }
    }
    if (soft.length > 0) {
      related = soft;
      fixes.push(
        `Attached ${soft.length} same-category related link(s) via title token match.`,
      );
    } else {
      fixes.push(
        "No live catalog match for related entries — published without related links (add manually later).",
      );
    }
  }

  const sources = pkg.suggestedSources
    .filter((s) => s.url?.trim() && /^https?:\/\//i.test(s.url.trim()))
    .map((s) => ({
      title: s.title,
      url: s.url,
      domain: s.domain ?? domainFromUrl(s.url),
    }));

  if (sources.length === 0) {
    fixes.push(
      "No URL-backed sources found — published without a Sources section (add manually later).",
    );
  }

  const title = pkg.title.trim() || slugify(desired).replace(/-/g, " ") || "Untitled Entry";
  if (!pkg.title.trim()) {
    fixes.push(`Title was empty — published as "${title}" (rename later).`);
  }
  if (!pkg.summary.trim()) {
    fixes.push("Summary/description was empty — published with the title as a placeholder (edit later).");
  }
  if (!pkg.origin.trim()) {
    fixes.push("Origin was empty — published as \"Unknown\" (fill in later).");
  }

  const research = pkg.groundedOnResearch?.completeness;
  if (research?.researchFailed) {
    fixes.push(
      "Underlying research was marked incomplete (researchFailed) — published anyway; review for accuracy.",
    );
  }

  return {
    fixes,
    judgmentRequired,
    category,
    slug,
    title,
    relatedSlugs: related,
    sources,
  };
}
