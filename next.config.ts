import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    /**
     * Allow any HTTPS source during development.
     * In production, restrict this to trusted image CDN hostnames.
     */
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
