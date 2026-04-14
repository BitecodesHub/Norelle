import { NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import Product from "@/models/Product";

const dummyProducts = [
  {
    title: "Rose Oud Elixir",
    slug: "rose-oud-elixir",
    description:
      "A captivating blend of Bulgarian rose and aged oud wood, layered with saffron and sandalwood. Opens with the freshness of rose petals and deepens into a warm, resinous heart that lingers beautifully on the skin.",
    price: 4800,
    comparePrice: 5500,
    images: [
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=800&q=85",
    ],
    category: "EAU_DE_PARFUM",
    stock: 42,
    featured: true,
    notes: {
      top: "Bulgarian Rose, Saffron, Pink Pepper",
      heart: "Oud Wood, Jasmine, Iris",
      base: "Sandalwood, Musk, Amber",
    },
    longevity: "8–12 hours",
    ingredients:
      "Alcohol Denat., Parfum (Fragrance), Aqua, Rosa Damascena Flower Oil, Boswellia Serrata Resin, Santalum Album Wood Oil.",
    rating: 4.8,
    reviewCount: 124,
  },
  {
    title: "Velvet Musk Attar",
    slug: "velvet-musk-attar",
    description:
      "A pure, concentrated attar capturing the essence of white musk and ambergris. Handcrafted using traditional distillation methods, this intimate fragrance wraps you in a warm, sensual embrace.",
    price: 3200,
    comparePrice: null,
    images: [
      "https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=800&q=85",
    ],
    category: "ATTAR",
    stock: 28,
    featured: true,
    notes: {
      top: "White Musk, Bergamot, Aldehydes",
      heart: "Ambergris, Orris Root, Labdanum",
      base: "Vetiver, Cedarwood, Benzoin",
    },
    longevity: "12–16 hours",
    ingredients:
      "Mineral Oil, Parfum (Fragrance), Ambrette Seed Oil, Cedrus Atlantica Bark Oil, Vetiveria Zizanoides Root Oil.",
    rating: 4.9,
    reviewCount: 89,
  },
  {
    title: "Ocean Iris",
    slug: "ocean-iris",
    description:
      "A fresh aquatic interpretation of the classic iris flower. Crisp sea breeze notes open this ethereal fragrance, leading to a powdery iris heart with a clean, driftwood finish.",
    price: 3600,
    comparePrice: 4200,
    images: [
      "https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=800&q=85",
    ],
    category: "EAU_DE_TOILETTE",
    stock: 55,
    featured: true,
    notes: {
      top: "Sea Salt, Marine Accord, Grapefruit",
      heart: "Iris Root, Violet, Water Lily",
      base: "Driftwood, White Musk, Cashmeran",
    },
    longevity: "6–8 hours",
    ingredients:
      "Alcohol Denat., Parfum (Fragrance), Aqua, Iris Pallida Leaf Extract, Linalool, Limonene, Citronellol.",
    rating: 4.6,
    reviewCount: 67,
  },
  {
    title: "Sakura Bliss",
    slug: "sakura-bliss",
    description:
      "An ode to the fleeting beauty of cherry blossom season. Delicate, powdery, soft, and romantic — a whisper of yuzu brightens the heart while warm musk ensures lasting presence.",
    price: 4200,
    comparePrice: 4900,
    images: [
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=800&q=85",
    ],
    category: "EAU_DE_PARFUM",
    stock: 37,
    featured: true,
    notes: {
      top: "Yuzu, Peach, Pink Grapefruit",
      heart: "Cherry Blossom, Magnolia, Rose",
      base: "Soft Musk, Cashmere Wood, White Amber",
    },
    longevity: "7–10 hours",
    ingredients:
      "Alcohol Denat., Parfum (Fragrance), Aqua, Prunus Serrulata Flower Extract, Citrus Yuzu Peel Oil, Muskenone.",
    rating: 4.7,
    reviewCount: 98,
  },
  {
    title: "Mystic Oud Royal",
    slug: "mystic-oud-royal",
    description:
      "Reserved for connoisseurs of the rarest ingredients. Ultra-concentrated attar blending 12-year aged Hindi oud with rare Taif rose and pure ambergris tincture. An heirloom fragrance.",
    price: 9800,
    comparePrice: null,
    images: [
      "https://images.unsplash.com/photo-1590736704728-f4730bb30770?w=800&q=85",
    ],
    category: "ATTAR",
    stock: 12,
    featured: true,
    notes: {
      top: "Taif Rose Absolute, Saffron, Cardamom",
      heart: "Hindi Oud, Ambergris, Cypriol",
      base: "Royal Musk, Orris Butter, Agarwood Smoke",
    },
    longevity: "24+ hours",
    ingredients:
      "Mineral Oil, Parfum (Fragrance), Aquilaria Agallocha Wood Oil, Rosa Damascena Absolute, Ambrette Seed Oil.",
    rating: 5.0,
    reviewCount: 31,
  },
  {
    title: "Midnight Jasmine",
    slug: "midnight-jasmine",
    description:
      "An intoxicating night-blooming jasmine captured at its most potent. Rich, heady floral with a warm musky drydown — a fragrance that commands the room long after you leave.",
    price: 3900,
    comparePrice: 4500,
    images: [
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=800&q=85",
    ],
    category: "EAU_DE_PARFUM",
    stock: 30,
    featured: false,
    notes: {
      top: "Night-blooming Jasmine, Neroli, Green Leaf",
      heart: "Jasmine Sambac, Tuberose, Ylang Ylang",
      base: "White Musk, Sandalwood, Benzyl Acetate",
    },
    longevity: "8–10 hours",
    ingredients:
      "Alcohol Denat., Parfum (Fragrance), Aqua, Jasminum Sambac Flower Extract, Cananga Odorata Flower Oil.",
    rating: 4.5,
    reviewCount: 52,
  },
  {
    title: "Cedar & Smoke",
    slug: "cedar-and-smoke",
    description:
      "A brooding, masculine woody fragrance that opens with clean cedarwood and evolves into smoky vetiver and labdanum. Minimalist, modern, and utterly confident.",
    price: 4100,
    comparePrice: null,
    images: [
      "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=800&q=85",
    ],
    category: "EAU_DE_TOILETTE",
    stock: 22,
    featured: false,
    notes: {
      top: "Cedarwood, Juniper Berry, Bergamot",
      heart: "Guaiac Wood, Birch Tar, Orris",
      base: "Vetiver, Labdanum, Iso E Super",
    },
    longevity: "9–12 hours",
    ingredients:
      "Alcohol Denat., Parfum (Fragrance), Aqua, Cedrus Atlantica Bark Oil, Juniperus Communis Fruit Oil.",
    rating: 4.4,
    reviewCount: 38,
  },
];

export async function GET() {
  try {
    await connectDB();

    // Delete all existing products
    const deleted = await Product.deleteMany({});

    // Re-seed with fresh data
    await Product.insertMany(dummyProducts);

    return NextResponse.json({
      success: true,
      message: `✅ Reset complete! Deleted ${deleted.deletedCount} old products. Seeded ${dummyProducts.length} new products.`,
      products: dummyProducts.map((p) => ({
        title: p.title,
        slug: p.slug,
        price: p.price,
        image: p.images[0],
      })),
    });
  } catch (error) {
    console.error("Reset error:", error);
    return NextResponse.json({ error: "Failed to reset products" }, { status: 500 });
  }
}
