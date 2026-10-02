/**
 * app/api/auth/reset-password/route.ts
 *
 * Two-step password reset flow, mirroring the request/verify split of the
 * existing magic-link flow (app/api/auth/magic-link + app/api/auth/verify)
 * but for setting a password instead of logging in directly:
 *
 *   POST { email }                — if that email has an account, emails a
 *                                    signed, single-use, 30-minute reset
 *                                    link via Resend. Same generic
 *                                    always-success response regardless of
 *                                    whether the account exists
 *                                    (anti-enumeration, matching
 *                                    app/api/auth/magic-link).
 *
 *   PUT { token, password }       — verifies and consumes the token
 *                                    (lib/customerAuth/passwordResetStore.ts),
 *                                    sets the new password, and immediately
 *                                    logs the customer in (same
 *                                    reset-then-auto-login convenience the
 *                                    magic-link flow already provides).
 *
 * This is also how a magic-link-only customer sets a password for the
 * FIRST time — there's no separate "create a password" flow; running this
 * once is both "I forgot my password" and "I'd like to add a password
 * option", which is why it works even for an account with no passwordHash
 * yet (see lib/customer/store.ts's doc comment on that field).
 */

import { NextResponse } from "next/server";
import { Resend } from "resend";
import { createPasswordResetToken, consumePasswordResetToken } from "@/lib/customerAuth/passwordResetStore";
import { getCustomerRecord, updateCustomerPassword } from "@/lib/customer/store";
import { hashPassword } from "@/lib/customerAuth/passwords";
import { createSession } from "@/lib/customerAuth/session";
import { BASE_URL } from "@/lib/seo";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const GENERIC_RESPONSE = {
  success: true,
  message: "If that email has an account, we've sent a password reset link. Check your inbox.",
};

const MIN_PASSWORD_LENGTH = 8;

function readEnv(name: string): string {
  const raw = process.env[name];
  return typeof raw === "string" ? raw.trim() : "";
}

function isValidEmail(value: unknown): value is string {
  return typeof value === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

/** Step 1: request a reset link. */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Request body must be valid JSON." }, { status: 400 });
  }

  const email = (body as { email?: unknown })?.email;
  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "A valid email address is required." }, { status: 400 });
  }
  const normalizedEmail = email.trim().toLowerCase();

  try {
    const customer = await getCustomerRecord(normalizedEmail);
    if (!customer) {
      return NextResponse.json(GENERIC_RESPONSE, { status: 200 });
    }

    const token = await createPasswordResetToken(normalizedEmail);
    const resetUrl = `${BASE_URL}/forgot-password?token=${encodeURIComponent(token)}`;

    const apiKey = readEnv("RESEND_API_KEY");
    if (!apiKey) {
      console.error("[auth/reset-password] RESEND_API_KEY missing — cannot send reset email.");
      return NextResponse.json(
        { error: "Password reset is temporarily unavailable. Please try again shortly." },
        { status: 500 },
      );
    }
    const fromEmail = readEnv("RESEND_FROM_EMAIL") || "Internet Culture Hub <onboarding@resend.dev>";

    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: fromEmail,
      to: [normalizedEmail],
      subject: "Reset your Culture Graph API password",
      text: `Reset your password: ${resetUrl}\n\nThis link expires in 30 minutes and can only be used once. If you didn't request this, you can ignore this email — your password won't change.`,
      html: `<p>Reset your Culture Graph API password:</p><p><a href="${escapeHtml(resetUrl)}">${escapeHtml(resetUrl)}</a></p><p style="color:#666;font-size:13px">This link expires in 30 minutes and can only be used once. If you didn't request this, you can ignore this email — your password won't change.</p>`,
    });

    if (error) {
      console.error("[auth/reset-password] Resend API error:", error);
      return NextResponse.json(
        { error: "Could not send the reset email. Please try again shortly." },
        { status: 500 },
      );
    }

    return NextResponse.json(GENERIC_RESPONSE, { status: 200 });
  } catch (err) {
    console.error("[auth/reset-password] unexpected error:", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}

/** Step 2: complete the reset with a valid token + new password. */
export async function PUT(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Request body must be valid JSON." }, { status: 400 });
  }

  const { token, password } = body as { token?: unknown; password?: unknown };
  if (typeof token !== "string" || token.length === 0) {
    return NextResponse.json({ error: "Reset token is required." }, { status: 400 });
  }
  if (typeof password !== "string" || password.length < MIN_PASSWORD_LENGTH) {
    return NextResponse.json(
      { error: `Password must be at least ${MIN_PASSWORD_LENGTH} characters.` },
      { status: 400 },
    );
  }

  try {
    const email = await consumePasswordResetToken(token);
    if (!email) {
      return NextResponse.json(
        { error: "This reset link is invalid or has expired. Please request a new one." },
        { status: 400 },
      );
    }

    const customer = await getCustomerRecord(email);
    if (!customer) {
      return NextResponse.json({ error: "No account found for this reset link." }, { status: 404 });
    }

    await updateCustomerPassword(email, hashPassword(password));
    await createSession(email);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("[auth/reset-password] unexpected error completing reset:", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
