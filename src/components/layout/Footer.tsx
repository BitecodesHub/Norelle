import Link from "next/link";

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

function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.259 5.627 5.905-5.627zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="bg-charcoal border-t border-tan">
      <div className="h-px w-full bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">

          {/* Brand */}
          <Link href="/" className="shrink-0">
            <span className="font-serif text-xl tracking-[0.35em] text-cream font-light">NORELLE</span>
          </Link>

          {/* Nav links */}
          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {[
              { label: "Shop", href: "/shop" },
              { label: "Attar", href: "/shop?category=ATTAR" },
              { label: "About", href: "/about" },
              { label: "Contact", href: "/contact" },
              { label: "Orders", href: "/account/orders" },
              { label: "Privacy", href: "/privacy" },
              { label: "Terms", href: "/terms" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs text-mocha hover:text-cream font-sans tracking-wide transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Social + copyright */}
          <div className="flex items-center gap-5 shrink-0">
            <Link href="https://instagram.com" target="_blank" aria-label="Instagram"
              className="text-latte hover:text-gold transition-colors duration-200">
              <InstagramIcon className="w-4 h-4" />
            </Link>
            <Link href="https://facebook.com" target="_blank" aria-label="Facebook"
              className="text-latte hover:text-gold transition-colors duration-200">
              <FacebookIcon className="w-4 h-4" />
            </Link>
            <Link href="https://twitter.com" target="_blank" aria-label="X"
              className="text-latte hover:text-gold transition-colors duration-200">
              <XIcon className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Copyright */}
        <p className="text-center text-[11px] text-latte font-sans mt-6 pt-5 border-t border-tan/50">
          © {new Date().getFullYear()} Norelle · Ahmedabad · All rights reserved
        </p>
      </div>
    </footer>
  );
}
