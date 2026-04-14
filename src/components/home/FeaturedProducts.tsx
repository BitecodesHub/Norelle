"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Star, ShoppingBag } from "lucide-react";
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
  EAU_DE_PARFUM: "Eau de Parfum",
  EAU_DE_TOILETTE: "Eau de Toilette",
  ATTAR: "Attar",
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
    <section className="max-w-7xl mx-auto px-6 py-24">
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center mb-16"
      >
        <p className="text-xs tracking-[0.4em] text-gold uppercase font-sans mb-4">
          Curated Selection
        </p>
        <h2 className="font-serif text-4xl md:text-5xl text-cream font-light">
          Featured Fragrances
        </h2>
        <div className="mt-4 mx-auto w-16 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
      </motion.div>

      {/* Products grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product, index) => (
          <motion.div
            key={product._id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: index * 0.12, ease: "easeOut" }}
          >
            <Link href={`/shop/${product.slug}`} className="group block">
              <div className="relative bg-white rounded-2xl overflow-hidden border border-tan hover:border-gold/30 transition-all duration-500 hover:shadow-card-hover shadow-card">
                {/* Image */}
                <div className="relative overflow-hidden aspect-[3/4] bg-charcoal">
                  {product.images[0] ? (
                    <Image
                      src={product.images[0]}
                      alt={product.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="w-32 h-48 bg-gradient-to-b from-gold/10 to-transparent rounded-full blur-2xl" />
                      <ShoppingBag className="w-16 h-16 text-latte absolute" />
                    </div>
                  )}

                  {/* Dark overlay on hover for text visibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-noir/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Quick add button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    onClick={(e) => handleAddToCart(product, e)}
                    className="absolute bottom-4 left-4 right-4 py-3 bg-gold text-noir text-xs font-medium tracking-widest uppercase rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 font-sans shadow-lg"
                  >
                    Add to Cart
                  </motion.button>

                  {/* Category badge */}
                  <span className="absolute top-4 left-4 text-[10px] tracking-widest uppercase font-sans text-mocha bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full border border-tan">
                    {categoryLabel[product.category] ?? product.category}
                  </span>

                  {/* Sale badge */}
                  {product.comparePrice && (
                    <span className="absolute top-4 right-4 text-[10px] font-sans font-bold text-red-600 bg-red-50 border border-red-100 px-2 py-1 rounded-full">
                      SALE
                    </span>
                  )}
                </div>

                {/* Info */}
                <div className="p-5 bg-white">
                  <h3 className="font-serif text-lg text-cream group-hover:text-gold transition-colors duration-300 truncate">
                    {product.title}
                  </h3>

                  {/* Rating */}
                  {product.reviewCount > 0 && (
                    <div className="flex items-center gap-1.5 mt-1.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${i < Math.round(product.rating) ? "text-gold fill-gold" : "text-tan"}`}
                        />
                      ))}
                      <span className="text-xs text-latte font-sans ml-1">
                        ({product.reviewCount})
                      </span>
                    </div>
                  )}

                  {/* Price */}
                  <div className="flex items-center gap-3 mt-3">
                    <span className="font-serif text-xl text-gold">
                      ₹{product.price.toLocaleString("en-IN")}
                    </span>
                    {product.comparePrice && (
                      <span className="text-sm text-latte line-through font-sans">
                        ₹{product.comparePrice.toLocaleString("en-IN")}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* View all CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mt-16 text-center"
      >
        <Link
          href="/shop"
          className="inline-block px-10 py-4 border border-gold/50 text-gold font-sans text-sm tracking-widest uppercase rounded-xl hover:bg-gold hover:text-noir transition-all duration-300"
        >
          View All Fragrances
        </Link>
      </motion.div>
    </section>
  );
}
