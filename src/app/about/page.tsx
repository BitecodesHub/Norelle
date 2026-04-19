import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AboutContent from "@/components/about/AboutContent";
import { breadcrumbSchema, BUSINESS } from "@/lib/schemas";

export const metadata: Metadata = {
  title: "About Norelle — Luxury Perfume House in Ahmedabad | Our Story",
  description:
    "Norelle is a luxury perfume and natural attar house founded in Ahmedabad in 2016 by Ismail Mansuri and Amaan Shaikh. Learn about our craft, our founders, and our commitment to 100% natural, handblended fragrances sourced from Kannauj, Grasse, and Assam.",
  keywords: [
    "about Norelle",
    "Norelle founders",
    "Ismail Mansuri perfumer",
    "Amaan Shaikh Norelle",
    "luxury perfume house Ahmedabad",
    "natural attar brand India",
    "handcrafted perfume brand",
    "Norelle story",
  ],
  alternates: { canonical: "https://www.norelleperfumes.com/about" },
  openGraph: {
    type: "article",
    url: "https://www.norelleperfumes.com/about",
    title: "About Norelle — Crafted with Soul & Silence",
    description:
      "Founded in 2016 in Ahmedabad, Norelle handcrafts luxury perfumes and natural attars from the finest ingredients sourced worldwide.",
    images: [
      {
        url: "/images/Norelle Handblended Perfumes.jpg",
        width: 1200,
        height: 630,
        alt: "Norelle handblended perfumes atelier, Ahmedabad",
      },
    ],
  },
};

const aboutBreadcrumbs = breadcrumbSchema([
  { name: "Home", url: "https://www.norelleperfumes.com" },
  { name: "About", url: "https://www.norelleperfumes.com/about" },
]);

const aboutPageSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "@id": "https://www.norelleperfumes.com/about#aboutpage",
  url: "https://www.norelleperfumes.com/about",
  name: "About Norelle — Luxury Perfume House in Ahmedabad",
  description:
    "The story of Norelle, a luxury perfume and natural attar house founded in Ahmedabad in 2016. Meet the founders Ismail Mansuri and Amaan Shaikh and learn about our craft.",
  inLanguage: "en-IN",
  isPartOf: { "@type": "WebSite", "@id": `${BUSINESS.url}/#website` },
  about: { "@id": `${BUSINESS.url}/#organization` },
  mainEntity: {
    "@type": "Organization",
    "@id": `${BUSINESS.url}/#organization`,
    name: "Norelle",
    foundingDate: "2016",
    founders: [
      {
        "@type": "Person",
        name: "Ismail Mansuri",
        jobTitle: "Co-Founder",
        worksFor: { "@id": `${BUSINESS.url}/#organization` },
        description:
          "Co-founder of Norelle. Grew up in Ahmedabad's old city, drawn from childhood to the attars that perfumed its narrow streets.",
      },
      {
        "@type": "Person",
        name: "Amaan Shaikh",
        jobTitle: "Co-Founder",
        worksFor: { "@id": `${BUSINESS.url}/#organization` },
        description:
          "Co-founder of Norelle. Brings a meticulous eye for craft and quality, championing natural, fully-disclosed ingredients.",
      },
    ],
  },
};

export default function AboutPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutBreadcrumbs) }} />
      <Navbar />
      <main>
        <AboutContent />
      </main>
      <Footer />
    </>
  );
}
