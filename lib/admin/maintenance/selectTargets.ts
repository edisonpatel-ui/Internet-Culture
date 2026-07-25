/**
 * Resolve which catalog entries a category refresh should touch.
 */

import type { BaseEntry, ContentCategory } from "@/types";
import {
  CATEGORY_LABELS,
  type MaintenanceCategoryFilter,
} from "./types";

export interface ResolvedTargets {
  entries: BaseEntry[];
  scopeLabel: string;
}

export function resolveCategoryTargets(
  catalog: BaseEntry[],
  category: MaintenanceCategoryFilter,
): ResolvedTargets {
  const entries = catalog.filter((e) => e.category === category);
  return {
    entries,
    scopeLabel: `Category: ${CATEGORY_LABELS[category]}`,
  };
}

export function categoryFilterToContentCategory(
  cat: MaintenanceCategoryFilter,
): ContentCategory {
  return cat;
}
