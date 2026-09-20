/**
 * True publish: ApprovedDraft → lib/content + indexes, with in-memory
 * validation before the write and `revalidatePath()` after it (no shell
 * commands are run at publish time).
 * Editor approves knowledge; system performs implementation.
 */

import type { ApprovedDraft } from "@/lib/ai/packages";
import { loadApprovedDraft } from "@/lib/admin/draftReview/approvedDraftStore";
import { discoverMediaSuggestions } from "@/lib/admin/research/intelligence/mediaDiscovery";
import { autoFixForPublish, computeDesiredSlug, checkSlugAvailability } from "./autoFix";
import {
  rollbackContentEntry,
  verifyWrittenContentEntry,
  writeContentEntry,
  type WriteContentResult,
} from "./writeContentFile";
import { revalidateAfterPublish, type RevalidationResult } from "./revalidatePublish";
import {
  validateCandidateEntry,
  formatValidationIssue,
} from "@/lib/content/validation";
import type { BaseEntry } from "@/types";

export interface PublishResult {
  ok: boolean;
  published?: WriteContentResult;
  fixes: string[];
  judgmentRequired: string[];
  /** True when the in-memory candidate validation passed. */
  validateOk?: boolean;
  /** Human-readable validation errors (only set when validation failed). */
  validateOutput?: string;
  /**
   * @deprecated Legacy field. Publishing no longer runs `npm run build`;
   * this now mirrors `revalidation.ok` so existing consumers keep working.
   */
  buildOk?: boolean;
  /** @deprecated Legacy field — now a short summary of revalidated paths. */
  buildOutput?: string;
  /** Result of the post-publish `revalidatePath()` calls. */
  revalidation?: RevalidationResult;
  error?: string;
}

/** Thrown from the pre-write hook to abort a publish with nothing on disk. */
class CandidateValidationError extends Error {
  constructor(readonly output: string) {
    super("Candidate entry failed validation");
    this.name = "CandidateValidationError";
  }
}

/**
 * Enrich draft media from discovery before writing (deterministic).
 */
function enrichApprovedMedia(approved: ApprovedDraft): ApprovedDraft {
  const pkg = approved.draftPackage;
  const discovered = discoverMediaSuggestions({
    title: pkg.title,
    slug: pkg.slugSuggestion,
    existing: pkg.suggestedMedia.map((m) => ({
      id: undefined,
      role: m.role,
      type: m.type,
      title: m.title,
      url: m.url,
      searchHint: m.searchHint,
      verified: false as const,
    })),
  });

  return {
    ...approved,
    draftPackage: {
      ...pkg,
      suggestedMedia: discovered.map((m) => ({
        role: m.role,
        type: m.type ?? "image",
        url: m.url,
        title: m.title,
        searchHint: m.searchHint,
        verified: false as const,
      })),
    },
  };
}

/**
 * Publish an approved draft into the live encyclopedia.
 */
export function publishApprovedDraft(approvedDraftId: string): PublishResult {
  const loaded = loadApprovedDraft(approvedDraftId);
  if (!loaded) {
    return {
      ok: false,
      fixes: [],
      judgmentRequired: [],
      error: `ApprovedDraft not found: ${approvedDraftId}`,
    };
  }

  // Pre-publish slug safety check — runs BEFORE any file write or
  // validation, so a duplicate slug fails fast with a clear message instead
  // of burning a full write→validate→rollback cycle (or, before this
  // check existed, silently publishing under an auto-suffixed "-2" slug
  // as a second, disconnected article about the same topic).
  const desiredSlug = computeDesiredSlug(loaded.draftPackage);
  const collision = checkSlugAvailability(desiredSlug);
  if (collision) {
    return {
      ok: false,
      fixes: [],
      judgmentRequired: [],
      error: `An article with the slug '${collision.slug}' already exists. Please merge changes into the existing article or change the title/slug.`,
    };
  }

  const approved = enrichApprovedMedia(loaded);
  const fix = autoFixForPublish(approved);

  // Apply slug/category/source/title/origin fixes onto package before write.
  // Publish is never blocked here — autoFixForPublish always resolves a
  // publishable package and records what it filled in via fix.fixes.
  const patched: ApprovedDraft = {
    ...approved,
    draftPackage: {
      ...approved.draftPackage,
      title: fix.title,
      origin: approved.draftPackage.origin.trim() || "Unknown.",
      summary: approved.draftPackage.summary.trim() || fix.title,
      category: fix.category,
      slugSuggestion: fix.slug,
      suggestedSources: fix.sources,
      relatedTopics: fix.relatedSlugs,
    },
  };

  // Full in-memory validation runs as a pre-write hook: the exact entry
  // object that would be written is checked (same hard checks as
  // `npm run validate`) BEFORE anything touches disk, so a failure leaves
  // the catalog completely unchanged — no write→validate→rollback cycle,
  // and no shelling out to npm from inside a request.
  let written: WriteContentResult;
  try {
    written = writeContentEntry(patched, fix, {
      preflight: (entry) => {
        const errors = validateCandidateEntry(entry as unknown as BaseEntry);
        if (errors.length > 0) {
          throw new CandidateValidationError(
            errors.map((e) => formatValidationIssue(e)).join("\n"),
          );
        }
      },
    });
  } catch (e) {
    if (e instanceof CandidateValidationError) {
      return {
        ok: false,
        fixes: fix.fixes,
        judgmentRequired: [
          "Validation failed after automatic fixes — draft was not left in the catalog.",
        ],
        validateOk: false,
        validateOutput: e.output,
        error: "Publish aborted — validation failed (catalog unchanged).",
      };
    }
    return {
      ok: false,
      fixes: fix.fixes,
      judgmentRequired: [],
      error: e instanceof Error ? e.message : "Failed to write content file.",
    };
  }

  // Post-write structural sanity check (file + category index registration).
  // Pure fs reads — the safety net that used to be the shell `npm run validate`
  // for the one thing in-memory validation can't see: whether the on-disk
  // registration itself is well-formed. Roll back on any problem.
  const problems = verifyWrittenContentEntry(written);
  if (problems.length > 0) {
    rollbackContentEntry(written);
    return {
      ok: false,
      fixes: fix.fixes,
      judgmentRequired: [
        "Publish registration check failed — draft was not left in the catalog.",
      ],
      validateOk: false,
      validateOutput: problems.join("\n"),
      error: "Publish aborted — content registration check failed (catalog unchanged).",
    };
  }

  // Replaces the old runtime `npm run build`: invalidate just the routes
  // whose output changed. Never throws; a missing request context (script /
  // test) is reported in the result rather than failing the publish.
  const revalidation = revalidateAfterPublish({
    category: written.category,
    slug: written.slug,
  });

  return {
    ok: true,
    published: written,
    fixes: [
      ...fix.fixes,
      `Wrote ${written.filePath}`,
      `Registered ${written.importName} in category index`,
      "Validated entry in memory (schema, sources, media, related slugs, unique slug/id)",
      revalidation.ok
        ? `Revalidated ${revalidation.paths.join(", ")}`
        : `Revalidation skipped: ${revalidation.error ?? "unknown error"}`,
    ],
    judgmentRequired: [],
    validateOk: true,
    buildOk: revalidation.ok,
    buildOutput: revalidation.ok
      ? `Revalidated: ${revalidation.paths.join(", ")}`
      : revalidation.error,
    revalidation,
  };
}
