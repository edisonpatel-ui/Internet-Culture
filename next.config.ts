import type { NextConfig } from "next";

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

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
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
};

export default nextConfig;
