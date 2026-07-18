/**
 * Alias helpers for search, validation, and SEO phrase resolution.
 */

import { ALIAS_REGISTRY, type AliasRegistry } from "./registry";

export type { AliasRegistry };
export { ALIAS_REGISTRY };

export interface AliasEntry {
  slug: string;
  aliases: readonly string[];
}

function normalizeAlias(value: string): string {
  return value.toLowerCase().replace(/\s+/g, " ").trim();
}

/** All registry rows. */
export function getAllAliasEntries(
  registry: AliasRegistry = ALIAS_REGISTRY,
): AliasEntry[] {
  return Object.entries(registry).map(([slug, aliases]) => ({
    slug,
    aliases,
  }));
}

/** Aliases for a canonical slug (empty if none). */
export function getAliases(
  slug: string,
  registry: AliasRegistry = ALIAS_REGISTRY,
): readonly string[] {
  return registry[slug] ?? [];
}

/**
 * Resolve a search query to matching canonical slugs via alias phrases.
 * Exact alias match ranks above substring containment.
 */
export function resolveAliasQuery(
  query: string,
  registry: AliasRegistry = ALIAS_REGISTRY,
): Array<{ slug: string; alias: string; exact: boolean }> {
  const q = normalizeAlias(query);
  if (!q) return [];

  const hits: Array<{ slug: string; alias: string; exact: boolean }> = [];

  for (const [slug, aliases] of Object.entries(registry)) {
    for (const alias of aliases) {
      const a = normalizeAlias(alias);
      if (!a) continue;
      if (a === q) {
        hits.push({ slug, alias, exact: true });
      } else if (a.includes(q) || q.includes(a)) {
        hits.push({ slug, alias, exact: false });
      }
    }
  }

  return hits.sort((x, y) => Number(y.exact) - Number(x.exact));
}

export interface AliasValidationIssue {
  code: "ALIAS_UNKNOWN_SLUG" | "ALIAS_COLLISION";
  message: string;
  slug?: string;
}

/**
 * Validate registry integrity against the live catalog slug set.
 * - Unknown slug keys → warning
 * - Same normalized alias claimed by two slugs → warning
 */
export function validateAliasRegistry(
  knownSlugs: ReadonlySet<string>,
  registry: AliasRegistry = ALIAS_REGISTRY,
): AliasValidationIssue[] {
  const issues: AliasValidationIssue[] = [];
  const aliasOwners = new Map<string, string>();

  for (const [slug, aliases] of Object.entries(registry)) {
    if (!knownSlugs.has(slug)) {
      issues.push({
        code: "ALIAS_UNKNOWN_SLUG",
        slug,
        message: `Alias registry key "${slug}" does not match any catalog entry`,
      });
    }

    for (const alias of aliases) {
      const key = normalizeAlias(alias);
      if (!key) continue;
      const owner = aliasOwners.get(key);
      if (owner && owner !== slug) {
        issues.push({
          code: "ALIAS_COLLISION",
          slug,
          message: `Alias "${alias}" is claimed by both "${owner}" and "${slug}"`,
        });
      } else {
        aliasOwners.set(key, slug);
      }
    }
  }

  return issues;
}
