import { createMetadata } from "@/lib/seo";
import { SITE_NAME } from "@/lib/constants";
import { ApiReferenceView } from "@/components/docs/ApiReferenceView";

export const metadata = createMetadata({
  title: "API Reference",
  description: `Interactive OpenAPI reference for the Culture Graph API — ${SITE_NAME}.`,
  path: "/docs",
});

export default function ApiReferencePage() {
  return <ApiReferenceView />;
}
