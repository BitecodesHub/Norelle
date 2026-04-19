"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ShoppingBag, ArrowRight, Plus } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import toast from "react-hot-toast";

interface ProductVariant {
  size: string;
  price: number;
}

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
  variants?: ProductVariant[];
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

function ProductCard({ product, index }: { product: Product; index: number }) {
  const [hovered, setHovered] = useState(false);
  const { addItem } = useCartStore();

  const firstVariant = product.variants?.[0];
  const displayPrice = firstVariant ? firstVariant.price : product.price;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (firstVariant) {
      addItem({
        id: `${product._id}__${firstVariant.size}`,
        slug: product.slug,
        title: product.title,
        image: product.images[0] ?? "",
        price: firstVariant.price,
        size: firstVariant.size,
      });
      toast.success(`${product.title} (${firstVariant.size}) added`);
    } else {
      addItem({
        id: product._id,
        slug: product.slug,
        title: product.title,
        image: product.images[0] ?? "",
        price: product.price,
      });
      toast.success(`${product.title} added to cart`);
    }
  };

  return (
    <motion.div
      key={product._id}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.65, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link href={`/shop/${product.slug}`} className="group block">
        {/* Image container */}
        <div className="relative aspect-[3/4] bg-charcoal rounded-lg overflow-hidden mb-5">
          {product.images[0] ? (
            <Image
              src={product.images[0]}
              alt={`${product.title} — ${categoryLabel[product.category] ?? "Fragrance"} by Norelle, Ahmedabad`}
              fill
              loading="eager"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.07]"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-charcoal">
              <ShoppingBag className="w-12 h-12 text-latte/40" />
            </div>
          )}

          {/* Category pill */}
          <div className="absolute top-4 left-4">
            <span className="text-[9px] tracking-[0.2em] uppercase font-sans text-mocha bg-white/95 px-2.5 py-1 rounded-sm">
              {categoryLabel[product.category] ?? product.category}
            </span>
          </div>

          {/* Hover overlay with CTA */}
          <AnimatePresence>
            {hovered && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 bg-noir/40 flex flex-col items-center justify-end pb-6 gap-3"
              >
                <motion.button
                  initial={{ y: 16, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 8, opacity: 0 }}
                  transition={{ duration: 0.22 }}
                  onClick={handleAddToCart}
                  className="flex items-center gap-2 px-6 py-2.5 bg-gold text-noir text-xs font-sans tracking-widest uppercase font-semibold rounded-none hover:bg-gold-light transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  {firstVariant ? `Add ${firstVariant.size}` : "Add to Cart"}
                </motion.button>
                {product.variants && product.variants.length > 1 && (
                  <motion.p
                    initial={{ y: 8, opacity: 0 }}
                    animate={{ y: 0, opacity: 0.7 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.22, delay: 0.05 }}
                    className="text-white text-[10px] font-sans tracking-wide"
                  >
                    More sizes on product page
                  </motion.p>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Product info */}
        <div>
          <h3 className="font-serif text-lg text-cream font-light leading-snug mb-1 group-hover:text-gold transition-colors duration-300">
            {product.title}
          </h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-sans text-sm text-mocha">
                from ₹{displayPrice.toLocaleString("en-IN")}
              </span>
              {product.comparePrice && (
                <span className="text-xs text-latte/60 line-through font-sans">
                  ₹{product.comparePrice.toLocaleString("en-IN")}
                </span>
              )}
            </div>
            {product.variants && product.variants.length > 1 && (
              <span className="text-[10px] text-latte font-sans">
                {product.variants.map(v => v.size).join(" · ")}
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function FeaturedProducts({ products }: Props) {
  if (products.length === 0) return null;

  return (
    <section className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* Editorial header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex flex-col sm:flex-row sm:items-end justify-between mb-14 gap-6"
        >
          <div>
            <p className="text-[10px] tracking-[0.5em] text-gold uppercase font-sans mb-4">Our Selection</p>
            <h2 className="font-serif text-5xl md:text-6xl text-cream font-light leading-[1.05]">
              The Collection
            </h2>
            <div className="flex items-center gap-3 mt-4">
              <div className="h-px w-10 bg-gold/50" />
              <div className="w-1 h-1 rounded-full bg-gold/60" />
              <div className="h-px w-10 bg-gold/30" />
            </div>
          </div>

          <Link
            href="/shop"
            className="flex items-center gap-3 text-xs font-sans text-mocha hover:text-gold transition-colors duration-300 group self-start sm:self-end"
          >
            <span className="tracking-[0.2em] uppercase">View All</span>
            <span className="w-8 h-px bg-mocha group-hover:bg-gold group-hover:w-14 transition-all duration-300" />
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </motion.div>

        {/* Product grid — editorial spacing */}
        <div className={`grid gap-8 md:gap-10 ${products.length <= 2 ? "grid-cols-1 sm:grid-cols-2 max-w-2xl mx-auto" : "grid-cols-2 lg:grid-cols-4"}`}>
          {products.map((product, index) => (
            <ProductCard key={product._id} product={product} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
}
