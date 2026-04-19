import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Norelle's privacy policy — how we collect, use, and protect your personal information when you shop for luxury perfumes and attars.",
  alternates: { canonical: "https://www.norelleperfumes.com/privacy" },
};

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24 min-h-screen">
        <article className="max-w-3xl mx-auto px-6 py-16">
          <p className="text-xs tracking-[0.4em] text-gold uppercase font-sans mb-4">Legal</p>
          <h1 className="font-serif text-5xl text-cream font-light mb-6">Privacy Policy</h1>
          <div className="h-px w-16 bg-gold mb-10" />
          <p className="text-cream/40 font-sans text-xs mb-10">Last updated: April 2026</p>

          <div className="prose prose-invert max-w-none space-y-8 font-sans text-cream/60 text-sm leading-8">
            <section>
              <h2 className="font-serif text-xl text-cream font-light mb-3">1. Information We Collect</h2>
              <p>When you visit norelle.in or make a purchase, we may collect the following information:</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Name, email address, phone number, and shipping address</li>
                <li>Payment information (processed securely via Razorpay — we do not store card details)</li>
                <li>Account credentials (email and hashed password)</li>
                <li>Browsing behaviour and device information via cookies</li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-xl text-cream font-light mb-3">2. How We Use Your Information</h2>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>To process and deliver your orders</li>
                <li>To communicate order updates via email, SMS, or WhatsApp</li>
                <li>To improve our website and product offerings</li>
                <li>To send promotional communications (only with your consent)</li>
                <li>To prevent fraud and ensure security</li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-xl text-cream font-light mb-3">3. Payment Security</h2>
              <p>All payments are processed through Razorpay, a PCI-DSS compliant payment gateway. We never store your credit card, debit card, or UPI details on our servers.</p>
            </section>

            <section>
              <h2 className="font-serif text-xl text-cream font-light mb-3">4. Cookies</h2>
              <p>We use essential cookies to maintain your shopping cart and session. We may use analytics cookies to understand how visitors use our site. You can disable cookies in your browser settings.</p>
            </section>

            <section>
              <h2 className="font-serif text-xl text-cream font-light mb-3">5. Third-Party Services</h2>
              <p>We may share your information with trusted third parties for:</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Payment processing (Razorpay)</li>
                <li>Delivery services</li>
                <li>Analytics (Google Analytics)</li>
              </ul>
              <p>We do not sell your personal data to any third party.</p>
            </section>

            <section>
              <h2 className="font-serif text-xl text-cream font-light mb-3">6. Your Rights</h2>
              <p>You have the right to access, update, or delete your personal information. To exercise these rights, contact us at +91 94287 67709 or via WhatsApp.</p>
            </section>

            <section>
              <h2 className="font-serif text-xl text-cream font-light mb-3">7. Contact</h2>
              <p>If you have questions about this privacy policy, please contact us:</p>
              <p>Norelle — Luxury Perfumes & Attar<br />62, Nanadan Society, Bahai Center, Shahpur, Ahmedabad 380001<br />Phone: +91 94287 67709</p>
            </section>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
