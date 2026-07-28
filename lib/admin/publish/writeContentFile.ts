/**
 * Generate and write a lib/content TypeScript entry + register indexes.
 */

import fs from "node:fs";
import path from "node:path";
import type { AIDraftCategory } from "@/lib/ai/types";
import type { ApprovedDraft, DraftPackage } from "@/lib/ai/packages";
import type { MediaItem, MediaPlatform } from "@/types";
import { allocateNextId } from "./allocateId";
import type { PublishAutoFixReport } from "./autoFix";

const ROOT = process.cwd();

const CATEGORY_META: Record<
  Exclude<AIDraftCategory, "brainrot">,
  {
    folder: string;
    typeName: string;
    arrayName: string;
    indexFile: string;
  }
> = {
  meme: {
    folder: "memes",
    typeName: "MemeEntry",
    arrayName: "memes",
    indexFile: "lib/content/memes/index.ts",
  },
  slang: {
    folder: "slang",
    typeName: "SlangEntry",
    arrayName: "slangTerms",
    indexFile: "lib/content/slang/index.ts",
  },
  event: {
    folder: "events",
    typeName: "EventEntry",
    arrayName: "events",
    indexFile: "lib/content/events/index.ts",
  },
  creator: {
    folder: "people",
    typeName: "CreatorEntry",
    arrayName: "creators",
    indexFile: "lib/content/people/index.ts",
  },
  trend: {
    folder: "trends",
    typeName: "BaseEntry",
    arrayName: "trends",
    indexFile: "lib/content/trends/index.ts",
  },
};

function toCamelCase(slug: string): string {
  return slug.replace(/-([a-z0-9])/g, (_, c: string) => c.toUpperCase());
}

function gradientFor(category: string): string {
  switch (category) {
    case "slang":
      return "from-cyan-500 via-sky-500 to-teal-600";
    case "event":
      return "from-slate-600 via-blue-600 to-indigo-800";
    case "creator":
      return "from-emerald-500 via-teal-500 to-cyan-700";
    case "trend":
      return "from-violet-600 via-indigo-500 to-slate-800";
    case "brainrot":
      return "from-purple-600 via-indigo-600 to-cyan-800";
    default:
      return "from-indigo-600 via-violet-500 to-blue-700";
  }
}

function today(): string {
  return new Date().toISOString().slice(0, 10);
}

function platformForUrl(url: string): MediaPlatform {
  if (url.includes("wikimedia.org") || url.includes("wikipedia.org")) {
    return "wikimedia";
  }
  if (url.includes("knowyourmeme.com")) return "knowyourmeme";
  if (url.includes("youtube.com") || url.includes("youtu.be")) return "youtube";
  return "other";
}

function buildMedia(pkg: DraftPackage): MediaItem[] {
  const items: MediaItem[] = [];
  let featuredTaken = false;
  for (const m of pkg.suggestedMedia) {
    if (!m.url?.trim()) continue;
    let role = m.role;
    if (role === "featured") {
      if (featuredTaken) role = "supporting";
      else featuredTaken = true;
    }
    items.push({
      role,
      type: m.type ?? (role === "reference" ? "embed" : "image"),
      url: m.url,
      title: m.title,
      source: m.source ?? "Source",
      sourceUrl: m.url,
      platform: platformForUrl(m.url),
      attribution: m.source ?? "Source",
      verified: false,
    });
  }
  return items;
}

function indent(level: number): string {
  return "  ".repeat(level);
}

function emitValue(value: unknown, level: number): string {
  if (value === null || value === undefined) return "undefined";
  if (typeof value === "string") return JSON.stringify(value);
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  if (Array.isArray(value)) {
    if (value.length === 0) return "[]";
    const lines = value.map((v) => `${indent(level + 1)}${emitValue(v, level + 1)},`);
    return `[\n${lines.join("\n")}\n${indent(level)}]`;
  }
  if (typeof value === "object") {
    const entries = Object.entries(value as Record<string, unknown>).filter(
      ([, v]) => v !== undefined,
    );
    if (entries.length === 0) return "{}";
    const lines = entries.map(
      ([k, v]) => `${indent(level + 1)}${k}: ${emitValue(v, level + 1)},`,
    );
    return `{\n${lines.join("\n")}\n${indent(level)}}`;
  }
  return "undefined";
}

