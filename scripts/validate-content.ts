/**
 * Unified content validation CLI (P0 quality gates).
 *
 * Run with: npm run validate
 *
 * Exit 0 = no errors (warnings allowed).
 * Exit 1 = one or more hard errors.
 *
 * Covers: duplicate slugs/ids, filename↔slug, relatedSlugs, required fields,
 * sources, categories, media schema, category-aware media quality (warn),
 * SEO soft checks (warn).
 */

import {
  formatValidationIssue,
  runContentValidation,
} from "../lib/content/validation/validateContent";

function main() {
  console.log("Internet Culture Hub — Unified Content Validation\n");
  console.log("=================================================\n");

  const { errors, warnings } = runContentValidation();

  if (warnings.length > 0) {
    console.log(`Warnings (${warnings.length}):`);
    for (const w of warnings) {
      console.log(`  ⚠  ${formatValidationIssue(w)}`);
    }
    console.log();
  }

  if (errors.length > 0) {
    console.log(`Errors (${errors.length}):`);
    for (const e of errors) {
      console.log(`  ✖  ${formatValidationIssue(e)}`);
    }
    console.log();
    console.log(
      `Result: FAILED — ${errors.length} error(s), ${warnings.length} warning(s)`,
    );
    process.exit(1);
  }

  console.log(
    `Result: PASSED — 0 errors, ${warnings.length} warning(s)`,
  );
}

try {
  main();
} catch (err) {
  console.error("Validation script crashed:", err);
  process.exit(1);
}
