/**
 * ContentEntry — union of all strongly-typed entry types.
 *
 * Used when a function must accept any entry regardless of category.
 * When adding a new category, extend this union.
 */

import type { MemeEntry, SlangEntry, CreatorEntry, EventEntry, BaseEntry } from "@/types";

export type ContentEntry = MemeEntry | SlangEntry | CreatorEntry | EventEntry | BaseEntry;
