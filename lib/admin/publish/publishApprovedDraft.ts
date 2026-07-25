/**
 * True publish: ApprovedDraft → lib/content + indexes + validate.
 * Editor approves knowledge; system performs implementation.
 */

import { execSync } from "node:child_process";
import type { ApprovedDraft } from "@/lib/ai/packages";
import { loadApprovedDraft } from "@/lib/admin/draftReview/approvedDraftStore";
import { discoverMediaSuggestions } from "@/lib/admin/research/intelligence/mediaDiscovery";
import { autoFixForPublish } from "./autoFix";
import {
  rollbackContentEntry,
  writeContentEntry,
  type WriteContentResult,
} from "./writeContentFile";

export interface PublishResult {
  ok: boolean;
  published?: WriteContentResult;
  fixes: string[];
  judgmentRequired: string[];
  validateOk?: boolean;
  validateOutput?: string;
  buildOk?: boolean;
  buildOutput?: string;
  error?: string;
}

function runCommand(command: string): { ok: boolean; output: string } {
  try {
    const output = execSync(command, {
      cwd: process.cwd(),
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
      timeout: 180_000,
    });
    return { ok: true, output: output.slice(-4000) };
  } catch (e) {
    const err = e as { stdout?: string; stderr?: string; message?: string };
    const output = `${err.stdout ?? ""}\n${err.stderr ?? err.message ?? ""}`.slice(
      -6000,
    );
    return { ok: false, output };
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

  const approved = enrichApprovedMedia(loaded);
  const fix = autoFixForPublish(approved);

  if (fix.judgmentRequired.length > 0) {
    return {
      ok: false,
      fixes: fix.fixes,
      judgmentRequired: fix.judgmentRequired,
      error: "Publish blocked — human judgment required.",
    };
  }

  // Apply slug/category/source fixes onto package before write
  const patched: ApprovedDraft = {
    ...approved,
    draftPackage: {
      ...approved.draftPackage,
      category: fix.category,
      slugSuggestion: fix.slug,
      suggestedSources: fix.sources,
      relatedTopics: fix.relatedSlugs,
    },
  };

  let written: WriteContentResult;
  try {
    written = writeContentEntry(patched, fix);
  } catch (e) {
    return {
      ok: false,
      fixes: fix.fixes,
      judgmentRequired: [],
      error: e instanceof Error ? e.message : "Failed to write content file.",
    };
  }

  const validate = runCommand("npm run validate");
  if (!validate.ok) {
    rollbackContentEntry(written);
    return {
      ok: false,
      fixes: fix.fixes,
      judgmentRequired: [
        "Validation failed after automatic fixes — draft was not left in the catalog.",
      ],
      validateOk: false,
      validateOutput: validate.output,
      error: "Publish aborted — validation failed (catalog unchanged).",
    };
  }

  // Build refresh (includes prebuild validate again)
  const build = runCommand("npm run build");
  if (!build.ok) {
    // Content validated; leave files but report build failure for the editor.
    return {
      ok: false,
      published: written,
      fixes: [
        ...fix.fixes,
        `Wrote ${written.filePath}`,
        `Registered ${written.importName} in category index`,
        "Ran npm run validate",
        "Build failed — content written; fix build errors",
      ],
      judgmentRequired: [],
      validateOk: true,
      validateOutput: validate.output,
      buildOk: false,
      buildOutput: build.output,
      error: "Content published but build failed.",
    };
  }

  return {
    ok: true,
    published: written,
    fixes: [
      ...fix.fixes,
      `Wrote ${written.filePath}`,
      `Registered ${written.importName} in category index`,
      "Ran npm run validate",
      "Ran npm run build",
    ],
    judgmentRequired: [],
    validateOk: true,
    validateOutput: validate.output,
    buildOk: true,
    buildOutput: build.output,
  };
}
