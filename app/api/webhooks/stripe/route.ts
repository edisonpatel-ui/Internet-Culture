/**
 * app/api/webhooks/stripe/route.ts
 *
 * Stripe webhook target (LIVE mode). Verifies the signature against
 * STRIPE_WEBHOOK_SECRET using the RAW request body, then dispatches:
 *
 *   checkout.session.completed            \  PROVISIONING — the ONLY place a paid
 *   checkout.session.async_payment_succeeded /  API key is created, and only when the
 *                                            session is a subscription AND paid.
 *   customer.subscription.created         record subscription id/status (never provisions)
 *   customer.subscription.updated         status changes, plan changes (re-tier the key);
 *                                         revokes the key on canceled/unpaid/incomplete_expired
 *   customer.subscription.deleted         revokes the key
 *   invoice.payment_succeeded             records lastPaymentAt, marks the account active
 *
 * Add exactly these events to the endpoint in the Stripe Dashboard
 * (Developers → Webhooks), plus `checkout.session.async_payment_succeeded`
 * if you ever enable delayed-notification payment methods (bank debits).
 *
 * IDEMPOTENCY (lib/stripe/eventClaims.ts): Stripe delivers at-least-once.
 * Provisioning is claimed per Checkout Session id, everything else per event
 * id; a failed handler releases its claim so Stripe's retry can re-run it.
 * Without this, a retry would issue a second key and revoke the first.
 *
 * EVENT ORDER IS NOT GUARANTEED: customer.subscription.created usually
 * arrives BEFORE checkout.session.completed. Lifecycle handlers therefore
 * only ever touch accounts that already exist and never create one.
 *
 * The welcome email can never fail the webhook response — the key is already
 * issued by then and a Stripe retry would be worse than a missed email.
 *
 * LOGGING: production logs carry Stripe IDs only (evt_/cs_/cus_/sub_) — no
 * emails, no key fragments. Verbose, PII-bearing logs go through debugLog
 * and are silent when NODE_ENV === "production".
 */

import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { getStripeClient, getTierForPriceId } from "@/lib/stripe/client";
import { registerPaidApiKey, revokeApiKey, setApiKeyTier } from "@/lib/api/keys";
import { storeCheckoutSessionKey } from "@/lib/stripe/checkoutKeyHandoff";
import {
  getCustomerRecord,
  getCustomerRecordByStripeId,
  patchCustomerRecord,
  upsertCustomerRecord,
} from "@/lib/customer/store";
import { sendWelcomeEmail } from "@/lib/email/welcomeEmail";
import { isPurchasableTier } from "@/lib/config/subscriptions";
import { claim, release } from "@/lib/stripe/eventClaims";
import { debugLog, errorLog, infoLog } from "@/lib/stripe/log";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const LOG_PREFIX = "[webhooks/stripe]";

/** Subscription states in which the customer must NOT have a working API key. */
const TERMINAL_STATUSES = new Set<Stripe.Subscription.Status>(["canceled", "unpaid", "incomplete_expired"]);
/** States in which a plan change should be applied to the key. */
const LIVE_STATUSES = new Set<Stripe.Subscription.Status>(["active", "trialing", "past_due"]);

function idOf(value: string | { id: string } | null | undefined): string | null {
  if (!value) return null;
  return typeof value === "string" ? value : value.id;
}

// ---------------------------------------------------------------------------
// Provisioning: checkout.session.completed / async_payment_succeeded
// ---------------------------------------------------------------------------

/** "later" = deliberately did nothing yet; the caller frees the claim so a follow-up event can provision. */
type Outcome = "done" | "later";

