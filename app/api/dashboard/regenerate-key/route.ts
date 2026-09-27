/**
 * app/api/dashboard/regenerate-key/route.ts
 *
 * POST — for the currently logged-in customer: revokes their current API
 * key and issues a brand-new one at the same tier, returning the new raw
 * key once (the dashboard shows it in a "copy now" modal, same UX pattern
 * as the post-checkout success page).
 *
 * Rate-limited to once per 24 hours per customer. Without this, a customer
 * could regenerate right before hitting their monthly cap — each new key
 * starts a fresh usage counter (lib/api/monthlyQuota.ts counters are keyed
 * by hashed key) — effectively resetting their quota for free. The cooldown
 * closes that loophole while still letting a customer recover quickly from
 * an actually-leaked key.
 */

import { NextResponse } from "next/server";
import { requireCustomerSession } from "@/lib/customerAuth/session";
import { getCustomerRecord, updateCustomerActiveKey } from "@/lib/customer/store";
import { registerPaidApiKey, revokeApiKey } from "@/lib/api/keys";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const REGENERATE_COOLDOWN_MS = 24 * 60 * 60 * 1000;

export async function POST() {
  const session = await requireCustomerSession();
  if (!session.ok) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }

  try {
    const customer = await getCustomerRecord(session.email);
    if (!customer) {
      return NextResponse.json({ error: "No account found for this login." }, { status: 404 });
    }

    const msSinceLastUpdate = Date.now() - new Date(customer.updatedAt).getTime();
    if (msSinceLastUpdate < REGENERATE_COOLDOWN_MS) {
      const retryAfterHours = Math.ceil((REGENERATE_COOLDOWN_MS - msSinceLastUpdate) / (60 * 60 * 1000));
      return NextResponse.json(
        { error: `You can regenerate your key again in about ${retryAfterHours}h.` },
        { status: 429 },
      );
    }

    const { rawKey, hashedKey } = await registerPaidApiKey(session.email, customer.tier);
    await revokeApiKey(customer.hashedKey);
    await updateCustomerActiveKey(session.email, hashedKey, rawKey.slice(-4));

    return NextResponse.json({ key: rawKey }, { status: 200 });
  } catch (err) {
    console.error(`[api/dashboard/regenerate-key] failed for ${session.email}:`, err);
    return NextResponse.json({ error: "Failed to regenerate key. Please try again." }, { status: 500 });
  }
}
