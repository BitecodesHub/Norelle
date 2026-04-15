import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import NAPBlock from "@/components/shared/NAPBlock";
import { localBusinessSchema, breadcrumbSchema, BUSINESS } from "@/lib/schemas";

export const metadata: Metadata = {
  title: "Contact Norelle | Perfume Shop Ahmedabad",
  description:
    "Get in touch with Norelle — Ahmedabad's luxury perfume and attar shop. Visit us at Shahpur, call us, or WhatsApp for fragrance consultations. Free delivery across Ahmedabad.",
  keywords: ["contact Norelle", "perfume shop near me Ahmedabad", "Norelle phone number", "Norelle Shahpur address"],
  alternates: { canonical: "https://norelle.in/contact" },
};

const contactSchema = localBusinessSchema({
  areaServed: ["Ahmedabad", "Shahpur", "SG Highway", "Satellite", "Bopal", "Maninagar"],
  hasMap: "https://maps.google.com/?q=62+Nanadan+Society+Bahai+Center+Shahpur+Ahmedabad",
});

const contactBreadcrumbs = breadcrumbSchema([
  { name: "Home", url: "https://norelle.in" },
  { name: "Contact", url: "https://norelle.in/contact" },
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
                  href="https://maps.google.com/?q=62+Nanadan+Society+Bahai+Center+Shahpur+Ahmedabad"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-6 py-3 border border-tan text-mocha hover:border-gold/40 hover:text-gold font-sans text-sm tracking-wider uppercase font-medium rounded-xl transition-all"
                >
                  Get Directions
                </a>
              </div>
            </div>

            {/* Right: Map */}
            <div className="rounded-2xl overflow-hidden border border-tan/30">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3671.5!2d72.5876!3d23.0301!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDAxJzQ4LjQiTiA3MsKwMzUnMTUuNCJF!5e0!3m2!1sen!2sin!4v1"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Norelle Perfume Shop — Shahpur, Ahmedabad"
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
