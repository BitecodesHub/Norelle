import type { Metadata } from "next";
import AreaLandingPage from "@/components/seo/AreaLandingPage";
import { localBusinessSchema, breadcrumbSchema } from "@/lib/schemas";

export const metadata: Metadata = {
  title: "Perfume Shop Near Satellite | Norelle Luxury Fragrances Ahmedabad",
  description:
    "Find luxury perfumes and pure attars near Satellite, Ahmedabad. Norelle offers free home delivery to Satellite, Jodhpur Cross Roads, and Judges Bungalow Road. Shop handcrafted fragrances online.",
  keywords: [
    "perfume shop Satellite Ahmedabad",
    "perfume near Satellite",
    "luxury fragrance Satellite",
    "attar shop near Jodhpur Cross Roads",
    "buy perfume Satellite Ahmedabad",
    "Norelle Satellite delivery",
    "best perfume store near Judges Bungalow",
    "fragrance shop Satellite area",
  ],
  alternates: { canonical: "https://norelle.in/perfume-shop-satellite" },
};

const schema = localBusinessSchema({
  areaServed: ["Satellite", "Jodhpur Cross Roads", "Judges Bungalow Road", "Ambawadi", "Vastrapur"],
});

const breadcrumbs = breadcrumbSchema([
  { name: "Home", url: "https://norelle.in" },
  { name: "Perfume Shop Ahmedabad", url: "https://norelle.in/perfume-shop-ahmedabad" },
  { name: "Satellite", url: "https://norelle.in/perfume-shop-satellite" },
]);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      <AreaLandingPage
        area="Satellite"
        description="Satellite is one of Ahmedabad's most established upscale neighbourhoods, known for its tree-lined avenues, premium residences near Jodhpur Cross Roads, and a discerning community that values quality in everything from dining to personal grooming. Norelle is the perfect match for Satellite residents who appreciate artisanal craftsmanship — our luxury perfumes and alcohol-free attars are curated for those who see fragrance as an extension of personal style."
        distance="~6 km"
        landmarks={["Jodhpur Cross Roads", "Judges Bungalow Road"]}
        nearbyAreas={["Ambawadi", "Vastrapur", "Bodakdev", "Prahladnagar", "Shyamal"]}
      />
    </>
  );
}
