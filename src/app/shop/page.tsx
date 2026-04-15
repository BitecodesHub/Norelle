import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ShopClient from "@/components/shop/ShopClient";
import connectDB from "@/lib/mongoose";
import Product from "@/models/Product";
import { collectionPageSchema, breadcrumbSchema } from "@/lib/schemas";

export const revalidate = 600; // ISR: revalidate every 10 minutes

export const metadata: Metadata = {
  title: "Buy Luxury Perfumes & Attar Online | Norelle Ahmedabad",
  description:
    "Browse Norelle's complete collection of luxury perfumes and natural attars. Handcrafted, 100% natural fragrances with free delivery in Ahmedabad. Shop online now.",
  keywords: [
    "buy perfume online Ahmedabad",
    "luxury perfume shop",
    "best attar shop Ahmedabad",
    "natural fragrance India",
    "Norelle perfume collection",
  ],
  alternates: { canonical: "https://norelle.in/shop" },
};

const shopCollection = collectionPageSchema(
  "Norelle Fragrance Collection",
  "Browse Norelle's complete collection of luxury perfumes and natural attars. Free delivery in Ahmedabad.",
  "https://norelle.in/shop"
);

const shopBreadcrumbs = breadcrumbSchema([
  { name: "Home", url: "https://norelle.in" },
  { name: "Shop", url: "https://norelle.in/shop" },
]);

async function getAllProducts(searchParams: { category?: string; sort?: string }) {
  try {
    await connectDB();
    const query: Record<string, unknown> = {};
    if (searchParams.category) query.category = searchParams.category;

    const sortMap: Record<string, Record<string, number>> = {
      newest: { createdAt: -1 },
      "price-asc": { price: 1 },
      "price-desc": { price: -1 },
      popular: { reviewCount: -1 },
    };
    const sort = sortMap[searchParams.sort ?? "newest"] ?? { createdAt: -1 };

    const products = await Product.find(query)
      .select("title slug price comparePrice images category rating reviewCount stock")
      .sort(sort)
      .lean();
    return JSON.parse(JSON.stringify(products));
  } catch {
    return [];
  }
}

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; sort?: string }>;
}) {
  const params = await searchParams;
  const products = await getAllProducts(params);
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(shopCollection) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(shopBreadcrumbs) }} />
      <Navbar />
      <main className="pt-24 min-h-screen">
        <ShopClient products={products} activeCategory={params.category ?? ""} activeSort={params.sort ?? "newest"} />
      </main>
      <Footer />
    </>
  );
}
