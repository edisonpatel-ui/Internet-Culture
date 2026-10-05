/**
 * app/api/auth/login/route.ts
 *
 * POST { email, password } — password-based login, alongside the existing
 * magic-link flow (app/api/auth/magic-link, app/api/auth/verify). Either
 * path ends the same way: lib/customerAuth/session.ts's createSession.
 *
 * Returns the same generic "Invalid email or password." for every failure
 * case — no account, no password ever set on the account, or a wrong
 * password — matching the anti-enumeration posture already established by
 * app/api/auth/magic-link (never reveal whether an email has an account).
 * A customer who hasn't set a password yet is guided to "Forgot password"
 * by the login page's own UI copy, not by a distinguishable API response.
 */

import { NextResponse } from "next/server";
import { getCustomerRecord } from "@/lib/customer/store";
import { verifyPassword } from "@/lib/customerAuth/passwords";
import { createSession } from "@/lib/customerAuth/session";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const GENERIC_ERROR = { error: "Invalid email or password." };

function isValidEmail(value: unknown): value is string {
  return typeof value === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Request body must be valid JSON." }, { status: 400 });
  }

  const { email, password } = body as { email?: unknown; password?: unknown };
  if (!isValidEmail(email) || typeof password !== "string" || password.length === 0) {
    return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
  }
  const normalizedEmail = email.trim().toLowerCase();

  try {
    const customer = await getCustomerRecord(normalizedEmail);
    if (!customer || !customer.passwordHash) {
      return NextResponse.json(GENERIC_ERROR, { status: 401 });
    }

    const matches = verifyPassword(password, customer.passwordHash);
    if (!matches) {
      return NextResponse.json(GENERIC_ERROR, { status: 401 });
    }

    await createSession(normalizedEmail);
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("[auth/login] unexpected error:", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}

/**
 * This route only supports POST — an explicit 405 instead of letting a
 * stray GET fall through unexplained. Note for the record: this file sends
 * no email at all (password login is a synchronous Redis-backed check,
 * no Resend involved), so it was never the source of a Resend-related
 * 500 — see app/api/auth/magic-link/route.ts for the actual fix.
 */
export async function GET() {
  return NextResponse.json(
    { error: "Method not allowed. Send a POST request with a JSON body of { email, password }." },
    { status: 405, headers: { Allow: "POST" } },
  );
}
