import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllEntriesSync } from "@/lib/services/entries";
import { PublishedArticleView } from "@/components/admin/published/PublishedArticleView";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = true;

export const metadata: Metadata = {
  title: "Published article (Experimental)",
  robots: { index: false, follow: false },
};

export default async function ExperimentalPublishedArticlePage({
  params,
}: Props) {
  const { slug } = await params;
  const entry = getAllEntriesSync().find((e) => e.slug === slug);
  if (!entry) notFound();

  return <PublishedArticleView entry={entry} />;
}