function buildEntryObject(
  approved: ApprovedDraft,
  fix: PublishAutoFixReport,
  id: string,
): Record<string, unknown> {
  const pkg = approved.draftPackage;
  const scores = {
    relevance: pkg.suggestedCulturalScores.relevance ?? 50,
    influence: pkg.suggestedCulturalScores.influence ?? 45,
    cringe: pkg.suggestedCulturalScores.cringe ?? 25,
    brainrot: pkg.suggestedCulturalScores.brainrot ?? 30,
  };
  const media = buildMedia(pkg);
  const base: Record<string, unknown> = {
    id,
    slug: fix.slug,
    title: pkg.title,
    category: fix.category,
    description: pkg.summary || pkg.lead,
    imageGradient: gradientFor(fix.category),
    scores,
    addedAt: today(),
    views: 0,
    trendDirection: "new",
    sources: fix.sources,
  };
  if (media.length > 0) base.media = media;

  switch (fix.category) {
    case "meme":
      return {
        ...base,
        meaning: pkg.lead || pkg.summary,
        origin: pkg.origin,
        timeline: pkg.timeline.map((t) => ({ date: t.date, event: t.event })),
        examples:
          pkg.examples.length > 0
            ? pkg.examples
            : [`People reference ${pkg.title} as shared cultural shorthand online.`],
        relatedSlugs: fix.relatedSlugs,
      };
    case "slang":
      return {
        ...base,
        definition: pkg.lead || pkg.summary,
        origin: pkg.origin,
        usageExamples:
          pkg.examples.length > 0
            ? pkg.examples
            : [`"${pkg.title}" shows up in captions and comment threads.`],
        relatedSlugs: fix.relatedSlugs,
      };
    case "event":
      return {
        ...base,
        impact: pkg.culturalSignificance || pkg.summary,
        highlights:
          pkg.timeline.length > 0
            ? pkg.timeline.map((t) => `${t.date}: ${t.event}`).slice(0, 6)
            : [`${pkg.title} marked a notable moment in internet culture.`],
        relatedSlugs: fix.relatedSlugs,
        origin: pkg.origin,
      };
    case "creator":
      return {
        ...base,
        origin: pkg.origin,
        notableMoments:
          pkg.timeline.length > 0
            ? pkg.timeline.map((t) => `${t.date}: ${t.event}`)
            : undefined,
      };
    case "trend":
    default:
      return {
        ...base,
        origin: pkg.origin,
        relatedSlugs: fix.relatedSlugs.length ? fix.relatedSlugs : undefined,
      };
  }
}

function generateFileContents(
  typeName: string,
  importType: string,
  entry: Record<string, unknown>,
): string {
  return `import type { ${importType} } from "@/types";

const entry: ${typeName} = ${emitValue(entry, 0)};

export default entry;
`;
}

/** Undo a failed publish registration (file + index import/array entry). */
export function rollbackContentEntry(written: WriteContentResult): void {
  const absFile = path.join(ROOT, written.filePath);
  try {
    if (fs.existsSync(absFile)) fs.unlinkSync(absFile);
  } catch {
    // continue cleanup
  }
  const category = written.category as Exclude<AIDraftCategory, "brainrot">;
  const meta = CATEGORY_META[category];
  if (!meta) return;
  const indexPath = path.join(ROOT, meta.indexFile);
  try {
    let source = fs.readFileSync(indexPath, "utf8");
    const importRe = new RegExp(
      `^import ${written.importName} from "\\.\\/${written.slug}";\\n?`,
      "m",
    );
    source = source.replace(importRe, "");
    source = source.replace(
      new RegExp(`\\n\\s*${written.importName},`, "g"),
      "",
    );
    fs.writeFileSync(indexPath, source, "utf8");
  } catch {
    // best-effort
  }

  try {
    const registryPath = path.join(ROOT, "lib/content/aliases/registry.ts");
    let reg = fs.readFileSync(registryPath, "utf8");
    const aliasLine = new RegExp(
      `^\\s*${JSON.stringify(written.slug)}:\\s*\\[[^\\]]*\\],\\n?`,
      "m",
    );
    if (aliasLine.test(reg)) {
      reg = reg.replace(aliasLine, "");
      fs.writeFileSync(registryPath, reg, "utf8");
    }
  } catch {
    // best-effort
  }
}

