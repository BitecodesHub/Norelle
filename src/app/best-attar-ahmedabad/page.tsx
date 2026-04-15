import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { breadcrumbSchema, faqSchema, collectionPageSchema } from "@/lib/schemas";

export const metadata: Metadata = {
  title: "Best Attar in Ahmedabad | Pure Natural Ittar | Norelle",
  description:
    "Buy the best attar and ittar in Ahmedabad from Norelle. Pure, natural, alcohol-free attars crafted from rose, oud, sandalwood, and rare botanicals. Free delivery across Ahmedabad.",
  keywords: [
    "best attar Ahmedabad",
    "buy ittar Ahmedabad",
    "natural attar online",
    "oud attar Gujarat",
    "Arabic perfume Ahmedabad",
    "alcohol free perfume",
    "rose attar India",
    "sandalwood attar",
    "pure attar Shahpur",
  ],
  alternates: { canonical: "https://norelle.in/best-attar-ahmedabad" },
};

const breadcrumbs = breadcrumbSchema([
  { name: "Home", url: "https://norelle.in" },
  { name: "Attar Collection", url: "https://norelle.in/best-attar-ahmedabad" },
]);

const collection = collectionPageSchema(
  "Best Attar in Ahmedabad",
  "Curated collection of pure, natural, alcohol-free attars from Norelle — sourced from the finest botanical ingredients worldwide.",
  "https://norelle.in/best-attar-ahmedabad"
);

const attarFaqs = faqSchema([
  {
    question: "What is attar (ittar)?",
    answer:
      "Attar, also spelled ittar, is a natural perfume oil distilled from botanical sources like flowers, herbs, spices, and wood. Unlike synthetic perfumes, attars are 100% natural and alcohol-free, making them ideal for sensitive skin and those seeking pure, chemical-free fragrances.",
  },
  {
    question: "How long does attar last on skin?",
    answer:
      "High-quality natural attars can last 8 to 24+ hours on skin depending on the type. Oud and musk attars tend to last the longest (16-24 hours), while floral attars like rose typically last 8-12 hours. Body chemistry and application method also affect longevity.",
  },
  {
    question: "Is attar alcohol-free?",
    answer:
      "Yes, traditional attars are completely alcohol-free. They are made by distilling plant materials into a base oil (usually sandalwood oil). This makes them suitable for people who prefer alcohol-free fragrances for religious, skin sensitivity, or personal reasons.",
  },
  {
    question: "Which attar is best for daily use?",
    answer:
      "For daily wear, lighter attars like Rose, Sandalwood Mysore, and Jasmine work beautifully. They are subtle, pleasant, and not overpowering. For special occasions, richer attars like Oud Hindi or Amber make a bold statement.",
  },
  {
    question: "Where can I buy authentic attar in Ahmedabad?",
    answer:
      "Norelle offers a curated collection of authentic, pure attars in Ahmedabad. Visit our store at 62, Nanadan Society, Bahai Center, Shahpur, Ahmedabad 380001, or shop online at norelle.in with free delivery across the city.",
  },
  {
    question: "What is the difference between attar and perfume?",
    answer:
      "Perfumes are typically alcohol-based with synthetic fragrance compounds, offering strong projection. Attars are oil-based, 100% natural, and alcohol-free — they sit closer to the skin and develop a unique scent profile that blends with your body chemistry. Attars are also considered more traditional and often have longer-lasting sillage.",
  },
]);

