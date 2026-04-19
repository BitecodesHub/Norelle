import type { Metadata } from "next";
import AreaLandingPage from "@/components/seo/AreaLandingPage";
import { localBusinessSchema, breadcrumbSchema } from "@/lib/schemas";

export const metadata: Metadata = {
  title: "Perfume Shop Near Navrangpura | Norelle Luxury Fragrances Ahmedabad",
  description:
    "Premium perfume and attar shop near Navrangpura, Ahmedabad. Norelle is just 4 km away with free delivery to Navrangpura, Gujarat University area, and LD Engineering College. Shop luxury fragrances online.",
  keywords: [
    "perfume shop Navrangpura",
    "perfume near Navrangpura Ahmedabad",
    "luxury perfume Navrangpura",
    "attar shop near Gujarat University",
    "fragrance store Navrangpura",
    "Norelle Navrangpura delivery",
    "buy perfume Navrangpura online",
    "best perfume shop near LD College",
  ],
  alternates: { canonical: "https://www.norelleperfumes.com/perfume-shop-navrangpura" },
};

const schema = localBusinessSchema({
  areaServed: ["Navrangpura", "Gujarat University", "LD Engineering College", "Usmanpura", "Stadium"],
});

const breadcrumbs = breadcrumbSchema([
  { name: "Home", url: "https://www.norelleperfumes.com" },
  { name: "Perfume Shop Ahmedabad", url: "https://www.norelleperfumes.com/perfume-shop-ahmedabad" },
  { name: "Navrangpura", url: "https://www.norelleperfumes.com/perfume-shop-navrangpura" },
]);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      <AreaLandingPage
        area="Navrangpura"
        description="Navrangpura is Ahmedabad's youthful, culturally rich quarter — teeming with university students, creative professionals, and food lovers who fill the cafes and bookshops around Gujarat University and LD Engineering College. Norelle is the ideal fragrance destination for this expressive crowd, offering affordable luxury perfumes for everyday campus confidence and exquisite attars that make thoughtful, standout gifts."
        distance="~4 km"
        landmarks={["Gujarat University", "LD Engineering College", "Navrangpura Bus Stand"]}
        nearbyAreas={["Usmanpura", "Stadium", "Ellisbridge", "Ashram Road", "Vijay Cross Roads"]}
      />
    </>
  );
}
