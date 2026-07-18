import type { BaseEntry, CreatorEntry, EventEntry, RelationshipMap } from "@/types";
import {
  RELATION_REASON_LABELS,
  type RelatedRecommendation,
  type RelationReasonId,
} from "@/lib/intelligence/types";
import { getEntryYear } from "@/lib/intelligence/culturalScores";

const DEFAULT_LIMIT = 6;

/** Auto-fill must clear this bar — fewer high-quality links beat random filler. */
const AUTO_SCORE_THRESHOLD = 20;

/** Tag clusters that imply a shared cultural movement. */
const MOVEMENT_CLUSTERS: string[][] = [
  ["gen alpha", "brainrot", "skibidi", "ohio"],
  ["looksmaxxing", "mewing", "sigma", "mogging", "frame"],
  ["amp", "rizz", "fanum", "gyatt", "streaming"],
  ["classic", "rage", "advice animal", "macro"],
  ["aave", "black twitter", "hip-hop"],
  ["football", "soccer", "messi", "ronaldo"],
  ["ballroom", "drag", "slay"],
  ["k-pop", "fandom", "delulu"],
];

/** Explicit RelationshipMap key → reason + base score. */
const RELATIONSHIP_EDGE_SCORES: Array<{
  key: keyof RelationshipMap;
  reason: RelationReasonId;
  score: number;
}> = [
  { key: "memberOf", reason: "member-of", score: 95 },
  { key: "popularized", reason: "popularized", score: 92 },
  { key: "popularizedBy", reason: "popularized", score: 90 },
  { key: "originated", reason: "originated", score: 92 },
  { key: "originatedFrom", reason: "originated", score: 90 },
  { key: "inspiredBy", reason: "inspired-by", score: 88 },
  { key: "spawnedVariants", reason: "inspired-by", score: 86 },
  { key: "relatedSlang", reason: "related-slang", score: 88 },
  { key: "relatedEvent", reason: "related-event", score: 88 },
  { key: "sameFormat", reason: "same-format", score: 82 },
  { key: "sameEra", reason: "same-era", score: 78 },
  { key: "community", reason: "community", score: 80 },
  { key: "relatedTo", reason: "cultural-connection", score: 75 },
];

interface ScoreBreakdown {
  total: number;
  reason: RelationReasonId;
}

function normalizeTags(entry: BaseEntry): string[] {
  return (entry.tags ?? []).map((t) => t.toLowerCase().trim()).filter(Boolean);
}

function sharedTagCount(a: BaseEntry, b: BaseEntry): string[] {
  const setB = new Set(normalizeTags(b));
  return normalizeTags(a).filter((t) => setB.has(t));
}

function textBlob(entry: BaseEntry): string {
  return [
    entry.title,
    entry.description,
    entry.origin ?? "",
    entry.creator ?? "",
    ...(entry.tags ?? []),
  ]
    .join(" ")
    .toLowerCase();
}

function isCreator(entry: BaseEntry): entry is CreatorEntry {
  return entry.category === "creator";
}

function isEvent(entry: BaseEntry): entry is EventEntry {
  return entry.category === "event";
}

function creatorPlatforms(entry: BaseEntry): string[] {
  if (!isCreator(entry) || !entry.platforms) return [];
  return entry.platforms.map((p) => p.platform.toLowerCase());
}

function sharedPlatforms(a: BaseEntry, b: BaseEntry): string[] {
  const pa = new Set(creatorPlatforms(a));
  return creatorPlatforms(b).filter((p) => pa.has(p));
}

function movementOverlap(a: BaseEntry, b: BaseEntry): boolean {
  const blobA = textBlob(a);
  const blobB = textBlob(b);
  const tagsA = normalizeTags(a);
  const tagsB = normalizeTags(b);

  for (const cluster of MOVEMENT_CLUSTERS) {
    const hitA = cluster.some(
      (k) => blobA.includes(k) || tagsA.some((t) => t.includes(k)),
    );
    const hitB = cluster.some(
      (k) => blobB.includes(k) || tagsB.some((t) => t.includes(k)),
    );
    if (hitA && hitB) return true;
  }
  return false;
}

function yearsClose(a: BaseEntry, b: BaseEntry, window = 3): boolean {
  const ya = getEntryYear(a);
  const yb = getEntryYear(b);
  if (ya === null || yb === null) return false;
  return Math.abs(ya - yb) <= window;
}

function creatorConnection(a: BaseEntry, b: BaseEntry): boolean {
  const aCreator = (a.creator ?? "").toLowerCase();
  const bCreator = (b.creator ?? "").toLowerCase();
  if (aCreator && bCreator && aCreator === bCreator) return true;

  if (a.category === "creator") {
    const name = a.title.toLowerCase();
    const slug = a.slug.replace(/-/g, " ");
    const blob = textBlob(b);
    if (blob.includes(name) || blob.includes(slug) || blob.includes(a.slug)) {
      return true;
    }
  }
  if (b.category === "creator") {
    const name = b.title.toLowerCase();
    const slug = b.slug.replace(/-/g, " ");
    const blob = textBlob(a);
    if (blob.includes(name) || blob.includes(slug) || blob.includes(b.slug)) {
      return true;
    }
  }

  return false;
}

