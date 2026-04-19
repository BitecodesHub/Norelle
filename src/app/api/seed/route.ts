import { NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import Product from "@/models/Product";

const attarProducts = [
  {
    title: "Arabian Touch",
    slug: "arabian-touch",
    description:
      "A rich, opulent attar inspired by the mystique of the Arabian Peninsula. Deep oud, precious resins, and warm amber weave together into a fragrance of unparalleled depth and longevity. Handblended in Ahmedabad using traditional copper-distillation methods.",
    price: 250,
    comparePrice: null,
    images: ["/Attars/Arabian Touch.png"],
    category: "ATTAR",
    stock: 50,
    featured: true,
    notes: {
      top: "Saffron, Cardamom, Rose",
      heart: "Hindi Oud, Amber, Labdanum",
      base: "Sandalwood, Musk, Agarwood",
    },
    longevity: "12–18 hours",
    ingredients:
      "Mineral Oil, Parfum (Fragrance), Aquilaria Agallocha Wood Oil, Rosa Damascena Absolute, Crocus Sativus Extract.",
    rating: 4.9,
    reviewCount: 42,
    variants: [
      { size: "6ml", price: 250 },
      { size: "12ml", price: 350 },
    ],
  },
  {
    title: "Glacier",
    slug: "glacier",
    description:
      "A crisp, breath-of-fresh-air attar evoking the pure serenity of glacial peaks. Cool white florals, clean musks, and a whisper of cedarwood come together in a fragrance that is effortlessly modern yet timelessly elegant.",
    price: 250,
    comparePrice: null,
    images: ["/Attars/Glacier.png"],
    category: "ATTAR",
    stock: 50,
    featured: true,
    notes: {
      top: "Bergamot, Spearmint, Aldehydes",
      heart: "White Musk, Water Lily, Iris",
      base: "Cedarwood, Vetiver, Cashmeran",
    },
    longevity: "10–14 hours",
    ingredients:
      "Mineral Oil, Parfum (Fragrance), Cedrus Atlantica Bark Oil, Iris Pallida Root Extract, Vetiveria Zizanoides Root Oil.",
    rating: 4.8,
    reviewCount: 35,
    variants: [
      { size: "6ml", price: 250 },
      { size: "12ml", price: 350 },
    ],
  },
];

export async function GET() {
  try {
    await connectDB();

    const existing = await Product.countDocuments();
    if (existing > 0) {
      return NextResponse.json({
        message: `${existing} products already exist. Skipping seed.`,
        tip: "Visit /api/seed/reset to re-seed.",
      });
    }

    await Product.insertMany(attarProducts);

    return NextResponse.json({
      success: true,
      message: `✅ Seeded ${attarProducts.length} products successfully!`,
      products: attarProducts.map((p) => ({
        title: p.title,
        slug: p.slug,
        price: p.price,
        variants: p.variants,
      })),
    });
  } catch (error) {
    console.error("Seed error:", error);
    return NextResponse.json({ error: "Failed to seed products" }, { status: 500 });
  }
}
