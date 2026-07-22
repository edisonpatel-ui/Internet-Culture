/**
 * Map DraftPackage → BaseEntry for shared public components.
 * Presentation path prefers draftPackageToPresentationArticle.
 */

import type { DraftPackage } from "@/lib/ai/packages";
import type { BaseEntry } from "@/types";
import { draftPackageToPresentationArticle } from "./presentationArticle";

/**
 * Build a BaseEntry used only for article preview rendering.
 */
export function draftPackageToPreviewEntry(draft: DraftPackage): BaseEntry {
  return draftPackageToPresentationArticle(draft).entry;
}
