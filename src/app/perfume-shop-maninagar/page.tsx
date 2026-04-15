import type { Metadata } from "next";
import AreaLandingPage from "@/components/seo/AreaLandingPage";
import { localBusinessSchema, breadcrumbSchema } from "@/lib/schemas";

export const metadata: Metadata = {
  title: "Perfume Shop Near Maninagar | Norelle Luxury Fragrances Ahmedabad",
  description:
    "Premium perfume and attar shop near Maninagar, Ahmedabad. Norelle delivers luxury handcrafted fragrances to Maninagar, Isanpur, and Kankaria. Visit our Shahpur store or order online with free delivery.",
  keywords: [
    "perfume shop Maninagar",
    "perfume near Maninagar Ahmedabad",
    "attar shop Maninagar",
    "luxury perfume Maninagar",
    "fragrance store near Maninagar Railway Station",
    "Norelle Maninagar delivery",
    "buy perfume Maninagar",
    "best perfume shop East Ahmedabad",
  ],
  alternates: { canonical: "https://norelle.in/perfume-shop-maninagar" },
};

const schema = localBusinessSchema({
  areaServed: ["Maninagar", "Isanpur", "Kankaria", "Bapunagar", "Gomtipur"],
});

const breadcrumbs = breadcrumbSchema([
  { name: "Home", url: "https://norelle.in" },
  { name: "Perfume Shop Ahmedabad", url: "https://norelle.in/perfume-shop-ahmedabad" },
  { name: "Maninagar", url: "https://norelle.in/perfume-shop-maninagar" },
]);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      <AreaLandingPage
        area="Maninagar"
        description="Maninagar is the vibrant heart of east Ahmedabad — a bustling commercial hub centred around its railway station, with a loyal local community that values tradition, family gatherings, and festive celebrations. Norelle brings luxury within easy reach for Maninagar residents, offering pure natural attars ideal for daily worship and special occasions alongside contemporary perfumes for the area's growing young professional crowd."
        distance="~8 km"
        landmarks={["Maninagar Railway Station", "ISKCON Temple"]}
        nearbyAreas={["Isanpur", "Kankaria", "Bapunagar", "Gomtipur", "Danilimda"]}
      />
    </>
  );
}
