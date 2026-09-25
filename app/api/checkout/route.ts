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

    // Dynamically detect origin to prevent post-checkout 404 redirects
    const origin = request.headers.get("origin") || BASE_URL || "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [{ price: priceId, quantity: 1 }],
      metadata: { tier },
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/pricing`,
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