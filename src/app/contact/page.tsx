import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import NAPBlock from "@/components/shared/NAPBlock";
import { localBusinessSchema, breadcrumbSchema, BUSINESS } from "@/lib/schemas";

export const metadata: Metadata = {
  title: "Contact Norelle | Perfume Shop Ahmedabad — Shahpur",
  description:
    "Contact Norelle — Ahmedabad's luxury perfume and attar shop. Visit us at 62 Nanadan Society, Bahai Center, Shahpur (10 AM–8 PM daily), call +91 94287 67709, or WhatsApp us. Free delivery across Ahmedabad.",
  keywords: [
    "contact Norelle",
    "perfume shop near me Ahmedabad",
    "Norelle phone number",
    "Norelle Shahpur address",
    "attar shop Shahpur contact",
    "Norelle WhatsApp",
    "perfume store Ahmedabad hours",
  ],
  alternates: { canonical: "https://www.norelleperfumes.com/contact" },
  openGraph: {
    type: "website",
    url: "https://www.norelleperfumes.com/contact",
    title: "Contact Norelle — Visit Our Shahpur Atelier",
    description:
      "Visit Norelle's Ahmedabad atelier at 62 Nanadan Society, Shahpur. Open daily 10 AM–8 PM. Free delivery across Ahmedabad.",
  },
};

const contactSchema = localBusinessSchema({
  areaServed: ["Ahmedabad", "Shahpur", "SG Highway", "Satellite", "Bopal", "Maninagar"],
  hasMap: "https://maps.google.com/?q=62+Nanadan+Society+Bahai+Center+Shahpur+Ahmedabad+Gujarat+380001",
});

const contactBreadcrumbs = breadcrumbSchema([
  { name: "Home", url: "https://www.norelleperfumes.com" },
  { name: "Contact", url: "https://www.norelleperfumes.com/contact" },
]);

export default function ContactPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(contactBreadcrumbs) }} />
      <Navbar />
      <main className="pt-24 min-h-screen">
        <section className="max-w-5xl mx-auto px-6 py-16">
          <nav className="mb-8 font-sans text-xs text-cream/40">
            <a href="/" className="hover:text-gold transition-colors">Home</a>
            <span className="mx-2">/</span>
            <span className="text-cream/60">Contact</span>
          </nav>

          <p className="text-xs tracking-[0.4em] text-gold uppercase font-sans mb-4">Get in Touch</p>
          <h1 className="font-serif text-5xl md:text-6xl text-cream font-light mb-6 leading-tight">
            Contact Us
          </h1>
          <div className="h-px w-16 bg-gold mb-10" />

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            {/* Left: Info */}
            <div>
              <h2 className="font-serif text-2xl text-cream mb-6">Visit Our Store</h2>
              <NAPBlock className="mb-6" />

              <div className="space-y-4 font-sans text-sm text-cream/50 mb-8">
                <div>
                  <p className="text-gold font-medium mb-1">Store Hours</p>
                  <p>Monday – Sunday: 10:00 AM – 8:00 PM</p>
                </div>
                <div>
                  <p className="text-gold font-medium mb-1">Landmarks</p>
                  <p>Near Bahai Center, Shahpur. 5 min from Delhi Darwaza.</p>
                </div>
                <div>
                  <p className="text-gold font-medium mb-1">Delivery</p>
                  <p>Free home delivery across all of Ahmedabad.</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <a
                  href={`https://wa.me/919428767709?text=${encodeURIComponent("Hi Norelle! I have a question.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-6 py-3 bg-[#25D366] hover:bg-[#20BD5A] text-white font-sans text-sm tracking-wider uppercase font-medium rounded-xl transition-all"
                >
                  WhatsApp Us
                </a>
                <a
                  href={`tel:${BUSINESS.phone}`}
                  className="inline-block px-6 py-3 border border-gold/40 text-gold hover:bg-gold/10 font-sans text-sm tracking-wider uppercase font-medium rounded-xl transition-all"
                >
                  Call Now
                </a>
                <a
                  href="https://maps.google.com/?q=62+Nanadan+Society+Bahai+Center+Shahpur+Ahmedabad+Gujarat+380001"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-6 py-3 border border-tan text-mocha hover:border-gold/40 hover:text-gold font-sans text-sm tracking-wider uppercase font-medium rounded-xl transition-all"
                >
                  Get Directions
                </a>
              </div>
            </div>

            {/* Right: Map — pinned to exact address */}
            <div className="rounded-2xl overflow-hidden border border-tan/30 shadow-card">
              <iframe
                src="https://maps.google.com/maps?q=62+Nanadan+Society+Bahai+Center+Shahpur+Ahmedabad+Gujarat+380001+India&z=17&output=embed"
                width="100%"
                height="420"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Norelle Perfume Shop — 62 Nanadan Society, Shahpur, Ahmedabad"
              />
            </div>
          </div>

          {/* Delivery Areas */}
          <div className="glass-card rounded-2xl p-8 mb-16">
            <h2 className="font-serif text-2xl text-cream mb-4">We Deliver Across Ahmedabad</h2>
            <p className="text-cream/50 font-sans text-sm leading-relaxed mb-6">
              Order online and enjoy free delivery to any area in Ahmedabad. Same-day delivery available for select areas.
            </p>
            <div className="flex flex-wrap gap-2">
              {["Shahpur", "SG Highway", "Satellite", "Navrangpura", "CG Road", "Bopal", "Maninagar", "Vastrapur", "Paldi", "Ellisbridge", "Thaltej", "Prahlad Nagar", "Bodakdev", "Ambawadi", "Ashram Road"].map((area) => (
                <span key={area} className="px-3 py-1.5 rounded-full border border-tan text-xs font-sans text-cream/40">
                  {area}
                </span>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
