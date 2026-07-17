/**
 * Content Validation Script
 *
 * Checks the full entry list for common data quality problems.
 * Run with: npm run validate
 *
 * Exit code 0 = all checks passed.
 * Exit code 1 = one or more errors found (warnings do not trigger exit 1).
 */

import { getAllEntries } from "../lib/services/entries";
import type { BaseEntry, MediaItem } from "../types";

const VALID_CATEGORIES = new Set([
  "trend",
  "meme",
  "slang",
  "event",
  "brainrot",
  "creator",
]);

interface ValidationResult {
  errors: string[];
  warnings: string[];
}

async function validate(): Promise<ValidationResult> {
  const entries: BaseEntry[] = await getAllEntries();
  const errors: string[] = [];
  const warnings: string[] = [];

  // ── 1. Duplicate slugs ──────────────────────────────────────────────────────
  const slugCounts = new Map<string, number>();
  for (const entry of entries) {
    slugCounts.set(entry.slug, (slugCounts.get(entry.slug) ?? 0) + 1);
  }
  for (const [slug, count] of slugCounts.entries()) {
    if (count > 1) {
      errors.push(`[DUPLICATE SLUG] "${slug}" appears ${count} times`);
    }
  }

  // ── 2. Missing titles ───────────────────────────────────────────────────────
  for (const entry of entries) {
    if (!entry.title || entry.title.trim() === "") {
      errors.push(`[MISSING TITLE] slug="${entry.slug}" (id=${entry.id})`);
    }
  }

  // ── 3. Missing summaries ────────────────────────────────────────────────────
  for (const entry of entries) {
    const hasDescription = entry.description && entry.description.trim() !== "";
    const hasSummary =
      (entry as BaseEntry & { summary?: string }).summary?.trim() !== "" &&
      (entry as BaseEntry & { summary?: string }).summary !== undefined;
    if (!hasDescription && !hasSummary) {
      errors.push(
        `[MISSING SUMMARY] "${entry.title}" (slug=${entry.slug}) — both description and summary are empty`
      );
    }
  }

  // ── 4. Missing sources (warning only) ───────────────────────────────────────
  for (const entry of entries) {
    if (!entry.sources || entry.sources.length === 0) {
      warnings.push(
        `[WARN: NO SOURCES] "${entry.title}" (slug=${entry.slug})`
      );
    }
  }

  // ── 5. Broken internal relatedSlugs ─────────────────────────────────────────
  const allSlugs = new Set(entries.map((e) => e.slug));
  for (const entry of entries) {
    if (!entry.relatedSlugs) continue;
    for (const related of entry.relatedSlugs) {
      if (!allSlugs.has(related)) {
        errors.push(
          `[BROKEN RELATED SLUG] "${entry.title}" (slug=${entry.slug}) → "${related}" does not exist`
        );
      }
    }
  }

  // ── 6. Invalid categories ────────────────────────────────────────────────────
  for (const entry of entries) {
    if (!VALID_CATEGORIES.has(entry.category)) {
      errors.push(
        `[INVALID CATEGORY] "${entry.title}" (slug=${entry.slug}) has category="${entry.category}"`
      );
    }
  }

  // ── 7. Media item validation ─────────────────────────────────────────────────
  for (const entry of entries) {
    const media = (entry as BaseEntry & { media?: MediaItem[] }).media;
    if (!media || media.length === 0) continue;

    for (let i = 0; i < media.length; i++) {
      const item = media[i];
      const ref = `"${entry.title}" media[${i}] "${item.title ?? "(no title)"}"`;

      if (!item.title || item.title.trim() === "") {
        errors.push(`[MEDIA MISSING TITLE] ${ref} — title is required`);
      }
      if (!item.source || item.source.trim() === "") {
        errors.push(`[MEDIA MISSING SOURCE] ${ref} — source name is required`);
      }
      if (!item.sourceUrl || item.sourceUrl.trim() === "") {
        errors.push(`[MEDIA MISSING SOURCE URL] ${ref} — sourceUrl is required`);
      }
      if (!item.url || item.url.trim() === "") {
        errors.push(`[MEDIA MISSING URL] ${ref} — url is required`);
      }
      if (!item.verified) {
        warnings.push(
          `[WARN: MEDIA UNVERIFIED] ${ref} — mark verified:true after confirming source is correct`
        );
      }
    }
  }

  return { errors, warnings };
}

async function main() {
  console.log("Internet Culture Hub — Content Validation\n");
  console.log("==========================================\n");

  const { errors, warnings } = await validate();

  if (warnings.length > 0) {
    console.log(`Warnings (${warnings.length}):`);
    for (const w of warnings) {
      console.log(`  ${w}`);
    }
    console.log();
  }

  if (errors.length > 0) {
    console.log(`Errors (${errors.length}):`);
    for (const e of errors) {
      console.log(`  ${e}`);
    }
    console.log();
    console.log(`Result: FAILED — ${errors.length} error(s), ${warnings.length} warning(s)`);
    process.exit(1);
  }

  console.log(
    `Result: PASSED — 0 errors, ${warnings.length} warning(s)`
  );
}

main().catch((err) => {
  console.error("Validation script crashed:", err);
  process.exit(1);
});
