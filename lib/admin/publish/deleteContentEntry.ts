/**
 * Delete a published lib/content entry entirely:
 * - removes the entry's .ts file
 * - removes its import + array entry from the category index
 * - removes it from the alias registry
 * - strips it out of every other entry's `relatedSlugs` so nothing
 *   links to a page that no longer exists
 *
 * No undo — the caller is expected to confirm with the user first.
 */

import fs from "node:fs";
import path from "node:path";
import type { ContentCategory } from "@/types";
import { CATEGORY_META, toCamelCase } from "./writeContentFile";

const ROOT = process.cwd();

export interface DeleteContentResult {
  slug: string;
  category: ContentCategory;
  deletedFile: boolean;
  removedFromIndex: boolean;
  removedFromAliasRegistry: boolean;
  /** Slugs of other entries whose relatedSlugs referenced this one, now cleaned. */
  referencesCleaned: string[];
}

function removeFromIndex(
  indexPath: string,
  importName: string,
  slug: string,
): boolean {
  if (!fs.existsSync(indexPath)) return false;
  let source = fs.readFileSync(indexPath, "utf8");
  const before = source;

  const importRe = new RegExp(
    `^import ${importName} from "\\./${slug}";\\n?`,
    "m",
  );
  source = source.replace(importRe, "");
  // Remove the array entry, e.g. `\n  importName,`
  source = source.replace(new RegExp(`\\n\\s*${importName},`), "");

  if (source !== before) {
    fs.writeFileSync(indexPath, source, "utf8");
    return true;
  }
  return false;
}

function removeFromAliasRegistry(slug: string): boolean {
  const registryPath = path.join(ROOT, "lib/content/aliases/registry.ts");
  if (!fs.existsSync(registryPath)) return false;
  let source = fs.readFileSync(registryPath, "utf8");
  const before = source;
  const aliasLine = new RegExp(
    `^\\s*${JSON.stringify(slug)}:\\s*\\[[^\\]]*\\],\\n?`,
    "m",
  );
  source = source.replace(aliasLine, "");
  if (source !== before) {
    fs.writeFileSync(registryPath, source, "utf8");
    return true;
  }
  return false;
}

/**
 * Remove a slug from every other content file's `relatedSlugs: [...]` array.
 * Scoped to lines strictly inside a relatedSlugs block so it can't touch
 * unrelated text that happens to match the slug string.
 */
function cleanRelatedSlugsEverywhere(deletedSlug: string): string[] {
  const cleaned: string[] = [];
  for (const meta of Object.values(CATEGORY_META)) {
    const dir = path.join(ROOT, "lib/content", meta.folder);
    if (!fs.existsSync(dir)) continue;
    for (const name of fs.readdirSync(dir)) {
      if (!name.endsWith(".ts") || name === "index.ts") continue;
      const filePath = path.join(dir, name);
      const source = fs.readFileSync(filePath, "utf8");
      if (!source.includes(`"${deletedSlug}"`)) continue;

      const lines = source.split("\n");
      let insideRelated = false;
      let changed = false;
      const nextLines: string[] = [];
      const targetLine = `"${deletedSlug}",`;

      for (const line of lines) {
        if (!insideRelated && /relatedSlugs:\s*\[/.test(line)) {
          insideRelated = true;
          nextLines.push(line);
          continue;
        }
        if (insideRelated) {
          if (line.trim() === targetLine) {
            changed = true;
            continue; // drop this line
          }
          if (line.trim().startsWith("]")) {
            insideRelated = false;
          }
        }
        nextLines.push(line);
      }

      if (changed) {
        fs.writeFileSync(filePath, nextLines.join("\n"), "utf8");
        cleaned.push(name.replace(/\.ts$/, ""));
      }
    }
  }
  return cleaned;
}

/**
 * Deletes a published entry entirely. Immediate, no undo — confirm with
 * the user before calling this.
 */
export function deleteContentEntry(
  category: ContentCategory,
  slug: string,
): DeleteContentResult {
  const meta = CATEGORY_META[category as Exclude<ContentCategory, "brainrot">];
  if (!meta) {
    throw new Error(`deleteContentEntry: unsupported category ${category}`);
  }

  const relFile = `lib/content/${meta.folder}/${slug}.ts`;
  const absFile = path.join(ROOT, relFile);

  let deletedFile = false;
  if (fs.existsSync(absFile)) {
    fs.unlinkSync(absFile);
    deletedFile = true;
  }

  const importName = toCamelCase(slug);
  const indexPath = path.join(ROOT, meta.indexFile);
  const removedFromIndex = removeFromIndex(indexPath, importName, slug);
  const removedFromAliasRegistry = removeFromAliasRegistry(slug);
  const referencesCleaned = cleanRelatedSlugsEverywhere(slug);

  return {
    slug,
    category,
    deletedFile,
    removedFromIndex,
    removedFromAliasRegistry,
    referencesCleaned,
  };
}