function registerInIndex(
  indexPath: string,
  importName: string,
  relativeModule: string,
  arrayName: string,
): void {
  let source = fs.readFileSync(indexPath, "utf8");
  const importLine = `import ${importName} from "./${relativeModule}";\n`;
  if (source.includes(`from "./${relativeModule}"`)) {
    return; // already registered
  }

  // Insert import after the last import
  const importMatches = [...source.matchAll(/^import .+$/gm)];
  const lastImport = importMatches[importMatches.length - 1];
  if (!lastImport || lastImport.index === undefined) {
    throw new Error(`registerInIndex: no imports found in ${indexPath}`);
  }
  const insertAt = lastImport.index + lastImport[0].length;
  source = `${source.slice(0, insertAt)}\n${importLine.trimEnd()}${source.slice(insertAt)}`;

  // Insert into array before closing ];
  const arrayDecl = new RegExp(
    `export const ${arrayName}[\\s\\S]*?=\\s*\\[([\\s\\S]*?)\\n\\];`,
  );
  const m = source.match(arrayDecl);
  if (!m) {
    throw new Error(`registerInIndex: could not find array ${arrayName}`);
  }
  const beforeClose = source.lastIndexOf("\n];");
  if (beforeClose < 0) {
    throw new Error(`registerInIndex: could not find array close in ${indexPath}`);
  }
  // Prefer inserting before the final `];` of the exported array — find the array start
  const arrayStart = source.indexOf(`export const ${arrayName}`);
  const openBracket = source.indexOf("[", arrayStart);
  const closeBracket = source.indexOf("\n];", openBracket);
  if (openBracket < 0 || closeBracket < 0) {
    throw new Error(`registerInIndex: malformed array ${arrayName}`);
  }
  // Ensure the previous last element has a trailing comma before we append.
  let head = source.slice(0, closeBracket);
  const trimmedHead = head.replace(/\s+$/, "");
  if (!trimmedHead.endsWith(",") && !trimmedHead.endsWith("[")) {
    head = `${trimmedHead},`;
  }
  const insertion = `\n  ${importName},`;
  source = `${head}${insertion}${source.slice(closeBracket)}`;
  fs.writeFileSync(indexPath, source, "utf8");
}

function updateAliasRegistry(slug: string, aliases: string[]): void {
  if (aliases.length === 0) return;
  const registryPath = path.join(ROOT, "lib/content/aliases/registry.ts");
  let source = fs.readFileSync(registryPath, "utf8");
  if (source.includes(`"${slug}":`) || source.includes(`'${slug}':`)) {
    return;
  }
  const unique = [...new Set(aliases.map((a) => a.trim()).filter(Boolean))];
  if (unique.length === 0) return;
  const entry = `  ${JSON.stringify(slug)}: ${JSON.stringify(unique)},\n`;
  const closeIdx = source.lastIndexOf("};");
  if (closeIdx < 0) {
    throw new Error("updateAliasRegistry: malformed ALIAS_REGISTRY");
  }
  source = `${source.slice(0, closeIdx)}${entry}${source.slice(closeIdx)}`;
  fs.writeFileSync(registryPath, source, "utf8");
}

export interface WriteContentResult {
  filePath: string;
  id: string;
  slug: string;
  category: AIDraftCategory;
  importName: string;
}

