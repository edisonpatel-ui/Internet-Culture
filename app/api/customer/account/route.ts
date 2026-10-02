/**
 * app/api/customer/account/route.ts
 *
 * Account-level controls for the currently logged-in customer
 * (lib/customerAuth/session.ts's ci_session cookie) — not part of the
 * Bearer-key /api/v1 surface.
 *
 * DELETE — permanently deletes the account:
 *   1. Cancels any active Stripe subscription (best-effort — a deleted
 *      account should not keep being billed; a Stripe hiccup here is
 *      logged but does not block the rest of the deletion, since the
 *      customer asked to delete THEIR data, not to be blocked by a
 *      billing-API outage).
 *   2. Revokes the API key (lib/api/keys.ts) and purges usage analytics
 *      (lib/api/metrics.ts).
 *   3. Deletes the customer record (lib/customer/store.ts).
 *   4. Destroys the current session cookie.
 *
 *   Body: { "confirmEmail": string } — must exactly match the logged-in
 *   email (case-insensitive). This is a safety net against a stray/CSRF
 *   DELETE request succeeding on nothing but an ambient cookie, not a
 *   replacement for real authentication (the session check above is
 *   still what actually authorizes this).
 *
 * POST — "Log out everywhere": invalidates every outstanding session
 *   cookie for this account (lib/customerAuth/session.ts's
 *   revokeAllSessions) and also clears the caller's own cookie, so the
 *   device that requested this ends up logged out too, not just every
 *   OTHER device.
 */

import { NextResponse } from "next/server";
import { requireCustomerSession, revokeAllSessions, destroySession } from "@/lib/customerAuth/session";
import { getCustomerRecord, deleteCustomerRecord } from "@/lib/customer/store";
import { revokeApiKey } from "@/lib/api/keys";
import { purgeUsageMetrics } from "@/lib/api/metrics";
import { getStripeClient } from "@/lib/stripe/client";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function DELETE(request: Request) {
  const session = await requireCustomerSession();
  if (!session.ok) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const confirmEmail = typeof body?.confirmEmail === "string" ? body.confirmEmail.trim().toLowerCase() : "";
  if (confirmEmail !== session.email.trim().toLowerCase()) {
    return NextResponse.json(
      { error: "Type your account email exactly to confirm account deletion." },
      { status: 400 },
    );
  }

  try {
    const customer = await getCustomerRecord(session.email);
    if (!customer) {
      return NextResponse.json({ error: "No account found for this login." }, { status: 404 });
    }

    try {
      const stripe = getStripeClient();
      const activeSubscriptions = await stripe.subscriptions.list({
        customer: customer.stripeCustomerId,
        status: "active",
      });
      await Promise.all(activeSubscriptions.data.map((sub) => stripe.subscriptions.cancel(sub.id)));
    } catch (err) {
      console.error(`[api/customer/account] Stripe cancellation failed for ${session.email}:`, err);
      // Continue — don't let a billing-API hiccup block the customer from deleting their own account/data.
    }

    await revokeApiKey(customer.hashedKey);
    await purgeUsageMetrics(customer.hashedKey);
    await deleteCustomerRecord(session.email);
    await destroySession();

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error(`[api/customer/account] deletion failed for ${session.email}:`, err);
    return NextResponse.json({ error: "Failed to delete account. Please try again." }, { status: 500 });
  }
}

export async function POST() {
  const session = await requireCustomerSession();
  if (!session.ok) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }

  try {
    await revokeAllSessions(session.email);
    await destroySession(); // also log out the device that made this request, not just every other one
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error(`[api/customer/account] log-out-everywhere failed for ${session.email}:`, err);
    return NextResponse.json({ error: "Failed to log out of all sessions. Please try again." }, { status: 500 });
  }
}
