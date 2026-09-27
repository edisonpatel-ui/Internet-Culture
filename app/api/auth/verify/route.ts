/**
 * app/api/auth/verify/route.ts
 *
 * GET ?token=... — the link a customer clicks from their login email.
 * Consumes the (single-use) magic-link token, and if valid, sets the
 * signed session cookie (lib/customerAuth/session.ts) and redirects to
 * /dashboard. On failure, redirects to /login with an error query param so
 * the login page can show a clear message rather than a bare error page.
 */

import { NextResponse } from "next/server";
import { consumeMagicLinkToken } from "@/lib/customerAuth/magicLinkStore";
import { createSession } from "@/lib/customerAuth/session";
import { BASE_URL } from "@/lib/seo";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");

  if (!token) {
    return NextResponse.redirect(`${BASE_URL}/login?error=missing_token`);
  }

  try {
    const email = await consumeMagicLinkToken(token);
    if (!email) {
      return NextResponse.redirect(`${BASE_URL}/login?error=invalid_or_expired`);
    }

    await createSession(email);
    return NextResponse.redirect(`${BASE_URL}/dashboard`);
  } catch (err) {
    console.error("[auth/verify] unexpected error:", err);
    return NextResponse.redirect(`${BASE_URL}/login?error=server_error`);
  }
}
