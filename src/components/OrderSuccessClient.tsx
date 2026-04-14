"use client";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { CheckCircle, Package, ArrowRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function OrderSuccessClient() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-parchment flex items-center justify-center px-4 pt-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(212,175,55,0.06)_0%,_transparent_60%)] pointer-events-none" />
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative bg-white border border-tan rounded-3xl p-12 max-w-lg w-full text-center shadow-card-hover"
        >
          {/* Animated check */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-24 h-24 rounded-full bg-gold/10 border border-gold/25 flex items-center justify-center mx-auto mb-8"
          >
            <CheckCircle className="w-12 h-12 text-gold" />
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <h1 className="font-serif text-4xl text-cream mb-3">Order Confirmed</h1>
            <p className="text-mocha font-sans text-base mb-8">
              Thank you for your purchase. Your fragrance is being prepared with care.
            </p>

            {orderId && (
              <div className="bg-charcoal border border-tan rounded-xl px-4 py-3 mb-8">
                <p className="text-xs text-latte font-sans">Order ID</p>
                <p className="text-gold font-sans text-sm font-medium mt-0.5 break-all">{orderId}</p>
              </div>
            )}

            <div className="flex flex-col gap-3">
              <Link
                href="/account/orders"
                className="flex items-center justify-center gap-2 py-4 bg-gold hover:bg-gold-light text-noir font-sans text-sm tracking-widest uppercase font-medium rounded-xl transition-all hover:shadow-gold-glow"
              >
                <Package className="w-4 h-4" />
                Track My Order
              </Link>
              <Link
                href="/shop"
                className="flex items-center justify-center gap-2 py-4 border border-tan text-mocha hover:text-cream hover:border-brown/40 hover:bg-charcoal font-sans text-sm rounded-xl transition-all"
              >
                Continue Shopping
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </main>
      <Footer />
    </>
  );
}
