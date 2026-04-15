import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: [
          "/",
          "/shop",
          "/perfume-shop-ahmedabad",
          "/best-attar-ahmedabad",
          "/about",
          "/contact",
          "/privacy",
          "/terms",
        ],
        disallow: ["/admin", "/salesman", "/api", "/account", "/checkout"],
      },
      {
        userAgent: "Googlebot-Image",
        allow: "/",
      },
    ],
    sitemap: "https://norelle.in/sitemap.xml",
    host: "https://norelle.in",
  };
}
