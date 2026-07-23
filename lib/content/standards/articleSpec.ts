/**
 * Canonical encyclopedia article specification.
 *
 * This is the single source of truth for what every public article should
 * contain. Validators, templates, and editors should align to this map.
 *
 * Display order on detail pages (when a section has content):
 * Identity → Quick Overview → History → Cultural Context → Spread & Ecosystem
 * → Examples → Media → References → Metadata → SEO
 *
 * Missing optional sections must be omitted in the UI — never shown empty.
 */

import type { ContentCategory } from "@/types";

export type ArticleSectionId =
  | "identity"
  | "quickOverview"
  | "history"
  | "culturalContext"
  | "spreadEcosystem"
  | "examples"
  | "media"
  | "references"
  | "metadata"
  | "seo";

export type FieldRequirement = "required" | "recommended" | "optional";

export interface ArticleFieldSpec {
  /** Logical field name (may map to category-specific TypeScript keys). */
  id: string;
  /** Human label for editors / reports. */
  label: string;
  requirement: FieldRequirement;
  /**
   * Actual entry keys checked (first non-empty wins for presence).
   * Category-specific keys are listed where they differ.
   */
  entryKeys: string[];
  /** Minimum character length when present (soft). */
  minChars?: number;
  notes?: string;
}

export interface ArticleSectionSpec {
  id: ArticleSectionId;
  label: string;
  description: string;
  fields: ArticleFieldSpec[];
}

/**
 * Canonical section order — do not reorder casually; detail pages follow this.
 */
export const ARTICLE_SECTION_ORDER: readonly ArticleSectionId[] = [
  "identity",
  "quickOverview",
  "history",
  "culturalContext",
  "spreadEcosystem",
  "examples",
  "media",
  "references",
  "metadata",
  "seo",
] as const;

