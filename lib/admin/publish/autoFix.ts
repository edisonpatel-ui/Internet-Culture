/**
 * Deterministic publish fixes — technical only.
 * Never invent sources, related entries, or other encyclopedia knowledge
 * just to satisfy validators. Missing/thin fields are published with a
 * clearly-flagged fallback and noted in `fixes` for later cleanup, instead
 * of blocking the publish button — one-click Publish → confirm is the
 * whole flow now; there is no separate "needs human judgment" gate.
 *
 * ONE exception: an exact slug collision is blocked, not auto-fixed — see
 * checkSlugAvailability below, called by publishApprovedDraft before this
 * file's fixes ever run. Every other fix in this file still applies
 * unconditionally.
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

function isSafeSlug(s: string): boolean {
  return /^[a-z0-9]+(-[a-z0-9]+)*$/.test(s);
}

/**
 * The slug a draft WOULD publish under, before any collision handling.
 * Shared by the pre-publish collision check (checkSlugAvailability, called
 * before anything is written) and autoFixForPublish's own resolution below —
 * both must agree on what "the desired slug" is, or the pre-check could
 * clear a slug that autoFixForPublish then computes differently.
 *
 * pkg.slugSuggestion is AI-generated content (research/drafting pipeline),
 * not a value a human typed into a form — it must be validated with the
 * exact same rules slugify() enforces before it can reach a filesystem
 * path (writeContentEntry builds `lib/content/<folder>/${slug}.ts`
 * directly from this value). An unsanitized suggestion (e.g. containing
 * "../") must never be trusted verbatim; fall back to a real slugify()
 * of the title instead of accepting it as-is.
 */
export function computeDesiredSlug(
  pkg: Pick<DraftPackage, "slugSuggestion" | "title">,
): string {
  const suggested = pkg.slugSuggestion?.trim();
  return suggested && isSafeSlug(suggested) ? suggested : slugify(pkg.title);
}

export interface SlugCollision {
  slug: string;
  existingTitle: string;
  existingCategory: string;
}

/**
 * Pre-publish slug safety check — call this BEFORE writing any file,
 * running validate, or triggering a build. Returns the conflicting entry's
 * info if `desiredSlug` already exists in the live canonical catalog, or
 * null if it's free to use.
 *
 * This is intentionally a hard "does this exact slug already exist" check,
 * not a fuzzy title-similarity check — a human deciding whether two
 * articles are "the same topic" is exactly the judgment call the rest of
 * this file (autoFixForPublish) is designed to never require for publish
 * to proceed. Exact slug collision is the one case where "publish anyway"
 * is actively harmful (silently produces a second, disconnected article
 * about the same real slug via an auto-renamed "-2" suffix) rather than
 * merely imperfect, so it's the one case this pipeline blocks on.
 */
export function checkSlugAvailability(desiredSlug: string): SlugCollision | null {
  const catalog = getAllEntriesSync();
  const existing = catalog.find((e) => e.slug === desiredSlug);
  if (!existing) return null;
  return {
    slug: desiredSlug,
    existingTitle: existing.title,
    existingCategory: existing.category,
  };
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
  const desired = computeDesiredSlug(pkg);
  // ensureUniqueSlug is now a defense-in-depth safety net, not the primary
  // duplicate-slug mechanism — publishApprovedDraft calls checkSlugAvailability
  // (above) BEFORE this function ever runs, and blocks with a clear error on
  // an exact collision rather than reaching here. This only fires in the
  // narrow race-condition window between that check and this write (e.g. two
  // simultaneous publishes for the same slug) — auto-suffixing here is the
  // right last-resort behavior in that case: it's what stops a write ever
  // colliding at the filesystem level, at the cost of a "-2" slug that an
  // editor can rename in a follow-up edit, which is a reasonable trade-off
  // for a case that should be effectively unreachable in normal use.
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
