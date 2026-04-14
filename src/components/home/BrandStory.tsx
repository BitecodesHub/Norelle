"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function BrandStory() {
  return (
    <section className="relative overflow-hidden py-28 bg-charcoal">
      {/* Top warm gold line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-gold/40 to-transparent mb-0" />

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        {/* Left — Text */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          <p className="text-xs tracking-[0.4em] text-gold uppercase font-sans mb-6">Our Heritage</p>
          <h2 className="font-serif text-4xl md:text-5xl text-cream font-light leading-tight mb-6">
            A Scent<br />
            <span className="italic text-mocha">Beyond Words</span>
          </h2>
          <div className="w-12 h-px bg-gold mb-8" />
          <p className="text-mocha font-sans text-base leading-8 mb-6">
            Born in the heart of Ahmedabad, Norelle is more than a perfume house — it is a
            philosophy. We believe fragrance is the most intimate expression of identity,
            invisible yet unforgettable.
          </p>
          <p className="text-latte font-sans text-base leading-8 mb-10">
            Each bottle holds a story — of rare ingredients sourced from the world&apos;s finest
            regions, of master perfumers who spend lifetimes in pursuit of olfactory perfection.
          </p>
          <Link
            href="/about"
            className="inline-flex items-center gap-3 text-sm tracking-widest uppercase font-sans text-gold hover:text-gold-dark transition-colors group"
          >
            Discover Our Story
            <span className="w-8 h-px bg-gold group-hover:w-14 transition-all duration-300" />
          </Link>
        </motion.div>

        {/* Right — decorative elements */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="relative h-[480px] flex items-center justify-center"
        >
          {/* Outer ring */}
          <div className="absolute w-72 h-72 rounded-full border border-gold/15 animate-spin-slow" />
          {/* Inner ring */}
          <div className="absolute w-52 h-52 rounded-full border border-gold/25" />
          {/* Center orb */}
          <div className="absolute w-32 h-32 rounded-full bg-gradient-to-br from-gold/15 to-transparent blur-2xl" />

          {/* Stats grid */}
          <div className="relative grid grid-cols-2 gap-6 z-10">
            {[
              { value: "50+", label: "Unique Fragrances" },
              { value: "10K+", label: "Happy Clients" },
              { value: "8", label: "Years of Craft" },
              { value: "100%", label: "Natural Ingredients" },
            ].map((stat) => (
              <div key={stat.label} className="glass-card rounded-2xl p-6 text-center min-w-[120px]">
                <p className="font-serif text-3xl text-gold font-light">{stat.value}</p>
                <p className="text-xs text-mocha font-sans mt-2 tracking-wide">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
