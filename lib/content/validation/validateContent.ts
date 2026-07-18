/**
 * Unified content validation for Internet Culture Hub (P0 quality gates).
 *
 * Errors fail `npm run validate` (exit 1).
 * Warnings are reported but do not fail the run.
 */

import fs from "node:fs";
import path from "node:path";
import type {
  BaseEntry,
  ContentCategory,
  CreatorEntry,
  EventEntry,
  MediaItem,
  MemeEntry,
  SlangEntry,
} from "@/types";
import { buildEntrySeoTitle } from "@/lib/seo";
import {
  validateEntryMedia,
  type MediaWarning,
} from "@/lib/content/validateMedia";
import { buildCatalog, getCanonicalEntryArrays } from "./catalog";
import type { ValidationIssue, ValidationResult } from "./types";

const VALID_CATEGORIES = new Set<ContentCategory>([
  "trend",
  "meme",
  "slang",
  "event",
  "brainrot",
  "creator",
]);

const CATEGORY_DIR: Record<ContentCategory, string> = {
  meme: "memes",
  slang: "slang",
  event: "events",
  creator: "creators",
  trend: "trends",
  brainrot: "brainrot",
};

const CONTENT_ROOT = path.join(process.cwd(), "lib", "content");

/** SEO description soft floor (characters). */
const SEO_DESCRIPTION_MIN = 40;

const VALID_MEDIA_ROLES = new Set([
  "featured",
  "supporting",
  "video",
  "reference",
]);
const VALID_MEDIA_TYPES = new Set(["image", "video", "gif", "embed"]);
const VALID_PLATFORMS = new Set([
  "youtube",
  "tiktok",
  "twitter",
  "instagram",
  "reddit",
  "twitch",
  "wikimedia",
  "knowyourmeme",
  "original",
  "other",
]);

function error(
  issues: ValidationIssue[],
  code: string,
  message: string,
  extra?: Partial<ValidationIssue>,
) {
  issues.push({ severity: "error", code, message, ...extra });
}

function warn(
  issues: ValidationIssue[],
  code: string,
  message: string,
  extra?: Partial<ValidationIssue>,
) {
  issues.push({ severity: "warning", code, message, ...extra });
}

function expectedFileForEntry(entry: BaseEntry): string {
  const dir = CATEGORY_DIR[entry.category] ?? entry.category;
  return path.join(CONTENT_ROOT, dir, `${entry.slug}.ts`);
}

/**
 * Scan category folders for *.ts article files (excluding indexes/templates).
 * Returns basename slug → absolute path.
 */
function scanContentFiles(): Map<string, string[]> {
  const map = new Map<string, string[]>();
  const dirs = ["memes", "slang", "events", "creators", "trends", "brainrot"];

  for (const dir of dirs) {
    const abs = path.join(CONTENT_ROOT, dir);
    if (!fs.existsSync(abs)) continue;
    for (const name of fs.readdirSync(abs)) {
      if (!name.endsWith(".ts")) continue;
      if (name === "index.ts") continue;
      const slug = name.replace(/\.ts$/, "");
      const full = path.join(abs, name);
      const list = map.get(slug) ?? [];
      list.push(full);
      map.set(slug, list);
    }
  }
  return map;
}

function extractSlugFromFile(filePath: string): string | null {
  try {
    const text = fs.readFileSync(filePath, "utf8");
    const match = text.match(/slug:\s*["']([^"']+)["']/);
    return match?.[1] ?? null;
  } catch {
    return null;
  }
}

