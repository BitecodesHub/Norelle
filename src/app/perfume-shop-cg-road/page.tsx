import type { Metadata } from "next";
import AreaLandingPage from "@/components/seo/AreaLandingPage";
import { localBusinessSchema, breadcrumbSchema } from "@/lib/schemas";

export const metadata: Metadata = {
  title: "Perfume Shop Near CG Road | Norelle Luxury Fragrances Ahmedabad",
  description:
    "Luxury perfume shop near CG Road, Ahmedabad. Norelle at Shahpur is just 3 km from CG Road. Shop premium handcrafted perfumes and natural attars with free delivery to Lal Darwaja, Parimal Garden, and Relief Road.",
  keywords: [
    "perfume shop CG Road",
    "perfume near CG Road Ahmedabad",
    "fragrance store CG Road",
    "attar shop near Lal Darwaja",
    "luxury perfume CG Road",
    "Norelle CG Road delivery",
    "buy perfume Relief Road",
    "best perfume shop Ellisbridge",
  ],
  alternates: { canonical: "https://norelle.in/perfume-shop-cg-road" },
};

const schema = localBusinessSchema({
  areaServed: ["CG Road", "Lal Darwaja", "Parimal Garden", "Relief Road", "Ellisbridge", "Paldi"],
});

const breadcrumbs = breadcrumbSchema([
  { name: "Home", url: "https://norelle.in" },
  { name: "Perfume Shop Ahmedabad", url: "https://norelle.in/perfume-shop-ahmedabad" },
  { name: "CG Road", url: "https://norelle.in/perfume-shop-cg-road" },
]);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      <AreaLandingPage
        area="CG Road"
        description="CG Road is Ahmedabad's iconic retail and lifestyle spine, where brand-conscious shoppers stroll between Parimal Garden and Lal Darwaja picking up everything from fashion to fine dining. Just a short ride from our Shahpur store, Norelle is the natural next stop for CG Road visitors who want a fragrance that matches the area's polished energy — think statement perfumes for evening outings and elegant attars for gifting."
        distance="~3 km"
        landmarks={["Lal Darwaja", "Parimal Garden", "Relief Road"]}
        nearbyAreas={["Ellisbridge", "Paldi", "Navrangpura", "Income Tax", "Law Garden"]}
      />
    </>
  );
}
