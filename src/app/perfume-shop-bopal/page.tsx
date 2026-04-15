import type { Metadata } from "next";
import AreaLandingPage from "@/components/seo/AreaLandingPage";
import { localBusinessSchema, breadcrumbSchema } from "@/lib/schemas";

export const metadata: Metadata = {
  title: "Perfume Shop Near Bopal | Norelle Luxury Fragrances Ahmedabad",
  description:
    "Looking for a premium perfume shop near Bopal, Ahmedabad? Norelle offers luxury perfumes and pure attars with free home delivery to Bopal, South Bopal, and Ghuma. Order online or visit us at Shahpur.",
  keywords: [
    "perfume shop Bopal",
    "perfume near Bopal Ahmedabad",
    "luxury perfume Bopal",
    "attar shop South Bopal",
    "fragrance store near Ghuma Circle",
    "Norelle Bopal delivery",
    "buy perfume Bopal online",
    "best perfume shop South Ahmedabad",
  ],
  alternates: { canonical: "https://norelle.in/perfume-shop-bopal" },
};

const schema = localBusinessSchema({
  areaServed: ["Bopal", "South Bopal", "Ghuma", "Shela", "Ambli"],
});

const breadcrumbs = breadcrumbSchema([
  { name: "Home", url: "https://norelle.in" },
  { name: "Perfume Shop Ahmedabad", url: "https://norelle.in/perfume-shop-ahmedabad" },
  { name: "Bopal", url: "https://norelle.in/perfume-shop-bopal" },
]);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      <AreaLandingPage
        area="Bopal"
        description="Bopal and South Bopal have rapidly become Ahmedabad's preferred address for young families and IT professionals moving into modern township communities around Ghuma Circle and beyond. For this new-age neighbourhood that often shops online but craves a personal touch, Norelle offers the best of both worlds — browse our curated luxury perfumes and handcrafted attars on the website and get them delivered free to your Bopal doorstep."
        distance="~18 km"
        landmarks={["South Bopal", "Ghuma Circle"]}
        nearbyAreas={["Shela", "Ambli", "South Bopal", "Sanand", "Sardar Patel Ring Road"]}
      />
    </>
  );
}