function checkRequiredCategoryFields(
  entry: BaseEntry,
  issues: ValidationIssue[],
) {
  const base = { slug: entry.slug, id: entry.id };

  if (!entry.id?.trim()) {
    error(issues, "MISSING_ID", `Missing id`, base);
  }
  if (!entry.slug?.trim()) {
    error(issues, "MISSING_SLUG", `Missing slug`, base);
  }
  if (!entry.title?.trim()) {
    error(issues, "MISSING_TITLE", `Missing title`, base);
  }
  if (!entry.description?.trim()) {
    error(issues, "MISSING_DESCRIPTION", `Missing description`, {
      ...base,
      slug: entry.slug,
    });
  }
  if (!entry.imageGradient?.trim()) {
    error(issues, "MISSING_GRADIENT", `Missing imageGradient`, base);
  }
  if (!entry.addedAt?.trim()) {
    error(issues, "MISSING_ADDED_AT", `Missing addedAt`, base);
  }
  if (!entry.trendDirection) {
    error(issues, "MISSING_TREND_DIRECTION", `Missing trendDirection`, base);
  }
  if (
    !entry.scores ||
    typeof entry.scores.relevance !== "number" ||
    typeof entry.scores.brainrot !== "number" ||
    typeof entry.scores.cringe !== "number"
  ) {
    error(issues, "MISSING_SCORES", `Missing or incomplete scores`, base);
  }
  if (typeof entry.views !== "number") {
    error(issues, "MISSING_VIEWS", `Missing views`, base);
  }

  switch (entry.category) {
    case "meme": {
      const m = entry as MemeEntry;
      if (!m.meaning?.trim())
        error(issues, "MISSING_MEANING", `Meme missing meaning`, base);
      if (!m.origin?.trim())
        error(issues, "MISSING_ORIGIN", `Meme missing origin`, base);
      if (!Array.isArray(m.timeline))
        error(issues, "MISSING_TIMELINE", `Meme missing timeline`, base);
      if (!Array.isArray(m.examples))
        error(issues, "MISSING_EXAMPLES", `Meme missing examples`, base);
      if (!Array.isArray(m.relatedSlugs))
        error(issues, "MISSING_RELATED", `Meme missing relatedSlugs`, base);
      break;
    }
    case "slang": {
      const s = entry as SlangEntry;
      if (!s.definition?.trim())
        error(issues, "MISSING_DEFINITION", `Slang missing definition`, base);
      if (!s.origin?.trim())
        error(issues, "MISSING_ORIGIN", `Slang missing origin`, base);
      if (!Array.isArray(s.usageExamples))
        error(
          issues,
          "MISSING_USAGE_EXAMPLES",
          `Slang missing usageExamples`,
          base,
        );
      if (!Array.isArray(s.relatedSlugs))
        error(issues, "MISSING_RELATED", `Slang missing relatedSlugs`, base);
      break;
    }
    case "event": {
      const e = entry as EventEntry;
      if (!e.impact?.trim())
        error(issues, "MISSING_IMPACT", `Event missing impact`, base);
      if (!Array.isArray(e.highlights))
        error(issues, "MISSING_HIGHLIGHTS", `Event missing highlights`, base);
      if (!Array.isArray(e.relatedSlugs))
        error(issues, "MISSING_RELATED", `Event missing relatedSlugs`, base);
      break;
    }
    case "creator": {
      // Creator-specific fields are optional in the type system.
      void (entry as CreatorEntry);
      break;
    }
    default:
      break;
  }
}

function checkMediaSchema(entry: BaseEntry, issues: ValidationIssue[]) {
  const media = entry.media;
  if (!media || media.length === 0) return;

  for (let i = 0; i < media.length; i++) {
    const item = media[i] as MediaItem;
    const ref = `media[${i}]`;
    const base = { slug: entry.slug, id: entry.id };

    if (!item.role || !VALID_MEDIA_ROLES.has(item.role)) {
      error(
        issues,
        "INVALID_MEDIA_SCHEMA",
        `${ref}: invalid or missing role`,
        base,
      );
    }
    if (!item.type || !VALID_MEDIA_TYPES.has(item.type)) {
      error(
        issues,
        "INVALID_MEDIA_SCHEMA",
        `${ref}: invalid or missing type`,
        base,
      );
    }
    if (!item.url?.trim()) {
      error(
        issues,
        "INVALID_MEDIA_SCHEMA",
        `${ref}: missing url`,
        base,
      );
    }
    if (!item.title?.trim()) {
      error(
        issues,
        "INVALID_MEDIA_SCHEMA",
        `${ref}: missing title`,
        base,
      );
    }
    if (!item.source?.trim()) {
      error(
        issues,
        "INVALID_MEDIA_SCHEMA",
        `${ref}: missing source`,
        base,
      );
    }
    if (!item.sourceUrl?.trim()) {
      error(
        issues,
        "INVALID_MEDIA_SCHEMA",
        `${ref}: missing sourceUrl`,
        base,
      );
    }
    if (!item.platform || !VALID_PLATFORMS.has(item.platform)) {
      error(
        issues,
        "INVALID_MEDIA_SCHEMA",
        `${ref}: invalid or missing platform`,
        base,
      );
    }
    if (item.role === "featured" && item.type === "embed") {
      error(
        issues,
        "INVALID_MEDIA_SCHEMA",
        `${ref}: featured cannot be type embed`,
        base,
      );
    }
    if (item.url?.includes("/thumb/") && item.url.includes("wikimedia")) {
      error(
        issues,
        "INVALID_MEDIA_SCHEMA",
        `${ref}: Wikimedia /thumb/ CDN paths are forbidden — use full-file upload URL`,
        base,
      );
    }
  }
}

