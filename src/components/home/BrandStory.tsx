"use client";
import { motion } from "framer-motion";
import Link from "next/link";

const stats = [
  { value: "100%", label: "Natural" },
  { value: "10K+", label: "Clients" },
  { value: "8+", label: "Years" },
  { value: "50+", label: "Scents" },
];

export default function BrandStory() {
  return (
    <section className="relative overflow-hidden bg-noir">
      {/* Top accent */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-gold/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 py-28 md:py-36">
        <div className="grid md:grid-cols-12 gap-12 md:gap-20 items-center">

          {/* Left — stats column (hidden on mobile, shown on desktop) */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="hidden md:flex md:col-span-4 flex-col gap-px"
          >
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.7 }}
                className="border border-gold/10 p-8 hover:border-gold/30 transition-colors duration-500 group"
              >
                <p className="font-serif text-5xl text-white font-light leading-none group-hover:text-gold transition-colors duration-500">{s.value}</p>
                <p className="text-xs text-white/30 font-sans tracking-[0.3em] uppercase mt-3">{s.label}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Right — editorial text */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            className="md:col-span-8"
          >
            <p className="text-[10px] tracking-[0.6em] text-gold uppercase font-sans mb-8">
              Our Heritage
            </p>

            <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl text-white font-light leading-[1.05] mb-8">
              A scent<br />
              <span className="italic text-gold">beyond words</span>
            </h2>

            <div className="w-16 h-px bg-gold/60 mb-10" />

            <p className="text-white/60 font-sans text-base leading-[1.9] mb-6 max-w-lg">
              Born in the heart of Ahmedabad, Norelle is more than a perfume house — it is a
              philosophy. We believe fragrance is the most intimate expression of identity:
              invisible, yet completely unforgettable.
            </p>
            <p className="text-white/40 font-sans text-base leading-[1.9] mb-12 max-w-lg">
              Each bottle holds a story of rare ingredients sourced from the world&apos;s finest
              regions, of craft passed down through generations, of a single obsession:
              the perfect scent.
            </p>

            {/* Mobile stats — 4 across */}
            <div className="flex md:hidden gap-6 mb-12">
              {stats.map((s) => (
                <div key={s.label} className="text-center flex-1">
                  <p className="font-serif text-2xl text-gold font-light">{s.value}</p>
                  <p className="text-[9px] text-white/30 font-sans tracking-widest uppercase mt-1">{s.label}</p>
                </div>
              ))}
            </div>

            <Link
              href="/about"
              className="inline-flex items-center gap-4 text-xs tracking-[0.25em] uppercase font-sans text-white/70 hover:text-gold transition-colors duration-300 group"
            >
              Discover Our Story
              <span className="h-px w-10 bg-white/30 group-hover:w-16 group-hover:bg-gold transition-all duration-400" />
            </Link>
          </motion.div>

        </div>
      </div>

      {/* Bottom accent */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
    </section>
  );
}
