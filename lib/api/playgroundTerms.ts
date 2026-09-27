/**
 * lib/api/playgroundTerms.ts
 *
 * Framework-agnostic — deliberately kept separate from
 * app/api/v1/playground/route.ts (a server-only route file that imports
 * Node/Redis code) so the client component
 * (components/ApiPlayground.tsx) can import just this list without
 * pulling server-only modules into the client bundle.
 */
export const PLAYGROUND_TERMS = [
  { label: "rizz", slug: "rizz" },
  { label: "aura", slug: "aura" },
  { label: "demure", slug: "demure-mindful" },
  { label: "skibidi", slug: "skibidi-toilet" },
  { label: "delulu", slug: "delulu" },
] as const;
