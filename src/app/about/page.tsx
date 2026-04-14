import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AboutContent from "@/components/about/AboutContent";

export const metadata: Metadata = {
  title: "Our Story — Norelle Luxury Fragrances | Ahmedabad",
  description:
    "Learn about Norelle — a luxury perfume house born in Ahmedabad, crafting rare attars and Eau de Parfums using age-old traditions and the world's finest ingredients.",
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
        <AboutContent />
      </main>
      <Footer />
    </>
  );
}
