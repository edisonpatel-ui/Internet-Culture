import type { BaseEntry, CreatorEntry, EventEntry } from "@/types";
import {
  RELATION_REASON_LABELS,
  type RelatedRecommendation,
  type RelationReasonId,
} from "@/lib/intelligence/types";
import { getEntryYear } from "@/lib/intelligence/culturalScores";

const DEFAULT_LIMIT = 6;

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
    add("same-platform", 18 + platforms.length * 4);
    if (source.category === "creator" && candidate.category === "creator") {
      add("audience-overlap", 10);
      if (shared.some((t) => ["amp", "streaming", "twitch"].includes(t))) {
        add("collaboration", 16);
      }
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

  if (source.category === candidate.category) {
    add("cultural-connection", 6);
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
      add("format", 14);
    }
  }

  if (
    (source.category === "event" || candidate.category === "event") &&
    (shared.length > 0 || yearsClose(source, candidate, 2))
  ) {
    add("cultural-connection", 12);
  }

  if (total < 12) return null;

  reasons.sort((a, b) => b.weight - a.weight);
  const top = reasons[0]?.reason ?? "cultural-connection";

  return { total, reason: top };
}

function bestReasonForCurated(
  auto: ScoreBreakdown | null,
): RelationReasonId {
  if (!auto) return "editorial";
  // Prefer a specific signal over generic cultural-connection
  if (auto.reason === "cultural-connection" || auto.reason === "editorial") {
    return "editorial";
  }
  return auto.reason;
}

/**
 * Build related recommendations for an entry.
 *
 * Priority:
 * 1. Curated relatedSlugs (resolved across all categories)
 * 2. Automatic scored matches with an explainable reason
 */
export function getRelatedRecommendations(
  source: BaseEntry,
  catalog: readonly BaseEntry[],
  limit = DEFAULT_LIMIT,
): RelatedRecommendation[] {
  const bySlug = new Map(catalog.map((e) => [e.slug, e]));
  const picked = new Map<string, RelatedRecommendation>();

  for (const slug of source.relatedSlugs ?? []) {
    const entry = bySlug.get(slug);
    if (!entry || entry.slug === source.slug) continue;

    const auto = scorePair(source, entry);
    const reason = bestReasonForCurated(auto);
    picked.set(entry.slug, {
      entry,
      score: 100 + (auto?.total ?? 0),
      reason,
      reasonLabel: RELATION_REASON_LABELS[reason],
    });
  }

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
