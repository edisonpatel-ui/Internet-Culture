import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  findUpdateSessionBySlug,
  loadUpdateSession,
} from "@/lib/admin/articleUpdate/store";
import { deriveScopedFieldUpdates } from "@/lib/admin/articleUpdate/applyScopedPatch";
import { liveEntryToPresentationArticle } from "@/lib/admin/draftGeneration/presentationArticle";
import { getAllEntriesSync } from "@/lib/services/entries";
import { requireAdminSession } from "@/lib/admin/auth/requireAdmin";
import { PublishedUpdatePreview } from "@/components/admin/published/PublishedUpdatePreview";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ session?: string }>;
};

export const dynamicParams = true;

export const metadata: Metadata = {
  title: "Update preview",
  robots: { index: false, follow: false },
};

export default async function ExperimentalPublishedUpdatePage({
  params,
  searchParams,
}: Props) {
  const access = await requireAdminSession();
  if (!access.ok) notFound();

  const { slug } = await params;
  const { session: sessionId } = await searchParams;
  const session = sessionId
    ? loadUpdateSession(sessionId)
    : findUpdateSessionBySlug(slug);

  if (!session || session.slug !== slug) notFound();

  const live = getAllEntriesSync().find((e) => e.slug === slug);
  if (!live) notFound();

  const fieldUpdates = deriveScopedFieldUpdates(session);
  const article = liveEntryToPresentationArticle(live, fieldUpdates);

  return <PublishedUpdatePreview session={session} article={article} />;
}
