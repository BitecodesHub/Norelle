"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ShoppingBag, ArrowRight } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import toast from "react-hot-toast";

interface Product {
  _id: string;
  title: string;
  slug: string;
  price: number;
  comparePrice?: number;
  images: string[];
  category: string;
  rating: number;
  reviewCount: number;
}

interface Props {
  products: Product[];
}

const categoryLabel: Record<string, string> = {
  PERFUME: "Perfume",
  ATTAR: "Attar",
  EAU_DE_PARFUM: "Eau de Parfum",
  EAU_DE_TOILETTE: "Eau de Toilette",
  BODY_MIST: "Body Mist",
};

export default function FeaturedProducts({ products }: Props) {
  const { addItem } = useCartStore();

  const handleAddToCart = (product: Product, e: React.MouseEvent) => {
    e.preventDefault();
    addItem({
      id: product._id,
      slug: product.slug,
      title: product.title,
      image: product.images[0] ?? "",
      price: product.price,
    });
    toast.success(`${product.title} added to cart`);
  };

  if (products.length === 0) return null;

  return (
    <section className="py-24 bg-parchment">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex flex-col items-center text-center mb-12"
        >
          <p className="text-xs tracking-[0.5em] text-gold uppercase font-sans mb-4">Our Selection</p>
          <h2 className="font-serif text-5xl md:text-6xl text-cream font-light leading-tight">
            Featured
          </h2>
          <div className="mt-4 flex items-center gap-3">
            <div className="h-px w-10 bg-gradient-to-r from-transparent to-gold/60" />
            <div className="w-1 h-1 rounded-full bg-gold/70" />
            <div className="h-px w-10 bg-gradient-to-l from-transparent to-gold/60" />
          </div>
          <p className="mt-4 font-sans text-sm text-cream/60 max-w-xs leading-relaxed">
            Handpicked fragrances — each one a story worth wearing.
          </p>
          <Link
            href="/shop"
            className="hidden md:flex items-center gap-2 text-xs font-sans text-gold/70 hover:text-gold border border-gold/25 hover:border-gold/50 px-5 py-2 rounded-full transition-all duration-300 group mt-5"
          >
            View All Fragrances
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {products.map((product, index) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: index * 0.08, ease: "easeOut" }}
            >
              <Link href={`/shop/${product.slug}`} className="group block">

                {/* Image */}
                <div className="relative aspect-[3/4] bg-charcoal rounded-xl overflow-hidden mb-4">
                  {product.images[0] ? (
                    <Image
                      src={product.images[0]}
                      alt={`${product.title} - ${categoryLabel[product.category] ?? "Fragrance"} by Norelle`}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 25vw"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <ShoppingBag className="w-10 h-10 text-latte" />
                    </div>
                  )}

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                    <span className="text-[9px] tracking-widest uppercase font-sans text-mocha bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-md">
                      {categoryLabel[product.category] ?? product.category}
                    </span>
                    {product.comparePrice && (
                      <span className="text-[9px] font-sans font-semibold text-white bg-red-500 px-2.5 py-1 rounded-md">
                        Sale
                      </span>
                    )}
                  </div>
                </div>

                {/* Info */}
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <h3 className="font-serif text-base text-cream leading-snug truncate group-hover:text-gold transition-colors duration-300">
                      {product.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span className="font-sans text-sm text-cream font-medium">
                        ₹{product.price.toLocaleString("en-IN")}
                      </span>
                      {product.comparePrice && (
                        <span className="text-xs text-latte line-through font-sans">
                          ₹{product.comparePrice.toLocaleString("en-IN")}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Add to cart */}
                  <button
                    onClick={(e) => handleAddToCart(product, e)}
                    aria-label="Add to cart"
                    className="flex-shrink-0 w-8 h-8 rounded-lg border border-tan bg-white flex items-center justify-center text-mocha hover:border-gold hover:text-gold hover:bg-gold/5 transition-all duration-200 mt-0.5"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                  </button>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Mobile view all */}
        <div className="mt-10 text-center md:hidden">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-sm font-sans text-mocha hover:text-gold transition-colors duration-300"
          >
            View all fragrances <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}
