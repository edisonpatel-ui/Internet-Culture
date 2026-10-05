/**
 * app/api/webhooks/stripe/route.ts
 *
 * Stripe webhook target. Verifies the signature against
 * STRIPE_WEBHOOK_SECRET, then on `checkout.session.completed`:
 *   1. Reads the customer's email, Stripe customer ID, and the `tier`
 *      metadata set at checkout creation (app/api/checkout/route.ts).
 *   2. Issues a new API key via registerPaidApiKey (lib/api/keys.ts) — only
 *      the SHA-256 hash is persisted long-term.
 *   3. Stashes the one-time raw key in a short-lived Redis handoff
 *      (lib/stripe/checkoutKeyHandoff.ts, 10-minute TTL) so the success
 *      page can display it exactly once.
 *   4. Creates/overwrites the customer record (lib/customer/store.ts) —
 *      the reverse index the dashboard (app/dashboard) uses to resolve a
 *      logged-in email to "their" Stripe customer and active API key.
 *   5. Sends the welcome email with that same raw key via Resend
 *      (lib/email/welcomeEmail.ts) — a backup copy for a customer who
 *      closes the success-page tab before copying their key.
 *
 * Signature verification requires the RAW request body — this reads it via
 * `request.text()` before any JSON parsing, since Next.js App Router route
 * handlers do not pre-parse the body (unlike the old Pages API + bodyParser),
 * so no special config is needed to get the raw bytes here.
 *
 * STEP 5 CANNOT FAIL THE WEBHOOK RESPONSE. By the time it runs, the key has
 * been issued and the customer record exists — the checkout has already
 * fully succeeded from the customer's perspective. If step 5 were allowed
 * to throw/500, Stripe would retry the ENTIRE handler, re-issuing a brand
 * new API key (and revoking the one just created) on every retry — a far
 * worse outcome than one missed email the customer can still recover via
 * "Forgot password" -> dashboard. So it's wrapped in its own try/catch,
 * logged either way, and never re-thrown.
 *
 * LOGGING: every step logs explicitly, on purpose — this is the only way
 * to debug "the customer says they never got their key/email" after the
 * fact, since this handler has no browser/network tab to inspect.
 */

import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { getStripeClient } from "@/lib/stripe/client";
import { registerPaidApiKey, revokeApiKey } from "@/lib/api/keys";
import { storeCheckoutSessionKey } from "@/lib/stripe/checkoutKeyHandoff";
import { getCustomerRecord, upsertCustomerRecord } from "@/lib/customer/store";
import { sendWelcomeEmail } from "@/lib/email/welcomeEmail";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const LOG_PREFIX = "[webhooks/stripe]";

function isPaidTier(value: unknown): value is "starter" | "pro" {
  return value === "starter" || value === "pro";
}

function extractStripeCustomerId(session: Stripe.Checkout.Session): string | null {
  const customer = session.customer;
  if (typeof customer === "string") return customer;
  if (customer && typeof customer === "object" && "id" in customer) return customer.id;
  return null;
}

/**
 * Extracts the customer's email, trying `customer_details.email` first
 * (the modern, reliable field — present once the customer has entered
 * their details on the Checkout page) and falling back to the older
 * `customer_email` field (only present if explicitly pre-filled when the
 * Checkout Session was created). Logs explicitly which field (if either)
 * supplied the email — the most common real-world cause of "no welcome
 * email was sent" is actually "we never had an address to send it to"
 * rather than a Resend problem, so this needs to be unambiguous in logs.
 */
