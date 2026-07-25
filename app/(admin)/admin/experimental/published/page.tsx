import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { searchPublishedArticles } from "@/lib/admin/articleUpdate/createUpdate";
import { PublishedSearch } from "@/components/admin/published/PublishedSearch";
import { requireAdminSession } from "@/lib/admin/auth/requireAdmin";

export const metadata: Metadata = {
  title: "Published (Experimental)",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function ExperimentalPublishedPage() {
  const access = await requireAdminSession();
  if (!access.ok) notFound();

  const initial = searchPublishedArticles("").map((e) => ({
    slug: e.slug,
    title: e.title,
    category: e.category,
    description: e.description,
    addedAt: e.addedAt,
    lastUpdated: e.lastUpdated,
  }));

  return (
    <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <header className="mb-8">
        <p className="text-[11px] font-medium uppercase tracking-wider text-amber-500/90">
          Experimental AI Lab
        </p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight text-zinc-50">
          Published Articles
        </h1>
        <p className="mt-1 text-sm text-zinc-500">
          Browse the live encyclopedia and request scoped updates.
        </p>
      </header>
      <PublishedSearch initial={initial} />
    </main>
  );
}
