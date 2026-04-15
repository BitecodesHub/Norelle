import Link from "next/link";
import NAPBlock from "@/components/shared/NAPBlock";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="bg-charcoal border-t border-tan">
      <div className="h-px w-full bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 py-7">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">

          {/* Col 1: Brand + NAP */}
          <div>
            <Link href="/" className="inline-block mb-2">
              <span className="font-serif text-xl tracking-[0.35em] text-cream font-light">NORELLE</span>
            </Link>
            <p className="text-cream/60 font-sans text-xs leading-relaxed mb-3">
              Luxury handcrafted perfumes and natural attars in Ahmedabad. 100% natural, free delivery.
            </p>
            <NAPBlock className="mb-3" />
            <a
              href="https://wa.me/919428767709?text=Hi%20Norelle!"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-sans text-[#25D366] hover:text-[#20BD5A] transition-colors"
            >
              <WhatsAppIcon className="w-4 h-4" />
              Chat on WhatsApp
            </a>
          </div>

          {/* Col 2: Shop */}
          <div>
            <h4 className="font-serif text-base tracking-wider text-cream font-semibold mb-3">Shop</h4>
            <nav className="flex flex-col gap-2">
              {[
                { label: "All Fragrances", href: "/shop" },
                { label: "Perfumes", href: "/shop?category=PERFUME" },
                { label: "Attar Collection", href: "/shop?category=ATTAR" },
                { label: "Best Attar Ahmedabad", href: "/best-attar-ahmedabad" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-xs text-cream/70 hover:text-gold font-sans tracking-wide transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Col 3: Company + Follow Us */}
          <div>
            <h4 className="font-serif text-base tracking-wider text-cream font-semibold mb-3">Company</h4>
            <nav className="flex flex-col gap-2">
              {[
                { label: "About Us", href: "/about" },
                { label: "Contact", href: "/contact" },
                { label: "Perfume Shop Ahmedabad", href: "/perfume-shop-ahmedabad" },
                { label: "My Orders", href: "/account/orders" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-xs text-cream/70 hover:text-gold font-sans tracking-wide transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="flex items-center gap-3 mt-4">
              <span className="text-latte hover:text-gold transition-colors duration-200 cursor-pointer" aria-label="Instagram">
                <InstagramIcon className="w-4 h-4" />
              </span>
              <span className="text-latte hover:text-gold transition-colors duration-200 cursor-pointer" aria-label="Facebook">
                <FacebookIcon className="w-4 h-4" />
              </span>
              <span className="text-cream/40 font-sans text-[10px]">Coming soon</span>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-5 pt-4 border-t border-tan/50 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-[11px] text-latte font-sans">
            © {new Date().getFullYear()} Norelle · Shahpur, Ahmedabad · All rights reserved
          </p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="text-[11px] text-latte/80 hover:text-gold font-sans transition-colors duration-200">Privacy Policy</Link>
            <Link href="/terms" className="text-[11px] text-latte/80 hover:text-gold font-sans transition-colors duration-200">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
