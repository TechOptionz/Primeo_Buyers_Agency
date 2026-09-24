import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // WebP only. AVIF is ~30% smaller but sharp takes 0.4-1.2s to encode each variant on
    // first request (WebP: ~0.15s), and a section of ten photos was stalling for almost two
    // seconds before anything appeared. Add "image/avif" back in front only if the variants
    // are pre-generated or the host warms its image cache.
    formats: ["image/webp"],
    qualities: [75],
    // Widths the optimiser will produce. The photos are at most 1920px wide, so the default
    // 2048 / 3840 entries only produced duplicate encodes of the 1920 output on high-DPI screens.
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    // Optimised variants are cached for 30 days. The photos rarely change; if one is
    // replaced under the same filename, clear .next/cache/images or rename the file.
    minimumCacheTTL: 60 * 60 * 24 * 30,
    // Only the site's own photos may go through the optimiser.
    localPatterns: [{ pathname: "/images/**" }, { pathname: "/video/**" }],
  },
};

export default nextConfig;
