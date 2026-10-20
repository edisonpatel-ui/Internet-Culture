import { NextResponse } from "next/server";
import { getStripeClient, getPriceIdForTier } from "@/lib/stripe/client";
import { isPurchasableTier, SUBSCRIPTION_TIERS } from "@/lib/config/subscriptions";
import { BASE_URL } from "@/lib/seo";
import { errorLog } from "@/lib/stripe/log";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Where Stripe sends the customer back to. In production this is ALWAYS the
 * configured site URL (NEXT_PUBLIC_SITE_URL) — never a client-supplied
 * header. Outside production, the request's Origin is honoured so
 * localhost / preview deployments redirect back to themselves.
 */
function resolveOrigin(request: Request): string {
  if (process.env.NODE_ENV === "production") return BASE_URL;
  return request.headers.get("origin") || BASE_URL;
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Request body must be valid JSON." }, { status: 400 });
  }

  const tier = (body as { tier?: unknown })?.tier;
  if (!isPurchasableTier(tier)) {
    return NextResponse.json(
      { error: '"tier" is required and must be "starter" or "pro".' },
      { status: 400 },
    );
  }

  try {
    const stripe = getStripeClient();
    const priceId = getPriceIdForTier(tier);
    const origin = resolveOrigin(request);

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [{ price: priceId, quantity: 1 }],
      // Session metadata is read by checkout.session.completed; the same tier
      // is copied onto the Subscription so subscription.* events carry it too.
      metadata: { tier },
      subscription_data: { metadata: { tier } },
      // Shown next to the Pay button so the no-refund terms are disclosed before purchase.
      custom_text: {
        submit: {
          message:
            `${SUBSCRIPTION_TIERS[tier].label} plan. All API subscription purchases are final and ` +
            `non-refundable, except for a verified server-side defect or outage. ` +
            `See ${BASE_URL}/refunds before you pay.`,
        },
      },
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/pricing`,
    });

    if (!session.url) {
      throw new Error("Stripe did not return a Checkout URL.");
    }

    return NextResponse.json({ url: session.url }, { status: 200 });
  } catch (err) {
    errorLog("[api/checkout] failed to create Checkout Session:", err);
    return NextResponse.json(
      { error: "Failed to start checkout. Please try again shortly." },
      { status: 500 },
    );
  }
}
