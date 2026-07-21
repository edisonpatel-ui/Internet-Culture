/**
 * Shared workflow definition shape (RC3-B).
 *
 * Workflows describe stages; they do not call AI providers in this phase.
 */

import type { EditorialState } from "../editorialState";

export interface WorkflowValidationIssue {
  code: string;
  message: string;
}

export interface WorkflowValidationResult {
  ok: boolean;
  issues: WorkflowValidationIssue[];
}

export interface WorkflowDefinitionMeta {
  id: string;
  label: string;
  /** Editorial state this stage typically starts from. */
  entryState: EditorialState;
  /** Editorial state after a successful stage (human may still intervene). */
  successState: EditorialState;
  /** Next workflow module id, if any. */
  nextWorkflowId: string | null;
}
