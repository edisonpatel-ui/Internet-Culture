/**
 * Standardized Article Templates — one file per content category
 * (meme.ts, slang.ts, event.ts, creator.ts, brainrot.ts, trend.ts).
 *
 * These are NOT a second spec competing with
 * lib/content/standards/articleSpec.ts — that file remains the canonical
 * cross-category source of truth (section order, requirement levels,
 * minChars). These files make that spec CONCRETE per category: exact
 * TypeScript fields, exact house-style rules, and a real example pulled
 * from an existing good article, so both a human editor and Draft Studio's
 * real generation can follow the same thing exactly.
 *
 * Draft Studio (lib/admin/editorialOs/realArticleGeneration.ts and
 * realDraftRevision.ts) imports these directly and builds its prompt from
 * them — this is the single source of truth Draft Studio actually reads,
 * not a description of one it might drift from.
 *
 * An editor can always override a rule for one article by saying so
 * explicitly in their Draft Studio prompt or AI Edit instruction.
 */

import type { ContentCategory } from "@/types";
import type { ArticleSectionId } from "@/lib/content/standards/articleSpec";

export interface TemplateField {
  /** Real TypeScript key on the category's *Entry interface. */
  key: string;
  label: string;
  rule: string;
  goodExample: string;
  badExample?: string;
}

export interface ArticleTemplate {
  category: ContentCategory;
  /** Public-facing name, e.g. "Person" for the internal "creator" category. */
  publicName: string;
  /** Which canonical sections (from articleSpec.ts) this category actually uses. */
  sections: ArticleSectionId[];
  /** Category-specific TypeScript fields, beyond shared BaseEntry ones. */
  fields: TemplateField[];
  /** Short guidance on what this category's articles should focus on. */
  focus: string;
  /**
   * How the live page assembles Media/References/related-links chrome for
   * this category — kept in sync with the actual page components
   * (app/<category>/[slug]/page.tsx). Not sent to the LLM as content
   * guidance; documents the real site structure for whoever edits this file.
   */
  pageStructure: string;
}
