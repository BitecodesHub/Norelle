import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { localBusinessSchema, breadcrumbSchema, faqSchema, BUSINESS } from "@/lib/schemas";

export const metadata: Metadata = {
  title: "Best Perfume Shop in Ahmedabad | Norelle Luxury Fragrances & Attar",
  description:
    "Looking for a premium perfume shop in Ahmedabad? Norelle offers luxury handcrafted perfumes and pure natural attars. Visit us at Shahpur or shop online with free delivery across Ahmedabad.",
  keywords: [
    "perfume shop Ahmedabad",
    "luxury perfume Ahmedabad",
    "buy perfume Ahmedabad",
    "fragrance store Ahmedabad",
    "Norelle Ahmedabad",
    "attar shop Shahpur",
    "best perfume store Gujarat",
    "natural perfume Ahmedabad",
  ],
  alternates: { canonical: "https://norelle.in/perfume-shop-ahmedabad" },
};

const storeSchema = localBusinessSchema({
  areaServed: [
    "Shahpur",
    "Navrangpura",
    "CG Road",
    "SG Highway",
    "Satellite",
    "Maninagar",
    "Bopal",
    "Vastrapur",
    "Paldi",
    "Ellisbridge",
  ],
  hasMap: "https://maps.google.com/?q=62+Nanadan+Society+Bahai+Center+Shahpur+Ahmedabad",
});

const pageBreadcrumbs = breadcrumbSchema([
  { name: "Home", url: "https://norelle.in" },
  { name: "Perfume Shop Ahmedabad", url: "https://norelle.in/perfume-shop-ahmedabad" },
]);

const pageFaqs = faqSchema([
  {
    question: "Where is Norelle's perfume shop in Ahmedabad?",
    answer:
      "Norelle is located at 62, Nanadan Society, Bahai Center, Shahpur, Ahmedabad 380001. We are open every day from 10 AM to 8 PM.",
  },
  {
    question: "Does Norelle offer free delivery in Ahmedabad?",
    answer:
      "Yes! Norelle offers free home delivery across Ahmedabad — from Shahpur to SG Highway, Satellite, Bopal, Maninagar, and all areas of the city.",
  },
  {
    question: "What types of fragrances does Norelle sell?",
    answer:
      "Norelle offers two curated categories: luxury Perfumes (long-lasting designer fragrances) and pure natural Attars (alcohol-free, handcrafted from botanical oils).",
  },
  {
    question: "Can I buy Norelle perfumes online?",
    answer:
      "Absolutely! Shop our full collection at norelle.in with secure online payment via UPI, credit card, or debit card. Free delivery across Ahmedabad.",
  },
]);

