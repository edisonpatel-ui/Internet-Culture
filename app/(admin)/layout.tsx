import type { Metadata } from "next";
import Link from "next/link";

/**
 * Admin route-group layout — internal tooling chrome.
 * Still nested under root Header/Footer until a future auth shell splits layouts.
 * All pages here should set robots noindex.
 */
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function AdminGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="border-b border-amber-500/20 bg-amber-500/[0.07]">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-4 py-2 text-xs text-amber-100/90 sm:px-6 lg:px-8">
          <p>
            <span className="font-semibold">Internal Editorial OS</span>
            {" — "}
            not part of the public encyclopedia. No auth yet (RC4-B foundation).
          </p>
          <Link
            href="/research"
            className="rounded-md border border-amber-500/30 px-2 py-1 text-amber-200 hover:bg-amber-500/10"
          >
            Research workspace
          </Link>
        </div>
      </div>
      {children}
    </>
  );
}
