import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Providers from "@/components/Providers";

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
    default: "Norelle — Luxury Perfumes | Scent of Presence",
    template: "%s | Norelle Luxury Fragrances",
  },
  description:
    "Discover Norelle's curated collection of luxury perfumes, attars, and fragrances. Premium scents crafted for those who define presence. Shop online & in Ahmedabad.",
  keywords: [
    "luxury perfumes",
    "Norelle perfume",
    "perfume shop Ahmedabad",
    "best attar Ahmedabad",
    "luxury fragrances India",
    "Eau de Parfum",
    "premium attar",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://norelle.in",
    siteName: "Norelle",
    title: "Norelle — Luxury Perfumes | Scent of Presence",
    description:
      "Premium luxury fragrances from Norelle. Shop Eau de Parfum, Attar & more.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Norelle Luxury Perfumes" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Norelle — Luxury Perfumes",
    description: "Premium luxury fragrances. Scent of Presence.",
    images: ["/og-image.jpg"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="bg-parchment text-cream antialiased">
        <Providers>
          {children}
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
