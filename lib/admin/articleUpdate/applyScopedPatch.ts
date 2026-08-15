/**
 * Scoped article edit — patches ONLY the specific fields that actually
 * changed (description, origin, meaning/definition/impact, timeline).
 *
 * Unlike updateContentEntry (used by full publish/refresh), this never
 * touches scores, tags, media, examples, relatedSlugs, or sources —
 * those belong to Maintenance refresh and manual review, not a scoped
 * content edit request.
 */

import fs from "node:fs";
import path from "node:path";
import type { BaseEntry, ContentCategory } from "@/types";
import {
  CATEGORY_META,
  generateFileContents,
} from "@/lib/admin/publish/writeContentFile";
import type { ArticleUpdateSession } from "./store";

const ROOT = process.cwd();

export interface ScopedFieldUpdates {
  description?: string;
  origin?: string;
  meaning?: string;
  definition?: string;
  impact?: string;
  timeline?: { date: string; event: string }[];
}

export interface ScopedUpdateResult {
  filePath: string;
  fieldsChanged: string[];
}

function today(): string {
  return new Date().toISOString().slice(0, 10);
}

/**
 * The single source of truth for "what does this update session actually
 * change". Used by both the apply step and the preview, so the preview can
 * never show something different from what Approve will actually do.
 *
 * Deliberately never includes meaning/definition/impact — a term's core
 * definition is never touched by a scoped update.
 */
export function deriveScopedFieldUpdates(
  session: ArticleUpdateSession,
): ScopedFieldUpdates {
  const changed = new Map(
    session.diffs.filter((d) => d.changed).map((d) => [d.field, d]),
  );
  const fieldUpdates: ScopedFieldUpdates = {};

  if (changed.has("description")) fieldUpdates.description = changed.get("description")!.after;
  if (changed.has("origin")) fieldUpdates.origin = changed.get("origin")!.after;
  if (changed.has("timeline")) {
    fieldUpdates.timeline = session.proposedDraft.timeline.map((t) => ({
      date: t.date,
      event: t.event,
    }));
  }

  return fieldUpdates;
}

export function applyScopedArticleUpdate(
  live: BaseEntry,
  fieldUpdates: ScopedFieldUpdates,
): ScopedUpdateResult {
  const category = (
    live.category === "brainrot" ? "meme" : live.category
  ) as Exclude<ContentCategory, "brainrot">;
  const meta = CATEGORY_META[category];
  if (!meta) {
    throw new Error(`applyScopedArticleUpdate: unsupported category ${live.category}`);
  }

  const relFile = `lib/content/${meta.folder}/${live.slug}.ts`;
  const absFile = path.join(ROOT, relFile);
  if (!fs.existsSync(absFile)) {
    throw new Error(`applyScopedArticleUpdate: file does not exist: ${relFile}`);
  }

  // Start from the live entry exactly as-is — everything not explicitly
  // listed in fieldUpdates (scores, tags, media, examples, relatedSlugs,
  // sources, addedAt, views, trendDirection, id, slug) is preserved untouched.
  const entry: Record<string, unknown> = { ...live };
  const fieldsChanged: string[] = [];

  if (fieldUpdates.description !== undefined) {
    entry.description = fieldUpdates.description;
    fieldsChanged.push("description");
  }
  if (fieldUpdates.origin !== undefined) {
    entry.origin = fieldUpdates.origin;
    fieldsChanged.push("origin");
  }
  if (fieldUpdates.meaning !== undefined) {
    entry.meaning = fieldUpdates.meaning;
    fieldsChanged.push("meaning");
  }
  if (fieldUpdates.definition !== undefined) {
    entry.definition = fieldUpdates.definition;
    fieldsChanged.push("definition");
  }
  if (fieldUpdates.impact !== undefined) {
    entry.impact = fieldUpdates.impact;
    fieldsChanged.push("impact");
  }
  if (fieldUpdates.timeline !== undefined) {
    entry.timeline = fieldUpdates.timeline;
    fieldsChanged.push("timeline");
  }

  if (fieldsChanged.length === 0) {
    return { filePath: relFile, fieldsChanged: [] };
  }

  entry.lastUpdated = today();

  const importType = category === "trend" ? "BaseEntry" : meta.typeName;
  const contents = generateFileContents(meta.typeName, importType, entry);
  fs.writeFileSync(absFile, contents, "utf8");

  return { filePath: relFile, fieldsChanged };
}
