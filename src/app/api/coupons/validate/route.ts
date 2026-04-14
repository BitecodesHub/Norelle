import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import Coupon from "@/models/Coupon";

export async function POST(req: NextRequest) {
  try {
    const { code, orderTotal } = await req.json();

    if (!code || typeof code !== "string") {
      return NextResponse.json({ error: "Coupon code is required" }, { status: 400 });
    }
    if (typeof orderTotal !== "number" || orderTotal <= 0) {
      return NextResponse.json({ error: "Invalid order total" }, { status: 400 });
    }

    await connectDB();

    const coupon = await Coupon.findOne({ code: code.toUpperCase().trim(), isActive: true });

    if (!coupon) {
      return NextResponse.json({ error: "Invalid or expired coupon code" }, { status: 404 });
    }

    const now = new Date();
    if (now < coupon.validFrom || now > coupon.validUntil) {
      return NextResponse.json({ error: "This coupon has expired" }, { status: 400 });
    }
    if (coupon.timesUsed >= coupon.maxUses) {
      return NextResponse.json({ error: "This coupon has reached its usage limit" }, { status: 400 });
    }
    if (orderTotal < coupon.minOrderAmount) {
      return NextResponse.json(
        { error: `Minimum order of ₹${coupon.minOrderAmount.toLocaleString("en-IN")} required for this coupon` },
        { status: 400 }
      );
    }

    const discount =
      coupon.discountType === "PERCENTAGE"
        ? Math.round((orderTotal * coupon.discountValue) / 100)
        : Math.min(coupon.discountValue, orderTotal);

    return NextResponse.json({
      valid: true,
      code: coupon.code,
      discountType: coupon.discountType,
      discountValue: coupon.discountValue,
      discount,
      minOrderAmount: coupon.minOrderAmount,
      message: `Coupon applied! You save ₹${discount.toLocaleString("en-IN")}`,
    });
  } catch (err) {
    console.error("[COUPON_VALIDATE]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
