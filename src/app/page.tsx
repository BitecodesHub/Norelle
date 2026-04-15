import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import CategoryShowcase from "@/components/home/CategoryShowcase";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import ProcessPreview from "@/components/home/ProcessPreview";

import connectDB from "@/lib/mongoose";
import Product from "@/models/Product";

export const revalidate = 3600; // ISR: revalidate every hour

export const metadata: Metadata = {
  title: "Norelle — Luxury Perfumes & Attar in Ahmedabad | Scent of Presence",
  description:
    "Discover Norelle — premium luxury perfumes and natural attars handcrafted in Ahmedabad. 100% natural, free delivery across the city. Shop online or visit us at Shahpur.",
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
        <CategoryShowcase />
        <WhyChooseUs />
        <ProcessPreview />
      </main>
      <Footer />
    </>
  );
}
