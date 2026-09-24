import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // AVIF first (about 20% smaller than WebP), WebP for browsers without it.
    formats: ["image/avif", "image/webp"],
    qualities: [75],
    // Optimised variants are cached for 30 days. The photos rarely change; if one is
    // replaced under the same filename, clear .next/cache/images or rename the file.
    minimumCacheTTL: 60 * 60 * 24 * 30,
    // Only the site's own photos may go through the optimiser.
    localPatterns: [{ pathname: "/images/**" }, { pathname: "/video/**" }],
  },
};

export default nextConfig;
