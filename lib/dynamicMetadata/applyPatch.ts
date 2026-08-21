import fs from "node:fs";
import path from "node:path";
import type { BaseEntry, DynamicMetadata, MediaItem, Scores, TrendDirection } from "@/types";

const ROOT = process.cwd();

const FOLDER: Record<string, string> = {
  meme: "memes",
  slang: "slang",
  event: "events",
  creator: "people",
  trend: "trends",
  brainrot: "brainrot",
};

function emitValue(value: unknown, level: number): string {
  const pad = "  ".repeat(level);
  if (value === null) return "null";
  if (value === undefined) return "undefined";
  if (typeof value === "string") return JSON.stringify(value);
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  if (Array.isArray(value)) {
    if (value.length === 0) return "[]";
    const lines = value.map(
      (v) => `${pad}  ${emitValue(v, level + 1)},`,
    );
    return `[\n${lines.join("\n")}\n${pad}]`;
  }
  if (typeof value === "object") {
    const entries = Object.entries(value as Record<string, unknown>).filter(
      ([, v]) => v !== undefined,
    );
    if (entries.length === 0) return "{}";
    const lines = entries.map(
      ([k, v]) => `${pad}  ${k}: ${emitValue(v, level + 1)},`,
    );
    return `{\n${lines.join("\n")}\n${pad}}`;
  }
  return "undefined";
}

export interface DynamicFieldPatch {
  scores: Scores;
  trendDirection: TrendDirection;
  lastUpdated: string;
  dynamicMetadata: DynamicMetadata;
  status?: BaseEntry["status"];
}

/**
 * Surgically patch only dynamic fields in a lib/content entry file.
 * Does not touch definition/origin/timeline/sources/media/etc.
 *
 * Also updates the in-memory `entry` object. Next.js keeps imported content
 * modules cached for the process lifetime — disk-only writes leave
 * getAllEntriesSync() / homepage / admin serving stale scores until restart.
 */
export function applyDynamicMetadataPatch(
  entry: BaseEntry,
  patch: DynamicFieldPatch,
): { filePath: string } {
  const folder = FOLDER[entry.category];
  if (!folder) {
    throw new Error(`Unsupported category for dynamic patch: ${entry.category}`);
  }

  const relFile = `lib/content/${folder}/${entry.slug}.ts`;
  const absFile = path.join(ROOT, relFile);
  if (!fs.existsSync(absFile)) {
    throw new Error(`Content file not found: ${relFile}`);
  }

  let source = fs.readFileSync(absFile, "utf8");

  const scoresBlock = `scores: { relevance: ${patch.scores.relevance}, influence: ${patch.scores.influence}, cringe: ${patch.scores.cringe}, brainrot: ${patch.scores.brainrot} },`;
  if (!/scores:\s*\{[^}]*\}/.test(source)) {
    throw new Error(`Could not locate scores block in ${relFile}`);
  }
  source = source.replace(/scores:\s*\{[^}]*\},?/, scoresBlock);

  if (/trendDirection:\s*"[^"]*"/.test(source)) {
    source = source.replace(
      /trendDirection:\s*"[^"]*"/,
      `trendDirection: "${patch.trendDirection}"`,
    );
  }

  if (/lastUpdated:\s*"[^"]*"/.test(source)) {
    source = source.replace(
      /lastUpdated:\s*"[^"]*"/,
      `lastUpdated: "${patch.lastUpdated}"`,
    );
  } else {
    // Insert after addedAt when present
    source = source.replace(
      /(addedAt:\s*"[^"]*",)/,
      `$1\n  lastUpdated: "${patch.lastUpdated}",`,
    );
  }

  const metaLiteral = `dynamicMetadata: ${emitValue(patch.dynamicMetadata, 1)},`;
  if (/dynamicMetadata:\s*\{[\s\S]*?\n  \},/.test(source)) {
    source = source.replace(
      /dynamicMetadata:\s*\{[\s\S]*?\n  \},/,
      metaLiteral,
    );
  } else if (/dynamicMetadata:\s*\{[^}]*\},/.test(source)) {
    source = source.replace(/dynamicMetadata:\s*\{[^}]*\},/, metaLiteral);
  } else {
    source = source.replace(
      /(scores:\s*\{[^}]*\},)/,
      `$1\n  ${metaLiteral}`,
    );
  }

  if (patch.status) {
    if (/status:\s*"[^"]*"/.test(source)) {
      source = source.replace(/status:\s*"[^"]*"/, `status: "${patch.status}"`);
    }
  }

  fs.writeFileSync(absFile, source, "utf8");

  // Verify the write landed — do not report success on a no-op replace.
  const written = fs.readFileSync(absFile, "utf8");
  const relevanceMatch = written.match(
    /scores:\s*\{\s*relevance:\s*(\d+)/,
  );
  const writtenRelevance = relevanceMatch ? Number(relevanceMatch[1]) : null;
  if (writtenRelevance !== patch.scores.relevance) {
    throw new Error(
      `Disk write verification failed for ${relFile}: expected relevance ${patch.scores.relevance}, found ${writtenRelevance}`,
    );
  }
  if (!/dynamicMetadata\s*:/.test(written)) {
    throw new Error(
      `Disk write verification failed for ${relFile}: dynamicMetadata block missing after write`,
    );
  }

  // Keep the running catalog in sync (same object identity as imports).
  entry.scores = { ...patch.scores };
  entry.trendDirection = patch.trendDirection;
  entry.lastUpdated = patch.lastUpdated;
  entry.dynamicMetadata = { ...patch.dynamicMetadata };
  if (patch.status) {
    entry.status = patch.status;
  }

  return { filePath: relFile };
}

