import { NextResponse } from "next/server";
import { Resend } from "resend";
import { FEEDBACK_CATEGORY_OPTIONS } from "@/lib/feedback/types";
import {
  parseFeedbackBody,
  validateFeedbackSubmission,
} from "@/lib/feedback/validateSubmission";

export const runtime = "nodejs";

const TO_EMAIL =
  process.env.FEEDBACK_TO_EMAIL?.trim() || "edisonpatel@gmail.com";

/** Must be a Resend-verified sender (domain or onboarding@resend.dev for tests). */
const FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL?.trim() ||
  "Internet Culture Hub <onboarding@resend.dev>";

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function categoryLabel(value: string): string {
  return (
    FEEDBACK_CATEGORY_OPTIONS.find((o) => o.value === value)?.label ?? value
  );
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    console.error("[feedback] RESEND_API_KEY is not configured");
    return NextResponse.json(
      {
        ok: false,
        error:
          "Feedback is temporarily unavailable. Please try again later.",
      },
      { status: 503 },
    );
  }

  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request body." },
      { status: 400 },
    );
  }

  const submission = parseFeedbackBody(raw);
  if (!submission) {
    return NextResponse.json(
      { ok: false, error: "Invalid feedback payload." },
      { status: 400 },
    );
  }

  const validationError = validateFeedbackSubmission(submission);
  if (validationError) {
    return NextResponse.json(
      { ok: false, error: validationError },
      { status: 400 },
    );
  }

  // Preserve submitted values exactly (trimmed only for required fields used in subject).
  const fields = {
    category: submission.category,
    articlePage: submission.articlePage,
    subject: submission.subject,
    message: submission.message,
    name: submission.name,
    email: submission.email,
  };

  const subjectLine = `[Internet Culture Hub Feedback] ${categoryLabel(fields.category)} - ${fields.subject.trim()}`;

  const textBody = [
    "Category:",
    fields.category,
    "",
    "Article/Page:",
    fields.articlePage,
    "",
    "Subject:",
    fields.subject,
    "",
    "Name:",
    fields.name,
    "",
    "Email:",
    fields.email,
    "",
    "Message:",
    fields.message,
  ].join("\n");

  const htmlBody = `
    <h2>Internet Culture Hub — Feedback</h2>
    <p><strong>Category:</strong><br>${escapeHtml(fields.category)}</p>
    <p><strong>Article/Page:</strong><br>${escapeHtml(fields.articlePage)}</p>
    <p><strong>Subject:</strong><br>${escapeHtml(fields.subject)}</p>
    <p><strong>Name:</strong><br>${escapeHtml(fields.name)}</p>
    <p><strong>Email:</strong><br>${escapeHtml(fields.email)}</p>
    <p><strong>Message:</strong></p>
    <pre style="white-space:pre-wrap;font-family:inherit">${escapeHtml(fields.message)}</pre>
  `.trim();

  try {
    const resend = new Resend(apiKey);
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [TO_EMAIL],
      subject: subjectLine,
      text: textBody,
      html: htmlBody,
      ...(fields.email.trim()
        ? { replyTo: fields.email.trim() }
        : {}),
    });

    if (error) {
      console.error("[feedback] Resend error:", error);
      return NextResponse.json(
        {
          ok: false,
          error:
            "Could not send your feedback. Please try again in a moment.",
        },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true, id: data?.id ?? null });
  } catch (err) {
    console.error("[feedback] Unexpected send failure:", err);
    return NextResponse.json(
      {
        ok: false,
        error:
          "Could not send your feedback. Please try again in a moment.",
      },
      { status: 500 },
    );
  }
}