function extractCustomerEmail(session: Stripe.Checkout.Session): string | null {
  const fromDetails = session.customer_details?.email;
  if (fromDetails) {
    console.log(
      `${LOG_PREFIX} [1/5] Email extracted from session.customer_details.email: "${fromDetails}" ` +
        `(session: ${session.id})`,
    );
    return fromDetails;
  }

  const fromLegacyField = session.customer_email;
  if (fromLegacyField) {
    console.log(
      `${LOG_PREFIX} [1/5] session.customer_details.email was empty; falling back to session.customer_email: ` +
        `"${fromLegacyField}" (session: ${session.id})`,
    );
    return fromLegacyField;
  }

  console.error(
    `${LOG_PREFIX} [1/5] No email found on session — both session.customer_details?.email and ` +
      `session.customer_email are empty (session: ${session.id}). Cannot issue a key or send a welcome email.`,
  );
  return null;
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session): Promise<void> {
  console.log(`${LOG_PREFIX} Handling checkout.session.completed for session ${session.id}`);

  const email = extractCustomerEmail(session);
  const tier = session.metadata?.tier;
  const stripeCustomerId = extractStripeCustomerId(session);

  console.log(
    `${LOG_PREFIX} [1/5] Extracted fields — email: ${email ? `"${email}"` : "MISSING"}, ` +
      `tier: ${tier ?? "MISSING"}, stripeCustomerId: ${stripeCustomerId ?? "MISSING"} (session: ${session.id})`,
  );

  if (!email) {
    console.error(`${LOG_PREFIX} Aborting — no customer email on session ${session.id}.`);
    return;
  }
  if (!isPaidTier(tier)) {
    console.error(`${LOG_PREFIX} Aborting — invalid/missing tier metadata ("${tier}") on session ${session.id}.`);
    return;
  }
  if (!stripeCustomerId) {
    console.error(`${LOG_PREFIX} Aborting — no Stripe customer ID on session ${session.id}.`);
    return;
  }

  // --- Step 2: issue the API key ---
  let rawKey: string;
  let hashedKey: string;
  try {
    console.log(`${LOG_PREFIX} [2/5] Issuing a new ${tier} API key for "${email}" (session: ${session.id})`);
    ({ rawKey, hashedKey } = await registerPaidApiKey(email, tier));
    console.log(
      `${LOG_PREFIX} [2/5] Key issued for session ${session.id} — hash: ${hashedKey.slice(0, 12)}…, ` +
        `last 4: ${rawKey.slice(-4)}`,
    );
  } catch (err) {
    console.error(`${LOG_PREFIX} [2/5] Upstash error issuing API key for session ${session.id}:`, err);
    throw err;
  }

  // --- Step 3: short-lived handoff for the success page ---
  try {
    console.log(`${LOG_PREFIX} [3/5] Storing checkout-session key handoff for session ${session.id}`);
    await storeCheckoutSessionKey(session.id, rawKey);
    console.log(`${LOG_PREFIX} [3/5] Handoff stored for session ${session.id} (10-minute TTL).`);
  } catch (err) {
    console.error(
      `${LOG_PREFIX} [3/5] Upstash error storing checkout-session handoff for session ${session.id} ` +
        "(key WAS issued — its hash is persisted, but the success page will not find it; " +
        "the welcome email in step 5 is now the customer's only copy of this key):",
      err,
    );
    throw err;
  }

  // --- Step 4: customer record (dashboard login resolves through this) ---
  try {
    console.log(`${LOG_PREFIX} [4/5] Upserting customer record for "${email}" (session: ${session.id})`);

    const previous = await getCustomerRecord(email);
    if (previous && previous.hashedKey !== hashedKey) {
      console.log(
        `${LOG_PREFIX} [4/5] "${email}" already had a key — revoking the previous one before replacing it.`,
      );
      await revokeApiKey(previous.hashedKey);
    }

    const now = new Date().toISOString();
    await upsertCustomerRecord({
      email: email.trim().toLowerCase(),
      stripeCustomerId,
      tier,
      hashedKey,
      keyLastFour: rawKey.slice(-4),
      createdAt: previous?.createdAt ?? now,
      updatedAt: now,
    });
    console.log(`${LOG_PREFIX} [4/5] Customer record saved for "${email}" (session: ${session.id}).`);
  } catch (err) {
    console.error(
      `${LOG_PREFIX} [4/5] Upstash error creating customer record for session ${session.id} ` +
        "(key WAS issued — but the customer will not be able to log in to /dashboard until " +
        "this record exists; safe to retry this webhook delivery):",
      err,
    );
    throw err;
  }

  // --- Step 5: welcome email (Resend) — wrapped so it can NEVER fail the webhook response (see module doc comment) ---
  try {
    console.log(`${LOG_PREFIX} [5/5] Sending welcome email for session ${session.id}`);
    const result = await sendWelcomeEmail({ email, rawKey, tier, sessionId: session.id });
    if (result.success) {
      console.log(`${LOG_PREFIX} [5/5] Welcome email dispatched for session ${session.id} (id: ${result.id}).`);
    } else {
      console.error(
        `${LOG_PREFIX} [5/5] Welcome email failed for session ${session.id} — continuing anyway ` +
          "(key and customer record are already saved; this does not affect the webhook response):",
        result.error,
      );
    }
  } catch (err) {
    // Should be unreachable (sendWelcomeEmail never throws), but this
    // function guarantees step 5 can never affect POST()'s return value
    // regardless of whether the callee behaves as documented.
    console.error(
      `${LOG_PREFIX} [5/5] Unexpected exception from sendWelcomeEmail for session ${session.id} ` +
        "— continuing anyway (key and customer record are already saved):",
      err,
    );
  }

  console.log(`${LOG_PREFIX} Finished handling checkout.session.completed for session ${session.id}`);
}

export async function POST(request: Request) {
  console.log(`${LOG_PREFIX} Received webhook request.`);

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.error(`${LOG_PREFIX} Missing STRIPE_WEBHOOK_SECRET.`);
    return NextResponse.json({ error: "Webhook not configured." }, { status: 500 });
  }

  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    console.error(`${LOG_PREFIX} Missing stripe-signature header.`);
    return NextResponse.json({ error: "Missing stripe-signature header." }, { status: 400 });
  }

  const rawBody = await request.text();

  let event: Stripe.Event;
  try {
    const stripe = getStripeClient();
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
    console.log(`${LOG_PREFIX} Signature verified — event type: ${event.type}, event id: ${event.id}`);
  } catch (err) {
    console.error(`${LOG_PREFIX} Signature verification failed:`, err);
    return NextResponse.json({ error: "Invalid signature." }, { status: 400 });
  }

  try {
    if (event.type === "checkout.session.completed") {
      await handleCheckoutCompleted(event.data.object as Stripe.Checkout.Session);
    } else {
      console.log(`${LOG_PREFIX} Ignoring event type ${event.type} (no handler for it).`);
    }
  } catch (err) {
    console.error(`${LOG_PREFIX} Handler error for ${event.type} (event id: ${event.id}):`, err);
    // Return 500 so Stripe retries — key issuance/customer-record failures
    // are the one class of error we DO want retried; email failures never
    // reach this catch block (see step 5's comment above).
    return NextResponse.json({ error: "Webhook handler failed." }, { status: 500 });
  }

  console.log(`${LOG_PREFIX} Returning 200 to Stripe for event ${event.id}.`);
  return NextResponse.json({ received: true }, { status: 200 });
}
