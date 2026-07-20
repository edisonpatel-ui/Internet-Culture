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
