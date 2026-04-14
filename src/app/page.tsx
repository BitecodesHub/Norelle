import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import BrandStory from "@/components/home/BrandStory";
import connectDB from "@/lib/mongoose";
import Product from "@/models/Product";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Norelle — Luxury Perfumes | Scent of Presence",
  description:
    "Discover Norelle — premium luxury perfumes and attars crafted for those who define their presence. Shop online, free delivery in Ahmedabad.",
};

async function getFeaturedProducts() {
  try {
    await connectDB();
    const products = await Product.find({ featured: true })
      .select("title slug price comparePrice images category rating reviewCount")
      .limit(6)
      .lean();
    return JSON.parse(JSON.stringify(products));
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const featured = await getFeaturedProducts();

  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <FeaturedProducts products={featured} />
        <BrandStory />
      </main>
      <Footer />
    </>
  );
}
