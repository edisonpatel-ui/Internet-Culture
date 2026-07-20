import type { NextConfig } from "next";
import { getTrendingDuplicateRedirects } from "./lib/seo/trendingRedirects";

/**
 * Trusted HTTPS hosts for next/image (logo + future optimized media).
 * Encyclopedia media mostly uses raw <img> with onError fallbacks; keep this
 * allowlist tight anyway so production does not open an arbitrary image proxy.
 */
const IMAGE_REMOTE_HOSTS = [
  "upload.wikimedia.org",
  "i.ytimg.com",
  "i.kym-cdn.com",
  "i.insider.com",
] as const;

/**
 * Production CSP for App Router + Vercel Analytics + GA4 + YouTube embeds.
 * 'unsafe-inline' / 'unsafe-eval' are required for Next.js runtime + gtag today.
 */
const CONTENT_SECURITY_POLICY = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://va.vercel-scripts.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  "connect-src 'self' https://www.google-analytics.com https://www.googletagmanager.com https://region1.google-analytics.com https://vitals.vercel-insights.com https://va.vercel-scripts.com",
  "frame-src https://www.youtube.com https://www.youtube-nocookie.com",
  "media-src 'self' https:",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'self'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "Content-Security-Policy", value: CONTENT_SECURITY_POLICY },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    remotePatterns: IMAGE_REMOTE_HOSTS.map((hostname) => ({
      protocol: "https" as const,
      hostname,
    })),
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
  async redirects() {
    // Permanent redirects preserve SEO value on category-native URLs.
    return getTrendingDuplicateRedirects();
  },
};

export default nextConfig;
