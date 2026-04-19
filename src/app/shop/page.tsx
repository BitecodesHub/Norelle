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
    "Shop Norelle's full collection of luxury perfumes and natural attars — oud, rose, sandalwood, musk, and handblended Eau de Parfums. 100% natural, free delivery across Ahmedabad. Browse, compare, and buy online.",
  keywords: [
    "buy perfume online Ahmedabad",
    "buy attar online India",
    "luxury perfume shop online",
    "best attar shop Ahmedabad",
    "natural fragrance India",
    "Norelle perfume collection",
    "oud attar online",
    "rose attar price India",
    "sandalwood attar online",
    "alcohol free perfume India",
  ],
  alternates: { canonical: "https://www.norelleperfumes.com/shop" },
  openGraph: {
    type: "website",
    url: "https://www.norelleperfumes.com/shop",
    title: "Shop Norelle Luxury Perfumes & Attar",
    description:
      "Handcrafted luxury perfumes and 100% natural attars. Oud, rose, sandalwood, musk, and more. Free delivery across Ahmedabad.",
  },
};

const shopCollection = collectionPageSchema(
  "Norelle Fragrance Collection",
  "Browse Norelle's complete collection of luxury perfumes and natural attars. Free delivery in Ahmedabad.",
  "https://www.norelleperfumes.com/shop"
);

const shopBreadcrumbs = breadcrumbSchema([
  { name: "Home", url: "https://www.norelleperfumes.com" },
  { name: "Shop", url: "https://www.norelleperfumes.com/shop" },
]);

async function getAllProducts(searchParams: { category?: string; sort?: string }) {
  try {
    await connectDB();
    const query: Record<string, unknown> = {};
    if (searchParams.category) query.category = searchParams.category;

    const sortMap: Record<string, [string, 1 | -1][]> = {
      newest: [["createdAt", -1]],
      "price-asc": [["price", 1]],
      "price-desc": [["price", -1]],
      popular: [["reviewCount", -1]],
    };
    const sort = sortMap[searchParams.sort ?? "newest"] ?? [["createdAt", -1]];

    const products = await Product.find(query)
      .select("title slug price comparePrice images category rating reviewCount stock variants")
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
