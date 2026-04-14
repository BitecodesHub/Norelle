"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1], delay },
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
            src="https://images.unsplash.com/photo-1590736704728-f4730bb30770?w=900&q=85"
            alt="Luxury perfume atelier"
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

      {/* ── 3. PHILOSOPHY ── */}
      <section className="bg-charcoal py-24">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-gold/30 to-transparent mb-0" />
        <div className="max-w-7xl mx-auto px-6 md:px-12 pt-24">
          <motion.div {...fadeUp(0)} className="text-center mb-16">
            <p className="text-[10px] tracking-[0.45em] text-gold uppercase font-sans mb-4">What We Believe</p>
            <h2 className="font-serif text-4xl md:text-5xl text-cream font-light">Our Philosophy</h2>
            <div className="mt-4 mx-auto w-16 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                number: "01",
                title: "Purity First",
                body: "Every ingredient is sourced at origin — Taif rose from Saudi Arabia, Hindi oud from Assam, Bulgarian rose absolute. No shortcuts, no synthetics where nature does it better.",
              },
              {
                number: "02",
                title: "Slow Craft",
                body: "Our attars are slow-distilled in copper degs over sandalwood fire, a tradition unchanged for four centuries. Patience is the rarest ingredient in modern perfumery.",
              },
              {
                number: "03",
                title: "Invisible Identity",
                body: "We don't make fragrances that announce themselves. We make ones that leave a trace — the memory of a person in a room long after they have gone.",
              },
              {
                number: "04",
                title: "Local Heritage",
                body: "Ahmedabad has been a centre of trade and craft for over 600 years. Norelle is a love letter to that legacy — modern luxury rooted in ancient soil.",
              },
              {
                number: "05",
                title: "Transparent Making",
                body: "We list every ingredient on every bottle. You deserve to know what touches your skin. Luxury and honesty are not mutually exclusive.",
              },
              {
                number: "06",
                title: "Lasting Impression",
                body: "We formulate for longevity — not to overwhelm, but to endure. A Norelle fragrance wears with you through morning meetings and midnight conversations alike.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.number}
                {...fadeUp(i * 0.07)}
                className="bg-white rounded-2xl p-8 border border-tan hover:border-gold/30 hover:shadow-card-hover shadow-card transition-all duration-400 group"
              >
                <p className="font-serif text-4xl text-gold/30 font-light mb-4 group-hover:text-gold/50 transition-colors duration-300">
                  {item.number}
                </p>
                <h3 className="font-serif text-xl text-cream mb-3">{item.title}</h3>
                <p className="text-mocha font-sans text-sm leading-7">{item.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. CRAFTSMANSHIP PROCESS ── */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-24">
        <motion.div {...fadeUp(0)} className="text-center mb-16">
          <p className="text-[10px] tracking-[0.45em] text-gold uppercase font-sans mb-4">How It&apos;s Made</p>
          <h2 className="font-serif text-4xl md:text-5xl text-cream font-light">The Art of Creation</h2>
          <div className="mt-4 mx-auto w-16 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Steps */}
          <div className="space-y-10">
            {[
              {
                step: "01",
                title: "Ingredient Sourcing",
                desc: "We travel to origin — Kannauj, Grasse, Assam, Taif — selecting raw materials at their peak. Only the finest makes the cut.",
              },
              {
                step: "02",
                title: "Master Blending",
                desc: "Our master perfumer works in small batches, layering notes across weeks until each accord is perfectly balanced.",
              },
              {
                step: "03",
                title: "Maturation",
                desc: "Every blend rests in glass for a minimum of 60 days. Time mellows the edges and deepens the character.",
              },
              {
                step: "04",
                title: "Bottling by Hand",
                desc: "Each bottle is filled, sealed, and inspected by hand. No automation touches the final product.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                {...fadeUp(i * 0.1)}
                className="flex gap-6 group"
              >
                <div className="shrink-0 w-12 h-12 rounded-full border border-gold/30 flex items-center justify-center group-hover:border-gold group-hover:bg-gold/5 transition-all duration-300">
                  <span className="font-serif text-sm text-gold">{item.step}</span>
                </div>
                <div>
                  <h3 className="font-serif text-lg text-cream mb-2">{item.title}</h3>
                  <p className="text-mocha font-sans text-sm leading-7">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Image */}
          <motion.div {...fadeIn(0.2)} className="relative h-[500px] rounded-2xl overflow-hidden shadow-card-hover">
            <Image
              src="https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=900&q=85"
              alt="Perfume craftsmanship"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-tl from-noir/25 via-transparent to-transparent" />
          </motion.div>
        </div>
      </section>

      {/* ── 5. STATS BAND ── */}
      <section className="bg-charcoal border-y border-tan py-16">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "50+", label: "Unique Fragrances" },
              { value: "10K+", label: "Happy Clients" },
              { value: "8", label: "Years of Craft" },
              { value: "100%", label: "Natural Ingredients" },
            ].map((stat, i) => (
              <motion.div key={stat.label} {...fadeUp(i * 0.08)}>
                <p className="font-serif text-4xl md:text-5xl text-gold font-light">{stat.value}</p>
                <p className="text-xs text-mocha uppercase tracking-widest font-sans mt-3">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. FOUNDER ── */}
      <section className="max-w-5xl mx-auto px-6 md:px-12 py-24">
        <motion.div {...fadeUp(0)} className="text-center mb-14">
          <p className="text-[10px] tracking-[0.45em] text-gold uppercase font-sans mb-4">The Person Behind It</p>
          <h2 className="font-serif text-4xl text-cream font-light">Meet the Founder</h2>
          <div className="mt-4 mx-auto w-16 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
        </motion.div>

        <motion.div
          {...fadeUp(0.1)}
          className="bg-white border border-tan rounded-2xl shadow-card overflow-hidden grid md:grid-cols-[280px_1fr]"
        >
          {/* Founder image placeholder */}
          <div className="relative h-64 md:h-auto bg-charcoal">
            <Image
              src="https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=600&q=85"
              alt="Norelle founder"
              fill
              className="object-cover"
              sizes="280px"
            />
          </div>

          {/* Bio */}
          <div className="p-8 md:p-12 flex flex-col justify-center">
            <h3 className="font-serif text-2xl text-cream mb-1">Aryan Shah</h3>
            <p className="text-xs tracking-widest uppercase text-gold font-sans mb-6">Founder &amp; Master Perfumer</p>
            <p className="text-mocha font-sans text-sm leading-8 mb-4">
              Aryan grew up in Ahmedabad&apos;s old city, drawn from childhood to the attars that
              perfumed its narrow streets. After studying perfumery in Kannauj and Grasse, he
              returned home with one purpose — to create fragrances that honour both his heritage
              and the modern world.
            </p>
            <p className="text-latte font-sans text-sm leading-8">
              &ldquo;I want Norelle to smell like memory itself — warm, familiar, and impossible to forget.&rdquo;
            </p>
          </div>
        </motion.div>
      </section>

      {/* ── 7. CTA ── */}
      <section className="bg-charcoal py-20">
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
