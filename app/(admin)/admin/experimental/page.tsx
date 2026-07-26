import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAdminSession } from "@/lib/admin/auth/requireAdmin";
import { experimentalPaths } from "@/lib/admin/experimentalPaths";

export const metadata: Metadata = {
  title: "Experimental AI Lab",
  robots: { index: false, follow: false },
};

const TOOLS = [
  {
    href: experimentalPaths.create,
    label: "Prompt",
    blurb: "Prompt → Generate Draft",
  },
  {
    href: experimentalPaths.drafts,
    label: "Drafts",
    blurb: "Preview drafts · optional AI Edit",
  },
  {
    href: experimentalPaths.edits,
    label: "Edits",
    blurb: "Review changes · Publish from Edit",
  },
  {
    href: experimentalPaths.maintenance,
    label: "Maintenance",
    blurb: "Refresh category → preview → apply",
  },
  {
    href: experimentalPaths.settings,
    label: "Knowledge Engine Settings",
    blurb: "Providers and API status",
  },
] as const;

/**
 * Hub for the Future Editorial System — Phase 2+.
 * Also reachable from /admin.
 */
export default async function ExperimentalLabHubPage() {
  const access = await requireAdminSession();
  if (!access.ok) notFound();

  return (
    <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <header className="mb-10">
        <p className="text-[11px] font-medium uppercase tracking-wider text-amber-500/90">
          Phase 2+ · Experimental
        </p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight text-zinc-50">
          Experimental AI Lab
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-zinc-400">
          Full Editorial OS tooling. Prefer the{" "}
          <Link href="/admin" className="text-zinc-200 underline">
            Admin home
          </Link>{" "}
          for the simplified entry point.
        </p>
      </header>

      <ul className="divide-y divide-zinc-900 rounded-lg border border-zinc-800">
        {TOOLS.map((tool) => (
          <li key={tool.href}>
            <Link
              href={tool.href}
              className="flex flex-col gap-0.5 px-4 py-3 transition-colors hover:bg-zinc-900/40 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="font-medium text-zinc-100">{tool.label}</p>
                <p className="text-xs text-zinc-500">{tool.blurb}</p>
              </div>
              <span className="text-xs text-amber-300/80">Open</span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
