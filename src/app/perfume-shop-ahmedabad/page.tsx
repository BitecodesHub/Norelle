import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Best Perfume Shop in Ahmedabad | Norelle Luxury Fragrances",
  description:
    "Looking for a premium perfume shop in Ahmedabad? Norelle offers luxury Eau de Parfum, Attar, and imported fragrances. Visit us or shop online. Free delivery in Ahmedabad.",
  keywords: ["perfume shop Ahmedabad", "luxury perfume Ahmedabad", "buy perfume Ahmedabad", "fragrance store Ahmedabad", "Norelle Ahmedabad"],
  alternates: { canonical: "https://norelle.in/perfume-shop-ahmedabad" },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Norelle — Luxury Perfumes",
  description: "Premium luxury perfume and attar shop in Ahmedabad offering Eau de Parfum, Eau de Toilette and Attar.",
  url: "https://norelle.in",
  image: "https://norelle.in/og-image.jpg",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Your Street Address",
    addressLocality: "Ahmedabad",
    addressRegion: "Gujarat",
    postalCode: "380001",
    addressCountry: "IN",
  },
  geo: { "@type": "GeoCoordinates", latitude: 23.022505, longitude: 72.5713621 },
  telephone: "+91-XXXXXXXXXX",
  priceRange: "₹₹₹",
  openingHours: "Mo-Su 10:00-20:00",
};

export default function PerfumeShopAhmedabad() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <Navbar />
      <main className="pt-24 min-h-screen">
        <section className="max-w-4xl mx-auto px-6 py-16">
          <p className="text-xs tracking-[0.4em] text-gold uppercase font-sans mb-4">Ahmedabad</p>
          <h1 className="font-serif text-5xl md:text-6xl text-cream font-light mb-6 leading-tight">
            Perfume Shop<br />in Ahmedabad
          </h1>
          <div className="h-px w-16 bg-gold mb-8" />

          <div className="prose prose-invert max-w-none">
            <p className="text-cream/60 font-sans text-lg leading-9 mb-6">
              Welcome to <strong className="text-cream">Norelle</strong> — Ahmedabad&apos;s most sought-after luxury fragrance destination.
              Whether you&apos;re searching for a classic <em>Eau de Parfum</em>, a rare <em>Attar</em>,
              or a signature scent that captures your personality, our curated collection has something
              for every refined palate.
            </p>
            <p className="text-cream/60 font-sans text-lg leading-9 mb-10">
              From the winding lanes of the old city to the modern boulevards of SG Highway, 
              Norelle brings world-class fragrances to Ahmedabad — with the convenience of online 
              shopping and <strong className="text-gold">free home delivery across the city</strong>.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 mb-12">
            {[
              { title: "Eau de Parfum", desc: "Long-lasting luxury fragrances with 15–20% concentration" },
              { title: "Attar Collection", desc: "Traditional Indian attars crafted from natural ingredients" },
              { title: "Eau de Toilette", desc: "Everyday freshness with premium international accords" },
              { title: "Gift Sets", desc: "Curated gift sets perfect for every occasion" },
            ].map(({ title, desc }) => (
              <div key={title} className="glass-card rounded-2xl p-6">
                <h3 className="font-serif text-lg text-gold mb-2">{title}</h3>
                <p className="text-cream/50 font-sans text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          <Link href="/shop"
            className="inline-block px-10 py-4 bg-gold hover:bg-gold-light text-noir font-sans text-sm tracking-widest uppercase font-medium rounded-xl transition-all hover:shadow-gold-glow">
            Explore Our Collection
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
