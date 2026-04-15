import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import Product from "@/models/Product";

// PATCH update product fields by slug (admin use)
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const body = await req.json();
    await connectDB();

    const product = await Product.findOneAndUpdate(
      { slug },
      { $set: body },
      { new: true }
    );

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch {
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
  }
}
