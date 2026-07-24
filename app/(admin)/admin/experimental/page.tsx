import type { Metadata } from "next";
import Link from "next/link";
import { experimentalPaths } from "@/lib/admin/experimentalPaths";

export const metadata: Metadata = {
  title: "Experimental AI Lab",
  robots: { index: false, follow: false },
};

const TOOLS = [
  {
    href: experimentalPaths.create,
    label: "Create Article",
    blurb: "Prompt → Knowledge Engine → draft (experimental)",
  },
  {
    href: experimentalPaths.drafts,
    label: "Drafts",
    blurb: "Unpublished AI-generated encyclopedia drafts",
  },
  {
    href: experimentalPaths.edits,
    label: "Edits",
    blurb: "Revision queue and publish from Edits",
  },
  {
    href: experimentalPaths.published,
    label: "Published",
    blurb: "Search live catalog and scoped updates",
  },
  {
    href: experimentalPaths.maintenance,
    label: "Maintenance Center",
    blurb: "Refresh dynamic metadata · propose → review → apply (no auto-commit)",
  },
  {
    href: experimentalPaths.settings,
    label: "Knowledge Engine (Experimental)",
    blurb: "Diagnostics and run logs",
  },
] as const;

/**
 * Hub for the Future Editorial System — Phase 2+.
 * Not part of the Version 1 content workflow.
 */
export default function ExperimentalLabHubPage() {
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
          Future Editorial System / Knowledge Engine prototype. Fully functional
          for future development —{" "}
          <span className="text-zinc-300">
            not the Version 1 article workflow
          </span>
          .
        </p>
        <p className="mt-3 text-sm leading-relaxed text-zinc-500">
          Version 1 content is researched and written with Cursor AI, reviewed
          by a human, and committed to{" "}
          <code className="text-zinc-400">lib/content/</code>. See{" "}
          <span className="text-zinc-400">docs/VERSION_1_CONTENT_WORKFLOW.md</span>
          .
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
