import { auth } from "@/auth";
import {
  isAdminAuthConfigured,
  isAllowedAdminEmail,
} from "@/lib/admin/auth/adminAllowlist";

export type AdminGateResult =
  | { ok: true; email: string }
  | { ok: false; reason: string };

/**
 * Server-side gate for admin pages and server actions.
 * Development without auth env → open (local tooling).
 * Production without auth env → deny (fail closed).
 */
export async function requireAdminSession(): Promise<AdminGateResult> {
  const configured = isAdminAuthConfigured();
  const isProduction = process.env.NODE_ENV === "production";

  if (!configured) {
    if (isProduction) {
      return { ok: false, reason: "Admin auth is not configured." };
    }
    return { ok: true, email: "dev@localhost" };
  }

  const session = await auth();
  const email = session?.user?.email?.trim().toLowerCase() ?? "";
  if (!email || !isAllowedAdminEmail(email)) {
    return { ok: false, reason: "Not authenticated." };
  }
  return { ok: true, email };
}

export async function isAdminSession(): Promise<boolean> {
  const result = await requireAdminSession();
  return result.ok;
}
