import { MetadataRoute } from "next";

export const dynamic = "force-dynamic";

const baseUrl = "https://norelle.in";

const staticRoutes: MetadataRoute.Sitemap = [
  { url: baseUrl, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
  { url: `${baseUrl}/shop`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
  { url: `${baseUrl}/shop?category=PERFUME`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.85 },
  { url: `${baseUrl}/shop?category=ATTAR`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.85 },
  { url: `${baseUrl}/perfume-shop-ahmedabad`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
  { url: `${baseUrl}/best-attar-ahmedabad`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.85 },
  { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
  { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  { url: `${baseUrl}/privacy`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
  { url: `${baseUrl}/terms`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
  // Area landing pages
  { url: `${baseUrl}/perfume-shop-sg-highway`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  { url: `${baseUrl}/perfume-shop-satellite`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  { url: `${baseUrl}/perfume-shop-maninagar`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  { url: `${baseUrl}/perfume-shop-cg-road`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  { url: `${baseUrl}/perfume-shop-bopal`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  { url: `${baseUrl}/perfume-shop-navrangpura`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let productUrls: MetadataRoute.Sitemap = [];
  try {
    const connectDB = (await import("@/lib/mongoose")).default;
    const Product = (await import("@/models/Product")).default;
    await connectDB();
    const products = await Product.find().select("slug updatedAt").lean() as { slug: string; updatedAt: Date }[];
    productUrls = products.map((p) => ({
      url: `${baseUrl}/shop/${p.slug}`,
      lastModified: p.updatedAt ?? new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));
  } catch { /* DB not available at build time */ }

  return [...staticRoutes, ...productUrls];
}
