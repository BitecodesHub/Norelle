"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";

type Phase = "intro" | "letters" | "hold" | "morph" | "content" | "done";
const LETTERS = "NORELLE".split("");
const SLIDE_DURATION = 5500; // ms per slide

const SLIDES = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1920&q=90",
    tag: "New Season · 2024",
    title: "The Scent",
    italic: "of Presence",
    body: "Luxury fragrances crafted for those who leave an impression before they speak.",
    cta1: { label: "Shop Collection", href: "/shop" },
    cta2: { label: "Our Story", href: "/about" },
    gradient: "bg-gradient-to-r from-noir/80 via-noir/45 to-transparent",
    align: "left" as const,
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=1920&q=90",
    tag: "Ancient Craft · Modern Soul",
    title: "Pure Attar,",
    italic: "Timeless Art",
    body: "Slow-distilled in copper degs using traditions unchanged for four centuries. Lasts 24+ hours.",
    cta1: { label: "Discover Attars", href: "/shop?category=ATTAR" },
    cta2: null,
    gradient: "bg-gradient-to-r from-noir/75 via-noir/40 to-transparent",
    align: "left" as const,
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=1920&q=90",
    tag: "100% Natural Ingredients",
    title: "Nothing",
    italic: "Artificial",
    body: "Every ingredient listed on every bottle. Transparency is a luxury we refuse to compromise.",
    cta1: { label: "Our Philosophy", href: "/about" },
    cta2: null,
    gradient: "bg-gradient-to-r from-noir/80 via-noir/50 to-transparent",
    align: "left" as const,
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1590736704728-f4730bb30770?w=1920&q=90",
    tag: "Made in Ahmedabad",
    title: "Local Roots.",
    italic: "Global Soul.",
    body: "Born in Gujarat's richest city of craft. Perfumery as heritage, not just commerce.",
    cta1: { label: "Our Heritage", href: "/about" },
    cta2: { label: "Shop Now", href: "/shop" },
    gradient: "bg-gradient-to-r from-noir/85 via-noir/50 to-transparent",
    align: "left" as const,
  },
];

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

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (sessionStorage.getItem("norelle-intro") === "1") {
        setSkipIntro(true);
        setPhase("done");
        window.dispatchEvent(new CustomEvent("norelle-intro-complete"));
      }
    }
  }, []);

  useEffect(() => {
    if (skipIntro) return;
    if (heroLogoRef.current) {
      gsap.set(heroLogoRef.current, { xPercent: -50, yPercent: -50, top: "50%", left: "50%", opacity: 0, scale: 1 });
    }
    after(400, () => setPhase("letters"));
    after(2400, () => setPhase("hold"));
    after(2900, () => setPhase("morph"));
    after(3200, () => setPhase("content"));
    after(4600, () => setPhase("done"));
    return clearTimers;
  }, [skipIntro, after, clearTimers]);

  useEffect(() => {
    if (phase !== "letters" || !heroLogoRef.current) return;
    gsap.to(heroLogoRef.current, { opacity: 1, duration: 0.3 });
    lettersRef.current.forEach((el, i) => {
      if (!el) return;
      gsap.fromTo(el,
        { opacity: 0, y: 80, filter: "blur(16px)", scale: 0.85 },
        { opacity: 1, y: 0, filter: "blur(0px)", scale: 1, delay: i * 0.11, duration: 0.85, ease: "power3.out" }
      );
    });
  }, [phase]);

  useEffect(() => {
    if (phase !== "morph" || !heroLogoRef.current) return;
    const navLogo = document.querySelector("[data-navbar-logo]") as HTMLElement | null;
    if (!navLogo) return;
    const navRect = navLogo.getBoundingClientRect();
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
          opacity: 0, duration: 0.35, ease: "power2.in",
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
    <section className="relative w-full min-h-screen overflow-hidden bg-noir">
      {/* Black backdrop while intro plays */}
      {(phase === "intro" || phase === "letters" || phase === "hold") && (
        <div className="absolute inset-0 bg-noir z-0" />
      )}

      {/* Intro logo overlay */}
      {phase !== "done" && (
        <div ref={heroLogoRef} className="fixed z-[90] pointer-events-none select-none" aria-hidden="true">
          <div className="flex">
            {LETTERS.map((letter, i) => (
              <span
                key={i}
                ref={(el) => { lettersRef.current[i] = el; }}
                className="font-serif leading-none text-white"
                style={{ fontSize: "clamp(3.5rem, 11vw, 9rem)", letterSpacing: "0.2em", display: "inline-block", opacity: 0 }}
              >
                {letter}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Carousel appears after intro */}
      <AnimatePresence>
        {(phase === "content" || phase === "done") && (
          <motion.div key="carousel" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }} className="w-full h-full">
            <HeroCarousel />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

// ── Full-screen autoscroll carousel ──
function HeroCarousel({ immediate = false }: { immediate?: boolean }) {
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback((idx: number) => {
    setCurrent(idx);
    setProgress(0);
  }, []);

  const next = useCallback(() => goTo((current + 1) % SLIDES.length), [current, goTo]);
  const prev = useCallback(() => goTo((current - 1 + SLIDES.length) % SLIDES.length), [current, goTo]);

  // Auto-advance
  useEffect(() => {
    intervalRef.current = setInterval(next, SLIDE_DURATION);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [next]);

  // Progress bar tick (every 50ms)
  useEffect(() => {
    setProgress(0);
    progressRef.current = setInterval(() => {
      setProgress((p) => Math.min(p + (50 / SLIDE_DURATION) * 100, 100));
    }, 50);
    return () => { if (progressRef.current) clearInterval(progressRef.current); };
  }, [current]);

  const slide = SLIDES[current];

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      {/* ── Background images (crossfade) ── */}
      <AnimatePresence mode="sync">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.1, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Image
            src={slide.image}
            alt={slide.italic}
            fill
            className="object-cover object-center"
            sizes="100vw"
            priority={slide.id === 1}
          />
          {/* Overlay gradient */}
          <div className={`absolute inset-0 ${slide.gradient}`} />
          {/* Bottom fade to parchment */}
          <div className="absolute bottom-0 left-0 right-0 h-36 bg-gradient-to-t from-noir/60 to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* ── Text content ── */}
      <div className="relative z-10 min-h-screen flex flex-col justify-between pt-24">
        <div className="flex-1 flex items-center">
          <div className="max-w-7xl mx-auto w-full px-6 md:px-12 lg:px-16">
            <AnimatePresence mode="wait">
              <motion.div
                key={slide.id}
                initial={immediate && slide.id === 1 ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="max-w-xl"
              >
                {/* Tag */}
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-8 h-px bg-gold" />
                  <p className="text-[10px] tracking-[0.5em] text-gold uppercase font-sans font-medium">
                    {slide.tag}
                  </p>
                </div>

                {/* Headline */}
                <h1 className="font-serif font-light leading-[1.0] text-white mb-0" style={{ fontSize: "clamp(3rem, 6.5vw, 5.8rem)" }}>
                  {slide.title}
                  <br />
                  <span className="italic text-gold">{slide.italic}</span>
                </h1>

                {/* Separator */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.9, ease: "easeOut", delay: 0.2 }}
                  className="h-px w-20 bg-gradient-to-r from-gold via-gold/60 to-transparent origin-left mt-7 mb-6"
                />

                {/* Body */}
                <p className="font-sans text-base text-white/80 leading-[1.9] max-w-[420px] mb-9">
                  {slide.body}
                </p>

                {/* CTAs */}
                <div className="flex flex-wrap gap-4">
                  <Link
                    href={slide.cta1.href}
                    className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 bg-gold text-noir font-sans text-xs tracking-[0.3em] uppercase font-semibold rounded-xl overflow-hidden transition-all duration-300 hover:bg-gold-light hover:shadow-gold-glow"
                  >
                    <span className="relative z-10">{slide.cta1.label}</span>
                    <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                  </Link>
                  {slide.cta2 && (
                    <Link
                      href={slide.cta2.href}
                      className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/30 text-white font-sans text-xs tracking-[0.3em] uppercase font-medium rounded-xl hover:border-gold/60 hover:text-gold transition-all duration-300"
                    >
                      {slide.cta2.label}
                    </Link>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* ── Bottom controls ── */}
        <div className="relative z-10 max-w-7xl mx-auto w-full px-6 md:px-12 lg:px-16 pb-10 flex items-end justify-between gap-6">
          {/* Slide counter + dots */}
          <div className="flex items-center gap-4">
            <span className="font-serif text-sm text-white/50">
              <span className="text-white">{String(current + 1).padStart(2, "0")}</span>
              {" / "}
              {String(SLIDES.length).padStart(2, "0")}
            </span>
            <div className="flex items-center gap-2">
              {SLIDES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className={`h-px transition-all duration-400 rounded-full ${
                    i === current ? "w-8 bg-gold" : "w-4 bg-white/30 hover:bg-white/60"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Trust badges */}
          <div className="hidden md:flex items-center gap-8">
            {[
              { value: "50+", label: "Fragrances" },
              { value: "10K+", label: "Happy Clients" },
              { value: "100%", label: "Natural" },
            ].map(({ value, label }) => (
              <div key={label} className="text-center">
                <p className="font-serif text-lg text-gold font-light">{value}</p>
                <p className="text-[9px] text-white/50 uppercase tracking-widest font-sans mt-0.5">{label}</p>
              </div>
            ))}
          </div>

          {/* Prev / Next */}
          <div className="flex items-center gap-3">
            <button
              onClick={prev}
              aria-label="Previous slide"
              className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:border-gold/60 hover:text-gold transition-all duration-300"
            >
              <svg viewBox="0 0 16 16" className="w-4 h-4 fill-none stroke-current stroke-[1.5]">
                <path d="M10 4l-4 4 4 4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              onClick={next}
              aria-label="Next slide"
              className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:border-gold/60 hover:text-gold transition-all duration-300"
            >
              <svg viewBox="0 0 16 16" className="w-4 h-4 fill-none stroke-current stroke-[1.5]">
                <path d="M6 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* ── Progress bar ── */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/10 z-20">
        <motion.div
          className="h-full bg-gold origin-left"
          style={{ scaleX: progress / 100 }}
          transition={{ duration: 0 }}
        />
      </div>
    </div>
  );
}
