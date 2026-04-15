import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Providers from "@/components/Providers";
import { organizationSchema, websiteSearchSchema } from "@/lib/schemas";
import WhatsAppButton from "@/components/shared/WhatsAppButton";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://norelle.in"),
  title: {
    default: "Norelle — Luxury Perfumes & Attar in Ahmedabad | Scent of Presence",
    template: "%s | Norelle Luxury Fragrances",
  },
  description:
    "Discover Norelle's curated collection of luxury perfumes and natural attars in Ahmedabad. Handcrafted, 100% natural fragrances with free delivery. Shop online or visit us at Shahpur.",
  keywords: [
    "luxury perfumes Ahmedabad",
    "Norelle perfume",
    "perfume shop Ahmedabad",
    "best attar Ahmedabad",
    "buy perfume online Ahmedabad",
    "natural attar India",
    "premium attar Shahpur",
    "fragrance store Ahmedabad",
    "handcrafted perfume India",
    "alcohol free attar",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://norelle.in",
    siteName: "Norelle",
    title: "Norelle — Luxury Perfumes & Attar | Ahmedabad",
    description:
      "Premium handcrafted perfumes and natural attars. Free delivery in Ahmedabad. Shop online or visit us at Shahpur.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Norelle Luxury Perfumes & Attar — Ahmedabad" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Norelle — Luxury Perfumes & Attar | Ahmedabad",
    description: "Premium handcrafted perfumes and natural attars. Free delivery in Ahmedabad.",
    images: ["/og-image.jpg"],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://norelle.in" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#D4AF37" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema()) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSearchSchema()) }}
        />
      </head>
      <body className="bg-parchment text-cream antialiased">
        <Providers>
          {children}
          <WhatsAppButton />
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: "#FFFFFF",
                color: "#1C1008",
                border: "1px solid #E2D0BC",
                borderRadius: "10px",
                fontFamily: "Inter, sans-serif",
                fontSize: "14px",
                boxShadow: "0 4px 20px rgba(140,90,40,0.1)",
              },
              success: { iconTheme: { primary: "#D4AF37", secondary: "#FFFFFF" } },
            }}
          />
        </Providers>
      </body>
    </html>
  );
}
