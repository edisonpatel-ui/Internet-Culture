import type { MetadataRoute } from "next";
import { BASE_URL } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Reserved paths — not used today, safe to keep closed
        disallow: ["/admin/", "/api/auth/"],
      },
    ],
    // Absolute sitemap URL from BASE_URL (set NEXT_PUBLIC_SITE_URL in production).
    // No Host directive — Google deprecated it; omit for Vercel / multi-host deploys.
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
