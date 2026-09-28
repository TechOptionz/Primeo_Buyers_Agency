import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // No on-demand optimisation: scripts/build-images.mjs pre-renders every size below as AVIF
    // and WebP before `dev` and `build`, and this loader points next/image at those static files.
    // The runtime optimiser encoded each size on its first request, which held cold pages back
    // by up to two seconds (and AVIF there was too slow to enable at all).
    loader: "custom",
    loaderFile: "./lib/image-loader.ts",
    // Widths that go into srcsets. Keep in step with WIDTHS in scripts/build-images.mjs (a
    // mismatch only costs precision: the loader then serves the nearest rendered width).
    // The photos are at most 1920px wide, so 2048/3840 would only repeat the 1920 file.
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    // Small sizes, for avatars (52-56px) and narrow cards.
    imageSizes: [64, 128, 256, 384],
    qualities: [75],
  },
  async headers() {
    return [
      {
        // Rendered sizes are named after a hash of the source photo, so a replaced photo gets a
        // new URL and these can be cached forever.
        source: "/_img/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ];
  },
};

export default nextConfig;
