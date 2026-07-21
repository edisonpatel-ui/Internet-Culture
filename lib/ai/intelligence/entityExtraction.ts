/**
 * Entity extraction — typed cultural entities + aliases (RC3-C).
 *
 * Structures only; no NLP runtime or provider calls.
 */

export type ExtractedEntityKind =
  | "person"
  | "organization"
  | "platform"
  | "website"
  | "company"
  | "event"
  | "location"
  | "meme"
  | "slang"
  | "hashtag"
  | "community"
  | "software"
  | "product";

export interface ExtractedEntity {
  kind: ExtractedEntityKind;
  /** Canonical display name. */
  name: string;
  aliases: string[];
  /** Existing catalog slug when known. */
  catalogSlug?: string;
  notes?: string;
}

export interface EntityExtractionResult {
  topic: string;
  entities: ExtractedEntity[];
  notes: string[];
  requiresHumanReview: true;
}

export function buildEntityExtraction(
  topic: string,
  entities: ExtractedEntity[],
  notes: string[] = [],
): EntityExtractionResult {
  return {
    topic,
    entities,
    notes,
    requiresHumanReview: true,
  };
}

/** Normalize aliases: trim, drop empties, dedupe case-insensitively. */
export function normalizeEntityAliases(aliases: string[]): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const raw of aliases) {
    const a = raw.trim();
    if (!a) continue;
    const key = a.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(a);
  }
  return out;
}
