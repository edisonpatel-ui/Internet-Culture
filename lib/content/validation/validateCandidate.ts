/**
 * In-memory validation of a single candidate entry, BEFORE it is written to
 * disk. Runs the same hard (error-severity) per-entry checks that
 * `npm run validate` applies to every catalog entry — required fields,
 * category, sources, media schema, timeline schema, broken relatedSlugs —
 * plus slug/id uniqueness against the live catalog.
 *
 * It deliberately reuses the existing check functions from validateContent.ts
 * rather than re-implementing them, so the two can never drift apart.
 *
 * Soft (warning-severity) checks are intentionally not run here: they never
 * fail `npm run validate` either.
 *
 * The full-catalog `npm run validate` still runs as `prebuild` on every
 * `npm run build` / Vercel deploy, so it remains the final gate before
 * anything reaches production.
 */

import fs from "node:fs";
import path from "node:path";
import type { BaseEntry } from "@/types";
import { buildCatalog } from "./catalog";
import {
  VALID_CATEGORIES,
  checkMediaSchema,
  checkRequiredCategoryFields,
  checkTimelineSchema,
} from "./validateContent";
import type { ValidationIssue } from "./types";

const CONTENT_DIRS = [
  "memes",
  "slang",
  "events",
  "people",
  "trends",
  "brainrot",
] as const;

/**
 * Slugs that already have a content file on disk. Complements the
 * in-process catalog, which can lag behind the filesystem in a long-running
 * dev server right after a previous publish.
 */
function listContentSlugsOnDisk(): Set<string> {
  const slugs = new Set<string>();
  const root = path.join(/* turbopackIgnore: true */ process.cwd(), "lib", "content");
  for (const dir of CONTENT_DIRS) {
    const abs = path.join(/* turbopackIgnore: true */ root, dir);
    let names: string[];
    try {
      names = fs.readdirSync(abs);
    } catch {
      continue;
    }
    for (const name of names) {
      if (!name.endsWith(".ts") || name === "index.ts") continue;
      slugs.add(name.replace(/\.ts$/, ""));
    }
  }
  return slugs;
}

export interface CandidateValidationOptions {
  /** Defaults to the live catalog. Injectable for tests. */
  existingEntries?: readonly BaseEntry[];
  /** Extra slugs known to exist. Defaults to content files found on disk. */
  additionalKnownSlugs?: Iterable<string>;
}

/**
 * Returns hard errors for the candidate (empty array = safe to write).
 * Never throws.
 */
export function validateCandidateEntry(
  candidate: BaseEntry,
  options: CandidateValidationOptions = {},
): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  const ref = { slug: candidate.slug, id: candidate.id };

  let existing: readonly BaseEntry[];
  try {
    existing = options.existingEntries ?? buildCatalog().entries;
  } catch (e) {
    return [
      {
        severity: "error",
        code: "CATALOG_UNAVAILABLE",
        message: `Could not load the live catalog to validate against: ${
          e instanceof Error ? e.message : String(e)
        }`,
        ...ref,
      },
    ];
  }

  const knownSlugs = new Set(existing.map((e) => e.slug));
  for (const s of options.additionalKnownSlugs ?? listContentSlugsOnDisk()) {
    knownSlugs.add(s);
  }

  if (!VALID_CATEGORIES.has(candidate.category)) {
    issues.push({
      severity: "error",
      code: "INVALID_CATEGORY",
      message: `Invalid category "${candidate.category}"`,
      ...ref,
    });
  }

  if (knownSlugs.has(candidate.slug)) {
    issues.push({
      severity: "error",
      code: "DUPLICATE_SLUG",
      message: `Slug "${candidate.slug}" already exists in the catalog`,
      ...ref,
    });
  }

  const clash = existing.find((e) => e.id === candidate.id);
  if (clash) {
    issues.push({
      severity: "error",
      code: "DUPLICATE_ID",
      message: `ID "${candidate.id}" is already used by "${clash.slug}"`,
      ...ref,
    });
  }

  checkRequiredCategoryFields(candidate, issues);

  if (!candidate.sources || candidate.sources.length === 0) {
    issues.push({
      severity: "error",
      code: "MISSING_SOURCES",
      message: "Published entry has no sources",
      ...ref,
    });
  }

  for (const related of candidate.relatedSlugs ?? []) {
    if (!knownSlugs.has(related)) {
      issues.push({
        severity: "error",
        code: "BROKEN_RELATED_SLUG",
        message: `relatedSlugs → "${related}" does not exist`,
        ...ref,
      });
    }
  }

  checkMediaSchema(candidate, issues);
  checkTimelineSchema(candidate, issues);

  return issues.filter((i) => i.severity === "error");
}
