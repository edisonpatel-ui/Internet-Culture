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
 * A 404 here most often means either the webhook hasn't fired yet (Stripe
 * delivery can lag a few seconds behind the browser redirect) or the
 * 10-minute window has passed — the success page should treat both as
 * "not ready yet" and offer a retry rather than treating it as a hard
 * error.
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
      return NextResponse.json(
        { error: "Key not found yet. It may take a few seconds after payment — please retry." },
        { status: 404 },
      );
    }
    return NextResponse.json({ rawKey }, { status: 200 });
  } catch (err) {
    console.error("[api/checkout/session] lookup failed:", err);
    return NextResponse.json({ error: "Failed to look up checkout session." }, { status: 500 });
  }
}
