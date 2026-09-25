/**
 * app/api/webhooks/stripe/route.ts
 *
 * Stripe webhook target. Verifies the signature against
 * STRIPE_WEBHOOK_SECRET, then on `checkout.session.completed`:
 *   1. Reads the customer's email and the `tier` metadata set at checkout
 *      creation (app/api/checkout/route.ts).
 *   2. Issues a new API key via registerPaidApiKey (lib/api/keys.ts) — only
 *      the SHA-256 hash is persisted long-term.
 *   3. Stashes the one-time raw key in a short-lived Redis handoff
 *      (lib/stripe/checkoutKeyHandoff.ts, 10-minute TTL) so the success
 *      page can display it exactly once.
 *
 * Signature verification requires the RAW request body — this reads it via
 * `request.text()` before any JSON parsing, since Next.js App Router route
 * handlers do not pre-parse the body (unlike the old Pages API + bodyParser),
 * so no special config is needed to get the raw bytes here.
 */

import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { getStripeClient } from "@/lib/stripe/client";
import { registerPaidApiKey } from "@/lib/api/keys";
import { storeCheckoutSessionKey } from "@/lib/stripe/checkoutKeyHandoff";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function isPaidTier(value: unknown): value is "starter" | "pro" {
  return value === "starter" || value === "pro";
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session): Promise<void> {
  const email = session.customer_details?.email ?? session.customer_email;
  const tier = session.metadata?.tier;

  if (!email) {
    console.error("[webhooks/stripe] checkout.session.completed with no customer email", {
      sessionId: session.id,
    });
    return;
  }
  if (!isPaidTier(tier)) {
    console.error("[webhooks/stripe] checkout.session.completed with invalid/missing tier metadata", {
      sessionId: session.id,
      tier,
    });
    return;
  }

  const { rawKey } = await registerPaidApiKey(email, tier);
  await storeCheckoutSessionKey(session.id, rawKey);
}

export async function POST(request: Request) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.error("[webhooks/stripe] Missing STRIPE_WEBHOOK_SECRET.");
    return NextResponse.json({ error: "Webhook not configured." }, { status: 500 });
  }

  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "Missing stripe-signature header." }, { status: 400 });
  }

  const rawBody = await request.text();

  let event: Stripe.Event;
  try {
    const stripe = getStripeClient();
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch (err) {
    console.error("[webhooks/stripe] signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature." }, { status: 400 });
  }

  try {
    if (event.type === "checkout.session.completed") {
      await handleCheckoutCompleted(event.data.object as Stripe.Checkout.Session);
    }
    // Other event types are intentionally no-ops for now — Stripe expects a
    // 2xx for any event type it's configured to send, even ones we ignore.
  } catch (err) {
    console.error(`[webhooks/stripe] handler error for ${event.type}:`, err);
    // Return 500 so Stripe retries — key issuance failing silently would
    // mean a paying customer never gets their key.
    return NextResponse.json({ error: "Webhook handler failed." }, { status: 500 });
  }

  return NextResponse.json({ received: true }, { status: 200 });
}
