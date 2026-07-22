import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  findUpdateSessionBySlug,
  loadUpdateSession,
} from "@/lib/admin/articleUpdate/store";
import { PublishedUpdatePreview } from "@/components/admin/published/PublishedUpdatePreview";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ session?: string }>;
};

export const dynamicParams = true;

export const metadata: Metadata = {
  title: "Update preview (Experimental)",
  robots: { index: false, follow: false },
};

export default async function ExperimentalPublishedUpdatePage({
  params,
  searchParams,
}: Props) {
  const { slug } = await params;
  const { session: sessionId } = await searchParams;
  const session = sessionId
    ? loadUpdateSession(sessionId)
    : findUpdateSessionBySlug(slug);

  if (!session || session.slug !== slug) notFound();

  return <PublishedUpdatePreview session={session} />;
}
