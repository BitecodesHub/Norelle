"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    // For now, just show success. Can be wired to an API later.
    setSubmitted(true);
  }

  return (
    <section className="py-24 bg-charcoal/50">
      <div className="max-w-xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs tracking-[0.4em] text-gold uppercase font-sans mb-3">Stay Connected</p>
          <h2 className="font-serif text-3xl md:text-4xl text-cream font-light mb-4">
            Be the First to Know
          </h2>
          <p className="text-cream/45 font-sans text-sm leading-relaxed mb-8">
            New arrivals, exclusive offers, and fragrance stories — delivered to your inbox.
          </p>

          {submitted ? (
            <motion.p
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-gold font-sans text-sm"
            >
              Thank you! We&apos;ll keep you updated.
            </motion.p>
          ) : (
            <form onSubmit={handleSubmit} className="flex gap-3 max-w-md mx-auto">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="flex-1 px-5 py-3.5 rounded-xl bg-white/80 border border-tan/40 text-cream font-sans text-sm placeholder:text-latte focus:outline-none focus:border-gold/60 focus:ring-1 focus:ring-gold/30 transition-all"
              />
              <button
                type="submit"
                className="px-6 py-3.5 bg-gold hover:bg-gold-light text-noir font-sans text-sm tracking-wider uppercase font-medium rounded-xl transition-all hover:shadow-gold-glow shrink-0"
              >
                Subscribe
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
