"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSession, signOut } from "next-auth/react";
import { ShoppingBag, User, Menu, X, ChevronDown } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import CartDrawer from "@/components/cart/CartDrawer";

const navLinks = [
  { label: "Shop", href: "/shop" },
  { label: "Collections", href: "/shop?category=featured" },
  { label: "Attar", href: "/shop?category=ATTAR" },
  { label: "About", href: "/about" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { data: session } = useSession();
  const { getItemCount, openCart } = useCartStore();
  const itemCount = getItemCount();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-parchment/90 backdrop-blur-xl border-b border-tan shadow-card"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span
              data-navbar-logo
              className="font-serif text-2xl tracking-[0.35em] text-cream font-light"
            >
              NORELLE
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative text-sm tracking-widest text-mocha uppercase font-sans hover:text-cream transition-colors duration-300 group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* Right Icons */}
          <div className="flex items-center gap-5">
            {/* User menu */}
            <div className="relative hidden md:block">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-1.5 text-mocha hover:text-cream transition-colors duration-300"
              >
                <User className="w-5 h-5" />
                {session?.user && (
                  <ChevronDown className={`w-3 h-3 transition-transform ${userMenuOpen ? "rotate-180" : ""}`} />
                )}
              </button>
              <AnimatePresence>
                {userMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-3 w-52 bg-white border border-tan rounded-xl shadow-card-hover overflow-hidden"
                  >
                    {session?.user ? (
                      <>
                        <div className="px-4 py-3 border-b border-tan bg-charcoal">
                          <p className="text-xs text-latte font-sans">Signed in as</p>
                          <p className="text-sm text-cream truncate font-sans font-medium">{session.user.email}</p>
                        </div>
                        <Link
                          href="/account"
                          onClick={() => setUserMenuOpen(false)}
                          className="block px-4 py-3 text-sm text-mocha hover:text-cream hover:bg-charcoal transition-colors font-sans"
                        >
                          My Account
                        </Link>
                        <Link
                          href="/account/orders"
                          onClick={() => setUserMenuOpen(false)}
                          className="block px-4 py-3 text-sm text-mocha hover:text-cream hover:bg-charcoal transition-colors font-sans"
                        >
                          Orders
                        </Link>
                        {(session.user as { role?: string }).role === "ADMIN" && (
                          <Link
                            href="/admin"
                            onClick={() => setUserMenuOpen(false)}
                            className="block px-4 py-3 text-sm text-gold hover:bg-charcoal transition-colors font-sans"
                          >
                            Admin Panel
                          </Link>
                        )}
                        {(session.user as { role?: string }).role === "SALESMAN" && (
                          <Link
                            href="/salesman"
                            onClick={() => setUserMenuOpen(false)}
                            className="block px-4 py-3 text-sm text-gold hover:bg-charcoal transition-colors font-sans"
                          >
                            Salesman Panel
                          </Link>
                        )}
                        <button
                          onClick={() => { signOut(); setUserMenuOpen(false); }}
                          className="w-full text-left px-4 py-3 text-sm text-red-500 hover:bg-charcoal transition-colors font-sans border-t border-tan"
                        >
                          Sign Out
                        </button>
                      </>
                    ) : (
                      <>
                        <Link
                          href="/login"
                          onClick={() => setUserMenuOpen(false)}
                          className="block px-4 py-3 text-sm text-mocha hover:text-cream hover:bg-charcoal transition-colors font-sans"
                        >
                          Sign In
                        </Link>
                        <Link
                          href="/register"
                          onClick={() => setUserMenuOpen(false)}
                          className="block px-4 py-3 text-sm text-gold hover:bg-charcoal transition-colors font-sans"
                        >
                          Create Account
                        </Link>
                      </>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Cart button */}
            <button
              onClick={openCart}
              className="relative text-mocha hover:text-cream transition-colors duration-300"
              aria-label="Open cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {itemCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 w-5 h-5 bg-gold text-noir text-[10px] font-bold rounded-full flex items-center justify-center font-sans"
                >
                  {itemCount > 9 ? "9+" : itemCount}
                </motion.span>
              )}
            </button>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden text-mocha hover:text-cream transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="md:hidden overflow-hidden bg-parchment/98 backdrop-blur-xl border-t border-tan"
            >
              <div className="px-6 py-6 flex flex-col gap-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="text-lg font-serif tracking-wider text-mocha hover:text-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="border-t border-tan pt-4 flex flex-col gap-3">
                  {session?.user ? (
                    <>
                      <Link href="/account" onClick={() => setMobileOpen(false)} className="text-sm font-sans text-mocha hover:text-cream transition-colors">My Account</Link>
                      <button onClick={() => signOut()} className="text-left text-sm font-sans text-red-500">Sign Out</button>
                    </>
                  ) : (
                    <>
                      <Link href="/login" onClick={() => setMobileOpen(false)} className="text-sm font-sans text-mocha hover:text-cream transition-colors">Sign In</Link>
                      <Link href="/register" onClick={() => setMobileOpen(false)} className="text-sm font-sans text-gold">Create Account</Link>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Click outside to close user menu */}
      {userMenuOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setUserMenuOpen(false)} />
      )}

      <CartDrawer />
    </>
  );
}
