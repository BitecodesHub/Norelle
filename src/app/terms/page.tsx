import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Terms and conditions for shopping at Norelle — luxury perfumes and attars in Ahmedabad. Shipping, returns, and policies.",
  alternates: { canonical: "https://norelle.in/terms" },
};

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24 min-h-screen">
        <article className="max-w-3xl mx-auto px-6 py-16">
          <p className="text-xs tracking-[0.4em] text-gold uppercase font-sans mb-4">Legal</p>
          <h1 className="font-serif text-5xl text-cream font-light mb-6">Terms & Conditions</h1>
          <div className="h-px w-16 bg-gold mb-10" />
          <p className="text-cream/40 font-sans text-xs mb-10">Last updated: April 2026</p>

          <div className="prose prose-invert max-w-none space-y-8 font-sans text-cream/60 text-sm leading-8">
            <section>
              <h2 className="font-serif text-xl text-cream font-light mb-3">1. General</h2>
              <p>By accessing and using norelle.in, you agree to these terms and conditions. Norelle reserves the right to update these terms at any time. Continued use of the website constitutes acceptance of the updated terms.</p>
            </section>

            <section>
              <h2 className="font-serif text-xl text-cream font-light mb-3">2. Products & Pricing</h2>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>All product images are representative. Actual products may vary slightly in colour due to photography and screen settings.</li>
                <li>Prices are listed in Indian Rupees (INR) and include applicable taxes.</li>
                <li>Norelle reserves the right to change prices without prior notice.</li>
                <li>Product availability is subject to stock levels.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-xl text-cream font-light mb-3">3. Orders & Payment</h2>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Orders are confirmed only after successful payment via Razorpay (UPI, credit card, debit card, net banking).</li>
                <li>Norelle reserves the right to cancel orders if fraud is suspected or products are unavailable.</li>
                <li>You will receive an order confirmation via email or WhatsApp.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-xl text-cream font-light mb-3">4. Shipping & Delivery</h2>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Free delivery is available across Ahmedabad.</li>
                <li>Orders are typically delivered within 2-5 business days.</li>
                <li>Delivery timelines may vary based on location and availability.</li>
                <li>For deliveries outside Ahmedabad, shipping charges may apply.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-xl text-cream font-light mb-3">5. Returns & Refunds</h2>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Due to the nature of perfume and attar products, we do not accept returns on opened/used products.</li>
                <li>If you receive a damaged or incorrect product, please contact us within 48 hours of delivery.</li>
                <li>Refunds for eligible returns will be processed within 7-10 business days.</li>
                <li>Contact us at +91 94287 67709 or via WhatsApp for return requests.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-xl text-cream font-light mb-3">6. Intellectual Property</h2>
              <p>All content on norelle.in — including text, images, logos, and designs — is the property of Norelle and is protected by copyright laws. Unauthorized reproduction or use is prohibited.</p>
            </section>

            <section>
              <h2 className="font-serif text-xl text-cream font-light mb-3">7. Contact</h2>
              <p>For any questions about these terms, please contact us:</p>
              <p>Norelle — Luxury Perfumes & Attar<br />62, Nanadan Society, Bahai Center, Shahpur, Ahmedabad 380001<br />Phone: +91 94287 67709</p>
            </section>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
