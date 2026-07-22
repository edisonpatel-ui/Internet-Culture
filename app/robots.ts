import type { MetadataRoute } from "next";
import { BASE_URL } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Internal / experimental tooling — never index
        disallow: [
          "/admin/",
          "/api/auth/",
          "/create",
          "/drafts",
          "/edits",
          "/published",
          "/settings",
          "/editorial-unlock",
          "/research",
          "/research-review",
          "/article-preview",
          "/publish",
          "/updates",
          "/draft-studio",
        ],
      },
    ],
    // Absolute sitemap URL from BASE_URL (set NEXT_PUBLIC_SITE_URL in production).
    // No Host directive — Google deprecated it; omit for Vercel / multi-host deploys.
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
