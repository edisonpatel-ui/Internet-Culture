import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Not Found",
  robots: { index: false, follow: false },
};

/**
 * Legacy token unlock removed — use session auth at /admin/access.
 * Unauthenticated visitors must not discover admin via a unlock UI.
 */
export default function UnlockRemovedPage() {
  notFound();
}
