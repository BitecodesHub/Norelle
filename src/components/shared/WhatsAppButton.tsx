"use client";

import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const HIDDEN_ROUTES = ["/checkout", "/admin", "/salesman", "/login", "/register"];

export default function WhatsAppButton() {
  const pathname = usePathname();
  const hidden = HIDDEN_ROUTES.some((r) => pathname.startsWith(r));

  return (
    <AnimatePresence>
      {!hidden && (
        <motion.a
          href="https://wa.me/919428767709?text=Hi%20Norelle!%20I%27m%20interested%20in%20your%20fragrances."
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ delay: 1.5, type: "spring", stiffness: 200 }}
          className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-200"
        >
          {/* Pulse ring */}
          <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20" />
          {/* WhatsApp icon */}
          <svg viewBox="0 0 32 32" className="w-7 h-7 fill-white relative z-10">
            <path d="M16.004 0h-.008C7.174 0 0 7.176 0 16.004c0 3.5 1.128 6.744 3.046 9.378L1.054 31.29l6.118-1.958A15.93 15.93 0 0 0 16.004 32C24.826 32 32 24.826 32 16.004S24.826 0 16.004 0zm9.35 22.614c-.394 1.112-1.942 2.034-3.2 2.304-.862.182-1.988.328-5.778-1.242-4.848-2.008-7.966-6.924-8.208-7.246-.232-.322-1.952-2.6-1.952-4.96s1.234-3.518 1.672-3.998c.438-.48.958-.6 1.276-.6.316 0 .636.002.914.016.294.014.688-.112 1.076.822.394.952 1.342 3.27 1.46 3.508.118.238.198.516.04.834-.158.318-.238.516-.476.796-.238.278-.5.622-.714.834-.238.238-.486.496-.208.972.278.476 1.234 2.036 2.65 3.298 1.82 1.622 3.354 2.126 3.83 2.364.476.238.756.198 1.034-.118.278-.318 1.194-1.392 1.512-1.872.318-.476.636-.396 1.074-.238.438.158 2.754 1.298 3.23 1.536.476.238.794.356.912.554.118.198.118 1.152-.276 2.264z" />
          </svg>
        </motion.a>
      )}
    </AnimatePresence>
  );
}
