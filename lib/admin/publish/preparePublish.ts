/**
 * Publish preparation — safe export only (Phase 5).
 * Does NOT write lib/content, commit, or deploy.
 */

import type { ApprovedDraft } from "@/lib/ai/packages";
import {
  approvedDraftToContentCandidate,
  type ContentEntryCandidate,
} from "./contentCandidate";

export interface PublishPrepResult {
  candidate: ContentEntryCandidate;
  validationHints: string[];
  previewTypeScriptSnippet: string;
  /** Always false in Phase 5. */
  writesToLibContent: false;
}

function slugOk(slug: string): boolean {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug);
}

export function preparePublishExport(
  approved: ApprovedDraft,
): PublishPrepResult {
  const candidate = approvedDraftToContentCandidate(approved);
  const hints: string[] = [];

  if (!candidate.title.trim()) {
    hints.push("Title is empty.");
  }
  if (!candidate.description.trim()) {
    hints.push("Description/summary is empty.");
  }
  if (!slugOk(candidate.slug)) {
    hints.push(
      `Slug "${candidate.slug}" should be lowercase kebab-case (a-z, 0-9, hyphens).`,
    );
  }
  if (!candidate.category) {
    hints.push("Category is missing.");
  }
  if (candidate.fields.mediaPlaceholders.length > 0) {
    hints.push(
      "Media placeholders remain verified:false — confirm URLs before lib/content commit.",
    );
  }
  if (candidate.fields.sources.length === 0) {
    hints.push("No sources on candidate — attach citations before publishing.");
  }
  hints.push(
    "Human must create/update the lib/content entry and run npm run validate.",
  );
  hints.push("This export does not write files or commit to git.");

  const previewTypeScriptSnippet = `// Publish prep preview — NOT a content file.
// Category: ${candidate.category}
// Slug: ${candidate.slug}
// From ApprovedDraft: ${candidate.fromApprovedDraftId}

export const candidate = ${JSON.stringify(candidate, null, 2)} as const;
`;

  return {
    candidate,
    validationHints: hints,
    previewTypeScriptSnippet,
    writesToLibContent: false,
  };
}
