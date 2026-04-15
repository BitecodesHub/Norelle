import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="pt-24 min-h-screen flex items-center justify-center">
        <div className="text-center px-6 py-24">
          <p className="text-gold/30 font-serif text-[120px] md:text-[160px] font-light leading-none mb-4">404</p>
          <h1 className="font-serif text-3xl md:text-4xl text-cream font-light mb-4">Page Not Found</h1>
          <p className="text-cream/40 font-sans text-sm max-w-md mx-auto mb-10 leading-relaxed">
            The page you&apos;re looking for doesn&apos;t exist or has been moved. Let us help you find what you&apos;re looking for.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/shop"
              className="px-8 py-4 bg-gold hover:bg-gold-light text-noir font-sans text-sm tracking-widest uppercase font-medium rounded-xl transition-all hover:shadow-gold-glow"
            >
              Browse Fragrances
            </Link>
            <Link
              href="/"
              className="px-8 py-4 border border-gold/30 text-gold hover:bg-gold/10 font-sans text-sm tracking-widest uppercase font-medium rounded-xl transition-all"
            >
              Go Home
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
