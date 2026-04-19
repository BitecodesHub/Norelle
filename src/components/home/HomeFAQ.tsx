"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FAQ {
  question: string;
  answer: string;
}

export default function HomeFAQ({ faqs }: { faqs: FAQ[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="py-28 bg-white" id="faq" aria-labelledby="faq-heading">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-14">
          <p className="text-[10px] tracking-[0.65em] text-[#c9a34e] uppercase mb-5">
            Everything You Need to Know
          </p>
          <h2
            id="faq-heading"
            className="text-4xl md:text-5xl text-[#1C1008] font-light tracking-tight leading-[1.05]"
          >
            Frequently Asked <em className="not-italic text-[#c9a34e]">Questions</em>
          </h2>
        </div>

        <div className="divide-y divide-[#1C1008]/10 border-t border-b border-[#1C1008]/10">
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            return (
              <article key={faq.question} itemScope itemType="https://schema.org/Question">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${i}`}
                  className="w-full flex items-center justify-between gap-6 text-left py-6 group"
                  onClick={() => setOpen(isOpen ? null : i)}
                >
                  <h3
                    itemProp="name"
                    className="text-lg md:text-xl font-light text-[#1C1008] group-hover:text-[#c9a34e] transition-colors"
                  >
                    {faq.question}
                  </h3>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="text-[#c9a34e] text-2xl leading-none shrink-0 font-light"
                    aria-hidden="true"
                  >
                    +
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-answer-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                      itemScope
                      itemProp="acceptedAnswer"
                      itemType="https://schema.org/Answer"
                    >
                      <p
                        itemProp="text"
                        className="pb-6 text-[#7A5E47] text-base leading-[1.95] max-w-3xl"
                      >
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
