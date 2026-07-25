import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { AdminAccessForm } from "@/components/admin/AdminAccessForm";
import {
  isAdminAuthConfigured,
  isAllowedAdminEmail,
} from "@/lib/admin/auth/adminAllowlist";

export const metadata: Metadata = {
  title: "Access",
  robots: { index: false, follow: false },
};

/**
 * Unlisted credentials entry. Not linked publicly.
 * Authenticated admins are sent to /admin.
 */
export default async function AdminAccessPage() {
  if (!isAdminAuthConfigured()) {
    if (process.env.NODE_ENV === "production") {
      return (
        <main className="mx-auto max-w-sm px-4 py-24 text-sm text-zinc-500">
          Not available.
        </main>
      );
    }
    redirect("/admin");
  }

  const session = await auth();
  if (session?.user?.email && isAllowedAdminEmail(session.user.email)) {
    redirect("/admin");
  }

  const googleEnabled = Boolean(
    process.env.AUTH_GOOGLE_ID?.trim() &&
      process.env.AUTH_GOOGLE_SECRET?.trim(),
  );

  return (
    <main>
      <AdminAccessForm googleEnabled={googleEnabled} />
    </main>
  );
}
