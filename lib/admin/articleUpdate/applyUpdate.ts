/**
 * Apply an approved article update session to lib/content.
 */

import { execSync } from "node:child_process";
import { getAllEntriesSync } from "@/lib/services/entries";
import { createApprovedDraft } from "@/lib/ai/packages";
import { autoFixForPublish } from "@/lib/admin/publish/autoFix";
import { updateContentEntry } from "@/lib/admin/publish/writeContentFile";
import { loadUpdateSession, saveUpdateSession } from "./store";

export interface ApplyUpdateResult {
  ok: boolean;
  filePath?: string;
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

  const approved = createApprovedDraft({
    draftPackage: {
      ...session.proposedDraft,
      slugSuggestion: session.slug,
      relatedTopics:
        session.proposedDraft.relatedTopics.length > 0
          ? session.proposedDraft.relatedTopics
          : (live.relatedSlugs ?? []),
      suggestedSources:
        session.proposedDraft.suggestedSources.length > 0
          ? session.proposedDraft.suggestedSources
          : (live.sources ?? [])
              .filter((s) => s.url)
              .map((s) => ({ title: s.title, url: s.url })),
    },
    editorNotes: [`Applied update: ${session.request}`],
    changesMade: session.diffs
      .filter((d) => d.changed)
      .map((d) => `Updated ${d.label}`),
  });

  // For updates, skip inventing related/sources — use live fallbacks in autofix judgment
  const fix = autoFixForPublish(approved);
  // Override judgment that would block update when live article already has sources/related
  const judgmentRequired = fix.judgmentRequired.filter((j) => {
    if (j.includes("relatedSlugs") && (live.relatedSlugs?.length ?? 0) > 0) {
      return false;
    }
    if (j.includes("URL-backed sources") && (live.sources?.length ?? 0) > 0) {
      return false;
    }
    if (j.includes("researchFailed")) return false;
    return true;
  });

  if (judgmentRequired.length > 0) {
    return {
      ok: false,
      fixes: fix.fixes,
      judgmentRequired,
    };
  }

  const liveMeme = live as typeof live & { examples?: string[]; usageExamples?: string[] };

  try {
    const written = updateContentEntry(
      approved,
      {
        ...fix,
        slug: session.slug,
        category: live.category === "brainrot" ? "meme" : (live.category as typeof fix.category),
        relatedSlugs:
          fix.relatedSlugs.length > 0
            ? fix.relatedSlugs
            : live.relatedSlugs ?? [],
        sources:
          fix.sources.length > 0
            ? fix.sources
            : (live.sources ?? [])
                .filter((s) => s.url)
                .map((s) => ({
                  title: s.title,
                  url: s.url,
                  domain: undefined,
                })),
      },
      {
        existingId: live.id,
        addedAt: live.addedAt,
        views: live.views,
        trendDirection: live.trendDirection,
        preserveRelatedSlugs: live.relatedSlugs,
        preserveExamples: liveMeme.examples ?? liveMeme.usageExamples,
      },
    );

    const validate = runCommand("npm run validate");
    if (!validate.ok) {
      return {
        ok: false,
        filePath: written.filePath,
        fixes: fix.fixes,
        judgmentRequired: [],
        validateOk: false,
        validateOutput: validate.output,
        error: "Validation failed after update write.",
      };
    }

    const build = runCommand("npm run build");
    saveUpdateSession({ ...session, status: "applied" });

    return {
      ok: build.ok,
      filePath: written.filePath,
      fixes: [
        ...fix.fixes,
        `Updated existing entry ${written.filePath} (id ${written.id})`,
      ],
      judgmentRequired: [],
      validateOk: true,
      validateOutput: validate.output,
      buildOk: build.ok,
      buildOutput: build.output,
      error: build.ok ? undefined : "Build failed after update.",
    };
  } catch (e) {
    return {
      ok: false,
      fixes: fix.fixes,
      judgmentRequired: [],
      error: e instanceof Error ? e.message : "Update apply failed.",
    };
  }
}
