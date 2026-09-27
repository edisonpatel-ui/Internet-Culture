/**
 * app/api/auth/logout/route.ts
 *
 * POST — clears the customer session (both the real session cookie and the
 * non-sensitive UI hint cookie, see lib/customerAuth/session.ts).
 */

import { NextResponse } from "next/server";
import { destroySession } from "@/lib/customerAuth/session";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST() {
  await destroySession();
  return NextResponse.json({ success: true }, { status: 200 });
}
