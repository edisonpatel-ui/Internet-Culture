import { redirect } from "next/navigation";
import { experimentalPaths } from "@/lib/admin/experimentalPaths";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ session?: string }>;
};

/** Legacy → Experimental AI Lab */
export default async function LegacyPublishedUpdateRedirect({
  params,
  searchParams,
}: Props) {
  const { slug } = await params;
  const { session } = await searchParams;
  redirect(experimentalPaths.publishedUpdate(slug, session));
}