function checkSeo(entries: BaseEntry[], issues: ValidationIssue[]) {
  const titleMap = new Map<string, string[]>();

  for (const entry of entries) {
    const desc = (entry.description || "").trim();
    if (desc.length > 0 && desc.length < SEO_DESCRIPTION_MIN) {
      warn(
        issues,
        "SEO_DESCRIPTION_SHORT",
        `Description is ${desc.length} chars (recommend ≥ ${SEO_DESCRIPTION_MIN})`,
        { slug: entry.slug, id: entry.id },
      );
    }

    const seoTitle = buildEntrySeoTitle(entry);
    if (!seoTitle.trim()) {
      warn(issues, "SEO_TITLE_MISSING", `Empty SEO title`, {
        slug: entry.slug,
        id: entry.id,
      });
    } else {
      const list = titleMap.get(seoTitle) ?? [];
      list.push(entry.slug);
      titleMap.set(seoTitle, list);
    }
  }

  for (const [seoTitle, slugs] of titleMap) {
    if (slugs.length > 1) {
      warn(
        issues,
        "SEO_TITLE_DUPLICATE",
        `Duplicate SEO title shared by: ${slugs.join(", ")} — "${seoTitle}"`,
      );
    }
  }
}

/**
 * Soft media quality warnings (category-aware). Does not fail the run.
 */
function checkMediaQualityWarnings(
  entry: BaseEntry,
  issues: ValidationIssue[],
) {
  const mediaWarnings: MediaWarning[] = validateEntryMedia(entry);
  for (const w of mediaWarnings) {
    warn(issues, "MEDIA_QUALITY", `${w.field}: ${w.message}`, {
      slug: w.slug,
    });
  }
}

/**
 * Run the full unified validation suite.
 */
