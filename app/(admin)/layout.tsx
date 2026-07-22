import type { Metadata } from "next";
import { AdminChrome } from "@/components/admin/AdminChrome";

/**
 * Experimental AI Lab / Future Editorial System (Phase 2+).
 * Not part of the Version 1 content workflow.
 */
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function AdminGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminChrome>{children}</AdminChrome>;
}
