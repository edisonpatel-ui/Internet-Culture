"use server";

import { cookies } from "next/headers";
import {
  EDITORIAL_TOKEN_COOKIE,
  getConfiguredEditorialToken,
} from "@/lib/admin/editorialAccess";

export async function unlockEditorialAction(
  token: string,
): Promise<{ ok: true } | { ok: false; error: string }> {
  const expected = getConfiguredEditorialToken();
  if (!expected) {
    return {
      ok: false,
      error:
        "EDITORIAL_OS_TOKEN is not configured on the server. Set it in the environment to enable unlock.",
    };
  }
  if (token.trim() !== expected) {
    return { ok: false, error: "Invalid token." };
  }

  const jar = await cookies();
  jar.set(EDITORIAL_TOKEN_COOKIE, expected, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 14,
  });

  return { ok: true };
}
