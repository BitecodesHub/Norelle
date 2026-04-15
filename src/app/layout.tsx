import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Providers from "@/components/Providers";
import { organizationSchema, websiteSearchSchema, localBusinessSchema } from "@/lib/schemas";
import WhatsAppButton from "@/components/shared/WhatsAppButton";

const BASE = "https://www.norelleperfumes.com";

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

export const viewport: Viewport = {
  themeColor: "#D4AF37",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(BASE),

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
    "alcohol free attar Ahmedabad",
    "oud perfume Ahmedabad",
    "norelleperfumes",
  ],

  authors: [{ name: "Norelle", url: BASE }],
  creator: "Norelle",
  publisher: "Norelle",
  category: "Shopping",

  openGraph: {
    type: "website",
    locale: "en_IN",
    url: BASE,
    siteName: "Norelle",
    title: "Norelle — Luxury Perfumes & Attar | Ahmedabad",
    description:
      "Premium handcrafted perfumes and natural attars. Free delivery in Ahmedabad. Shop online or visit us at Shahpur.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Norelle — Luxury Perfumes & Attar, Ahmedabad",
        type: "image/jpeg",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Norelle — Luxury Perfumes & Attar | Ahmedabad",
    description:
      "Premium handcrafted perfumes and natural attars. Free delivery in Ahmedabad.",
    images: ["/og-image.jpg"],
    creator: "@norelleperfumes",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  alternates: {
    canonical: BASE,
  },

  manifest: "/manifest.json",

  appleWebApp: {
    capable: true,
    title: "Norelle",
    statusBarStyle: "black-translucent",
  },

  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: "/favicon.ico",
  },

  other: {
    "geo.region": "IN-GJ",
    "geo.placename": "Ahmedabad",
    "geo.position": "23.0301;72.5876",
    ICBM: "23.0301, 72.5876",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${cormorant.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema()) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSearchSchema()) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema()) }}
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
