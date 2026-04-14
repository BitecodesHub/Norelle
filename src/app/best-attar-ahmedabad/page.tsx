import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Best Attar in Ahmedabad | Pure Natural Ittar | Norelle",
  description:
    "Buy the best attar and ittar in Ahmedabad from Norelle. Pure, natural, alcohol-free attars crafted from rose, oud, sandalwood, and rare botanicals. Shop online.",
  keywords: ["best attar Ahmedabad", "buy ittar Ahmedabad", "natural attar online", "oud attar Gujarat", "Arabic perfume Ahmedabad", "alcohol free perfume"],
  alternates: { canonical: "https://norelle.in/best-attar-ahmedabad" },
};

export default function BestAttarAhmedabad() {
  const attars = [
    { name: "Rose Taifi", origin: "Saudi Arabia", note: "Pure Damask rose petals — romantic & timeless" },
    { name: "Oud Hindi", origin: "India / Assam", note: "Earthy, woody, spiritual — the king of attars" },
    { name: "Sandalwood Mysore", origin: "Karnataka, India", note: "Creamy, smooth, meditative base note" },
    { name: "Musk Al Tahara", origin: "Middle East", note: "Clean, white musk — soft and long-lasting" },
  ];

  return (
    <>
      <Navbar />
      <main className="pt-24 min-h-screen">
        <section className="max-w-4xl mx-auto px-6 py-16">
          <p className="text-xs tracking-[0.4em] text-gold uppercase font-sans mb-4">Attar & Ittar</p>
          <h1 className="font-serif text-5xl md:text-6xl text-cream font-light mb-6 leading-tight">
            Best Attar<br />in Ahmedabad
          </h1>
          <div className="h-px w-16 bg-gold mb-8" />

          <p className="text-cream/60 font-sans text-lg leading-9 mb-10">
            Norelle sources the finest <strong className="text-cream">natural attars</strong> from across the world — 
            from the rose fields of Taif to the agarwood forests of Assam. 
            Our alcohol-free attars are perfect for daily use and gifting, 
            offering long-lasting fragrance that evolves beautifully on your skin.
          </p>

          <div className="space-y-4 mb-12">
            <h2 className="font-serif text-2xl text-cream mb-6">Our Attar Collection</h2>
            {attars.map(({ name, origin, note }) => (
              <div key={name} className="glass-card rounded-xl px-6 py-5 flex items-start gap-4">
                <div className="w-2 h-2 rounded-full bg-gold mt-2 flex-shrink-0" />
                <div>
                  <h3 className="font-serif text-lg text-gold">{name}</h3>
                  <p className="text-xs text-cream/40 font-sans uppercase tracking-wider mt-0.5">{origin}</p>
                  <p className="text-cream/60 font-sans text-sm mt-2">{note}</p>
                </div>
              </div>
            ))}
          </div>

          <Link href="/shop?category=ATTAR"
            className="inline-block px-10 py-4 bg-gold hover:bg-gold-light text-noir font-sans text-sm tracking-widest uppercase font-medium rounded-xl transition-all hover:shadow-gold-glow">
            Shop All Attars
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
