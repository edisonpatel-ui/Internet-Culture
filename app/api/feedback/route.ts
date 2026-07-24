import { NextResponse } from "next/server";
import { Resend } from "resend";
import { FEEDBACK_CATEGORY_OPTIONS } from "@/lib/feedback/types";
import {
  parseFeedbackBody,
  validateFeedbackSubmission,
} from "@/lib/feedback/validateSubmission";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Read server env at request time (bracket access avoids build-time inlining
 * of missing secrets). Strips accidental wrapping quotes from Vercel values.
 */
function readEnv(name: string): string {
  const raw = process.env[name];
  if (typeof raw !== "string") return "";
  let value = raw.trim();
  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    value = value.slice(1, -1).trim();
  }
  return value;
}

function maskSecret(value: string): string {
  if (!value) return "(empty)";
  if (value.length <= 8) return `len=${value.length}`;
  return `${value.slice(0, 3)}…${value.slice(-4)} (len=${value.length})`;
}

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

function summarizeResendError(error: unknown): Record<string, unknown> {
  if (!error || typeof error !== "object") {
    return { raw: String(error) };
  }
  const e = error as Record<string, unknown>;
  return {
    name: typeof e.name === "string" ? e.name : undefined,
    message: typeof e.message === "string" ? e.message : undefined,
    statusCode:
      typeof e.statusCode === "number"
        ? e.statusCode
        : typeof e.status === "number"
          ? e.status
          : undefined,
    // Resend ErrorResponse often uses `message` only — avoid dumping full object secrets
  };
}

export async function POST(request: Request) {
  // Always resolve inside the handler so Vercel runtime env is used.
  const apiKey = readEnv("RESEND_API_KEY");
  const toEmail = readEnv("FEEDBACK_TO_EMAIL") || "edisonpatel@gmail.com";
  const fromEmail =
    readEnv("RESEND_FROM_EMAIL") ||
    "Internet Culture Hub <onboarding@resend.dev>";

  console.error("[feedback] env check", {
    hasResendApiKey: Boolean(apiKey),
    resendApiKeyHint: maskSecret(apiKey),
    hasResendFromEmail: Boolean(readEnv("RESEND_FROM_EMAIL")),
    fromEmail,
    hasFeedbackToEmail: Boolean(readEnv("FEEDBACK_TO_EMAIL")),
    toEmail,
    nodeEnv: process.env.NODE_ENV,
    vercelEnv: process.env.VERCEL_ENV ?? "(none)",
  });

  if (!apiKey) {
    console.error(
      "[feedback] RESEND_API_KEY missing at runtime — set it in Vercel for this environment (Production/Preview) and redeploy",
    );
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
    console.error("[feedback] invalid JSON body");
    return NextResponse.json(
      { ok: false, error: "Invalid request body." },
      { status: 400 },
    );
  }

  const submission = parseFeedbackBody(raw);
  if (!submission) {
    console.error("[feedback] payload parse failed");
    return NextResponse.json(
      { ok: false, error: "Invalid feedback payload." },
      { status: 400 },
    );
  }

  const validationError = validateFeedbackSubmission(submission);
  if (validationError) {
    console.error("[feedback] validation failed:", validationError);
    return NextResponse.json(
      { ok: false, error: validationError },
      { status: 400 },
    );
  }

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
      from: fromEmail,
      to: [toEmail],
      subject: subjectLine,
      text: textBody,
      html: htmlBody,
      ...(fields.email.trim() ? { replyTo: fields.email.trim() } : {}),
    });

    if (error) {
      console.error("[feedback] Resend API error:", summarizeResendError(error));
      return NextResponse.json(
        {
          ok: false,
          error:
            "Could not send your feedback. Please try again in a moment.",
        },
        { status: 502 },
      );
    }

    console.error("[feedback] sent ok", { id: data?.id ?? null });
    return NextResponse.json({ ok: true, id: data?.id ?? null });
  } catch (err) {
    console.error(
      "[feedback] unexpected send failure:",
      summarizeResendError(err),
      err instanceof Error ? err.stack : undefined,
    );
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
