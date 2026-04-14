import { MetadataRoute } from "next";

export const dynamic = "force-dynamic";

const baseUrl = "https://norelle.in";

const staticRoutes: MetadataRoute.Sitemap = [
  { url: baseUrl, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
  { url: `${baseUrl}/shop`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
  { url: `${baseUrl}/perfume-shop-ahmedabad`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
  { url: `${baseUrl}/best-perfumes-ahmedabad`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.85 },
  { url: `${baseUrl}/best-attar-ahmedabad`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.85 },
  { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
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
