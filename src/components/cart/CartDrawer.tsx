"use client";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, Plus, Minus, Trash2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useCartStore } from "@/store/cartStore";

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, getSubTotal, getDiscount, getTotal, coupon } = useCartStore();

  const formatPrice = (p: number) => `₹${p.toLocaleString("en-IN")}`;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-noir/25 backdrop-blur-sm z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full max-w-sm bg-white border-l border-tan z-50 flex flex-col shadow-card-hover"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-tan bg-charcoal">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-5 h-5 text-gold" />
                <h2 className="font-serif text-lg tracking-wider text-cream">Your Cart</h2>
                {items.length > 0 && (
                  <span className="text-xs bg-gold text-noir font-bold rounded-full px-2 py-0.5 font-sans">
                    {items.length}
                  </span>
                )}
              </div>
              <button onClick={closeCart} className="text-latte hover:text-cream transition-colors p-1 rounded-lg hover:bg-charcoal-light">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center gap-4">
                  <ShoppingBag className="w-16 h-16 text-tan" />
                  <p className="font-serif text-xl text-latte">Your cart is empty</p>
                  <p className="text-sm text-latte font-sans">Add fragrances to begin</p>
                  <Link
                    href="/shop"
                    onClick={closeCart}
                    className="mt-4 px-6 py-3 bg-gold text-noir text-sm font-medium rounded-lg hover:bg-gold-light transition-colors font-sans"
                  >
                    Explore Shop
                  </Link>
                </div>
              ) : (
                <AnimatePresence mode="popLayout">
                  {items.map((item) => (
                    <motion.div
                      key={item.size ? `${item.id}__${item.size}` : item.id}
                      layout
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="flex gap-4 bg-charcoal rounded-xl p-3 border border-tan"
                    >
                      <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-charcoal-light flex-shrink-0">
                        {item.image ? (
                          <Image src={item.image} alt={item.title} fill className="object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <ShoppingBag className="w-6 h-6 text-latte" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-serif text-sm text-cream truncate">{item.title}</h3>
                        {item.size && (
                          <span className="inline-block text-[10px] font-sans text-mocha bg-charcoal border border-tan rounded-md px-2 py-0.5 mt-1">
                            {item.size}
                          </span>
                        )}
                        <p className="text-gold text-sm font-sans mt-1">{formatPrice(item.price)}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() => updateQuantity(item.size ? `${item.id}__${item.size}` : item.id, item.quantity - 1)}
                            className="w-6 h-6 rounded-full bg-tan/60 hover:bg-tan transition-colors flex items-center justify-center"
                          >
                            <Minus className="w-3 h-3 text-cream" />
                          </button>
                          <span className="text-sm text-cream font-sans w-4 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.size ? `${item.id}__${item.size}` : item.id, item.quantity + 1)}
                            className="w-6 h-6 rounded-full bg-tan/60 hover:bg-tan transition-colors flex items-center justify-center"
                          >
                            <Plus className="w-3 h-3 text-cream" />
                          </button>
                        </div>
                      </div>
                      <button
                        onClick={() => removeItem(item.size ? `${item.id}__${item.size}` : item.id)}
                        className="text-latte hover:text-red-500 transition-colors self-start p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>

            {/* Summary & CTA */}
            {items.length > 0 && (
              <div className="border-t border-tan px-6 py-5 space-y-3 bg-white">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm font-sans text-mocha">
                    <span>Subtotal</span><span>{formatPrice(getSubTotal())}</span>
                  </div>
                  {coupon && getDiscount() > 0 && (
                    <div className="flex justify-between text-sm font-sans text-green-600">
                      <span>Discount ({coupon.code})</span>
                      <span>— {formatPrice(getDiscount())}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-serif text-lg text-cream pt-1 border-t border-tan">
                    <span>Total</span><span className="text-gold">{formatPrice(getTotal())}</span>
                  </div>
                </div>
                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="w-full py-4 bg-gold hover:bg-gold-light text-noir text-center text-sm font-medium rounded-xl transition-all duration-300 font-sans block hover:shadow-gold-glow"
                >
                  Proceed to Checkout
                </Link>
                <button
                  onClick={closeCart}
                  className="w-full py-3 text-mocha hover:text-cream text-sm font-sans transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
