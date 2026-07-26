import { revalidatePath } from "next/cache";

/**
 * Revalidate public discovery surfaces after catalog mutations
 * (publish, apply, refresh, rename-affecting updates).
 * Keeps Homepage Trending, Rankings, Brainrot Hub, search, and category indexes in sync.
 */
export function revalidatePublicDiscovery(opts?: {
  detailPath?: string;
}): void {
  revalidatePath("/");
  revalidatePath("/trending");
  revalidatePath("/rankings");
  revalidatePath("/brainrot");
  revalidatePath("/search");
  revalidatePath("/memes");
  revalidatePath("/slang");
  revalidatePath("/events");
  revalidatePath("/people");
  revalidatePath("/creators");
  if (opts?.detailPath) {
    revalidatePath(opts.detailPath);
  }
}
