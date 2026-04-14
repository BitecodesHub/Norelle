import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/salesman", "/api", "/account", "/checkout"],
      },
    ],
    sitemap: "https://norelle.in/sitemap.xml",
    host: "https://norelle.in",
  };
}
