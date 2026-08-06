import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // NOTE: both of these were suppressing real errors during builds. Leaving
  // them on for now so deploys don't break mid-refactor, but the goal is to
  // fix the underlying issues and flip both to `false`.
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },

  productionBrowserSourceMaps: false,
  turbopack: {},

  images: {
    // `unoptimized: true` disabled Next's entire image pipeline — every image
    // was shipping at full resolution in its original format to every device,
    // including phones. Turning it on gives automatic AVIF/WebP conversion and
    // correctly-sized variants per breakpoint, which is one of the largest
    // single wins available for mobile load time.
    formats: ["image/avif", "image/webp"],
    // Matches the real breakpoints in use; fewer entries means fewer variants
    // to generate and cache.
    deviceSizes: [640, 828, 1080, 1200, 1920],
    imageSizes: [64, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "cdn.dribbble.com" },
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "fastly.picsum.photos" },
      // Video posters and project stills are served from here.
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "d8j0ntlcm91z4.cloudfront.net" },
    ],
  },

  async headers() {
    return [
      {
        // Long-cache immutable build output. Without this, repeat visitors
        // re-download chunks they already have.
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
