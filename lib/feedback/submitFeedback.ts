import type { FeedbackSubmission, FeedbackSubmitResult } from "./types";
import { validateFeedbackSubmission } from "./validateSubmission";

/**
 * Client-side submit — POSTs to the server route (Resend).
 * Keeps the API key off the browser.
 */
export async function submitFeedback(
  submission: FeedbackSubmission,
): Promise<FeedbackSubmitResult> {
  const validationError = validateFeedbackSubmission(submission);
  if (validationError) {
    return { ok: false, code: "validation", error: validationError };
  }

  try {
    const res = await fetch("/api/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(submission),
    });

    const data = (await res.json().catch(() => null)) as {
      ok?: boolean;
      error?: string;
    } | null;

    if (!res.ok || !data?.ok) {
      return {
        ok: false,
        code: res.status >= 500 ? "server" : "validation",
        error:
          data?.error ||
          "Could not send your feedback. Please try again in a moment.",
      };
    }

    return { ok: true };
  } catch {
    return {
      ok: false,
      code: "network",
      error:
        "Could not reach the server. Check your connection and try again.",
    };
  }
}
