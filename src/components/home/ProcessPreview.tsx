"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const steps = [
  {
    number: "01",
    title: "Source",
    desc: "We source the finest raw materials — Damask roses from Taif, agarwood from Assam, sandalwood from Mysore, and rare botanicals from around the world.",
  },
  {
    number: "02",
    title: "Blend",
    desc: "Our master perfumers blend each fragrance by hand using traditional distillation methods, creating complex, layered scent profiles that evolve throughout the day.",
  },
  {
    number: "03",
    title: "Bottle",
    desc: "Every bottle is filled, sealed, and inspected with care. From our workshop in Ahmedabad to your doorstep — crafted with love, delivered with pride.",
  },
];

export default function ProcessPreview() {
  return (
    <section className="py-16 bg-parchment">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-xs tracking-[0.5em] text-gold uppercase font-sans mb-5">Our Craft</p>
          <h2 className="font-serif font-light leading-tight">
            <span className="block text-5xl md:text-6xl lg:text-7xl text-cream">Blended by hand.</span>
            <span className="block text-4xl md:text-5xl lg:text-6xl bg-gradient-to-r from-gold via-gold/80 to-gold/50 bg-clip-text text-transparent italic mt-1">
              Every single time.
            </span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="relative bg-charcoal/40 border border-tan/30 rounded-2xl p-6 text-center hover:border-gold/30 transition-colors duration-300"
            >
              <span className="text-gold/30 font-serif text-5xl font-light block mb-3 leading-none">{step.number}</span>
              <h3 className="font-serif text-xl text-cream mb-3">{step.title}</h3>
              <p className="text-cream/65 font-sans text-sm leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center"
        >
          <Link
            href="/shop"
            className="inline-block px-10 py-3.5 bg-gold text-charcoal hover:bg-gold/90 font-sans text-sm tracking-widest uppercase font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-gold/20"
          >
            Shop the Collection
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
