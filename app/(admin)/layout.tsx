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
      <div className="border-b border-zinc-800 bg-zinc-950">
        <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-2 px-4 py-2 text-xs text-zinc-400 sm:px-6 lg:px-8">
          <p>
            <span className="font-medium text-zinc-300">Internal Editorial OS</span>
            {" — "}
            not part of the public encyclopedia. Mock data only.
          </p>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/research"
              className="rounded-md border border-zinc-700 px-2 py-1 text-zinc-300 hover:bg-zinc-900"
            >
              Research
            </Link>
            <Link
              href="/research-review"
              className="rounded-md border border-zinc-700 px-2 py-1 text-zinc-300 hover:bg-zinc-900"
              title="Only when research needs a human decision"
            >
              Research Review
            </Link>
            <Link
              href="/drafts"
              className="rounded-md border border-zinc-700 px-2 py-1 text-zinc-300 hover:bg-zinc-900"
            >
              Drafts
            </Link>
            <Link
              href="/publish"
              className="rounded-md border border-zinc-700 px-2 py-1 text-zinc-300 hover:bg-zinc-900"
            >
              Publish
            </Link>
          </div>
        </div>
      </div>
      {children}
    </>
  );
}
