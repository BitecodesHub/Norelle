"use client";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Star, ShoppingBag, Search } from "lucide-react";
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
  stock: number;
}

const CATEGORY_LABELS: Record<string, string> = {
  PERFUME: "Perfume",
  ATTAR: "Attar",
  EAU_DE_PARFUM: "Eau de Parfum",
  EAU_DE_TOILETTE: "Eau de Toilette",
  BODY_MIST: "Body Mist",
};

const categories = [
  { value: "", label: "All" },
  { value: "PERFUME", label: "Perfumes" },
  { value: "ATTAR", label: "Attar" },
];

const priceRanges = [
  { value: "", label: "Any Price" },
  { value: "0-500", label: "Under ₹500" },
  { value: "500-1000", label: "₹500 – ₹1,000" },
  { value: "1000-2000", label: "₹1,000 – ₹2,000" },
  { value: "2000-999999", label: "₹2,000+" },
];

const sortOptions = [
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "popular", label: "Most Popular" },
];

export default function ShopClient({
  products,
  activeCategory,
  activeSort,
}: {
  products: Product[];
  activeCategory: string;
  activeSort: string;
}) {
  const router = useRouter();
  const { addItem } = useCartStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState("");

  const filteredProducts = useMemo(() => {
    let result = products;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter((p) => p.title.toLowerCase().includes(q));
    }
    if (priceRange) {
      const [min, max] = priceRange.split("-").map(Number);
      result = result.filter((p) => p.price >= min && p.price <= max);
    }
    return result;
  }, [products, searchQuery, priceRange]);

  const categoryLabel = activeCategory ? (CATEGORY_LABELS[activeCategory] ?? activeCategory) : "Fragrance";

  const setFilter = (key: string, value: string) => {
    const params = new URLSearchParams(window.location.search);
    if (value) params.set(key, value);
    else params.delete(key);
    router.push(`/shop?${params.toString()}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Breadcrumb */}
      <nav className="mb-6 font-sans text-xs text-cream/40">
        <Link href="/" className="hover:text-gold transition-colors">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-cream/60">{activeCategory ? `${categoryLabel}s` : "Shop"}</span>
      </nav>

      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="mb-12"
      >
        <p className="text-xs tracking-[0.4em] text-gold uppercase font-sans mb-2">Norelle</p>
        <h1 className="font-serif text-5xl md:text-6xl text-cream font-light">
          {activeCategory ? `${categoryLabel}s` : "The Collection"}
        </h1>
        <div className="mt-3 w-16 h-px bg-gold" />
      </motion.div>

      {/* Filter Bar */}
      <div className="flex flex-col gap-4 mb-10 sticky top-20 z-30 py-4 bg-parchment/92 backdrop-blur-xl -mx-6 px-6 border-b border-tan">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          {/* Category pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setFilter("category", cat.value)}
                className={`px-4 py-2 rounded-full text-xs tracking-widest uppercase font-sans transition-all duration-300 ${
                  activeCategory === cat.value
                    ? "bg-gold text-noir font-semibold shadow-gold-glow"
                    : "border border-tan text-mocha hover:border-gold/40 hover:text-cream bg-white"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Sort + count */}
          <div className="flex items-center gap-4">
            <span className="text-xs text-latte font-sans">{filteredProducts.length} {filteredProducts.length === 1 ? "result" : "results"}</span>
            <select
              value={activeSort}
              onChange={(e) => setFilter("sort", e.target.value)}
              className="bg-white border border-tan text-mocha text-xs font-sans rounded-lg px-4 py-2 focus:outline-none focus:border-gold/50 cursor-pointer"
            >
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Search + Price filter */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-latte" />
            <input
              type="text"
              placeholder="Search fragrances..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white border border-tan text-cream font-sans text-xs placeholder:text-latte focus:outline-none focus:border-gold/50 transition-colors"
            />
          </div>
          <select
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            className="bg-white border border-tan text-mocha text-xs font-sans rounded-xl px-4 py-2.5 focus:outline-none focus:border-gold/50 cursor-pointer"
          >
            {priceRanges.map((r) => (
              <option key={r.value} value={r.value}>{r.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-32 gap-4 text-center">
          <ShoppingBag className="w-20 h-20 text-tan" />
          <h2 className="font-serif text-2xl text-latte">No fragrances found</h2>
          <p className="text-sm text-latte font-sans">Try a different category</p>
          <button onClick={() => setFilter("category", "")} className="mt-2 px-6 py-3 border border-gold/50 text-gold rounded-xl text-sm font-sans hover:bg-gold hover:text-noir transition-all">
            View All
          </button>
        </div>
      ) : (
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <AnimatePresence>
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product._id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Link href={`/shop/${product.slug}`} className="group block h-full">
                  <div className="relative bg-white rounded-2xl overflow-hidden border border-tan hover:border-gold/30 transition-all duration-500 hover:shadow-card-hover shadow-card h-full flex flex-col">
                    {/* Image */}
                    <div className="relative aspect-[3/4] overflow-hidden bg-charcoal">
                      {product.images[0] ? (
                        <Image
                          src={product.images[0]}
                          alt={`${product.title} - ${CATEGORY_LABELS[product.category] ?? product.category} by Norelle | Buy Online Ahmedabad`}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                          sizes="(max-width:640px) 100vw,(max-width:1024px) 50vw,25vw"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-charcoal">
                          <ShoppingBag className="w-12 h-12 text-latte" />
                        </div>
                      )}

                      {/* Dark hover overlay for readability */}
                      <div className="absolute inset-0 bg-gradient-to-t from-noir/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          if (product.stock === 0) return;
                          addItem({ id: product._id, slug: product.slug, title: product.title, image: product.images[0] ?? "", price: product.price });
                          toast.success(`${product.title} added to cart`);
                        }}
                        className="absolute bottom-3 left-3 right-3 py-2.5 bg-gold text-noir text-xs font-medium tracking-widest uppercase rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 font-sans disabled:opacity-50"
                        disabled={product.stock === 0}
                      >
                        {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
                      </button>

                      {/* Category badge */}
                      <span className="absolute top-3 left-3 text-[9px] tracking-widest uppercase font-sans text-mocha bg-white/80 backdrop-blur-sm px-2.5 py-1 rounded-full border border-tan/70">
                        {product.category.replace(/_/g, " ")}
                      </span>

                      {product.stock === 0 && (
                        <span className="absolute top-3 right-3 text-[9px] bg-red-50 border border-red-200 text-red-500 px-2 py-1 rounded-full font-sans uppercase tracking-wider">
                          Sold Out
                        </span>
                      )}
                    </div>

                    {/* Info */}
                    <div className="p-4 flex-1 flex flex-col bg-white">
                      <h3 className="font-serif text-base text-cream group-hover:text-gold transition-colors duration-300 line-clamp-1">
                        {product.title}
                      </h3>
                      {product.reviewCount > 0 && (
                        <div className="flex items-center gap-1 mt-1.5">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-2.5 h-2.5 ${i < Math.round(product.rating) ? "text-gold fill-gold" : "text-tan"}`} />
                          ))}
                          <span className="text-[10px] text-latte font-sans ml-1">({product.reviewCount})</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2 mt-auto pt-3">
                        <span className="font-serif text-lg text-gold">₹{product.price.toLocaleString("en-IN")}</span>
                        {product.comparePrice && (
                          <span className="text-xs text-latte line-through font-sans">₹{product.comparePrice.toLocaleString("en-IN")}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}
