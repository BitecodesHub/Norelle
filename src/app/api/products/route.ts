import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import connectDB from "@/lib/mongoose";
import Product from "@/models/Product";
import { productSchema } from "@/lib/validations";

// GET all products
export async function GET() {
  try {
    await connectDB();
    const products = await Product.find().sort({ createdAt: -1 }).lean();
    return NextResponse.json(products);
  } catch {
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}

// POST create product (admin only)
export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user || (session.user as { role?: string }).role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const body = await req.json();
    const parsed = productSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 });
    }

    await connectDB();
    const existing = await Product.findOne({ slug: parsed.data.slug });
    if (existing) return NextResponse.json({ error: "A product with this slug already exists" }, { status: 409 });

    const product = await Product.create(parsed.data);
    return NextResponse.json(product, { status: 201 });
  } catch (err) {
    console.error("[PRODUCT_CREATE]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
