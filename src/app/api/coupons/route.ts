import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import connectDB from "@/lib/mongoose";
import Coupon from "@/models/Coupon";
import User from "@/models/User";
import { couponSchema } from "@/lib/validations";

// GET — list coupons (salesman: own, admin: all)
export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();
  const query =
    (session.user as { role?: string }).role === "ADMIN"
      ? {}
      : { createdBy: (session.user as { id?: string }).id };

  const coupons = await Coupon.find(query)
    .populate("createdBy", "name email")
    .sort({ createdAt: -1 })
    .lean();

  return NextResponse.json(coupons);
}

// POST — create coupon (salesman or admin)
export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const role = (session.user as { role?: string }).role;
  if (role !== "SALESMAN" && role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const body = await req.json();
    const parsed = couponSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 });
    }

    await connectDB();

    const exists = await Coupon.findOne({ code: parsed.data.code });
    if (exists) {
      return NextResponse.json({ error: "Coupon code already exists" }, { status: 409 });
    }

    // Verify salesman exists
    const userId = (session.user as { id?: string }).id;
    const userExists = await User.findById(userId);
    if (!userExists) return NextResponse.json({ error: "User not found" }, { status: 404 });

    const coupon = await Coupon.create({
      ...parsed.data,
      validFrom: new Date(parsed.data.validFrom),
      validUntil: new Date(parsed.data.validUntil),
      createdBy: userId,
    });

    return NextResponse.json(coupon, { status: 201 });
  } catch (err) {
    console.error("[COUPON_CREATE]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
