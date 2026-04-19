"use client";
import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ShoppingBag, ChevronRight, Minus, Plus, Wind, Heart, Layers, Share2, Copy, Check, Shield, Truck, CreditCard } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import toast from "react-hot-toast";

interface Review {
  _id: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

interface ProductVariant {
  size: string;
  price: number;
}

interface Product {
  _id: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  comparePrice?: number;
  images: string[];
  category: string;
  notes: { top: string; heart: string; base: string };
  longevity: string;
  ingredients: string;
  rating: number;
  reviewCount: number;
  stock: number;
  variants?: ProductVariant[];
}

const categoryLabel: Record<string, string> = {
  PERFUME: "Perfume",
  ATTAR: "Attar",
  EAU_DE_PARFUM: "Eau de Parfum",
  EAU_DE_TOILETTE: "Eau de Toilette",
  BODY_MIST: "Body Mist",
};

export default function ProductDetail({ product, reviews }: { product: Product; reviews: Review[] }) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"notes" | "ingredients" | "reviews">("notes");
  const [copied, setCopied] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    product.variants?.length ? product.variants[0] : null
  );
  const { addItem } = useCartStore();

  const activePrice = selectedVariant ? selectedVariant.price : product.price;

  const handleAddToCart = () => {
    if (product.stock === 0) return;
    const cartId = selectedVariant ? `${product._id}__${selectedVariant.size}` : product._id;
    addItem({
      id: cartId,
      slug: product.slug,
      title: product.title,
      image: product.images[0] ?? "",
      price: activePrice,
      quantity,
      size: selectedVariant?.size,
    });
    toast.success(`${product.title}${selectedVariant ? ` (${selectedVariant.size})` : ""} added to cart`);
  };

  const discount = product.comparePrice
    ? Math.round(((product.comparePrice - activePrice) / product.comparePrice) * 100)
    : 0;

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-latte font-sans mb-10">
        <a href="/" className="hover:text-mocha transition-colors">Home</a>
        <ChevronRight className="w-3 h-3" />
        <a href="/shop" className="hover:text-mocha transition-colors">Shop</a>
        <ChevronRight className="w-3 h-3" />
        <span className="text-mocha">{product.title}</span>
      </nav>

      <div className="grid lg:grid-cols-2 gap-16 mb-20">
        {/* Left — Image Gallery */}
        <div className="space-y-4">
          <motion.div
            key={selectedImage}
            initial={{ opacity: 0.8, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="relative aspect-square rounded-2xl overflow-hidden bg-charcoal border border-tan group/img cursor-zoom-in"
          >
            {product.images[selectedImage] ? (
              <Image
                src={product.images[selectedImage]}
                alt={`${product.title} - ${categoryLabel[product.category] ?? product.category} by Norelle | Buy Online Ahmedabad`}
                fill
                className="object-cover transition-transform duration-500 group-hover/img:scale-125"
                priority
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <ShoppingBag className="w-24 h-24 text-latte" />
              </div>
            )}
            {discount > 0 && (
              <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full font-sans">
                {discount}% OFF
              </div>
            )}
          </motion.div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-3">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                    selectedImage === i ? "border-gold" : "border-tan hover:border-brown/40"
                  }`}
                >
                  <Image src={img} alt="" fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right — Product Info */}
        <div>
          <p className="text-xs tracking-[0.4em] uppercase text-gold font-sans mb-3">
            {categoryLabel[product.category] ?? product.category}
          </p>
          <h1 className="font-serif text-4xl md:text-5xl text-cream font-light mb-4 leading-tight">
            {product.title}
          </h1>

          {/* Rating */}
          {product.reviewCount > 0 && (
            <div className="flex items-center gap-2 mb-6">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < Math.round(product.rating) ? "text-gold fill-gold" : "text-tan"}`} />
                ))}
              </div>
              <span className="text-sm text-mocha font-sans">{product.rating.toFixed(1)} ({product.reviewCount} reviews)</span>
            </div>
          )}

          {/* Price */}
          <div className="flex items-baseline gap-4 mb-6">
            <span className="font-serif text-4xl text-gold">₹{activePrice.toLocaleString("en-IN")}</span>
            {product.comparePrice && (
              <span className="text-xl text-latte line-through font-sans">₹{product.comparePrice.toLocaleString("en-IN")}</span>
            )}
          </div>

          <div className="h-px bg-tan mb-6" />

          <p className="text-mocha font-sans text-base leading-8 mb-8">{product.description}</p>

          {/* Size Variants */}
          {product.variants && product.variants.length > 0 && (
            <div className="mb-6">
              <span className="text-sm text-mocha font-sans tracking-wider uppercase block mb-3">Size</span>
              <div className="flex flex-wrap gap-3">
                {product.variants.map((v) => (
                  <button
                    key={v.size}
                    onClick={() => setSelectedVariant(v)}
                    className={`px-5 py-2.5 rounded-xl border font-sans text-sm font-medium transition-all duration-200 ${
                      selectedVariant?.size === v.size
                        ? "border-gold bg-gold/10 text-cream"
                        : "border-tan bg-charcoal text-mocha hover:border-gold/50 hover:text-cream"
                    }`}
                  >
                    {v.size}
                    <span className="ml-2 text-gold text-xs">₹{v.price}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div className="flex items-center gap-4 mb-6">
            <span className="text-sm text-mocha font-sans tracking-wider uppercase">Qty</span>
            <div className="flex items-center gap-3 border border-tan rounded-xl px-4 py-2 bg-charcoal">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="text-mocha hover:text-cream transition-colors">
                <Minus className="w-4 h-4" />
              </button>
              <span className="text-cream font-sans w-6 text-center text-sm">{quantity}</span>
              <button onClick={() => setQuantity(Math.min(product.stock, quantity + 1))} className="text-mocha hover:text-cream transition-colors">
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <span className="text-xs text-latte font-sans">{product.stock} in stock</span>
          </div>

          {/* CTA */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="w-full py-5 bg-gold hover:bg-gold-light text-noir font-sans text-sm tracking-[0.3em] uppercase font-medium rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-gold-glow mb-4"
          >
            {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
          </motion.button>

          {product.longevity && (
            <p className="text-xs text-latte font-sans text-center mb-6">
              🕐 Longevity: {product.longevity}
            </p>
          )}

          {/* Trust Badges */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            {[
              { icon: Shield, label: "Genuine Product" },
              { icon: Truck, label: "Free Delivery Ahmedabad" },
              { icon: CreditCard, label: "Secure Payment" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex flex-col items-center gap-1.5 py-3 px-2 rounded-xl bg-charcoal border border-tan text-center">
                <Icon className="w-4 h-4 text-gold/60" />
                <span className="text-[10px] text-cream/40 font-sans leading-tight">{label}</span>
              </div>
            ))}
          </div>

          {/* Share Buttons */}
          <div className="flex items-center gap-3 justify-center">
            <span className="text-xs text-latte font-sans flex items-center gap-1">
              <Share2 className="w-3 h-3" /> Share:
            </span>
            <a
              href={`https://wa.me/?text=${encodeURIComponent(`Check out ${product.title} by Norelle! https://norelle.in/shop/${product.slug}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-lg border border-tan text-xs font-sans text-mocha hover:border-[#25D366] hover:text-[#25D366] transition-colors"
            >
              WhatsApp
            </a>
            <button
              onClick={() => {
                navigator.clipboard.writeText(`https://norelle.in/shop/${product.slug}`);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
              className="px-3 py-1.5 rounded-lg border border-tan text-xs font-sans text-mocha hover:border-gold/50 hover:text-gold transition-colors flex items-center gap-1"
            >
              {copied ? <><Check className="w-3 h-3" /> Copied</> : <><Copy className="w-3 h-3" /> Copy Link</>}
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border border-tan rounded-2xl overflow-hidden bg-white">
        <div className="flex border-b border-tan">
          {(["notes", "ingredients", "reviews"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-4 text-sm font-sans tracking-widest uppercase transition-all duration-300 ${
                activeTab === tab
                  ? "text-gold border-b-2 border-gold bg-charcoal"
                  : "text-mocha hover:text-cream hover:bg-charcoal/50"
              }`}
            >
              {tab === "notes" ? "Scent Notes" : tab === "ingredients" ? "Ingredients" : `Reviews (${reviews.length})`}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="p-8"
          >
            {/* Notes Pyramid */}
            {activeTab === "notes" && (
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { icon: Wind, label: "Top Notes", value: product.notes?.top, desc: "First impression (0–30 min)" },
                  { icon: Heart, label: "Heart Notes", value: product.notes?.heart, desc: "The soul (30 min–4 hrs)" },
                  { icon: Layers, label: "Base Notes", value: product.notes?.base, desc: "Lasting impression (4+ hrs)" },
                ].map(({ icon: Icon, label, value, desc }) => (
                  <div key={label} className="bg-charcoal rounded-xl p-6 border border-tan">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 rounded-lg bg-gold/10 border border-gold/20 flex items-center justify-center">
                        <Icon className="w-4 h-4 text-gold" />
                      </div>
                      <h3 className="font-serif text-base text-cream">{label}</h3>
                    </div>
                    <p className="text-mocha font-sans text-sm leading-relaxed">{value || "—"}</p>
                    <p className="text-latte font-sans text-xs mt-2">{desc}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Ingredients */}
            {activeTab === "ingredients" && (
              <div>
                <p className="text-mocha font-sans text-base leading-8 whitespace-pre-line">
                  {product.ingredients || "Ingredients information not available."}
                </p>
              </div>
            )}

            {/* Reviews */}
            {activeTab === "reviews" && (
              <div className="space-y-6">
                {reviews.length === 0 ? (
                  <p className="text-latte font-sans text-center py-8">
                    No reviews yet. Be the first to share your experience.
                  </p>
                ) : (
                  reviews.map((review) => (
                    <div key={review._id} className="border-b border-tan pb-6 last:border-0">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-sans text-sm text-cream font-medium">{review.userName}</span>
                        <span className="text-xs text-latte font-sans">
                          {new Date(review.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
                        </span>
                      </div>
                      <div className="flex mb-3">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-3.5 h-3.5 ${i < review.rating ? "text-gold fill-gold" : "text-tan"}`} />
                        ))}
                      </div>
                      <p className="text-mocha font-sans text-sm leading-relaxed">{review.comment}</p>
                    </div>
                  ))
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