export default function BestAttarAhmedabad() {
  const attars = [
    { name: "Rose Taifi", origin: "Saudi Arabia", note: "Pure Damask rose petals — romantic & timeless", longevity: "8-12 hours" },
    { name: "Oud Hindi", origin: "India / Assam", note: "Earthy, woody, spiritual — the king of attars", longevity: "16-24 hours" },
    { name: "Sandalwood Mysore", origin: "Karnataka, India", note: "Creamy, smooth, meditative base note", longevity: "12-18 hours" },
    { name: "Musk Al Tahara", origin: "Middle East", note: "Clean, white musk — soft and long-lasting", longevity: "10-16 hours" },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collection) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(attarFaqs) }} />
      <Navbar />
      <main className="pt-24 min-h-screen">
        <section className="max-w-5xl mx-auto px-6 py-16">
          {/* Breadcrumb */}
          <nav className="mb-8 font-sans text-xs text-cream/40">
            <Link href="/" className="hover:text-gold transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-cream/60">Attar Collection</span>
          </nav>

          <p className="text-xs tracking-[0.4em] text-gold uppercase font-sans mb-4">Attar & Ittar</p>
          <h1 className="font-serif text-5xl md:text-6xl text-cream font-light mb-6 leading-tight">
            Best Attar<br />in Ahmedabad
          </h1>
          <div className="h-px w-16 bg-gold mb-8" />

          <p className="text-cream/60 font-sans text-lg leading-9 mb-4">
            Norelle sources the finest <strong className="text-cream">natural attars</strong> from across the world —
            from the rose fields of Taif to the agarwood forests of Assam.
            Our alcohol-free attars are perfect for daily use and gifting,
            offering long-lasting fragrance that evolves beautifully on your skin.
          </p>
          <p className="text-cream/60 font-sans text-base leading-8 mb-10">
            Every attar in our collection is <strong className="text-cream">100% natural</strong>, free from synthetic chemicals,
            and handcrafted using traditional distillation methods passed down through generations. Whether you prefer the romantic
            warmth of rose or the deep spirituality of oud, Norelle brings authentic attars to Ahmedabad with{" "}
            <strong className="text-gold">free delivery across the city</strong>.
          </p>

          {/* Attar Collection */}
          <div className="space-y-4 mb-16">
            <h2 className="font-serif text-3xl text-cream mb-6">Our Attar Collection</h2>
            {attars.map(({ name, origin, note, longevity }) => (
              <div key={name} className="glass-card rounded-xl px-6 py-5 flex items-start gap-4 hover:shadow-card-hover transition-shadow duration-300">
                <div className="w-2 h-2 rounded-full bg-gold mt-2 flex-shrink-0" />
                <div className="flex-1">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <h3 className="font-serif text-lg text-gold">{name}</h3>
                    <span className="text-xs font-sans text-cream/30 bg-cream/5 px-3 py-1 rounded-full">{longevity}</span>
                  </div>
                  <p className="text-xs text-cream/40 font-sans uppercase tracking-wider mt-0.5">{origin}</p>
                  <p className="text-cream/60 font-sans text-sm mt-2">{note}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Why Choose Norelle Attar */}
          <div className="grid sm:grid-cols-3 gap-6 mb-16">
            {[
              { title: "100% Natural", desc: "No synthetic oils, no alcohol, no chemicals. Just pure botanical distillation." },
              { title: "Handcrafted", desc: "Each attar is crafted using traditional methods by master perfumers." },
              { title: "Free Delivery", desc: "Order online and get free delivery anywhere in Ahmedabad." },
            ].map(({ title, desc }) => (
              <div key={title} className="text-center p-6 glass-card rounded-xl">
                <h3 className="font-serif text-lg text-gold mb-2">{title}</h3>
                <p className="text-cream/50 font-sans text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="flex flex-wrap gap-4 mb-20">
            <Link
              href="/shop?category=ATTAR"
              className="inline-block px-10 py-4 bg-gold hover:bg-gold-light text-noir font-sans text-sm tracking-widest uppercase font-medium rounded-xl transition-all hover:shadow-gold-glow"
            >
              Shop All Attars
            </Link>
            <a
              href={`https://wa.me/919428767709?text=${encodeURIComponent("Hi! I'm interested in your attar collection.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-10 py-4 border border-gold/40 text-gold hover:bg-gold/10 font-sans text-sm tracking-widest uppercase font-medium rounded-xl transition-all"
            >
              Ask on WhatsApp
            </a>
          </div>

          {/* FAQ Section */}
          <div className="mb-8">
            <h2 className="font-serif text-3xl text-cream mb-8">Frequently Asked Questions About Attar</h2>
            <div className="space-y-4">
              {[
                {
                  q: "What is attar (ittar)?",
                  a: "Attar, also spelled ittar, is a natural perfume oil distilled from botanical sources like flowers, herbs, spices, and wood. Unlike synthetic perfumes, attars are 100% natural and alcohol-free, making them ideal for sensitive skin and those seeking pure, chemical-free fragrances.",
                },
                {
                  q: "How long does attar last on skin?",
                  a: "High-quality natural attars can last 8 to 24+ hours on skin depending on the type. Oud and musk attars tend to last the longest (16-24 hours), while floral attars like rose typically last 8-12 hours.",
                },
                {
                  q: "Is attar alcohol-free?",
                  a: "Yes, traditional attars are completely alcohol-free. They are made by distilling plant materials into a base oil (usually sandalwood oil). This makes them suitable for people who prefer alcohol-free fragrances.",
                },
                {
                  q: "Which attar is best for daily use?",
                  a: "For daily wear, lighter attars like Rose, Sandalwood Mysore, and Jasmine work beautifully. They are subtle, pleasant, and not overpowering. For special occasions, richer attars like Oud Hindi or Amber make a bold statement.",
                },
                {
                  q: "Where can I buy authentic attar in Ahmedabad?",
                  a: "Norelle offers authentic, pure attars in Ahmedabad. Visit us at 62, Nanadan Society, Bahai Center, Shahpur, Ahmedabad 380001, or shop online at norelle.in with free delivery.",
                },
                {
                  q: "What is the difference between attar and perfume?",
                  a: "Perfumes are alcohol-based with synthetic compounds and strong projection. Attars are oil-based, 100% natural, and alcohol-free — they sit closer to the skin and blend with your body chemistry for a unique, personal scent.",
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
        </section>
      </main>
      <Footer />
    </>
  );
}
