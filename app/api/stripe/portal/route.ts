/**
 * app/api/stripe/portal/route.ts
 *
 * POST — for the currently logged-in customer (lib/customerAuth/session.ts),
 * looks up their Stripe customer ID (lib/customer/store.ts) and creates a
 * Stripe Billing Portal session, returning its URL for the dashboard to
 * redirect to. No body/params needed — the customer is entirely determined
 * by the session cookie, never by a client-supplied ID, so there's no way
 * for one customer to request another's portal link.
 */

import { NextResponse } from "next/server";
import { requireCustomerSession } from "@/lib/customerAuth/session";
import { getCustomerRecord } from "@/lib/customer/store";
import { getStripeClient } from "@/lib/stripe/client";
import { BASE_URL } from "@/lib/seo";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST() {
  const session = await requireCustomerSession();
  if (!session.ok) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }

  try {
    const customer = await getCustomerRecord(session.email);
    if (!customer) {
      return NextResponse.json({ error: "No billing account found for this login." }, { status: 404 });
    }

    const stripe = getStripeClient();
    const portalSession = await stripe.billingPortal.sessions.create({
      customer: customer.stripeCustomerId,
      return_url: `${BASE_URL}/dashboard`,
    });

    return NextResponse.json({ url: portalSession.url }, { status: 200 });
  } catch (err) {
    console.error(`[api/stripe/portal] failed for ${session.email}:`, err);
    return NextResponse.json({ error: "Failed to open billing portal. Please try again." }, { status: 500 });
  }
}
