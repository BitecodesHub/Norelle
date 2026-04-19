"use client";
import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

const features = [
  {
    num: "01",
    title: "100% Natural",
    tag: "Purity",
    desc: "No synthetics. No shortcuts. Every fragrance is composed from pure botanical essences sourced from nature's finest regions.",
  },
  {
    num: "02",
    title: "Free Delivery",
    tag: "Service",
    desc: "Free home delivery across all of Ahmedabad. Order before noon, receive by evening.",
  },
  {
    num: "03",
    title: "12–24h Lasting",
    tag: "Longevity",
    desc: "Concentrated attar oils formulated for exceptional longevity. One application, an entire day of presence.",
  },
  {
    num: "04",
    title: "Handblended",
    tag: "Craft",
    desc: "Each bottle individually blended by hand in our Ahmedabad studio. Never mass-produced, always personal.",
  },
];

const GRAIN =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E";

export default function WhyChooseUs() {
  const [active, setActive] = useState(0);
  const [expanded, setExpanded] = useState<number | null>(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-28"
      style={{ background: "#ffffff" }}
    >
      {/* Grain texture */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: `url("${GRAIN}")`,
          backgroundRepeat: "repeat",
          backgroundSize: "200px 200px",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-6 md:px-12">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-20 text-center"
        >
          <p className="text-[10px] tracking-[0.65em] text-[#c9a34e] uppercase mb-5">
            The Norelle Promise
          </p>
          <h2 className="text-4xl md:text-5xl text-[#1C1008] font-light tracking-tight leading-[1.05]">
            Why{" "}
            <em className="not-italic text-[#c9a34e]">Norelle</em>
          </h2>
        </motion.div>

        {/* ── Desktop: 2-column split ── */}
        <div className="hidden md:flex gap-0 min-h-[420px]">

          {/* Left — feature list */}
          <div className="w-[42%] pr-16 flex flex-col justify-center gap-1">
            {features.map((f, i) => (
              <motion.div
                key={f.num}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.15 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="relative cursor-pointer select-none group py-5"
                onMouseEnter={() => setActive(i)}
              >
                {/* Left active bar */}
                <motion.span
                  className="absolute left-0 top-0 bottom-0 w-[2px] rounded-full bg-[#c9a34e]"
                  initial={false}
                  animate={{ scaleY: active === i ? 1 : 0, opacity: active === i ? 1 : 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  style={{ originY: 0.5 }}
                />

                <div className="pl-6">
                  <span
                    className="block text-[10px] tracking-[0.45em] tabular-nums mb-1.5 transition-colors duration-300"
                    style={{ color: active === i ? "#c9a34e" : "rgba(28,16,8,0.25)" }}
                  >
                    {f.num}
                  </span>
                  <motion.h3
                    className="text-2xl font-light leading-tight transition-colors duration-300"
                    animate={{
                      color: active === i ? "#1C1008" : "rgba(28,16,8,0.38)",
                      x: active === i ? 4 : 0,
                    }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  >
                    {f.title}
                  </motion.h3>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Centre divider */}
          <div className="w-px bg-[#c9a34e]/20 self-stretch mx-0" />

          {/* Right — description panel */}
          <div className="flex-1 pl-16 flex items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -12, filter: "blur(4px)" }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="w-full"
              >
                {/* Tag */}
                <span className="inline-block text-[9px] tracking-[0.5em] text-[#c9a34e]/70 uppercase mb-4">
                  {features[active].tag}
                </span>

                {/* Title */}
                <h4 className="text-4xl md:text-5xl text-[#1C1008] font-light tracking-tight mb-6 leading-[1.05]">
                  {features[active].title}
                </h4>

                {/* Expanding gold line */}
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "3rem" }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="h-px bg-[#c9a34e] mb-7"
                />

                {/* Description */}
                <p className="text-[#7A5E47] text-base leading-[2] max-w-sm">
                  {features[active].desc}
                </p>

                {/* Large bg number */}
                <p
                  aria-hidden
                  className="absolute right-0 bottom-0 text-[160px] font-light leading-none text-[#1C1008]/[0.035] select-none pointer-events-none"
                >
                  {features[active].num}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* ── Mobile: Accordion ── */}
        <div className="md:hidden divide-y divide-[#1C1008]/10">
          {features.map((f, i) => (
            <div key={f.num}>
              <button
                className="w-full flex items-center justify-between gap-4 text-left py-5"
                onClick={() => setExpanded(expanded === i ? null : i)}
              >
                <div className="flex items-center gap-5">
                  <span className="text-[10px] tracking-[0.4em] text-[#c9a34e] tabular-nums shrink-0">
                    {f.num}
                  </span>
                  <span className="text-xl font-light text-[#1C1008]">{f.title}</span>
                </div>
                <motion.span
                  animate={{ rotate: expanded === i ? 45 : 0 }}
                  transition={{ duration: 0.25 }}
                  className="text-[#c9a34e] text-2xl leading-none shrink-0 font-light"
                >
                  +
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {expanded === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="pb-6 pl-10 pr-2">
                      <div className="h-px w-8 bg-[#c9a34e] mb-4" />
                      <p className="text-[#7A5E47] text-sm leading-[1.95]">{f.desc}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
