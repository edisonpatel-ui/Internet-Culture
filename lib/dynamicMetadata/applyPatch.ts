import fs from "node:fs";
import path from "node:path";
import type { BaseEntry, DynamicMetadata, Scores, TrendDirection } from "@/types";

const ROOT = process.cwd();

const FOLDER: Record<string, string> = {
  meme: "memes",
  slang: "slang",
  event: "events",
  creator: "creators",
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
  return { filePath: relFile };
}
