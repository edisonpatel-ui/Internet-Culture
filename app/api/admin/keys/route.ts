/**
 * app/api/admin/keys/route.ts
 *
 * Internal, session-gated endpoint for issuing new public-API keys (partner
 * onboarding, testing). Not part of the public v1 API surface — this lives
 * under /api/admin, alongside the rest of the admin surface, and is gated
 * the same way every other admin route in this project already is:
 * requireAdminSession() (lib/admin/auth/requireAdmin.ts).
 *
 * Per the project's existing admin security policy (see
 * docs/EDITORIAL_OS_SECURITY.md and the admin pages under app/(admin)),
 * unauthorized callers get a plain 404 — never a 401/redirect that would
 * reveal this route exists.
 *
 *   POST /api/admin/keys
 *   Body: { "owner": "partner-name", "tier": "free" | "pro" }
 *   Response: { success: true, rawKey, owner, tier, rateLimit }
 *
 * The returned rawKey is shown exactly once — only its SHA-256 hash is ever
 * persisted (lib/api/keys.ts). There is no "list keys" or "recover a lost
 * key" flow by design; issue a new key and revoke the old one if it's lost.
 */

import { NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/admin/auth/requireAdmin";
import { registerApiKey, TIER_RATE_LIMITS, TIER_MONTHLY_QUOTAS, type ApiKeyTier } from "@/lib/api/keys";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function isValidTier(value: unknown): value is ApiKeyTier {
  return value === "free" || value === "starter" || value === "pro";
}

export async function POST(request: Request) {
  const access = await requireAdminSession();
  if (!access.ok) {
    // Mirrors app/(admin) pages: unauthorized callers see a plain 404, not
    // a 401 or redirect, so this route's existence is never revealed.
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, error: "Request body must be valid JSON." },
      { status: 400 },
    );
  }

  const owner = typeof (body as { owner?: unknown })?.owner === "string"
    ? ((body as { owner: string }).owner).trim()
    : "";
  const tier = (body as { tier?: unknown })?.tier;

  if (!owner) {
    return NextResponse.json(
      { success: false, error: '"owner" is required and must be a non-empty string.' },
      { status: 400 },
    );
  }
  if (!isValidTier(tier)) {
    return NextResponse.json(
      { success: false, error: '"tier" is required and must be "free", "starter", or "pro".' },
      { status: 400 },
    );
  }

  try {
    const { rawKey } = await registerApiKey(owner, tier);
    return NextResponse.json(
      {
        success: true,
        rawKey,
        owner,
        tier,
        rateLimit: TIER_RATE_LIMITS[tier],
        monthlyQuota: TIER_MONTHLY_QUOTAS[tier],
        note: "Store this key now — it will not be shown again.",
      },
      { status: 201 },
    );
  } catch (err) {
    console.error("[api/admin/keys] failed to register key:", err);
    return NextResponse.json(
      { success: false, error: "Failed to generate API key." },
      { status: 500 },
    );
  }
}