/**
 * Backfill media ONLY for an entry that currently has none at all.
 *
 * Deliberately narrow: this must NEVER touch a `media:` array that already
 * exists on disk. Existing arrays routinely contain hand-written comments,
 * curated ordering, and — critically — `verified: true` items a human
 * already confirmed; a regex-based rewrite (the same technique used for
 * `scores`/`dynamicMetadata`, which are pure computed data with no
 * human-authored content) would risk silently destroying that curation or
 * overwriting a verified image with an unverified AI guess. So instead of a
 * general "refresh media" patch, this only ever performs a one-time INSERT
 * of a brand-new `media: [...]` array into a file that has none — safe
 * because there is nothing on disk to lose. An entry that already has any
 * media (verified or not) is left completely alone; call sites are
 * responsible for only invoking this when `entry.media` is empty/undefined.
 */
export function applyMediaBackfillPatch(
  entry: BaseEntry,
  media: MediaItem[],
): { filePath: string; inserted: boolean } {
  if (media.length === 0) {
    return { filePath: "", inserted: false };
  }

  const folder = FOLDER[entry.category];
  if (!folder) {
    throw new Error(`Unsupported category for media backfill: ${entry.category}`);
  }

  const relFile = `lib/content/${folder}/${entry.slug}.ts`;
  const absFile = path.join(ROOT, relFile);
  if (!fs.existsSync(absFile)) {
    throw new Error(`Content file not found: ${relFile}`);
  }

  let source = fs.readFileSync(absFile, "utf8");

  // Refuse if a media array already exists in ANY form — this function is
  // insert-only-when-absent, by design (see docstring above).
  if (/\bmedia\s*:\s*\[/.test(source)) {
    return { filePath: relFile, inserted: false };
  }

  const mediaLiteral = `media: ${emitValue(media, 1)},`;

  // Insert right after the scores block (dynamicMetadata does the same),
  // or after dynamicMetadata if that's already present, so field order
  // stays consistent with how the rest of this module writes entries.
  if (/dynamicMetadata:\s*\{[\s\S]*?\n  \},/.test(source)) {
    source = source.replace(
      /(dynamicMetadata:\s*\{[\s\S]*?\n  \},)/,
      `$1\n  ${mediaLiteral}`,
    );
  } else if (/scores:\s*\{[^}]*\},/.test(source)) {
    source = source.replace(
      /(scores:\s*\{[^}]*\},)/,
      `$1\n  ${mediaLiteral}`,
    );
  } else {
    throw new Error(
      `Could not find a safe insertion point for media in ${relFile}`,
    );
  }

  fs.writeFileSync(absFile, source, "utf8");

  const written = fs.readFileSync(absFile, "utf8");
  if (!/\bmedia\s*:\s*\[/.test(written)) {
    throw new Error(
      `Disk write verification failed for ${relFile}: media block missing after insert`,
    );
  }

  entry.media = media;
  return { filePath: relFile, inserted: true };
}

/**
 * Append ONE new media item to an EXISTING `media: [...]` array — for the
 * "entry has media, but nothing with role 'featured'" case. Unlike
 * applyMediaBackfillPatch (insert-only-when-absent), this must touch an
 * array that's already there, so it's careful to only ADD a line rather
 * than regenerate the whole block: it locates the array's own closing
 * `\n  ],` (2-space indent — every top-level field in these files, and the
 * array's closing bracket, sits at that indent; item objects and anything
 * nested inside them sit at 4-space+ indent, so this can't be confused with
 * a closing bracket belonging to something nested inside an item) and
 * splices the new item in just before it, leaving every existing item,
 * comment, and verified:true entry byte-for-byte untouched.
 *
 * Returns applied:false (no-op, throws nothing) if there's no existing
 * media array to append to — callers should use applyMediaBackfillPatch
 * for that case instead.
 */
export function applyMediaFixPatch(
  entry: BaseEntry,
  candidate: MediaItem,
): { filePath: string; applied: boolean } {
  const folder = FOLDER[entry.category];
  if (!folder) {
    throw new Error(`Unsupported category for media fix: ${entry.category}`);
  }

  const relFile = `lib/content/${folder}/${entry.slug}.ts`;
  const absFile = path.join(ROOT, relFile);
  if (!fs.existsSync(absFile)) {
    throw new Error(`Content file not found: ${relFile}`);
  }

  let source = fs.readFileSync(absFile, "utf8");

  const arrayMatch = source.match(/media:\s*\[[\s\S]*?\n  \],/);
  if (!arrayMatch) {
    // No existing array — not this function's job.
    return { filePath: relFile, applied: false };
  }
  const original = arrayMatch[0];

  // Never touch an array that already has a featured item — this function
  // is specifically for backfilling a MISSING featured slot, never for
  // replacing one that already exists (that's exactly the unnecessary
  // replacement of already-good media the review workflow must avoid).
  if (/role:\s*["']featured["']/.test(original)) {
    return { filePath: relFile, applied: false };
  }

  const itemBlock = "    " + emitValue(candidate, 2) + ",";
  const patched = original.replace(/\n  \],$/, `\n${itemBlock}\n  ],`);
  if (patched === original) {
    // Closing bracket pattern didn't match as expected — bail out rather
    // than silently writing something malformed.
    return { filePath: relFile, applied: false };
  }

  source = source.replace(original, patched);
  fs.writeFileSync(absFile, source, "utf8");

  const written = fs.readFileSync(absFile, "utf8");
  if (!written.includes(candidate.url)) {
    throw new Error(
      `Disk write verification failed for ${relFile}: new media item missing after append`,
    );
  }

  entry.media = [...(entry.media ?? []), candidate];
  return { filePath: relFile, applied: true };
}
