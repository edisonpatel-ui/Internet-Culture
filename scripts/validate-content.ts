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
 * article standard, prose/reference/related/SEO quality (warn), quality score.
 */

import {
  formatQualityReport,
  formatValidationIssue,
  runContentValidation,
} from "../lib/content/validation";

/** Soft ops check — does not fail the gate; surfaces SITE_URL misconfiguration risk. */
function reportSiteUrlStatus() {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (!raw) {
    console.log(
      "SITE_URL: unset — using default https://internet-culture.vercel.app",
    );
    console.log(
      "  → Set NEXT_PUBLIC_SITE_URL in production to the live origin (see .env.example).\n",
    );
    return;
  }
  console.log(`SITE_URL: ${raw}`);
  if (raw.includes("vercel.app")) {
    console.log(
      "  → Vercel hostname is fine until a custom domain is primary; then update and redeploy.\n",
    );
  } else {
    console.log("  → Custom origin set — confirm it matches live canonical URLs.\n");
  }
}

function main() {
  console.log("Internet Culture Hub — Unified Content Validation\n");
  console.log("=================================================\n");

  reportSiteUrlStatus();

  const { errors, warnings, quality } = runContentValidation();

  console.log(formatQualityReport(quality));
  console.log();

  if (warnings.length > 0) {
    // Group warning codes for a compact summary before the long list
    const byCode = new Map<string, number>();
    for (const w of warnings) {
      byCode.set(w.code, (byCode.get(w.code) ?? 0) + 1);
    }
    console.log("Warning summary by code:");
    for (const [code, count] of [...byCode.entries()].sort(
      (a, b) => b[1] - a[1],
    )) {
      console.log(`  ${code}: ${count}`);
    }
    console.log();

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
  console.log(
    "Note: Warnings teach the content standard for expansion; they do not fail the gate.",
  );
}

try {
  main();
} catch (err) {
  console.error("Validation script crashed:", err);
  process.exit(1);
}
