import type { ResearchSourceRef } from "@/lib/ai/packages";

/** Stable key for marking sources verified during review. */
export function sourceKey(source: ResearchSourceRef, index: number): string {
  return source.id ?? `src_${index}_${source.title}`;
}
