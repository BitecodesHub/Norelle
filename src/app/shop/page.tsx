import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ShopClient from "@/components/shop/ShopClient";
import connectDB from "@/lib/mongoose";
import Product from "@/models/Product";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Shop All Fragrances",
  description:
    "Browse Norelle's complete collection of luxury perfumes, attars, and fragrances. Filter by category, price, and more. Free delivery in Ahmedabad.",
  keywords: ["luxury perfume shop", "buy perfume online India", "best attar shop Ahmedabad"],
};

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
      <Navbar />
      <main className="pt-24 min-h-screen">
        <ShopClient products={products} activeCategory={params.category ?? ""} activeSort={params.sort ?? "newest"} />
      </main>
      <Footer />
    </>
  );
}
