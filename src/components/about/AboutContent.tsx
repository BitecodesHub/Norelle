"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] as [number, number, number, number], delay },
});

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.9, delay },
});

export default function AboutContent() {
  return (
    <div className="bg-parchment">

      {/* ── 1. PAGE HERO ── */}
      <section className="relative min-h-[55vh] flex items-end overflow-hidden bg-hero-gradient">
        {/* Ambient glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-2/3 h-full bg-[radial-gradient(ellipse_at_80%_30%,rgba(212,175,55,0.09)_0%,transparent_65%)]" />
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-parchment to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pb-16 pt-40 w-full">
          <motion.p
            {...fadeUp(0)}
            className="text-[10px] tracking-[0.55em] text-gold uppercase font-sans mb-5"
          >
            Norelle · Est. Ahmedabad
          </motion.p>
          <motion.h1
            {...fadeUp(0.1)}
            className="font-serif font-light text-cream leading-[1.0]"
            style={{ fontSize: "clamp(3.2rem, 7vw, 6rem)" }}
          >
            Crafted with
            <br />
            <span className="italic text-gold">Soul &amp; Silence</span>
          </motion.h1>
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
            className="h-px w-28 bg-gradient-to-r from-gold via-gold/60 to-transparent origin-left mt-8"
          />
        </div>
      </section>

      {/* ── 2. FOUNDING STORY ── */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-24 grid md:grid-cols-2 gap-16 items-center">
        {/* Text */}
        <div>
          <motion.p {...fadeUp(0)} className="text-[10px] tracking-[0.45em] text-gold uppercase font-sans mb-5">
            Our Beginning
          </motion.p>
          <motion.h2 {...fadeUp(0.1)} className="font-serif text-4xl md:text-5xl text-cream font-light leading-tight mb-6">
            Born from the<br />
            <span className="italic text-mocha">Lanes of Ahmedabad</span>
          </motion.h2>
          <motion.div {...fadeUp(0.15)} className="w-10 h-px bg-gold mb-8" />
          <motion.p {...fadeUp(0.2)} className="text-mocha font-sans text-base leading-8 mb-5">
            Norelle was founded with one conviction: that fragrance is not merely a scent — it is
            an invisible signature, a memory pressed onto skin. Growing up in the bustling old city
            of Ahmedabad, our founder was captivated by the attars drifting from bazaar shops,
            the rose-water sprinkled at doorways, the incense threading through ancient havelis.
          </motion.p>
          <motion.p {...fadeUp(0.25)} className="text-latte font-sans text-base leading-8">
            That childhood wonder grew into a decade of study — in Kannauj&apos;s distilleries,
            Grasse&apos;s fields, and the oud forests of Assam. Norelle was born to bring that
            mastery home, to Ahmedabad, and to the world.
          </motion.p>
        </div>

        {/* Image */}
        <motion.div {...fadeIn(0.2)} className="relative h-[480px] rounded-2xl overflow-hidden shadow-card-hover">
          <Image
            src="/images/Norelle Handblended Perfumes.jpg"
            alt="Norelle handblended perfumes, Ahmedabad"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-noir/30 via-transparent to-transparent" />
          {/* Caption tag */}
          <div className="absolute bottom-5 left-5 bg-parchment/90 backdrop-blur-sm px-4 py-2 rounded-lg border border-tan">
            <p className="text-[10px] tracking-widest uppercase font-sans text-mocha">Ahmedabad · Est. 2016</p>
          </div>
        </motion.div>
      </section>

      {/* ── 3. FOUNDER ── */}
      <section className="max-w-5xl mx-auto px-6 md:px-12 py-24">
        <motion.div {...fadeUp(0)} className="text-center mb-14">
          <p className="text-[10px] tracking-[0.45em] text-gold uppercase font-sans mb-4">The Person Behind It</p>
          <h2 className="font-serif text-4xl text-cream font-light">Meet the Founder</h2>
          <div className="mt-4 mx-auto w-16 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              name: "Ismail Mansuri",
              role: "Co-Founder",
              bio: "Ismail grew up in Ahmedabad's old city, drawn from childhood to the attars that perfumed its narrow streets. His passion for fragrance and deep-rooted connection to the city's trading heritage became the foundation of Norelle.",
              quote: "Fragrance is the most honest thing a person can wear.",
            },
            {
              name: "Amaan Shaikh",
              role: "Co-Founder",
              bio: "Amaan brings a meticulous eye for craft and quality to every bottle Norelle produces. His belief that luxury and transparency can coexist drives the brand's commitment to natural, fully-disclosed ingredients.",
              quote: "We make what we'd be proud to wear ourselves.",
            },
          ].map((founder, i) => (
            <motion.div
              key={founder.name}
              {...fadeUp(i * 0.1)}
              className="bg-white border border-tan rounded-2xl shadow-card p-8 md:p-10 flex flex-col justify-between"
            >
              <div>
                <div className="w-14 h-14 rounded-full bg-[#f5efe6] border border-tan flex items-center justify-center mb-6">
                  <span className="text-xl font-light text-[#c9a34e]">{founder.name[0]}</span>
                </div>
                <h3 className="font-serif text-2xl text-cream mb-1">{founder.name}</h3>
                <p className="text-xs tracking-widest uppercase text-gold font-sans mb-5">{founder.role}</p>
                <p className="text-mocha font-sans text-sm leading-8 mb-6">{founder.bio}</p>
              </div>
              <p className="text-latte font-sans text-sm leading-7 italic border-l-2 border-gold/40 pl-4">
                &ldquo;{founder.quote}&rdquo;
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── 7. CTA ── */}
      <section className="bg-parchment py-20">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-gold/30 to-transparent mb-0" />
        <motion.div
          {...fadeUp(0)}
          className="max-w-2xl mx-auto px-6 text-center pt-20"
        >
          <p className="text-[10px] tracking-[0.45em] text-gold uppercase font-sans mb-5">Ready to Begin?</p>
          <h2 className="font-serif text-4xl md:text-5xl text-cream font-light mb-6">
            Find Your<br />
            <span className="italic text-gold">Signature Scent</span>
          </h2>
          <p className="text-mocha font-sans text-base leading-8 mb-10 max-w-md mx-auto">
            Explore our collection of attars, Eau de Parfums, and Eau de Toilettes — each one a
            story waiting to become yours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/shop"
              className="group relative inline-flex items-center justify-center gap-2 px-9 py-4 bg-gold text-noir font-sans text-xs tracking-[0.3em] uppercase font-semibold rounded-xl overflow-hidden transition-all duration-300 hover:bg-gold-light hover:shadow-gold-glow"
            >
              <span className="relative z-10">Shop Now</span>
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-9 py-4 border border-tan text-mocha font-sans text-xs tracking-[0.3em] uppercase font-medium rounded-xl hover:border-gold/50 hover:text-gold hover:bg-sand/40 transition-all duration-300"
            >
              Get in Touch
            </Link>
          </div>
        </motion.div>
      </section>

    </div>
  );
}