export const ARTICLE_SECTIONS: readonly ArticleSectionSpec[] = [
  {
    id: "identity",
    label: "Identity",
    description: "Who/what this entry is — title, slug, category, short description.",
    fields: [
      {
        id: "title",
        label: "Title",
        requirement: "required",
        entryKeys: ["title"],
        minChars: 1,
      },
      {
        id: "slug",
        label: "Slug",
        requirement: "required",
        entryKeys: ["slug"],
      },
      {
        id: "category",
        label: "Category",
        requirement: "required",
        entryKeys: ["category"],
      },
      {
        id: "description",
        label: "Card / identity description",
        requirement: "required",
        entryKeys: ["description"],
        minChars: 40,
        notes: "Used for listings, SEO description base, and identity.",
      },
      {
        id: "imageGradient",
        label: "Gradient fallback",
        requirement: "required",
        entryKeys: ["imageGradient"],
        notes: "Fallback only — not a substitute for real featured media.",
      },
    ],
  },
  {
    id: "quickOverview",
    label: "Quick Overview",
    description: "One clear definition or meaning the reader can use immediately.",
    fields: [
      {
        id: "overview",
        label: "Overview prose",
        requirement: "required",
        entryKeys: ["meaning", "definition", "impact", "summary", "description"],
        minChars: 60,
        notes:
          "Memes: meaning. Slang: definition. Events: impact. Trends: summary. Creators: description may serve.",
      },
    ],
  },
  {
    id: "history",
    label: "History",
    description: "Origin story and dated timeline of how it emerged.",
    fields: [
      {
        id: "origin",
        label: "Origin / history prose",
        requirement: "recommended",
        entryKeys: ["origin", "notableMoments"],
        minChars: 80,
        notes: "Creators may use notableMoments when origin prose is absent.",
      },
      {
        id: "timeline",
        label: "Timeline",
        requirement: "recommended",
        entryKeys: ["timeline", "highlights", "notableMoments"],
        notes: "Memes: timeline. Events: highlights. Creators: notableMoments.",
      },
    ],
  },
  {
    id: "culturalContext",
    label: "Cultural Context",
    description:
      "Why it mattered — communities, platforms, and meaning beyond the origin fact.",
    fields: [
      {
        id: "tags",
        label: "Tags / platforms / communities",
        requirement: "recommended",
        entryKeys: ["tags", "platforms"],
        notes: "Signals cultural framing until a dedicated context field exists.",
      },
      {
        id: "contextProse",
        label: "Context in overview/history",
        requirement: "optional",
        entryKeys: ["meaning", "definition", "impact", "origin"],
        notes:
          "No separate schema field yet — validators check that overview/history are not thin placeholders.",
      },
    ],
  },
  {
    id: "spreadEcosystem",
    label: "Spread & Ecosystem",
    description: "How it spread and what else to read — related entries and typed edges.",
    fields: [
      {
        id: "relatedSlugs",
        label: "Related articles",
        requirement: "required",
        entryKeys: ["relatedSlugs"],
        notes: "At least 2 culturally relevant links; prefer cross-category when natural.",
      },
      {
        id: "relationships",
        label: "Typed relationships",
        requirement: "recommended",
        entryKeys: ["relationships"],
        notes: "inspiredBy, popularizedBy, sameFormat, community, etc.",
      },
    ],
  },
  {
    id: "examples",
    label: "Examples",
    description: "Concrete usage or illustration of the concept in the wild.",
    fields: [
      {
        id: "examples",
        label: "Usage examples",
        requirement: "recommended",
        entryKeys: ["examples", "usageExamples"],
        notes: "Required in practice for memes and slang; optional for creators/trends.",
      },
    ],
  },
  {
    id: "media",
    label: "Media",
    description: "Featured hero + gallery with attribution. Omit cleanly if none suitable.",
    fields: [
      {
        id: "featured",
        label: "Featured hero media",
        requirement: "recommended",
        entryKeys: ["media"],
        notes: "Strongly recommended for memes, creators, events. Optional for slang/trends.",
      },
    ],
  },
  {
    id: "references",
    label: "References",
    description: "Traceable sources — prefer primary, official, KYM, Wikipedia, journalism.",
    fields: [
      {
        id: "sources",
        label: "Sources",
        requirement: "required",
        entryKeys: ["sources"],
        notes: "Hard gate: published entries must have ≥1 URL-backed source.",
      },
    ],
  },
  {
    id: "metadata",
    label: "Metadata",
    description: "Scores, dates, trend direction, catalog identity fields.",
    fields: [
      {
        id: "scores",
        label: "Editorial scores",
        requirement: "required",
        entryKeys: ["scores"],
      },
      {
        id: "addedAt",
        label: "Added date",
        requirement: "required",
        entryKeys: ["addedAt"],
      },
      {
        id: "trendDirection",
        label: "Trend direction",
        requirement: "required",
        entryKeys: ["trendDirection"],
      },
      {
        id: "lastUpdated",
        label: "Last updated",
        requirement: "optional",
        entryKeys: ["lastUpdated"],
      },
    ],
  },
  {
    id: "seo",
    label: "SEO",
    description:
      "Derived from entry fields via lib/seo helpers (title, description, canonical, OG, Twitter, JSON-LD).",
    fields: [
      {
        id: "description",
        label: "Meta description base",
        requirement: "required",
        entryKeys: ["description"],
        minChars: 40,
      },
      {
        id: "title",
        label: "SEO title base",
        requirement: "required",
        entryKeys: ["title"],
      },
    ],
  },
] as const;

/** Categories where featured media is strongly expected when a visual exists. */
export const FEATURED_MEDIA_EXPECTED: ReadonlySet<ContentCategory> = new Set([
  "meme",
  "creator",
  "event",
  "brainrot",
]);

/** Categories where gradient-only (no media) is acceptable. */
export const MEDIA_OPTIONAL: ReadonlySet<ContentCategory> = new Set([
  "slang",
  "trend",
]);

/** Minimum relatedSlugs for a healthy Spread section (soft). */
export const RELATED_SLUGS_MIN = 2;

/** Preferred minimum sources (soft — hard gate remains ≥1). */
export const SOURCES_RECOMMENDED_MIN = 2;

/** Overview / description soft floors. */
export const DESCRIPTION_MIN_CHARS = 40;
export const OVERVIEW_MIN_CHARS = 60;
export const ORIGIN_MIN_CHARS = 80;

export function getSectionSpec(id: ArticleSectionId): ArticleSectionSpec {
  const section = ARTICLE_SECTIONS.find((s) => s.id === id);
  if (!section) throw new Error(`Unknown article section: ${id}`);
  return section;
}
