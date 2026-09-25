import { createMetadata } from "@/lib/seo";
import { SITE_NAME } from "@/lib/constants";
import { DemoPlayground } from "@/components/demo/DemoPlayground";

export const metadata = createMetadata({
  title: "Live API Demo",
  description: `Try the Culture Graph API live — inspect real cultural intelligence payloads from ${SITE_NAME}.`,
  path: "/demo",
});

export default function DemoPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
      <h1 className="font-page text-3xl font-bold tracking-tight text-white sm:text-4xl">
        Live demo
      </h1>
      <p className="font-page mt-4 text-base leading-relaxed text-zinc-400">
        Select a term (or type your own slug) to see the exact payload the Culture Graph
        API returns — velocity, decay tracking, origin mapping, and template data.
      </p>
      <DemoPlayground />
    </main>
  );
}
