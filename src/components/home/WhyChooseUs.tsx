"use client";

import { motion } from "framer-motion";

const features = [
  {
    icon: (
      <svg viewBox="0 0 40 40" className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M20 6 C16 10, 8 18, 8 26 C8 32, 13.4 38, 20 38 C26.6 38, 32 32, 32 26 C32 18, 24 10, 20 6Z" className="stroke-gold" />
        <path d="M16 26 C16 24, 24 24, 24 26" className="stroke-gold/50" />
      </svg>
    ),
    title: "100% Natural",
    desc: "No synthetic chemicals. Every fragrance is crafted from pure botanical ingredients.",
  },
  {
    icon: (
      <svg viewBox="0 0 40 40" className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="1.2">
        <rect x="6" y="16" width="28" height="18" rx="3" className="stroke-gold" />
        <path d="M14 16 V12 C14 8.7 16.7 6 20 6 C23.3 6 26 8.7 26 12 V16" className="stroke-gold/60" />
        <circle cx="20" cy="26" r="2" className="stroke-gold/50" />
      </svg>
    ),
    title: "Free Delivery",
    desc: "Free home delivery across all of Ahmedabad. Order online, delivered to your door.",
  },
  {
    icon: (
      <svg viewBox="0 0 40 40" className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="1.2">
        <circle cx="20" cy="20" r="14" className="stroke-gold" />
        <path d="M20 10 V20 L27 27" className="stroke-gold/60" strokeLinecap="round" />
      </svg>
    ),
    title: "Long Lasting",
    desc: "12–24+ hours of beautiful fragrance. Premium concentration for lasting presence.",
  },
  {
    icon: (
      <svg viewBox="0 0 40 40" className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M20 6 L6 14 V26 L20 34 L34 26 V14 Z" className="stroke-gold" />
        <path d="M20 6 V20 L6 14" className="stroke-gold/40" />
        <path d="M20 20 L34 14" className="stroke-gold/40" />
        <path d="M20 20 V34" className="stroke-gold/30" />
      </svg>
    ),
    title: "Handcrafted",
    desc: "Every bottle is crafted with care by master perfumers using traditional methods.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-16 bg-parchment">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-xs tracking-[0.5em] text-gold uppercase font-sans mb-4">The Norelle Promise</p>
          <h2 className="font-serif font-light leading-tight">
            <span className="block text-4xl md:text-5xl text-cream">Why Choose</span>
            <span className="block text-4xl md:text-5xl bg-gradient-to-r from-gold via-gold/80 to-gold/50 bg-clip-text text-transparent italic">
              Norelle
            </span>
          </h2>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative bg-charcoal/40 rounded-2xl p-5 text-center overflow-hidden border border-tan/10 hover:border-gold/30 transition-all duration-300"
            >
              {/* Top accent line */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-[2px] bg-gradient-to-r from-transparent via-gold/60 to-transparent rounded-full" />

              <div className="flex justify-center mb-4 mt-2">{f.icon}</div>
              <h3 className="font-serif text-base md:text-lg text-cream mb-2 font-light">{f.title}</h3>
              <p className="text-cream/60 font-sans text-xs leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
