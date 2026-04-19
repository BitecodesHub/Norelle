import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import CategoryShowcase from "@/components/home/CategoryShowcase";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import HomeFAQ from "@/components/home/HomeFAQ";
import { faqSchema, breadcrumbSchema } from "@/lib/schemas";

import connectDB from "@/lib/mongoose";
import Product from "@/models/Product";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Norelle — Luxury Perfumes & Attar in Ahmedabad | Scent of Presence",
  description:
    "Norelle is Ahmedabad's luxury perfume and natural attar house. Shop handcrafted, 100% natural fragrances — oud, rose, sandalwood, musk — with free delivery across Ahmedabad. Visit our Shahpur atelier or order online.",
  keywords: [
    "luxury perfumes Ahmedabad",
    "attar shop Ahmedabad",
    "best perfume shop Ahmedabad",
    "natural attar India",
    "oud attar Ahmedabad",
    "rose attar Ahmedabad",
    "sandalwood attar",
    "handcrafted perfume Ahmedabad",
    "alcohol free attar",
    "Norelle perfumes",
    "Shahpur perfume shop",
    "buy perfume online Ahmedabad",
    "premium fragrance Gujarat",
  ],
  alternates: { canonical: "https://www.norelleperfumes.com" },
  openGraph: {
    type: "website",
    url: "https://www.norelleperfumes.com",
    title: "Norelle — Luxury Perfumes & Attar in Ahmedabad",
    description:
      "Handcrafted luxury perfumes and 100% natural attars. Free delivery across Ahmedabad. Visit our Shahpur atelier or shop online.",
  },
};

const HOME_FAQS = [
  {
    question: "What is Norelle?",
    answer:
      "Norelle is a luxury perfume and natural attar brand based in Ahmedabad, Gujarat. Founded in 2016, Norelle handcrafts premium fragrances — oud, rose, sandalwood, musk, and rare botanicals — using 100% natural, alcohol-free attar oils and long-lasting Eau de Parfums. We offer free home delivery across Ahmedabad and ship across India.",
  },
  {
    question: "Where is Norelle's perfume shop located in Ahmedabad?",
    answer:
      "Norelle's atelier is at 62, Nanadan Society, Bahai Center, Shahpur, Ahmedabad, Gujarat 380001, just 5 minutes from Delhi Darwaza. The store is open every day from 10:00 AM to 8:00 PM. You can also reach us on WhatsApp or call +91 94287 67709.",
  },
  {
    question: "What is the difference between attar and perfume?",
    answer:
      "Attar is a concentrated, alcohol-free natural fragrance oil distilled from botanicals such as rose, oud, sandalwood, and jasmine. It is applied in small quantities and lasts 12–24 hours. Perfume (including Eau de Parfum) is alcohol-based, sprays lightly, and typically lasts 6–10 hours. Norelle crafts both — natural attars for purists and modern Eau de Parfums for everyday luxury.",
  },
  {
    question: "Does Norelle offer free delivery in Ahmedabad?",
    answer:
      "Yes. Norelle offers free home delivery across all of Ahmedabad — Shahpur, SG Highway, Satellite, Bopal, Maninagar, Navrangpura, CG Road, Vastrapur, Paldi, Ellisbridge, Thaltej, Prahlad Nagar, and more. Same-day delivery is available in select areas for orders placed before noon.",
  },
  {
    question: "Are Norelle attars 100% natural?",
    answer:
      "Yes. Every Norelle attar is composed from pure botanical oils — no synthetic chemicals, no alcohol, no fillers. We source ingredients from Kannauj (India), Grasse (France), and the oud forests of Assam, then handblend each bottle in our Ahmedabad studio.",
  },
  {
    question: "How long do Norelle fragrances last?",
    answer:
      "Norelle natural attars last 12–24 hours on skin due to their concentrated oil base. Our Eau de Parfum range typically projects 6–10 hours. A single drop of attar behind the ears and wrists is enough for an entire day.",
  },
  {
    question: "Can I buy Norelle perfumes online?",
    answer:
      "Yes. Shop the full Norelle collection at norelleperfumes.com. We accept UPI, credit cards, debit cards, and cash on delivery. Free delivery across Ahmedabad; standard shipping across India.",
  },
  {
    question: "What are Norelle's bestselling attars?",
    answer:
      "Norelle's most popular fragrances include our royal oud, pure rose attar, sandalwood (chandan), musk attar, and signature handblended Eau de Parfums. Visit the shop page to explore the complete collection with notes, longevity, and reviews.",
  },
];

const homeFaqSchema = faqSchema(HOME_FAQS);
const homeBreadcrumbs = breadcrumbSchema([
  { name: "Home", url: "https://www.norelleperfumes.com" },
]);

async function getFeaturedProducts() {
  try {
    await connectDB();
    const products = await Product.find({ featured: true })
      .select("title slug price comparePrice images category rating reviewCount variants")
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(homeFaqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(homeBreadcrumbs) }} />
      <Navbar />
      <main>
        <HeroSection />
        <FeaturedProducts products={featured} />
        <CategoryShowcase />
        <WhyChooseUs />
        <HomeFAQ faqs={HOME_FAQS} />
      </main>
      <Footer />
    </>
  );
}