function similarMeaning(a: BaseEntry, b: BaseEntry): boolean {
  if (a.category !== "slang" || b.category !== "slang") return false;
  const shared = sharedTagCount(a, b);
  if (shared.length >= 2) return true;
  const meaningTags = [
    "dating",
    "relationships",
    "compliment",
    "insult",
    "doom",
    "food",
    "football",
    "gaming",
  ];
  const tagsA = normalizeTags(a);
  const tagsB = normalizeTags(b);
  return meaningTags.some((t) => tagsA.includes(t) && tagsB.includes(t));
}

/**
 * Collect explicit typed relationship edges from source → target slug.
 */
function collectRelationshipEdges(
  source: BaseEntry,
): Map<string, { reason: RelationReasonId; score: number }> {
  const map = new Map<string, { reason: RelationReasonId; score: number }>();
  const rel = source.relationships;
  if (!rel) return map;

  for (const edge of RELATIONSHIP_EDGE_SCORES) {
    const list = rel[edge.key];
    if (!list) continue;
    for (const slug of list) {
      const existing = map.get(slug);
      if (!existing || edge.score > existing.score) {
        map.set(slug, { reason: edge.reason, score: edge.score });
      }
    }
  }

  return map;
}

/**
 * Incoming edges: other entries that list this slug in relationships.*.
 * Makes the graph bidirectional without duplicating editorial data.
 */
function collectIncomingRelationshipEdges(
  source: BaseEntry,
  catalog: readonly BaseEntry[],
): Map<string, { reason: RelationReasonId; score: number }> {
  const map = new Map<string, { reason: RelationReasonId; score: number }>();

  for (const candidate of catalog) {
    if (candidate.slug === source.slug) continue;
    const outbound = collectRelationshipEdges(candidate);
    const hit = outbound.get(source.slug);
    if (!hit) continue;
    // Slightly below outbound so explicit source→target still wins ties
    const score = Math.max(72, hit.score - 4);
    const existing = map.get(candidate.slug);
    if (!existing || score > existing.score) {
      map.set(candidate.slug, { reason: hit.reason, score });
    }
  }

  return map;
}

/**
 * Score how related two entries are and pick the strongest explainable reason.
 * Returns null when there is no logical signal above the threshold.
 */
function scorePair(
  source: BaseEntry,
  candidate: BaseEntry,
): ScoreBreakdown | null {
  if (source.slug === candidate.slug) return null;

  let total = 0;
  const reasons: { reason: RelationReasonId; weight: number }[] = [];

  const add = (reason: RelationReasonId, weight: number) => {
    if (weight <= 0) return;
    total += weight;
    reasons.push({ reason, weight });
  };

  const sourceLinks = new Set(source.relatedSlugs ?? []);
  const candidateLinks = new Set(candidate.relatedSlugs ?? []);
  if (sourceLinks.has(candidate.slug) && candidateLinks.has(source.slug)) {
    add("mutual-link", 40);
  } else if (sourceLinks.has(candidate.slug)) {
    add("editorial", 50);
  } else if (candidateLinks.has(source.slug)) {
    add("mutual-link", 35);
  }

  const shared = sharedTagCount(source, candidate);
  if (shared.length > 0) {
    add("shared-tags", Math.min(30, shared.length * 12));
  }

  if (creatorConnection(source, candidate)) {
    add("creator-connection", 28);
  }

  const platforms = sharedPlatforms(source, candidate);
  if (platforms.length > 0) {
    // Same platform alone is weak for creator↔creator filler
    if (source.category === "creator" && candidate.category === "creator") {
      add("same-platform", 8 + platforms.length * 2);
      if (shared.some((t) => ["amp", "streaming", "twitch"].includes(t))) {
        add("collaboration", 16);
        add("audience-overlap", 10);
      } else if (movementOverlap(source, candidate)) {
        add("same-movement", 18);
      }
    } else {
      add("same-platform", 18 + platforms.length * 4);
    }
  }

  if (isEvent(source) && isEvent(candidate)) {
    const p1 = (source.platform ?? "").toLowerCase();
    const p2 = (candidate.platform ?? "").toLowerCase();
    if (p1 && p2 && (p1.includes(p2) || p2.includes(p1))) {
      add("same-platform", 20);
    }
  }

  if (yearsClose(source, candidate)) {
    add("same-era", 16);
  }

  if (movementOverlap(source, candidate)) {
    add("same-movement", 22);
  }

  if (similarMeaning(source, candidate)) {
    add("similar-meaning", 24);
  }

  // Prefer direct cultural / community links over bare same-category
  if (
    source.category !== candidate.category &&
    (shared.length > 0 ||
      creatorConnection(source, candidate) ||
      movementOverlap(source, candidate))
  ) {
    add("cultural-connection", 18);
  }

  const communityTags = [
    "amp",
    "twitch",
    "streaming",
    "gen alpha",
    "brainrot",
    "looksmaxxing",
    "crypto",
  ];
  if (
    communityTags.some(
      (t) =>
        normalizeTags(source).includes(t) &&
        normalizeTags(candidate).includes(t),
    )
  ) {
    add("community", 20);
  }

  if (source.category === "meme" && candidate.category === "meme") {
    const formatTags = ["classic", "reaction", "macro", "image macro", "rage"];
    if (
      formatTags.some(
        (t) =>
          normalizeTags(source).includes(t) &&
          normalizeTags(candidate).includes(t),
      )
    ) {
      add("format", 18);
      add("same-format", 10);
    }
  }

  // Same audience signal (Gen Alpha / streamer / classic millennial internet)
  const audiencePairs: string[][] = [
    ["gen alpha", "brainrot", "skibidi"],
    ["streaming", "twitch", "amp"],
    ["classic", "advice animal", "rage"],
  ];
  const blobA = textBlob(source);
  const blobB = textBlob(candidate);
  for (const group of audiencePairs) {
    const aHit = group.some((k) => blobA.includes(k));
    const bHit = group.some((k) => blobB.includes(k));
    if (aHit && bHit) {
      add("audience-overlap", 16);
      break;
    }
  }

  if (
    (source.category === "event" || candidate.category === "event") &&
    (shared.length > 0 || yearsClose(source, candidate, 2))
  ) {
    add("cultural-connection", 12);
  }

  // Creator↔creator without collaboration / movement / member signals: reject weak pairs
  if (
    source.category === "creator" &&
    candidate.category === "creator" &&
    !movementOverlap(source, candidate) &&
    !shared.some((t) => ["amp", "streaming", "collaboration"].includes(t)) &&
    total < 36
  ) {
    return null;
  }

  if (total < AUTO_SCORE_THRESHOLD) return null;

  reasons.sort((a, b) => b.weight - a.weight);
  const top = reasons[0]?.reason ?? "cultural-connection";

  return { total, reason: top };
}

