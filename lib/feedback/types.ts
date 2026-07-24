/**
 * Public feedback submission contract.
 */

export const FEEDBACK_CATEGORY_OPTIONS = [
  { value: "problem", label: "Report a problem" },
  { value: "article-request", label: "Request an article" },
  { value: "improvement", label: "Suggest an improvement" },
  { value: "general", label: "General feedback" },
] as const;

export type FeedbackCategory =
  (typeof FEEDBACK_CATEGORY_OPTIONS)[number]["value"];

export interface FeedbackSubmission {
  category: FeedbackCategory;
  /** Optional article title or page URL */
  articlePage: string;
  subject: string;
  message: string;
  name: string;
  email: string;
}

export type FeedbackSubmitResult =
  | { ok: true }
  | { ok: false; error: string; code?: "validation" | "server" | "network" };
