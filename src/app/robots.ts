import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // All crawlers: allow all public pages
        userAgent: "*",
        allow: [
          "/",
          "/shop",
          "/shop/",
          "/about",
          "/contact",
          "/privacy",
          "/terms",
          "/perfume-shop-ahmedabad",
          "/best-attar-ahmedabad",
          "/perfume-shop-sg-highway",
          "/perfume-shop-satellite",
          "/perfume-shop-bopal",
          "/perfume-shop-cg-road",
          "/perfume-shop-maninagar",
          "/perfume-shop-navrangpura",
        ],
        disallow: [
          "/api/",
          "/admin/",
          "/salesman/",
          "/account/",
          "/checkout/",
          "/order-success/",
          "/login/",
          "/register/",
          "/_next/",
          "/static/",
          "/*?*",          // Block all query-string URLs (use clean canonical URLs only)
        ],
      },
      {
        // Allow Google Images to crawl product images
        userAgent: "Googlebot-Image",
        allow: ["/", "/shop/"],
      },
      {
        // Block AI training crawlers
        userAgent: ["GPTBot", "ChatGPT-User", "CCBot", "anthropic-ai", "Claude-Web", "Omgilibot"],
        disallow: "/",
      },
    ],
    sitemap: "https://www.norelleperfumes.com/sitemap.xml",
  };
}