function bestReasonForCurated(
  auto: ScoreBreakdown | null,
): RelationReasonId {
  if (!auto) return "editorial";
  if (auto.reason === "cultural-connection" || auto.reason === "editorial") {
    return "editorial";
  }
  return auto.reason;
}

/**
 * Build related recommendations for an entry.
 *
 * Priority:
 * 1. Explicit relationships.* edges (typed cultural links)
 * 2. Curated relatedSlugs
 * 3. Automatic scored matches above confidence threshold
 *
 * Does not pad to `limit` with weak matches — fewer high-quality links is better.
 */
export function getRelatedRecommendations(
  source: BaseEntry,
  catalog: readonly BaseEntry[],
  limit = DEFAULT_LIMIT,
): RelatedRecommendation[] {
  const bySlug = new Map(catalog.map((e) => [e.slug, e]));
  const picked = new Map<string, RelatedRecommendation>();

  const mergeEdge = (
    slug: string,
    edge: { reason: RelationReasonId; score: number },
    base: number,
  ) => {
    const entry = bySlug.get(slug);
    if (!entry || entry.slug === source.slug) return;
    const next = {
      entry,
      score: base + edge.score,
      reason: edge.reason,
      reasonLabel: RELATION_REASON_LABELS[edge.reason],
    };
    const prev = picked.get(entry.slug);
    if (!prev || next.score > prev.score) {
      picked.set(entry.slug, next);
    }
  };

  // 1) Typed relationship edges (outbound)
  for (const [slug, edge] of collectRelationshipEdges(source)) {
    mergeEdge(slug, edge, 120);
  }

  // 1b) Incoming typed edges (graph reverse)
  for (const [slug, edge] of collectIncomingRelationshipEdges(source, catalog)) {
    mergeEdge(slug, edge, 110);
  }

  // 2) Editorial relatedSlugs
  for (const slug of source.relatedSlugs ?? []) {
    const entry = bySlug.get(slug);
    if (!entry || entry.slug === source.slug) continue;
    if (picked.has(entry.slug)) continue;

    const auto = scorePair(source, entry);
    const reason = bestReasonForCurated(auto);
    picked.set(entry.slug, {
      entry,
      score: 100 + (auto?.total ?? 0),
      reason,
      reasonLabel: RELATION_REASON_LABELS[reason],
    });
  }

  // 3) Auto-fill only confident matches — never pad with weak same-category noise
  for (const candidate of catalog) {
    if (picked.has(candidate.slug)) continue;
    const breakdown = scorePair(source, candidate);
    if (!breakdown) continue;
    picked.set(candidate.slug, {
      entry: candidate,
      score: breakdown.total,
      reason: breakdown.reason,
      reasonLabel: RELATION_REASON_LABELS[breakdown.reason],
    });
  }

  return [...picked.values()]
    .sort(
      (a, b) =>
        b.score - a.score || a.entry.title.localeCompare(b.entry.title),
    )
    .slice(0, limit);
}
