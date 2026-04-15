"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";

/* ─────────────────────────────────────────────────────── types & data ── */
type Phase = "intro" | "letters" | "hold" | "morph" | "content" | "done";
const LETTERS = "NORELLE".split("");
const SLIDE_DURATION = 5500;

const SLIDES = [
  {
    id: 1,
    image: "/Hero/Norelle Female model .png",
    tag: "Handcrafted · Ahmedabad",
    title: "A scent that",
    italic: "stays with you",
    body: "Not mass-produced. Not generic. Every bottle is blended by hand — made to last on your skin, not just on paper.",
    cta1: { label: "Shop Now", href: "/shop" },
    cta2: { label: "Our Story", href: "/about" },
    gradient: "bg-gradient-to-r from-noir/80 via-noir/45 to-transparent",
    align: "left" as const,
  },
  {
    id: 2,
    image: "/Hero/Norelle Male Model.png",
    tag: "Pure Attar · Copper-Distilled",
    title: "The same way,",
    italic: "for 400 years",
    body: "Rose, oud, sandalwood — slow-distilled in copper degs, the way it's always been done. Wears all day. Nothing added.",
    cta1: { label: "Explore Attars", href: "/shop?category=ATTAR" },
    cta2: null,
    gradient: "bg-gradient-to-r from-noir/75 via-noir/40 to-transparent",
    align: "left" as const,
  },
];

/* ────────────────────────────────────────────── Stagger variants ── */
const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.10, delayChildren: 0.05 },
  },
  exit: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
  exit: {
    opacity: 0,
    y: -14,
    transition: { duration: 0.35, ease: [0.55, 0, 1, 0.45] as [number, number, number, number] },
  },
};