async function handleCheckoutPaid(session: Stripe.Checkout.Session, eventType: string): Promise<Outcome> {
  if (session.mode !== "subscription") {
    infoLog(`${LOG_PREFIX} ${eventType}: session ${session.id} is mode "${session.mode}", not a subscription — ignoring.`);
    return "done";
  }
  // Provision ONLY against money actually received. (For delayed payment
  // methods `completed` fires unpaid; async_payment_succeeded follows later.)
  if (session.payment_status !== "paid") {
    infoLog(`${LOG_PREFIX} ${eventType}: session ${session.id} payment_status is "${session.payment_status}" — not provisioning yet.`);
    return "later";
  }

  const email = (session.customer_details?.email ?? session.customer_email ?? "").trim().toLowerCase();
  const tier = session.metadata?.tier;
  const stripeCustomerId = idOf(session.customer);
  const subscriptionId = idOf(session.subscription);

  if (!email || !isPurchasableTier(tier) || !stripeCustomerId || !subscriptionId) {
    // Not retryable — retrying cannot make the session grow these fields.
    errorLog(
      `${LOG_PREFIX} ${eventType}: cannot provision session ${session.id} — ` +
        `email:${email ? "ok" : "MISSING"} tier:${isPurchasableTier(tier) ? tier : `INVALID(${String(tier)})`} ` +
        `customer:${stripeCustomerId ? "ok" : "MISSING"} subscription:${subscriptionId ? "ok" : "MISSING"}`,
    );
    return "done";
  }
  debugLog(`${LOG_PREFIX} provisioning ${tier} for "${email}" (session ${session.id})`);

  // --- Issue the key ---
  const { rawKey, hashedKey } = await registerPaidApiKey(email, tier);

  // --- One-time handoff for the success page ---
  await storeCheckoutSessionKey(session.id, rawKey);

  // --- Customer record (dashboard login resolves through this) ---
  const previous = await getCustomerRecord(email);
  if (previous && previous.hashedKey !== hashedKey) {
    await revokeApiKey(previous.hashedKey); // one live key per customer
  }
  const now = new Date().toISOString();
  // Spread `previous` so fields we don't own (e.g. passwordHash) survive a re-subscribe.
  const next = {
    ...(previous ?? {}),
    email,
    stripeCustomerId,
    stripeSubscriptionId: subscriptionId,
    subscriptionStatus: "active",
    lastPaymentAt: now,
    tier,
    hashedKey,
    keyLastFour: rawKey.slice(-4),
    createdAt: previous?.createdAt ?? now,
    updatedAt: now,
  };
  delete (next as { canceledAt?: string }).canceledAt;
  await upsertCustomerRecord(next);
  infoLog(`${LOG_PREFIX} provisioned ${tier} key for ${stripeCustomerId} / ${subscriptionId} (session ${session.id}).`);

  // --- Welcome email: can NEVER fail the webhook ---
  try {
    const result = await sendWelcomeEmail({ email, rawKey, tier, sessionId: session.id });
    if (!result.success) errorLog(`${LOG_PREFIX} welcome email failed for session ${session.id}:`, result.error);
  } catch (err) {
    errorLog(`${LOG_PREFIX} welcome email threw for session ${session.id}:`, err);
  }
  return "done";
}

// ---------------------------------------------------------------------------
// Lifecycle: customer.subscription.* / invoice.payment_succeeded
// ---------------------------------------------------------------------------

async function handleSubscriptionEvent(sub: Stripe.Subscription, eventType: string): Promise<void> {
  const customerId = idOf(sub.customer);
  const record = customerId ? await getCustomerRecordByStripeId(customerId) : null;
  if (!record) {
    // Normal for subscription.created, which beats checkout.session.completed.
    infoLog(`${LOG_PREFIX} ${eventType}: no account yet for ${customerId} / ${sub.id} — nothing to update.`);
    return;
  }
  // A customer who cancelled and re-subscribed has two subscriptions; ignore the old one's events.
  if (record.stripeSubscriptionId && record.stripeSubscriptionId !== sub.id) {
    infoLog(`${LOG_PREFIX} ${eventType}: ${sub.id} is not ${customerId}'s current subscription (${record.stripeSubscriptionId}) — ignoring.`);
    return;
  }

  const status = sub.status;

  if (eventType === "customer.subscription.deleted" || TERMINAL_STATUSES.has(status)) {
    await revokeApiKey(record.hashedKey);
    await patchCustomerRecord(record.email, {
      stripeSubscriptionId: sub.id,
      subscriptionStatus: eventType === "customer.subscription.deleted" ? "canceled" : status,
      canceledAt: record.canceledAt ?? new Date().toISOString(),
    });
    infoLog(`${LOG_PREFIX} ${eventType}: ${sub.id} is ${status} — API key revoked for ${customerId}.`);
    return;
  }

  // Plan change (e.g. Starter → Scale via the customer portal): re-tier the existing key.
  let newTier = record.tier;
  if (LIVE_STATUSES.has(status)) {
    const priceTier = getTierForPriceId(sub.items?.data?.[0]?.price?.id);
    if (priceTier && priceTier !== record.tier) {
      const changed = await setApiKeyTier(record.hashedKey, priceTier);
      if (changed) {
        newTier = priceTier;
        infoLog(`${LOG_PREFIX} ${eventType}: ${customerId} moved ${record.tier} → ${priceTier}; key re-tiered.`);
      }
    }
  }

  // Paying an overdue invoice can flip unpaid → active after the key was
  // revoked. Clear the cancelled flag so the customer can mint a fresh key
  // from the dashboard (regenerate-key is blocked while canceledAt is set).
  const reactivated = Boolean(record.canceledAt) && LIVE_STATUSES.has(status);
  await patchCustomerRecord(record.email, {
    stripeSubscriptionId: sub.id,
    subscriptionStatus: status,
    tier: newTier,
    ...(reactivated ? { canceledAt: undefined } : {}),
  });
  if (reactivated) infoLog(`${LOG_PREFIX} ${eventType}: ${customerId} reactivated — customer must regenerate their API key.`);
  infoLog(`${LOG_PREFIX} ${eventType}: ${sub.id} status → ${status} for ${customerId}.`);
}

