"use client";

import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Priya M.",
    location: "Satellite, Ahmedabad",
    text: "The Rose Taifi attar is absolutely divine. I've been searching for a genuine, natural attar in Ahmedabad for years and Norelle is the real deal. The longevity is incredible.",
    rating: 5,
  },
  {
    name: "Arjun S.",
    location: "SG Highway",
    text: "Bought a perfume as a gift for my wife. The packaging was beautiful and the fragrance is so unique — nothing like what you find in malls. Will definitely order again.",
    rating: 5,
  },
  {
    name: "Fatima K.",
    location: "Maninagar, Ahmedabad",
    text: "Finally, alcohol-free attars that actually last! The Oud Hindi is my daily go-to now. Fast delivery and the WhatsApp support was very helpful in choosing the right scent.",
    rating: 5,
  },
];

function StarIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" className={className} fill="currentColor">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

export default function Testimonials() {
  return (
    <section className="py-24 bg-charcoal/50">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-xs tracking-[0.4em] text-gold uppercase font-sans mb-3">Testimonials</p>
          <h2 className="font-serif text-4xl md:text-5xl text-cream font-light">What Our Customers Say</h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="glass-card rounded-2xl p-8"
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <StarIcon key={j} className="w-4 h-4 text-gold" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-cream/60 font-sans text-sm leading-relaxed mb-6">
                &ldquo;{t.text}&rdquo;
              </p>

              {/* Author */}
              <div>
                <p className="font-serif text-cream text-base">{t.name}</p>
                <p className="text-cream/30 font-sans text-xs mt-0.5">{t.location}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
