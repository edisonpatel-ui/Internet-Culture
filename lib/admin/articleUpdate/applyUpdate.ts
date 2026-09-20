/**
 * Apply an approved article update session to lib/content.
 *
 * Scoped patch only — touches exactly the fields the diff preview showed
 * as changed. Never regenerates or overwrites scores, tags, media,
 * examples, relatedSlugs, or sources; those are Maintenance refresh's job.
 */

import fs from "node:fs";
import path from "node:path";
import { getAllEntriesSync } from "@/lib/services/entries";
import { CATEGORY_META } from "@/lib/admin/publish/writeContentFile";
import {
  revalidateAfterPublish,
  type RevalidationResult,
} from "@/lib/admin/publish/revalidatePublish";
import {
  formatValidationIssue,
  validateCandidateEntry,
} from "@/lib/content/validation";
import type { BaseEntry, ContentCategory } from "@/types";
import {
  applyScopedArticleUpdate,
} from "./applyScopedPatch";
import { deriveScopedFieldUpdates } from "./scopedFieldUpdates";
import { loadUpdateSession, saveUpdateSession } from "./store";

export interface ApplyUpdateResult {
  ok: boolean;
  filePath?: string;
  fixes: string[];
  judgmentRequired: string[];
  /** True when the in-memory validation of the patched entry passed. */
  validateOk?: boolean;
  /** Human-readable validation errors (only set when validation failed). */
  validateOutput?: string;
  /**
   * @deprecated Legacy field. Updates no longer run `npm run build`;
   * this now mirrors `revalidation.ok` so existing consumers keep working.
   */
  buildOk?: boolean;
  /** @deprecated Legacy field — now a short summary of revalidated paths. */
  buildOutput?: string;
  /** Result of the post-update `revalidatePath()` calls. */
  revalidation?: RevalidationResult;
  error?: string;
}

/** Absolute path + relative path of the content file a scoped update rewrites. */
function contentFileFor(live: BaseEntry): { rel: string; abs: string } | null {
  const category = (
    live.category === "brainrot" ? "meme" : live.category
  ) as Exclude<ContentCategory, "brainrot">;
  const meta = CATEGORY_META[category];
  if (!meta) return null;
  const rel = `lib/content/${meta.folder}/${live.slug}.ts`;
  return {
    rel,
    abs: path.join(/* turbopackIgnore: true */ process.cwd(), rel),
  };
}

export function applyArticleUpdate(sessionId: string): ApplyUpdateResult {
  const session = loadUpdateSession(sessionId);
  if (!session) {
    return {
      ok: false,
      fixes: [],
      judgmentRequired: [],
      error: `Update session not found: ${sessionId}`,
    };
  }

  const live = getAllEntriesSync().find((e) => e.slug === session.slug);
  if (!live) {
    return {
      ok: false,
      fixes: [],
      judgmentRequired: [],
      error: `Live article missing: ${session.slug}`,
    };
  }

  // Only carry over the specific fields the diff preview marked as
  // changed — the exact same derivation the preview uses, so what you
  // approved is exactly what gets written.
  const fieldUpdates = deriveScopedFieldUpdates(session);
  // Deliberately no meaning/definition/impact here — a term's core
  // definition is never touched by a scoped update, regardless of what
  // the diff might contain.

  if (Object.keys(fieldUpdates).length === 0) {
    return {
      ok: false,
      fixes: [],
      judgmentRequired: [],
      error: "Nothing to apply — no fields changed in this update.",
    };
  }

  // In-memory validation BEFORE any write: the same hard checks as
  // `npm run validate`, run on the entry as it will look after the patch.
  // The live entry is excluded from the "existing" set so it doesn't collide
  // with itself. A failure leaves the file on disk completely untouched.
  const candidate = {
    ...live,
    ...Object.fromEntries(
      Object.entries(fieldUpdates).filter(([, v]) => v !== undefined),
    ),
    lastUpdated: new Date().toISOString().slice(0, 10),
  } as BaseEntry;
  const errors = validateCandidateEntry(candidate, {
    existingEntries: getAllEntriesSync().filter((e) => e.slug !== live.slug),
    additionalKnownSlugs: [],
  });
  if (errors.length > 0) {
    return {
      ok: false,
      fixes: [],
      judgmentRequired: [],
      validateOk: false,
      validateOutput: errors.map((e) => formatValidationIssue(e)).join("\n"),
      error: "Update aborted — validation failed (file unchanged).",
    };
  }

  // Snapshot so a malformed write can be rolled back (pure fs, no shell).
  const target = contentFileFor(live);
  let snapshot: string | null = null;
  try {
    if (target) snapshot = fs.readFileSync(target.abs, "utf8");
  } catch {
    snapshot = null;
  }

  try {
    const written = applyScopedArticleUpdate(live, fieldUpdates);

    // Post-write structural sanity check: file still declares its slug + id.
    if (target && snapshot !== null) {
      const after = fs.readFileSync(target.abs, "utf8");
      const intact =
        after.includes(`slug: ${JSON.stringify(live.slug)}`) &&
        after.includes(`id: ${JSON.stringify(live.id)}`) &&
        /export default /.test(after);
      if (!intact) {
        fs.writeFileSync(target.abs, snapshot, "utf8");
        return {
          ok: false,
          filePath: written.filePath,
          fixes: [],
          judgmentRequired: [],
          validateOk: false,
          validateOutput: `${written.filePath} failed the post-write check and was restored.`,
          error: "Update aborted — post-write check failed (file restored).",
        };
      }
    }

    saveUpdateSession({ ...session, status: "applied" });

    // Replaces the old runtime `npm run build`: invalidate only the routes
    // whose output changed. Never throws (no request context ⇒ reported).
    const revalidation = revalidateAfterPublish({
      category: live.category,
      slug: live.slug,
    });

    return {
      ok: true,
      filePath: written.filePath,
      fixes: [
        `Updated ${written.fieldsChanged.join(", ")} on ${written.filePath}`,
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
  } catch (e) {
    if (target && snapshot !== null) {
      try {
        fs.writeFileSync(target.abs, snapshot, "utf8");
      } catch {
        /* best effort */
      }
    }
    return {
      ok: false,
      fixes: [],
      judgmentRequired: [],
      error: e instanceof Error ? e.message : "Update apply failed.",
    };
  }
}
