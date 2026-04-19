import { MetadataRoute } from "next";

export const dynamic = "force-dynamic";

const BASE = "https://www.norelleperfumes.com";
const HERO_IMAGE = `${BASE}/images/Norelle%20Handblended%20Perfumes.png`;

const staticRoutes: MetadataRoute.Sitemap = [
  { url: BASE, lastModified: new Date(), changeFrequency: "daily", priority: 1.0, images: [HERO_IMAGE] },

  { url: `${BASE}/shop`, lastModified: new Date(), changeFrequency: "daily", priority: 0.95, images: [HERO_IMAGE] },

  // Tier 3 — High-value local SEO landing pages
  { url: `${BASE}/perfume-shop-ahmedabad`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.92 },
  { url: `${BASE}/best-attar-ahmedabad`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.90 },

  // Tier 4 — Area-level landing pages
  { url: `${BASE}/perfume-shop-sg-highway`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.75 },
  { url: `${BASE}/perfume-shop-satellite`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.75 },
  { url: `${BASE}/perfume-shop-bopal`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.75 },
  { url: `${BASE}/perfume-shop-cg-road`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.75 },
  { url: `${BASE}/perfume-shop-maninagar`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.75 },
  { url: `${BASE}/perfume-shop-navrangpura`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.75 },

  // Tier 5 — Informational / conversion
  { url: `${BASE}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.65 },
  { url: `${BASE}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.65 },

  // Tier 6 — Legal (low priority, rarely change)
  { url: `${BASE}/privacy`, lastModified: new Date("2025-01-01"), changeFrequency: "yearly", priority: 0.2 },
  { url: `${BASE}/terms`, lastModified: new Date("2025-01-01"), changeFrequency: "yearly", priority: 0.2 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let productUrls: MetadataRoute.Sitemap = [];

  try {
    const connectDB = (await import("@/lib/mongoose")).default;
    const Product = (await import("@/models/Product")).default;
    await connectDB();

    const products = await Product.find({ stock: { $gt: 0 } })
      .select("slug updatedAt images")
      .lean() as { slug: string; updatedAt: Date; images?: string[] }[];

    productUrls = products.map((p) => ({
      url: `${BASE}/shop/${p.slug}`,
      lastModified: p.updatedAt ?? new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.85,
      images: p.images?.length ? p.images.slice(0, 5) : undefined,
    }));
  } catch {
    // DB not available at build time — products will be missing from sitemap
  }

  return [...staticRoutes, ...productUrls];
}
