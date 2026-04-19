import type { Metadata } from "next";
import AreaLandingPage from "@/components/seo/AreaLandingPage";
import { localBusinessSchema, breadcrumbSchema } from "@/lib/schemas";

export const metadata: Metadata = {
  title: "Perfume Shop Near SG Highway | Norelle Luxury Fragrances Ahmedabad",
  description:
    "Premium perfume shop near SG Highway, Ahmedabad. Norelle offers luxury handcrafted perfumes and pure natural attars with free delivery to SG Highway, Thaltej, Bodakdev, and Prahlad Nagar.",
  keywords: [
    "perfume shop SG Highway",
    "perfume near SG Highway Ahmedabad",
    "luxury perfume SG Highway",
    "attar shop near SG Highway",
    "fragrance store SG Highway",
    "Norelle SG Highway delivery",
    "buy perfume SG Highway",
    "best perfume shop near Iscon Mall",
  ],
  alternates: { canonical: "https://www.norelleperfumes.com/perfume-shop-sg-highway" },
};

const schema = localBusinessSchema({
  areaServed: ["SG Highway", "Thaltej", "Bodakdev", "Prahlad Nagar", "Sindhu Bhavan Road", "Sola"],
});

const breadcrumbs = breadcrumbSchema([
  { name: "Home", url: "https://www.norelleperfumes.com" },
  { name: "Perfume Shop Ahmedabad", url: "https://www.norelleperfumes.com/perfume-shop-ahmedabad" },
  { name: "SG Highway", url: "https://www.norelleperfumes.com/perfume-shop-sg-highway" },
]);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      <AreaLandingPage
        area="SG Highway"
        description="SG Highway is Ahmedabad's fastest-growing commercial and residential corridor, home to corporate professionals, young families, and an affluent shopper base that frequents Iscon Mega Mall and the boutiques along Sindhu Bhavan Road. Norelle brings a refined fragrance experience to this modern stretch — whether you prefer a bold designer perfume for the boardroom or a delicate attar for weekend brunches, our curated collection delivers right to your doorstep."
        distance="~12 km"
        landmarks={["Iscon Mega Mall", "Sindhu Bhavan Road"]}
        nearbyAreas={["Thaltej", "Bodakdev", "Prahlad Nagar", "Sola", "Science City"]}
      />
    </>
  );
}
