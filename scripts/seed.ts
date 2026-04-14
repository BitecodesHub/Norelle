/**
 * Database Seed Script — Norelle
 * Run with: npx tsx scripts/seed.ts
 * (install tsx: npm install -D tsx)
 */
import mongoose from "mongoose";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const MONGODB_URI = process.env.MONGODB_URI!;
if (!MONGODB_URI) throw new Error("MONGODB_URI missing in .env.local");

// ── Inline schemas to avoid import issues ──────────────────────
const ProductSchema = new mongoose.Schema({
  title: String, slug: String, description: String, price: Number,
  comparePrice: Number, images: [String], category: String, stock: Number,
  notes: { top: String, heart: String, base: String },
  longevity: String, ingredients: String, featured: Boolean, rating: Number, reviewCount: Number,
}, { timestamps: true });

const Product = mongoose.models.Product || mongoose.model("Product", ProductSchema);

const products = [
  {
    title: "Noir Oud Royale",
    slug: "noir-oud-royale",
    description: "A majestic blend of Assam oud and vetiver, grounded in warm amber and sandalwood. This is the fragrance of quiet power and refined luxury.",
    price: 6490,
    comparePrice: 7999,
    images: [],
    category: "EAU_DE_PARFUM",
    stock: 25,
    notes: { top: "Bergamot, Pink Pepper", heart: "Oud, Rose, Vetiver", base: "Sandalwood, Amber, Musk" },
    longevity: "8–12 hours",
    ingredients: "Alcohol Denat., Parfum (Fragrance), Aqua, Oud Extract, Rosa Damascena, Santalum Album.",
    featured: true, rating: 4.8, reviewCount: 47,
  },
  {
    title: "Saffron & Gold",
    slug: "saffron-and-gold",
    description: "A rare fusion of Kashmiri saffron, honey and warm leather — opulent, sensual, and unforgettable.",
    price: 5490,
    comparePrice: 6500,
    images: [],
    category: "EAU_DE_PARFUM",
    stock: 18,
    notes: { top: "Saffron, Cardamom", heart: "Rose, Leather, Honey", base: "Amber, Patchouli, Vanilla" },
    longevity: "7–10 hours",
    ingredients: "Alcohol Denat., Parfum, Crocus Sativus Extract, Rosa Oil, Patchouli Oil.",
    featured: true, rating: 4.9, reviewCount: 36,
  },
  {
    title: "Rose Taifi Attar",
    slug: "rose-taifi-attar",
    description: "Pure, alcohol-free distillation of the legendary Taif rose from Saudi Arabia. A classic attar for those who appreciate timeless beauty.",
    price: 3990,
    images: [],
    category: "ATTAR",
    stock: 40,
    notes: { top: "Fresh Rose", heart: "Rose Heart, Geranium", base: "White Musk, Sandalwood" },
    longevity: "10–14 hours (alcohol-free)",
    ingredients: "Rosa Damascena (Taif) Oil, Santalum Album Oil.",
    featured: true, rating: 4.7, reviewCount: 82,
  },
  {
    title: "Blanche Lumière",
    slug: "blanche-lumiere",
    description: "An airy, luminous white floral — jasmine petals and iris float above a clean cedar base. Effortless elegance in every spray.",
    price: 4990,
    comparePrice: 5500,
    images: [],
    category: "EAU_DE_TOILETTE",
    stock: 30,
    notes: { top: "Lemon, White Peach", heart: "Jasmine, Iris, Lily", base: "Cedar, White Musk" },
    longevity: "5–7 hours",
    ingredients: "Alcohol Denat., Parfum, Jasminum Sambac Extract, Iris Pallida Root Oil.",
    featured: true, rating: 4.6, reviewCount: 28,
  },
  {
    title: "Oud Hindi Attar",
    slug: "oud-hindi-attar",
    description: "Deep, smoky, and earthy — Oud Hindi is the quintessential luxury attar, aged in traditional copper stills for maximum potency.",
    price: 8990,
    images: [],
    category: "ATTAR",
    stock: 12,
    notes: { top: "Smoke, Incense", heart: "Oud, Dark Leather", base: "Earth, Animalic Musk, Camphor" },
    longevity: "12–24 hours",
    ingredients: "Aquilaria Malaccensis (Oud) Oil, Santalum Album Oil.",
    featured: false, rating: 4.9, reviewCount: 19,
  },
  {
    title: "Velvet Amber",
    slug: "velvet-amber",
    description: "A cocooning oriental fragrance. Warm amber resin, tonka bean and creamy benzoin create an addictive sillage that demands attention.",
    price: 4290,
    images: [],
    category: "EAU_DE_PARFUM",
    stock: 22,
    notes: { top: "Bergamot, Spice", heart: "Amber, Tonka Bean", base: "Benzoin, Vanilla, Musk" },
    longevity: "8–10 hours",
    ingredients: "Alcohol Denat., Parfum, Ambra Extract, Dipteryx Odorata (Tonka) Bean Extract.",
    featured: false, rating: 4.7, reviewCount: 34,
  },
];

async function seed() {
  await mongoose.connect(MONGODB_URI);
  console.log("✅ Connected to MongoDB");

  await Product.deleteMany({});
  console.log("🗑  Cleared existing products");

  const inserted = await Product.insertMany(products);
  console.log(`🌱 Seeded ${inserted.length} products`);

  await mongoose.disconnect();
  console.log("✅ Done! Your Norelle store is ready.");
}

seed().catch((err) => { console.error("❌ Seed failed:", err); process.exit(1); });
