import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import NAPBlock from "@/components/shared/NAPBlock";

interface AreaPageProps {
  area: string;
  description: string;
  distance: string;
  landmarks: string[];
  nearbyAreas: string[];
}

export default function AreaLandingPage({ area, description, distance, landmarks, nearbyAreas }: AreaPageProps) {
  return (
    <>
      <Navbar />
      <main className="pt-24 min-h-screen">
        <section className="max-w-4xl mx-auto px-6 py-16">
          <nav className="mb-8 font-sans text-xs text-cream/40">
            <Link href="/" className="hover:text-gold transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/perfume-shop-ahmedabad" className="hover:text-gold transition-colors">Perfume Shop Ahmedabad</Link>
            <span className="mx-2">/</span>
            <span className="text-cream/60">{area}</span>
          </nav>

          <p className="text-xs tracking-[0.4em] text-gold uppercase font-sans mb-4">{area}, Ahmedabad</p>
          <h1 className="font-serif text-4xl md:text-5xl text-cream font-light mb-6 leading-tight">
            Perfume Shop Near<br />{area}
          </h1>
          <div className="h-px w-16 bg-gold mb-8" />

          <p className="text-cream/60 font-sans text-lg leading-9 mb-6">{description}</p>

          <p className="text-cream/60 font-sans text-base leading-8 mb-10">
            Located just <strong className="text-cream">{distance}</strong> from {area}, Norelle at Shahpur is your
            nearest destination for premium perfumes and natural attars. We also offer{" "}
            <strong className="text-gold">free home delivery</strong> directly to {area} and all surrounding areas.
          </p>

          {/* Two Categories */}
          <div className="grid sm:grid-cols-2 gap-6 mb-12">
            <Link href="/shop?category=PERFUME" className="group">
              <div className="glass-card rounded-2xl p-6 transition-all duration-300 group-hover:shadow-gold-glow group-hover:border-gold/30">
                <h3 className="font-serif text-xl text-gold mb-2">Perfumes</h3>
                <p className="text-cream/50 font-sans text-sm leading-relaxed">Long-lasting luxury fragrances with rich, complex notes.</p>
              </div>
            </Link>
            <Link href="/shop?category=ATTAR" className="group">
              <div className="glass-card rounded-2xl p-6 transition-all duration-300 group-hover:shadow-gold-glow group-hover:border-gold/30">
                <h3 className="font-serif text-xl text-gold mb-2">Attar Collection</h3>
                <p className="text-cream/50 font-sans text-sm leading-relaxed">Pure, natural, alcohol-free attars from around the world.</p>
              </div>
            </Link>
          </div>

          {/* How to Reach */}
          <div className="glass-card rounded-2xl p-8 mb-12">
            <h2 className="font-serif text-2xl text-cream mb-4">How to Reach Norelle from {area}</h2>
            <div className="grid sm:grid-cols-2 gap-6 font-sans text-sm text-cream/50">
              <div>
                <p className="text-gold font-medium mb-2">Distance</p>
                <p>{distance} from {area}</p>
              </div>
              <div>
                <p className="text-gold font-medium mb-2">Nearby Landmarks</p>
                <ul className="space-y-1">
                  {landmarks.map((l) => (
                    <li key={l} className="flex items-center gap-2">
                      <span className="w-1 h-1 bg-gold/40 rounded-full" />
                      {l}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* NAP + CTA */}
          <div className="mb-12">
            <h2 className="font-serif text-2xl text-cream mb-4">Visit Us or Order Online</h2>
            <NAPBlock className="mb-6" />
            <div className="flex flex-wrap gap-3">
              <Link
                href="/shop"
                className="inline-block px-8 py-4 bg-gold hover:bg-gold-light text-noir font-sans text-sm tracking-widest uppercase font-medium rounded-xl transition-all hover:shadow-gold-glow"
              >
                Shop Online
              </Link>
              <a
                href={`https://wa.me/919428767709?text=${encodeURIComponent(`Hi! I'm from ${area}, Ahmedabad. I'd like to order perfumes.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-8 py-4 bg-[#25D366] hover:bg-[#20BD5A] text-white font-sans text-sm tracking-widest uppercase font-medium rounded-xl transition-all"
              >
                WhatsApp Us
              </a>
              <Link
                href="/contact"
                className="inline-block px-8 py-4 border border-tan text-mocha hover:border-gold/40 hover:text-gold font-sans text-sm tracking-widest uppercase font-medium rounded-xl transition-all"
              >
                Contact Us
              </Link>
            </div>
          </div>

          {/* Nearby Areas */}
          <div>
            <h2 className="font-serif text-xl text-cream mb-4">Also Serving Nearby Areas</h2>
            <div className="flex flex-wrap gap-2">
              {nearbyAreas.map((a) => (
                <span key={a} className="px-3 py-1.5 rounded-full border border-tan text-xs font-sans text-cream/40">
                  {a}
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
