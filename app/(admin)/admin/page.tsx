import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAdminSession } from "@/lib/admin/auth/requireAdmin";
import { adminSignOutAction } from "@/lib/admin/auth/actions";
import { experimentalPaths } from "@/lib/admin/experimentalPaths";

export const metadata: Metadata = {
  title: "Admin (Experimental)",
  robots: { index: false, follow: false },
};

const CARDS = [
  {
    href: experimentalPaths.create,
    label: "Draft Studio",
    blurb: "Generate → preview → edit → publish.",
  },
  {
    href: experimentalPaths.drafts,
    label: "Drafts",
    blurb: "Open unpublished drafts.",
  },
  {
    href: experimentalPaths.edits,
    label: "Publish queue",
    blurb: "Preview updates and publish live.",
  },
  {
    href: experimentalPaths.maintenance,
    label: "Maintenance",
    blurb: "Refresh category metadata → preview → apply.",
  },
  {
    href: experimentalPaths.settings,
    label: "Knowledge Engine Settings",
    blurb: "Providers and API status only.",
  },
] as const;

/**
 * Internal Admin homepage. Not linked from the public site.
 */
export default async function AdminHomePage() {
  const access = await requireAdminSession();
  if (!access.ok) notFound();

  return (
    <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <header className="mb-10 flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-wider text-amber-500/90">
            Experimental · Internal
          </p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-zinc-50">
            Admin
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-zinc-400">
            Experimental Editorial OS. The live encyclopedia changes only after
            you explicitly Apply or Publish.
          </p>
        </div>
        <form action={adminSignOutAction}>
          <button
            type="submit"
            className="rounded-md border border-zinc-700 px-3 py-1.5 text-xs text-zinc-400 hover:bg-zinc-900"
          >
            Sign out
          </button>
        </form>
      </header>

      <ul className="grid gap-3">
        {CARDS.map((card) => (
          <li key={card.href}>
            <Link
              href={card.href}
              className="block rounded-lg border border-zinc-800 bg-zinc-950/50 px-5 py-4 transition-colors hover:border-zinc-600 hover:bg-zinc-900/40"
            >
              <p className="text-sm font-semibold text-zinc-100">
                {card.label}{" "}
                <span className="font-normal text-amber-500/80">
                  (Experimental)
                </span>
              </p>
              <p className="mt-1 text-xs text-zinc-500">{card.blurb}</p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
