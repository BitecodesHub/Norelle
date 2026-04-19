"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function CategoryShowcase() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* ── Left: story ── */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <p className="font-sans text-xs tracking-[0.4em] text-gold uppercase mb-6">
              Our Craft
            </p>

            <h2 className="font-serif text-4xl md:text-5xl text-cream font-light leading-[1.1] mb-6">
              Blended by hand.<br />
              <span className="italic text-gold">Every single time.</span>
            </h2>

            <div className="h-px w-12 bg-gold mb-8" />

            <p className="font-sans text-sm text-mocha leading-[1.9] mb-5 max-w-md">
              No machines. No automated lines. Every Norelle fragrance is blended
              by hand in small batches — measured, mixed, and checked by the same
              person who will put their name on it.
            </p>
            <p className="font-sans text-sm text-mocha leading-[1.9] mb-10 max-w-md">
              It takes longer. That's the point. You can tell the difference
              when you wear it.
            </p>

            <Link
              href="/shop"
              className="inline-flex items-center gap-3 group"
            >
              <span className="font-sans text-xs tracking-[0.35em] uppercase text-cream group-hover:text-gold transition-colors duration-300">
                Shop the collection
              </span>
              <span className="h-px w-8 bg-gold group-hover:w-12 transition-all duration-300" />
            </Link>
          </motion.div>

          {/* ── Right: image ── */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative rounded-2xl overflow-hidden"
            style={{ minHeight: "clamp(400px, 60vh, 640px)" }}
          >
            <Image
              src="/images/Norelle Handblended Perfumes.jpg"
              alt="Hand-blending fragrances at Norelle, Ahmedabad"
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
