/**
 * app/api/checkout/route.ts
 *
 * Creates a Stripe Checkout Session (test/sandbox mode — determined purely
 * by which kind of secret key is configured in STRIPE_SECRET_KEY, no
 * separate flag needed) for the Starter ($19/mo) or Pro ($49/mo) tier.
 *
 *   POST /api/checkout
 *   Body: { "tier": "starter" | "pro" }
 *   Response: { url: string }  — redirect the browser here.
 *
 * The actual API key is issued later, by the webhook handler
 * (app/api/webhooks/stripe/route.ts) once payment is confirmed — this
 * route only starts the checkout flow.
 */

import { NextResponse } from "next/server";
import { getStripeClient, getPriceIdForTier, type PricingTier } from "@/lib/stripe/client";
import { BASE_URL } from "@/lib/seo";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function isValidTier(value: unknown): value is PricingTier {
  return value === "starter" || value === "pro";
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Request body must be valid JSON." }, { status: 400 });
  }

  const tier = (body as { tier?: unknown })?.tier;
  if (!isValidTier(tier)) {
    return NextResponse.json(
      { error: '"tier" is required and must be "starter" or "pro".' },
      { status: 400 },
    );
  }

  try {
    const stripe = getStripeClient();
    const priceId = getPriceIdForTier(tier);

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [{ price: priceId, quantity: 1 }],
      metadata: { tier },
      success_url: `${BASE_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${BASE_URL}/pricing`,
    });

    if (!session.url) {
      throw new Error("Stripe did not return a Checkout URL.");
    }

    return NextResponse.json({ url: session.url }, { status: 200 });
  } catch (err) {
    console.error("[api/checkout] failed to create Checkout Session:", err);
    return NextResponse.json(
      { error: "Failed to start checkout. Please try again shortly." },
      { status: 500 },
    );
  }
}
