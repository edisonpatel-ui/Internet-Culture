import { redirect } from "next/navigation";
import { experimentalPaths } from "@/lib/admin/experimentalPaths";

type Props = { params: Promise<{ slug: string }> };

/** Legacy → Experimental AI Lab */
export default async function LegacyPublishedArticleRedirect({
  params,
}: Props) {
  const { slug } = await params;
  redirect(experimentalPaths.publishedArticle(slug));
}