/* ═══════════════════════════════════ Root export ═══════════════════════ */
export default function HeroSection() {
  const [phase, setPhase] = useState<Phase>("intro");
  const [skipIntro, setSkipIntro] = useState(false);

  const heroLogoRef = useRef<HTMLDivElement>(null);
  const lettersRef = useRef<(HTMLSpanElement | null)[]>([]);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  }, []);

  const after = useCallback((ms: number, fn: () => void) => {
    const id = setTimeout(fn, ms);
    timersRef.current.push(id);
    return id;
  }, []);

  /* Check session storage — skip intro on revisit */
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (sessionStorage.getItem("norelle-intro") === "1") {
        setSkipIntro(true);
        setPhase("done");
        window.dispatchEvent(new CustomEvent("norelle-intro-complete"));
      }
    }
  }, []);

  /* Intro sequence timing */
  useEffect(() => {
    if (skipIntro) return;
    if (heroLogoRef.current) {
      gsap.set(heroLogoRef.current, {
        xPercent: -50, yPercent: -50,
        top: "50%", left: "50%",
        opacity: 0, scale: 1,
      });
    }
    after(400,  () => setPhase("letters"));
    after(2400, () => setPhase("hold"));
    after(2900, () => setPhase("morph"));
    after(3200, () => setPhase("content"));
    after(4600, () => setPhase("done"));
    return clearTimers;
  }, [skipIntro, after, clearTimers]);

  /* Letter stagger reveal */
  useEffect(() => {
    if (phase !== "letters" || !heroLogoRef.current) return;
    gsap.to(heroLogoRef.current, { opacity: 1, duration: 0.3 });
    lettersRef.current.forEach((el, i) => {
      if (!el) return;
      gsap.fromTo(
        el,
        { opacity: 0, y: 80, filter: "blur(16px)", scale: 0.85 },
        {
          opacity: 1, y: 0, filter: "blur(0px)", scale: 1,
          delay: i * 0.11, duration: 0.85, ease: "power3.out",
        }
      );
    });
  }, [phase]);

  /* Logo morph into navbar */
  useEffect(() => {
    if (phase !== "morph" || !heroLogoRef.current) return;
    const navLogo = document.querySelector("[data-navbar-logo]") as HTMLElement | null;
    if (!navLogo) return;
    const navRect  = navLogo.getBoundingClientRect();
    const heroRect = heroLogoRef.current.getBoundingClientRect();
    const targetScale = navRect.height / (heroRect.height || 1);
    gsap.to(heroLogoRef.current, {
      top: navRect.top + navRect.height / 2,
      left: navRect.left + navRect.width / 2,
      scale: targetScale,
      duration: 1.05,
      ease: "expo.inOut",
      onComplete: () => {
        gsap.to(heroLogoRef.current, {
          opacity: 0,
          duration: 0.35,
          ease: "power2.in",
          onComplete: () => {
            sessionStorage.setItem("norelle-intro", "1");
            window.dispatchEvent(new CustomEvent("norelle-intro-complete"));
          },
        });
      },
    });
  }, [phase]);

  if (skipIntro) return <HeroCarousel immediate />;

  return (
    <section className="relative w-full min-h-[100svh] overflow-hidden bg-noir">
      {(phase === "intro" || phase === "letters" || phase === "hold") && (
        <div className="absolute inset-0 bg-noir z-0" />
      )}

      {/* Floating letter intro */}
      {phase !== "done" && (
        <div
          ref={heroLogoRef}
          className="fixed z-[90] pointer-events-none select-none"
          aria-hidden="true"
        >
          <div className="flex">
            {LETTERS.map((letter, i) => (
              <span
                key={i}
                ref={(el) => { lettersRef.current[i] = el; }}
                className="font-serif leading-none text-white"
                style={{
                  fontSize: "clamp(3.5rem, 11vw, 9rem)",
                  letterSpacing: "0.2em",
                  display: "inline-block",
                  opacity: 0,
                }}
              >
                {letter}
              </span>
            ))}
          </div>
        </div>
      )}

      <AnimatePresence>
        {(phase === "content" || phase === "done") && (
          <motion.div
            key="carousel"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="w-full h-full"
          >
            <HeroCarousel />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* ═══════════════════════════════ HeroCarousel ══════════════════════════ */
function HeroCarousel({ immediate = false }: { immediate?: boolean }) {
  const [current, setCurrent] = useState(0);
  const [progress, setProgress]  = useState(0);
  const intervalRef  = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressRef  = useRef<ReturnType<typeof setInterval> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  /* ── Cursor parallax (desktop only) ── */
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const springCfg = { stiffness: 55, damping: 22, mass: 0.6 };
  const cursorX = useSpring(rawX, springCfg);
  const cursorY = useSpring(rawY, springCfg);

  /* Background drifts opposite to cursor for subtle depth */
  const bgX = useTransform(cursorX, [-0.5, 0.5], ["-1.2%", "1.2%"]);
  const bgY = useTransform(cursorY, [-0.5, 0.5], ["-0.8%", "0.8%"]);
  /* Content tilts very slightly with cursor */
  const contentX = useTransform(cursorX, [-0.5, 0.5], ["-6px", "6px"]);
  const contentY = useTransform(cursorY, [-0.5, 0.5], ["-4px", "4px"]);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      rawX.set((e.clientX / w) - 0.5);
      rawY.set((e.clientY / h) - 0.5);
    };
    // Only attach on non-touch devices
    if (window.matchMedia("(hover: hover)").matches) {
      window.addEventListener("mousemove", handleMove, { passive: true });
    }
    return () => window.removeEventListener("mousemove", handleMove);
  }, [rawX, rawY]);

  /* Scroll parallax — moves bg up as user scrolls */
  const scrollY = useMotionValue(0);
  const bgScrollY = useSpring(scrollY, { stiffness: 40, damping: 20, mass: 0.5 });
  const bgParallaxY = useTransform(bgScrollY, [0, 600], ["0%", "8%"]);

  useEffect(() => {
    const handleScroll = () => scrollY.set(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollY]);

  /* ── Slide navigation ── */
  const goTo = useCallback((idx: number) => {
    setCurrent(idx);
    setProgress(0);
  }, []);

  const next = useCallback(() => goTo((current + 1) % SLIDES.length), [current, goTo]);
  const prev = useCallback(() => goTo((current - 1 + SLIDES.length) % SLIDES.length), [current, goTo]);

  useEffect(() => {
    intervalRef.current = setInterval(next, SLIDE_DURATION);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [next]);

  useEffect(() => {
    setProgress(0);
    progressRef.current = setInterval(() => {
      setProgress((p) => Math.min(p + (50 / SLIDE_DURATION) * 100, 100));
    }, 50);
    return () => { if (progressRef.current) clearInterval(progressRef.current); };
  }, [current]);

  const slide = SLIDES[current];

  return (
    <div ref={containerRef} className="relative w-full min-h-[100svh] overflow-hidden">

      {/* ── Background layer (cursor + scroll parallax) ── */}
      <AnimatePresence mode="sync">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1.02 }}
          exit={{ opacity: 0, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="absolute inset-0"
          style={{
            x: bgX,
            y: bgParallaxY,
            // Scale slightly beyond bounds to allow parallax room
            width: "102%",
            height: "102%",
            left: "-1%",
            top: "-1%",
          }}
        >
          {/* Idle floating drift for the image */}
          <motion.div
            className="absolute inset-0"
            animate={{ y: [0, -6, 0], x: [0, 3, 0] }}
            transition={{ duration: 9, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
          >
            <Image
              src={slide.image}
              alt={slide.italic}
              fill
              className="object-cover object-[center_15%] md:object-[center_10%]"
              sizes="(max-width: 768px) 100vw, 100vw"
              priority={slide.id === 1}
              quality={90}
            />
          </motion.div>

          {/* Mobile: strong full overlay so text is always legible */}
          <div className="absolute inset-0 bg-noir/55 md:bg-transparent" />

          {/* Desktop: side gradient overlay */}
          <div className={`absolute inset-0 hidden md:block ${slide.gradient}`} />

          {/* Vignette for depth */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_50%,rgba(14,14,14,0.45)_100%)]" />

          {/* Bottom fade */}
          <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-noir/70 to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* ── Foreground text (subtle inverse cursor drift) ── */}
      <motion.div
        className="relative z-10 min-h-[100svh] flex flex-col justify-between pt-24"
        style={{ x: contentX, y: contentY }}
      >
        <div className="flex-1 flex items-center">
          <div className="max-w-7xl mx-auto w-full px-6 md:px-12 lg:px-16">
            <AnimatePresence mode="wait">
              <motion.div
                key={slide.id}
                variants={containerVariants}
                initial="hidden"
                animate="show"
                exit="exit"
                className="max-w-xl"
              >
                {/* Tag line */}
                <motion.div variants={itemVariants} className="flex items-center gap-3 mb-6">
                  <p className="text-[10px] tracking-[0.5em] text-gold uppercase font-sans font-medium">
                    {slide.tag}
                  </p>
                </motion.div>

                {/* Headline */}
                <motion.h1
                  variants={itemVariants}
                  className="font-serif font-light leading-[1.0] text-white mb-0"
                  style={{ fontSize: "clamp(3rem, 6.5vw, 5.8rem)" }}
                >
                  {slide.title}
                  <br />
                  <span className="italic text-gold">{slide.italic}</span>
                </motion.h1>

                {/* Body copy */}
                <motion.p
                  variants={itemVariants}
                  className="font-sans text-base text-white/80 leading-[1.9] max-w-[420px] mt-7 mb-9"
                >
                  {slide.body}
                </motion.p>

                {/* CTAs */}
                <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
                  {/* Primary button */}
                  <Link
                    href={slide.cta1.href}
                    className={[
                      "group relative inline-flex items-center justify-center gap-2",
                      "px-8 py-4 bg-gold text-noir font-sans text-xs tracking-[0.3em] uppercase font-semibold",
                      "rounded-xl overflow-hidden",
                      "transition-all duration-200",
                      /* Hover: very slight scale + warm glow */
                      "hover:scale-[1.03] hover:shadow-[0_0_28px_rgba(212,175,55,0.35)]",
                      /* Active: slight press-down */
                      "active:scale-[0.97] active:shadow-none",
                    ].join(" ")}
                  >
                    {/* Shimmer sweep */}
                    <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
                    <span className="relative z-10">{slide.cta1.label}</span>
                  </Link>

                  {/* Secondary button */}
                  {slide.cta2 && (
                    <Link
                      href={slide.cta2.href}
                      className={[
                        "inline-flex items-center justify-center gap-2",
                        "px-8 py-4 border border-white/30 text-white font-sans text-xs tracking-[0.3em] uppercase font-medium",
                        "rounded-xl",
                        "transition-all duration-200",
                        "hover:scale-[1.03] hover:border-gold/60 hover:text-gold hover:shadow-[0_0_20px_rgba(212,175,55,0.15)]",
                        "active:scale-[0.97]",
                      ].join(" ")}
                    >
                      {slide.cta2.label}
                    </Link>
                  )}
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="relative z-10 max-w-7xl mx-auto w-full px-6 md:px-12 lg:px-16 pb-10 flex items-end justify-between gap-6">


          {/* Trust stats */}
          <motion.div
            className="hidden md:flex items-center gap-8"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65 }}
          >
            {[
              { value: "Hand",    label: "Blended" },
              { value: "No",      label: "Synthetics" },
              { value: "Ahmedabad", label: "Made Here" },
            ].map(({ value, label }) => (
              <div key={label} className="text-center">
                <p className="font-serif text-lg text-gold font-light">{value}</p>
                <p className="text-[9px] text-white/50 uppercase tracking-widest font-sans mt-0.5">{label}</p>
              </div>
            ))}
          </motion.div>

          {/* Prev / Next nav */}
          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.75 }}
          >
            <button
              onClick={prev}
              aria-label="Previous slide"
              className={[
                "w-10 h-10 rounded-full border border-white/20 flex items-center justify-center",
                "text-white/60 transition-all duration-200",
                "hover:border-gold/60 hover:text-gold hover:scale-110 hover:shadow-[0_0_14px_rgba(212,175,55,0.2)]",
                "active:scale-95",
              ].join(" ")}
            >
              <svg viewBox="0 0 16 16" className="w-4 h-4 fill-none stroke-current stroke-[1.5]">
                <path d="M10 4l-4 4 4 4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              onClick={next}
              aria-label="Next slide"
              className={[
                "w-10 h-10 rounded-full border border-white/20 flex items-center justify-center",
                "text-white/60 transition-all duration-200",
                "hover:border-gold/60 hover:text-gold hover:scale-110 hover:shadow-[0_0_14px_rgba(212,175,55,0.2)]",
                "active:scale-95",
              ].join(" ")}
            >
              <svg viewBox="0 0 16 16" className="w-4 h-4 fill-none stroke-current stroke-[1.5]">
                <path d="M6 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </motion.div>
        </div>
      </motion.div>

    </div>
  );
}