export default function PerfumeShopAhmedabad() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(storeSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageBreadcrumbs) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageFaqs) }} />
      <Navbar />
      <main className="pt-24 min-h-screen">
        {/* Hero */}
        <section className="max-w-5xl mx-auto px-6 py-16">
          <p className="text-xs tracking-[0.4em] text-gold uppercase font-sans mb-4">Ahmedabad</p>
          <h1 className="font-serif text-5xl md:text-6xl text-cream font-light mb-6 leading-tight">
            Perfume Shop<br />in Ahmedabad
          </h1>
          <div className="h-px w-16 bg-gold mb-8" />

          <div className="prose prose-invert max-w-none">
            <p className="text-cream/60 font-sans text-lg leading-9 mb-6">
              Welcome to <strong className="text-cream">Norelle</strong> — Ahmedabad&apos;s destination for luxury handcrafted
              fragrances. Whether you&apos;re searching for a signature <em>perfume</em> that lasts all day or a rare natural{" "}
              <em>attar</em> crafted from the finest botanicals, our curated collection has something for every refined palate.
            </p>
            <p className="text-cream/60 font-sans text-lg leading-9 mb-10">
              From the heritage lanes of Shahpur to the modern boulevards of SG Highway, Norelle brings world-class fragrances
              to every corner of Ahmedabad — with <strong className="text-gold">free home delivery across the city</strong>.
            </p>
          </div>

          {/* Categories */}
          <div className="grid sm:grid-cols-2 gap-6 mb-12">
            <Link href="/shop?category=PERFUME" className="group">
              <div className="glass-card rounded-2xl p-8 transition-all duration-300 group-hover:shadow-gold-glow group-hover:border-gold/30">
                <h3 className="font-serif text-2xl text-gold mb-3">Perfumes</h3>
                <p className="text-cream/50 font-sans text-sm leading-relaxed mb-4">
                  Long-lasting luxury fragrances with rich, complex notes. Designer quality at honest prices.
                </p>
                <span className="text-xs text-gold/70 font-sans tracking-wider uppercase group-hover:text-gold transition-colors">
                  Explore Collection &rarr;
                </span>
              </div>
            </Link>
            <Link href="/shop?category=ATTAR" className="group">
              <div className="glass-card rounded-2xl p-8 transition-all duration-300 group-hover:shadow-gold-glow group-hover:border-gold/30">
                <h3 className="font-serif text-2xl text-gold mb-3">Attar Collection</h3>
                <p className="text-cream/50 font-sans text-sm leading-relaxed mb-4">
                  Pure, natural, alcohol-free attars crafted from rose, oud, sandalwood, and rare botanicals.
                </p>
                <span className="text-xs text-gold/70 font-sans tracking-wider uppercase group-hover:text-gold transition-colors">
                  Explore Collection &rarr;
                </span>
              </div>
            </Link>
          </div>

          {/* Why Norelle */}
          <div className="grid sm:grid-cols-4 gap-4 mb-16">
            {[
              { icon: "🌿", label: "100% Natural", desc: "No synthetic chemicals" },
              { icon: "🚚", label: "Free Delivery", desc: "All across Ahmedabad" },
              { icon: "⏳", label: "Long Lasting", desc: "12-24+ hour longevity" },
              { icon: "🔒", label: "Secure Payment", desc: "UPI, Cards, Cash" },
            ].map(({ icon, label, desc }) => (
              <div key={label} className="text-center py-4">
                <span className="text-2xl mb-2 block">{icon}</span>
                <p className="font-sans text-sm text-cream font-medium">{label}</p>
                <p className="font-sans text-xs text-cream/40 mt-1">{desc}</p>
              </div>
            ))}
          </div>

          {/* Visit Us + Map */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div>
              <h2 className="font-serif text-3xl text-cream mb-6">Visit Our Store</h2>
              <div className="space-y-4 font-sans text-cream/60 text-sm leading-relaxed">
                <div>
                  <p className="text-gold font-medium text-base mb-1">Address</p>
                  <p>{BUSINESS.address.street}</p>
                  <p>{BUSINESS.address.locality}, {BUSINESS.address.region} {BUSINESS.address.postalCode}</p>
                </div>
                <div>
                  <p className="text-gold font-medium text-base mb-1">Phone / WhatsApp</p>
                  <a href={`tel:${BUSINESS.phone}`} className="hover:text-gold transition-colors">
                    +91 94287 67709
                  </a>
                </div>
                <div>
                  <p className="text-gold font-medium text-base mb-1">Hours</p>
                  <p>Monday – Sunday: 10:00 AM – 8:00 PM</p>
                </div>
                <div>
                  <p className="text-gold font-medium text-base mb-1">Landmarks</p>
                  <p>Near Bahai Center, Shahpur. 5 minutes from Delhi Darwaza.</p>
                </div>
              </div>
              <div className="mt-6 flex gap-3">
                <a
                  href={`https://wa.me/919428767709?text=${encodeURIComponent("Hi Norelle! I'd like to visit your store.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-6 py-3 bg-[#25D366] hover:bg-[#20BD5A] text-white font-sans text-sm tracking-wider uppercase font-medium rounded-xl transition-all"
                >
                  WhatsApp Us
                </a>
                <a
                  href="https://maps.google.com/?q=62+Nanadan+Society+Bahai+Center+Shahpur+Ahmedabad"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-6 py-3 border border-gold/40 text-gold hover:bg-gold/10 font-sans text-sm tracking-wider uppercase font-medium rounded-xl transition-all"
                >
                  Get Directions
                </a>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden border border-tan/30">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3671.5!2d72.5876!3d23.0301!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDAxJzQ4LjQiTiA3MsKwMzUnMTUuNCJF!5e0!3m2!1sen!2sin!4v1"
                width="100%"
                height="350"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Norelle Perfume Shop — Shahpur, Ahmedabad"
              />
            </div>
          </div>

          {/* FAQ */}
          <div className="mb-16">
            <h2 className="font-serif text-3xl text-cream mb-8">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {[
                {
                  q: "Where is Norelle's perfume shop in Ahmedabad?",
                  a: "Norelle is located at 62, Nanadan Society, Bahai Center, Shahpur, Ahmedabad 380001. We are open every day from 10 AM to 8 PM.",
                },
                {
                  q: "Does Norelle offer free delivery in Ahmedabad?",
                  a: "Yes! Norelle offers free home delivery across Ahmedabad — from Shahpur to SG Highway, Satellite, Bopal, Maninagar, and all areas of the city.",
                },
                {
                  q: "What types of fragrances does Norelle sell?",
                  a: "Norelle offers two curated categories: luxury Perfumes (long-lasting designer fragrances) and pure natural Attars (alcohol-free, handcrafted from botanical oils).",
                },
                {
                  q: "Can I buy Norelle perfumes online?",
                  a: "Absolutely! Shop our full collection at norelle.in with secure online payment via UPI, credit card, or debit card. Free delivery across Ahmedabad.",
                },
              ].map(({ q, a }) => (
                <details key={q} className="glass-card rounded-xl group">
                  <summary className="px-6 py-5 cursor-pointer font-serif text-lg text-cream hover:text-gold transition-colors list-none flex items-center justify-between">
                    {q}
                    <span className="text-gold/50 group-open:rotate-45 transition-transform text-xl ml-4">+</span>
                  </summary>
                  <p className="px-6 pb-5 text-cream/50 font-sans text-sm leading-relaxed">{a}</p>
                </details>
              ))}
            </div>
          </div>

          <Link
            href="/shop"
            className="inline-block px-10 py-4 bg-gold hover:bg-gold-light text-noir font-sans text-sm tracking-widest uppercase font-medium rounded-xl transition-all hover:shadow-gold-glow"
          >
            Explore Our Collection
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
