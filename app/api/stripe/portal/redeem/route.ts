/**
 * app/api/stripe/portal/redeem/route.ts
 *
 * GET ?token=... — the link embedded in the 80%/100% quota-alert emails
 * (lib/email/quotaAlerts.ts). Consumes the single-use redeem token
 * (lib/stripe/portalRedeemToken.ts), looks up that email's Stripe customer
 * ID, creates a brand-new Stripe Billing Portal session, and redirects
 * straight into it — no login step, since the customer may be reading
 * this email on a device with no active dashboard session.
 *
 * On any failure (missing/expired/already-used token, no matching
 * account, Stripe error) this redirects to /dashboard rather than showing
 * a bare error page — a logged-in customer lands on their normal billing
 * controls (BillingButton) as a fallback; a logged-out one lands on
 * /login via the dashboard page's own redirect. Never leaks which failure
 * mode occurred via the URL, matching the anti-enumeration posture of
 * app/api/auth/magic-link.
 */

import { NextResponse } from "next/server";
import { consumePortalRedeemToken } from "@/lib/stripe/portalRedeemToken";
import { getCustomerRecord } from "@/lib/customer/store";
import { getStripeClient } from "@/lib/stripe/client";
import { BASE_URL } from "@/lib/seo";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");

  if (!token) {
    return NextResponse.redirect(`${BASE_URL}/dashboard`);
  }

  try {
    const email = await consumePortalRedeemToken(token);
    if (!email) {
      return NextResponse.redirect(`${BASE_URL}/dashboard`);
    }

    const customer = await getCustomerRecord(email);
    if (!customer) {
      return NextResponse.redirect(`${BASE_URL}/dashboard`);
    }

    const stripe = getStripeClient();
    const portalSession = await stripe.billingPortal.sessions.create({
      customer: customer.stripeCustomerId,
      return_url: `${BASE_URL}/dashboard`,
    });

    return NextResponse.redirect(portalSession.url);
  } catch (err) {
    console.error("[api/stripe/portal/redeem] unexpected error:", err);
    return NextResponse.redirect(`${BASE_URL}/dashboard`);
  }
}
