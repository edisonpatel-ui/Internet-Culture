/**
 * app/api/checkout/session/route.ts
 *
 * GET /api/checkout/session?sessionId=cs_test_...
 *
 * Reads the raw API key the webhook stashed for this Checkout session
 * (lib/stripe/checkoutKeyHandoff.ts). The handoff record is TTL'd to 10
 * minutes and is only ever written by the webhook after Stripe confirms
 * payment — this route does not itself verify payment, it only reads
 * whatever the webhook already decided to store.
 *
 * Response contract (matches the success page's poller):
 *   200 { key: string }     — key is ready, display it.
 *   202 { pending: true }   — webhook hasn't written it yet, keep polling.
 *                             This is the common case for the first few
 *                             seconds after redirect — Stripe's webhook
 *                             delivery can lag a little behind the
 *                             browser's own redirect to this success page.
 *   400 { error: string }   — missing/malformed sessionId.
 *   500 { error: string }   — Redis (Upstash) unreachable or misconfigured.
 */

import { NextResponse } from "next/server";
import { getCheckoutSessionKey } from "@/lib/stripe/checkoutKeyHandoff";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const sessionId = searchParams.get("sessionId");

  if (!sessionId) {
    return NextResponse.json({ error: '"sessionId" query parameter is required.' }, { status: 400 });
  }

  try {
    const rawKey = await getCheckoutSessionKey(sessionId);
    if (!rawKey) {
      return NextResponse.json({ pending: true }, { status: 202 });
    }
    return NextResponse.json({ key: rawKey }, { status: 200 });
  } catch (err) {
    console.error("[api/checkout/session] Upstash lookup failed for session", sessionId, ":", err);
    return NextResponse.json({ error: "Failed to look up checkout session." }, { status: 500 });
  }
}
