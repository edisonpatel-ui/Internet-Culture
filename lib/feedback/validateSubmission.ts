import {
  FEEDBACK_CATEGORY_OPTIONS,
  type FeedbackCategory,
  type FeedbackSubmission,
} from "./types";

const MAX = {
  articlePage: 500,
  subject: 160,
  message: 3500,
  name: 120,
  email: 200,
} as const;

export function parseFeedbackBody(raw: unknown): FeedbackSubmission | null {
  if (!raw || typeof raw !== "object") return null;
  const o = raw as Record<string, unknown>;

  return {
    category: String(o.category ?? "") as FeedbackCategory,
    articlePage: String(o.articlePage ?? ""),
    subject: String(o.subject ?? ""),
    message: String(o.message ?? ""),
    name: String(o.name ?? ""),
    email: String(o.email ?? ""),
  };
}

/** Returns a validation error message, or null when the payload is valid. */
export function validateFeedbackSubmission(
  submission: FeedbackSubmission,
): string | null {
  const category = submission.category;
  if (!FEEDBACK_CATEGORY_OPTIONS.some((o) => o.value === category)) {
    return "Please choose a feedback category.";
  }

  const subject = submission.subject.trim();
  const message = submission.message.trim();
  if (!subject || !message) {
    return "Please add a subject and a message.";
  }

  if (subject.length > MAX.subject) {
    return "Subject is too long.";
  }
  if (message.length > MAX.message) {
    return "Message is too long.";
  }
  if (submission.articlePage.length > MAX.articlePage) {
    return "Article / Page is too long.";
  }
  if (submission.name.length > MAX.name) {
    return "Name is too long.";
  }
  if (submission.email.length > MAX.email) {
    return "Email is too long.";
  }

  const email = submission.email.trim();
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return "Please enter a valid email address, or leave it blank.";
  }

  return null;
}
