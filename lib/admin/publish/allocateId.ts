/**
 * Allocate the next catalog id for a category (deterministic).
 */

import { buildCatalog } from "@/lib/content/validation/catalog";
import type { AIDraftCategory } from "@/lib/ai/types";

const PREFIX: Record<AIDraftCategory, string> = {
  meme: "m",
  slang: "s",
  event: "e",
  creator: "cr",
  trend: "t",
  brainrot: "br",
};

export function allocateNextId(category: AIDraftCategory): string {
  const prefix = PREFIX[category] ?? "m";
  const { entries } = buildCatalog();
  const allIds = new Set(entries.map((e) => e.id));

  let max = 0;
  for (const id of allIds) {
    if (!id.startsWith(prefix)) continue;
    const rest = id.slice(prefix.length);
    if (!/^\d+$/.test(rest)) continue;
    const n = Number.parseInt(rest, 10);
    if (n > max) max = n;
  }

  let next = max + 1;
  let candidate = `${prefix}${next}`;
  while (allIds.has(candidate)) {
    next += 1;
    candidate = `${prefix}${next}`;
  }
  return candidate;
}
