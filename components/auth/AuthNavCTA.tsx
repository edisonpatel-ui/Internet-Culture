"use client";

import Link from "next/link";
import { useState } from "react";

function readSessionHint(): boolean {
  if (typeof document === "undefined") return false; // SSR — resolved on the client after hydration.
  return document.cookie.split("; ").some((c) => c.startsWith("ci_session_hint="));
}

/**
 * Branches purely on the non-sensitive `ci_session_hint` cookie (see
 * lib/customerAuth/session.ts) to decide the CTA label/link. This is a UI
 * convenience only — /dashboard independently re-verifies the real,
 * httpOnly session cookie server-side regardless of what this component
 * shows, so a stale or spoofed hint can only affect which label is shown
 * here, never actual access.
 *
 * Read via a lazy useState initializer (not a useEffect + setState) so
 * there's no synchronous setState-in-effect — the value is simply wrong
 * (false) for the very first server-rendered paint and correct from the
 * first client render onward, which is fine for a non-critical CTA label.
 */
export function AuthNavCTA({ className }: { className?: string }) {
  const [loggedIn] = useState(readSessionHint);

  return (
    <Link href={loggedIn ? "/dashboard" : "/login"} className={className}>
      {loggedIn ? "Dashboard" : "Log In"}
    </Link>
  );
}
