/**
 * Apply an approved article update session to lib/content.
 *
 * Scoped patch only — touches exactly the fields the diff preview showed
 * as changed. Never regenerates or overwrites scores, tags, media,
 * examples, relatedSlugs, or sources; those are Maintenance refresh's job.
 */

import { execSync } from "node:child_process";
import { getAllEntriesSync } from "@/lib/services/entries";
import { applyScopedArticleUpdate } from "./applyScopedPatch";
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

  // Only carry over the specific fields the diff preview marked as
  // changed. "summary" / "culturalSignificance" are preview-only labels
  // with no direct on-disk field — they never trigger a write on their own.
  const changed = new Map(session.diffs.filter((d) => d.changed).map((d) => [d.field, d]));
  const fieldUpdates: Parameters<typeof applyScopedArticleUpdate>[1] = {};

  if (changed.has("description")) fieldUpdates.description = changed.get("description")!.after;
  if (changed.has("origin")) fieldUpdates.origin = changed.get("origin")!.after;
  if (changed.has("meaning")) fieldUpdates.meaning = changed.get("meaning")!.after;
  if (changed.has("definition")) fieldUpdates.definition = changed.get("definition")!.after;
  if (changed.has("impact")) fieldUpdates.impact = changed.get("impact")!.after;
  if (changed.has("timeline")) {
    fieldUpdates.timeline = session.proposedDraft.timeline.map((t) => ({
      date: t.date,
      event: t.event,
    }));
  }

  if (Object.keys(fieldUpdates).length === 0) {
    return {
      ok: false,
      fixes: [],
      judgmentRequired: [],
      error: "Nothing to apply — no fields changed in this update.",
    };
  }

  try {
    const written = applyScopedArticleUpdate(live, fieldUpdates);

    const validate = runCommand("npm run validate");
    if (!validate.ok) {
      return {
        ok: false,
        filePath: written.filePath,
        fixes: [],
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
        `Updated ${written.fieldsChanged.join(", ")} on ${written.filePath}`,
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
      fixes: [],
      judgmentRequired: [],
      error: e instanceof Error ? e.message : "Update apply failed.",
    };
  }
}

