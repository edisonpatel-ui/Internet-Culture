"use client";

import dynamic from "next/dynamic";

/**
 * Scalar's React wrapper (@scalar/api-reference-react) renders via an
 * internal Vue instance that touches the DOM directly, so it's loaded with
 * `ssr: false` — there's nothing meaningful to server-render here anyway,
 * the whole point is the client-side interactive browser.
 */
const ApiReferenceReact = dynamic(
  () => import("@scalar/api-reference-react").then((mod) => mod.ApiReferenceReact),
  { ssr: false, loading: () => <p className="p-8 text-sm text-zinc-500">Loading API reference…</p> },
);

export function ApiReferenceView() {
  return (
    <ApiReferenceReact
      configuration={{
        url: "/openapi.json",
        theme: "deepSpace",
        hideClientButton: false,
      }}
    />
  );
}
