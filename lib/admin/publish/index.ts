/**
 * Publish pipeline — editor approves; system implements.
 */

export {
  approvedDraftToContentCandidate,
  type ContentEntryCandidate,
} from "./contentCandidate";

export {
  preparePublishExport,
  type PublishPrepResult,
} from "./preparePublish";

export { autoFixForPublish, type PublishAutoFixReport } from "./autoFix";
export { allocateNextId } from "./allocateId";
export { writeContentEntry } from "./writeContentFile";
export {
  publishApprovedDraft,
  type PublishResult,
} from "./publishApprovedDraft";

export {
  publishApprovedDraftAction,
} from "./actions";
