/**
 * Research session validation — pure logic, no providers (RC4-B).
 */

import type {
  ResearchSession,
  ResearchSessionValidationResult,
} from "@/types/admin";
import { EDITORIAL_TRANSITIONS } from "@/lib/ai/editorialState";

export function validateSession(
  session: ResearchSession,
): ResearchSessionValidationResult {
  const issues: ResearchSessionValidationResult["issues"] = [];

  if (!session.topic.trim()) {
    issues.push({
      code: "REQUIRED_TOPIC",
      message: "Topic is required",
      field: "topic",
    });
  }

  if (!session.notes.trim()) {
    issues.push({
      code: "EMPTY_NOTES",
      message: "Research notes are empty",
      field: "notes",
    });
  }

  const stage = session.workflowStage;
  if (!(stage in EDITORIAL_TRANSITIONS)) {
    issues.push({
      code: "INVALID_WORKFLOW_STAGE",
      message: `Unknown workflow stage: ${stage}`,
      field: "workflowStage",
    });
  }

  // Duplicate sources by normalized URL or title
  const seen = new Set<string>();
  for (const source of session.sources) {
    const key = (source.url ?? source.title).trim().toLowerCase();
    if (!key) continue;
    if (seen.has(key)) {
      issues.push({
        code: "DUPLICATE_SOURCE",
        message: `Duplicate source: ${source.title}`,
        field: "sources",
      });
    }
    seen.add(key);
  }

  // Confidence state: entries must have claims; Unknown-only stacks flagged
  if (session.confidence.length === 0) {
    issues.push({
      code: "CONFIDENCE_EMPTY",
      message: "No confidence entries — add claims or mark pending",
      field: "confidence",
    });
  } else {
    const allUnknown = session.confidence.every((c) => c.label === "Unknown");
    if (allUnknown) {
      issues.push({
        code: "CONFIDENCE_ALL_UNKNOWN",
        message: "All claims are Unknown — gather sources before drafting",
        field: "confidence",
      });
    }
    for (const c of session.confidence) {
      if (!c.claim.trim()) {
        issues.push({
          code: "CONFIDENCE_EMPTY_CLAIM",
          message: "Confidence entry missing claim text",
          field: "confidence",
        });
      }
    }
  }

  if (session.status === "ready_for_draft" && session.sources.length === 0) {
    issues.push({
      code: "READY_WITHOUT_SOURCES",
      message: "Cannot mark ready for draft without sources",
      field: "status",
    });
  }

  return { ok: issues.length === 0, issues };
}