/**
 * Write content file, register index, update aliases.
 */
export function writeContentEntry(
  approved: ApprovedDraft,
  fix: PublishAutoFixReport,
): WriteContentResult {
  const category = fix.category as Exclude<AIDraftCategory, "brainrot">;
  const meta = CATEGORY_META[category];
  if (!meta) {
    throw new Error(`writeContentEntry: unsupported category ${fix.category}`);
  }

  const id = allocateNextId(category);
  const importName = toCamelCase(fix.slug);
  const entry = buildEntryObject(approved, fix, id);
  const importType =
    category === "trend" ? "BaseEntry" : meta.typeName;
  const contents = generateFileContents(meta.typeName, importType, entry);

  const relFile = `lib/content/${meta.folder}/${fix.slug}.ts`;
  const absFile = path.join(ROOT, relFile);
  if (fs.existsSync(absFile)) {
    throw new Error(`writeContentEntry: file already exists: ${relFile}`);
  }
  fs.writeFileSync(absFile, contents, "utf8");

  const indexPath = path.join(ROOT, meta.indexFile);
  registerInIndex(indexPath, importName, fix.slug, meta.arrayName);

  updateAliasRegistry(fix.slug, approved.draftPackage.aliases);

  return {
    filePath: relFile,
    id,
    slug: fix.slug,
    category,
    importName,
  };
}

export interface UpdateContentOptions {
  /** Preserve live encyclopedia id. */
  existingId: string;
  /** Preserve original addedAt. */
  addedAt?: string;
  views?: number;
  trendDirection?: string;
  /** Prefer live related slugs when research has none. */
  preserveRelatedSlugs?: string[];
  preserveExamples?: string[];
}

/**
 * Overwrite an existing lib/content entry (Published Article Update).
 * Preserves id; refreshes lastUpdated; does not re-register index.
 */
export function updateContentEntry(
  approved: ApprovedDraft,
  fix: PublishAutoFixReport,
  options: UpdateContentOptions,
): WriteContentResult {
  const category = fix.category as Exclude<AIDraftCategory, "brainrot">;
  const meta = CATEGORY_META[category];
  if (!meta) {
    throw new Error(`updateContentEntry: unsupported category ${fix.category}`);
  }

  const relFile = `lib/content/${meta.folder}/${fix.slug}.ts`;
  const absFile = path.join(ROOT, relFile);
  if (!fs.existsSync(absFile)) {
    throw new Error(`updateContentEntry: file does not exist: ${relFile}`);
  }

  // Force slug to stay on the published article
  const fixedFix: PublishAutoFixReport = {
    ...fix,
    slug: fix.slug,
    relatedSlugs:
      fix.relatedSlugs.length > 0
        ? fix.relatedSlugs
        : options.preserveRelatedSlugs ?? [],
  };

  const entry = buildEntryObject(approved, fixedFix, options.existingId);
  entry.addedAt = options.addedAt ?? entry.addedAt;
  entry.views = options.views ?? entry.views;
  entry.trendDirection = options.trendDirection ?? "stable";
  entry.lastUpdated = today();

  if (
    Array.isArray(entry.examples) &&
    (entry.examples as string[]).length === 0 &&
    options.preserveExamples?.length
  ) {
    entry.examples = options.preserveExamples;
  }
  if (
    Array.isArray(entry.usageExamples) &&
    (entry.usageExamples as string[]).length === 0 &&
    options.preserveExamples?.length
  ) {
    entry.usageExamples = options.preserveExamples;
  }

  const importType = category === "trend" ? "BaseEntry" : meta.typeName;
  const contents = generateFileContents(meta.typeName, importType, entry);
  fs.writeFileSync(absFile, contents, "utf8");

  updateAliasRegistry(fix.slug, approved.draftPackage.aliases);

  return {
    filePath: relFile,
    id: options.existingId,
    slug: fix.slug,
    category,
    importName: toCamelCase(fix.slug),
  };
}