async function handleInvoicePaid(invoice: Stripe.Invoice): Promise<void> {
  const customerId = idOf(invoice.customer);
  const record = customerId ? await getCustomerRecordByStripeId(customerId) : null;
  if (!record) {
    // First invoice usually lands before the account exists — checkout handler sets lastPaymentAt itself.
    infoLog(`${LOG_PREFIX} invoice.payment_succeeded: no account yet for ${customerId} (${invoice.id}) — skipping.`);
    return;
  }
  const paidAt = invoice.status_transitions?.paid_at
    ? new Date(invoice.status_transitions.paid_at * 1000).toISOString()
    : new Date().toISOString();
  await patchCustomerRecord(record.email, {
    lastPaymentAt: paidAt,
    // A successful payment clears a past_due flag; never resurrects a cancelled account.
    ...(record.subscriptionStatus === "past_due" ? { subscriptionStatus: "active" } : {}),
  });
  infoLog(`${LOG_PREFIX} invoice.payment_succeeded: recorded payment for ${customerId} (${invoice.id}).`);
}

// ---------------------------------------------------------------------------
// Entry point
// ---------------------------------------------------------------------------

async function dispatch(event: Stripe.Event): Promise<Outcome> {
  switch (event.type) {
    case "checkout.session.completed":
    case "checkout.session.async_payment_succeeded":
      return handleCheckoutPaid(event.data.object as Stripe.Checkout.Session, event.type);
    case "customer.subscription.created":
    case "customer.subscription.updated":
    case "customer.subscription.deleted":
      await handleSubscriptionEvent(event.data.object as Stripe.Subscription, event.type);
      return "done";
    case "invoice.payment_succeeded":
      await handleInvoicePaid(event.data.object as Stripe.Invoice);
      return "done";
    default:
      debugLog(`${LOG_PREFIX} ignoring ${event.type}`);
      return "done";
  }
}

/** Claim key: provisioning dedupes by Checkout Session (two event types can describe one session). */
function claimIdFor(event: Stripe.Event): string {
  if (event.type === "checkout.session.completed" || event.type === "checkout.session.async_payment_succeeded") {
    return `provision:${(event.data.object as Stripe.Checkout.Session).id}`;
  }
  return `event:${event.id}`;
}

export async function POST(request: Request) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    errorLog(`${LOG_PREFIX} Missing STRIPE_WEBHOOK_SECRET.`);
    return NextResponse.json({ error: "Webhook not configured." }, { status: 500 });
  }

  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "Missing stripe-signature header." }, { status: 400 });
  }

  const rawBody = await request.text();

  let event: Stripe.Event;
  try {
    event = getStripeClient().webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch (err) {
    errorLog(`${LOG_PREFIX} Signature verification failed:`, err instanceof Error ? err.message : err);
    return NextResponse.json({ error: "Invalid signature." }, { status: 400 });
  }
  debugLog(`${LOG_PREFIX} verified ${event.type} ${event.id} (livemode: ${event.livemode})`);

  // In production, refuse test-mode events outright: a leftover test webhook
  // endpoint must never provision a real, working API key.
  if (process.env.NODE_ENV === "production" && event.livemode === false) {
    errorLog(`${LOG_PREFIX} Rejected test-mode event ${event.id} (${event.type}) in production.`);
    return NextResponse.json({ received: true, ignored: "test-mode event" }, { status: 200 });
  }

  const claimId = claimIdFor(event);
  let claimed = false;
  try {
    claimed = await claim(claimId);
    if (!claimed) {
      infoLog(`${LOG_PREFIX} duplicate delivery of ${event.type} ${event.id} — already handled.`);
      return NextResponse.json({ received: true, duplicate: true }, { status: 200 });
    }
    if ((await dispatch(event)) === "later") {
      await release(claimId);
      claimed = false;
    }
  } catch (err) {
    errorLog(`${LOG_PREFIX} Handler error for ${event.type} (${event.id}):`, err);
    if (claimed) await release(claimId).catch(() => {});
    // 500 → Stripe retries. Email failures never reach here.
    return NextResponse.json({ error: "Webhook handler failed." }, { status: 500 });
  }

  return NextResponse.json({ received: true }, { status: 200 });
}
