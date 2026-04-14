import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Core palette — light theme
        parchment: "#FAFAF7",       // main background (warm white)
        charcoal: "#F5EDE0",        // card / section background
        "charcoal-light": "#EDE3D5",// deeper surface / image placeholder
        cream: "#1C1008",           // primary text (espresso dark brown)
        tan: "#E2D0BC",             // borders & dividers
        mocha: "#7A5E47",           // secondary text
        latte: "#B09278",           // muted / placeholder text
        sand: "#F0E6D6",            // subtle surface tint
        // Brand colours — unchanged
        noir: "#0E0E0E",            // used for text-noir on gold buttons
        beige: "#E8DCCB",
        gold: "#D4AF37",
        "gold-light": "#E4C97A",
        "gold-dark": "#B8960C",
        brown: "#9C7B5A",           // warm accent brown
      },
      fontFamily: {
        serif: ["Cormorant Garamond", "Georgia", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #D4AF37, #E4C97A, #D4AF37)",
        "parchment-gradient": "linear-gradient(135deg, #FAFAF7 0%, #F5EDE0 50%, #FAFAF7 100%)",
        "beige-gradient": "linear-gradient(135deg, #E8DCCB 0%, #F5EDE0 100%)",
        "hero-gradient": "linear-gradient(135deg, #FAFAF7 0%, #F5EDE0 60%, #EDE3D5 100%)",
      },
      animation: {
        "spin-slow": "spin 8s linear infinite",
        "float": "float 6s ease-in-out infinite",
        "shimmer": "shimmer 2.5s infinite",
        "fade-in": "fadeIn 0.8s ease forwards",
        "slide-up": "slideUp 0.8s ease forwards",
        "glow": "glow 2s ease-in-out infinite alternate",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(40px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        glow: {
          "0%": { boxShadow: "0 0 20px rgba(212,175,55,0.2)" },
          "100%": { boxShadow: "0 0 40px rgba(212,175,55,0.5)" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
      boxShadow: {
        "gold-glow": "0 0 30px rgba(212,175,55,0.3)",
        "glass": "0 4px 24px rgba(140,90,40,0.08)",
        "card": "0 2px 16px rgba(100,60,20,0.07)",
        "card-hover": "0 8px 32px rgba(100,60,20,0.12)",
        "clay": "inset -3px -3px 6px rgba(200,160,100,0.12), inset 3px 3px 6px rgba(255,255,255,0.7), 4px 4px 12px rgba(100,60,20,0.1)",
      },
    },
  },
  plugins: [],
};

export default config;
