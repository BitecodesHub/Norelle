"use client";

import Link from "next/link";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <main className="min-h-screen flex items-center justify-center bg-parchment">
      <div className="text-center px-6 py-24">
        <p className="text-gold/20 font-serif text-[100px] font-light leading-none mb-4">Oops</p>
        <h1 className="font-serif text-3xl text-cream font-light mb-4">Something Went Wrong</h1>
        <p className="text-cream/40 font-sans text-sm max-w-md mx-auto mb-10 leading-relaxed">
          We encountered an unexpected error. Please try again or return to the homepage.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <button
            onClick={reset}
            className="px-8 py-4 bg-gold hover:bg-gold-light text-noir font-sans text-sm tracking-widest uppercase font-medium rounded-xl transition-all hover:shadow-gold-glow"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="px-8 py-4 border border-gold/30 text-gold hover:bg-gold/10 font-sans text-sm tracking-widest uppercase font-medium rounded-xl transition-all"
          >
            Go Home
          </Link>
        </div>
      </div>
    </main>
  );
}
