// Future per-file content format
// Entries here coexist with the existing lib/data/ system
// This file does not affect current pages

import type { MemeEntry, SlangEntry, CreatorEntry } from "@/types";

export type ContentEntry = MemeEntry | SlangEntry | CreatorEntry;
