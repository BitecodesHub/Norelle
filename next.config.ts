import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Fix Vercel workspace-root detection warning
  outputFileTracingRoot: path.join(__dirname),

  images: {
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "plus.unsplash.com" },
    ],
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    formats: ["image/avif", "image/webp"],
    qualities: [75, 90],
  },

  // Redirect non-www → www for canonical consistency
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "norelleperfumes.com" }],
        destination: "https://www.norelleperfumes.com/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "norelle.in" }],
        destination: "https://www.norelleperfumes.com/:path*",
        permanent: true,
      },
    ];
  },

  // Security + SEO headers
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(self)",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
      {
        // Long-term cache for immutable Next.js static assets
        source: "/_next/static/(.*)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        // Cache public assets for 7 days
        source: "/icons/(.*)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=604800, stale-while-revalidate=86400" },
        ],
      },
    ];
  },

  experimental: {},
};

export default nextConfig;