export function runContentValidation(): ValidationResult {
  const issues: ValidationIssue[] = [];
  const catalog = buildCatalog();

  // ── Hard: slug / id conflicts ──────────────────────────────────────────────
  for (const conflict of catalog.slugConflicts) {
    const detail = conflict.entries
      .map((e) => `${e.category}:${e.id} "${e.title}"`)
      .join(" vs ");
    error(
      issues,
      "DUPLICATE_SLUG",
      `Slug "${conflict.slug}" used by distinct entries: ${detail}`,
      { slug: conflict.slug },
    );
  }

  for (const conflict of catalog.idConflicts) {
    const detail = conflict.entries
      .map((e) => `${e.category}:${e.slug}`)
      .join(" vs ");
    error(
      issues,
      "DUPLICATE_ID",
      `ID "${conflict.id}" used by distinct entries: ${detail}`,
      { id: conflict.id },
    );
  }

  // Also detect duplicate ids within a single category array (same array twice).
  for (const { label, entries } of getCanonicalEntryArrays()) {
    if (label === "trends") continue; // re-exports expected
    const seenIds = new Map<string, string>();
    const seenSlugs = new Map<string, string>();
    for (const entry of entries) {
      const prevId = seenIds.get(entry.id);
      if (prevId && prevId !== entry.slug) {
        error(
          issues,
          "DUPLICATE_ID",
          `ID "${entry.id}" appears twice in ${label}: ${prevId} and ${entry.slug}`,
          { id: entry.id, slug: entry.slug },
        );
      }
      seenIds.set(entry.id, entry.slug);

      const prevSlug = seenSlugs.get(entry.slug);
      if (prevSlug) {
        error(
          issues,
          "DUPLICATE_SLUG",
          `Slug "${entry.slug}" registered twice in ${label}`,
          { slug: entry.slug },
        );
      }
      seenSlugs.set(entry.slug, entry.id);
    }
  }

  const entries = catalog.entries;
  const allSlugs = new Set(entries.map((e) => e.slug));
  const filesBySlug = scanContentFiles();

  // ── Filename ↔ slug ────────────────────────────────────────────────────────
  for (const [fileSlug, paths] of filesBySlug) {
    for (const filePath of paths) {
      const declared = extractSlugFromFile(filePath);
      const rel = path.relative(process.cwd(), filePath);
      if (declared && declared !== fileSlug) {
        error(
          issues,
          "FILENAME_SLUG_MISMATCH",
          `File "${rel}" basename is "${fileSlug}" but slug field is "${declared}"`,
          { slug: declared, file: rel },
        );
      }
    }
    if (paths.length > 1) {
      // Same basename in multiple folders can be OK only if one is trends
      // re-export stub — we forbid second file with same slug basename.
      const rels = paths.map((p) => path.relative(process.cwd(), p));
      const nonTrend = paths.filter((p) => !p.includes(`${path.sep}trends${path.sep}`));
      if (nonTrend.length > 1) {
        error(
          issues,
          "DUPLICATE_SLUG_FILE",
          `Multiple content files share basename "${fileSlug}": ${rels.join(", ")}`,
          { slug: fileSlug },
        );
      }
    }
  }

  for (const entry of entries) {
    const expected = expectedFileForEntry(entry);
    const rel = path.relative(process.cwd(), expected);
    if (!fs.existsSync(expected)) {
      // Trend re-exports of meme/slang/etc. live in their canonical folder —
      // expected path uses entry.category, which is correct for canonical.
      error(
        issues,
        "FILENAME_SLUG_MISMATCH",
        `Expected file missing for slug "${entry.slug}": ${rel}`,
        { slug: entry.slug, id: entry.id, file: rel },
      );
    } else {
      const declared = extractSlugFromFile(expected);
      if (declared && declared !== entry.slug) {
        error(
          issues,
          "FILENAME_SLUG_MISMATCH",
          `File "${rel}" slug field "${declared}" does not match entry slug "${entry.slug}"`,
          { slug: entry.slug, file: rel },
        );
      }
      const base = path.basename(expected, ".ts");
      if (base !== entry.slug) {
        error(
          issues,
          "FILENAME_SLUG_MISMATCH",
          `Filename "${base}.ts" does not match slug "${entry.slug}"`,
          { slug: entry.slug, file: rel },
        );
      }
    }
  }

  // ── Per-entry hard checks ──────────────────────────────────────────────────
  for (const entry of entries) {
    if (!VALID_CATEGORIES.has(entry.category)) {
      error(
        issues,
        "INVALID_CATEGORY",
        `Invalid category "${entry.category}"`,
        { slug: entry.slug, id: entry.id },
      );
    }

    checkRequiredCategoryFields(entry, issues);

    // Published catalog entries must have sources (indexes = live/published).
    if (!entry.sources || entry.sources.length === 0) {
      error(
        issues,
        "MISSING_SOURCES",
        `Published entry has no sources`,
        { slug: entry.slug, id: entry.id },
      );
    }

    if (entry.relatedSlugs) {
      for (const related of entry.relatedSlugs) {
        if (!allSlugs.has(related)) {
          error(
            issues,
            "BROKEN_RELATED_SLUG",
            `relatedSlugs → "${related}" does not exist`,
            { slug: entry.slug, id: entry.id },
          );
        }
      }
    }

    checkMediaSchema(entry, issues);
    checkMediaQualityWarnings(entry, issues);
  }

  checkSeo(entries, issues);

  return {
    errors: issues.filter((i) => i.severity === "error"),
    warnings: issues.filter((i) => i.severity === "warning"),
  };
}

export function formatValidationIssue(issue: ValidationIssue): string {
  const bits = [`[${issue.code}]`];
  if (issue.slug) bits.push(`slug=${issue.slug}`);
  if (issue.id) bits.push(`id=${issue.id}`);
  if (issue.file) bits.push(`file=${issue.file}`);
  bits.push(issue.message);
  return bits.join(" ");
}
