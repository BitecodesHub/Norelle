import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import connectDB from "@/lib/mongoose";
import razorpay from "@/lib/razorpay";
import Order from "@/models/Order";
import Coupon from "@/models/Coupon";

// POST /api/razorpay/create-order
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { items, shippingAddress, couponCode, subTotal, discountAmount, finalTotal } = body;

    if (!items?.length || !shippingAddress || typeof finalTotal !== "number") {
      return NextResponse.json({ error: "Invalid order data" }, { status: 400 });
    }

    await connectDB();

    // Validate coupon one more time server-side
    let couponDoc = null;
    if (couponCode) {
      couponDoc = await Coupon.findOne({ code: couponCode.toUpperCase(), isActive: true });
      if (!couponDoc) {
        return NextResponse.json({ error: "Invalid coupon" }, { status: 400 });
      }
    }

    // Create Razorpay order
    const razorpayOrder = await razorpay.orders.create({
      amount: Math.round(finalTotal * 100), // in paise
      currency: "INR",
      receipt: `norelle_${Date.now()}`,
      notes: { source: "norelle-web" },
    });

    // Create DB order (pending)
    const order = await Order.create({
      user: body.userId,
      items: items.map((i: { productId: string; title: string; image: string; price: number; quantity: number }) => ({
        product: i.productId,
        title: i.title,
        image: i.image,
        price: i.price,
        quantity: i.quantity,
      })),
      shippingAddress,
      couponApplied: couponDoc?._id,
      couponCode: couponCode ?? null,
      subTotal,
      discountAmount: discountAmount ?? 0,
      finalTotal,
      paymentStatus: "PENDING",
      orderStatus: "PROCESSING",
      razorpayOrderId: razorpayOrder.id,
    });

    return NextResponse.json({
      razorpayOrderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      orderId: order._id.toString(),
      keyId: process.env.RAZORPAY_KEY_ID,
    });
  } catch (err) {
    console.error("[CREATE_ORDER]", err);
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}

// POST /api/razorpay/verify
export async function PUT(req: NextRequest) {
  try {
    const { razorpayOrderId, razorpayPaymentId, razorpaySignature, orderId } = await req.json();

    // Verify signature
    const body = `${razorpayOrderId}|${razorpayPaymentId}`;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpaySignature) {
      return NextResponse.json({ error: "Payment verification failed" }, { status: 400 });
    }

    await connectDB();

    const order = await Order.findById(orderId);
    if (!order) return NextResponse.json({ error: "Order not found" }, { status: 404 });

    order.paymentStatus = "PAID";
    order.razorpayPaymentId = razorpayPaymentId;
    order.razorpaySignature = razorpaySignature;
    await order.save();

    // Increment coupon usage
    if (order.couponApplied) {
      await Coupon.findByIdAndUpdate(order.couponApplied, { $inc: { timesUsed: 1 } });
    }

    return NextResponse.json({ success: true, orderId: order._id.toString() });
  } catch (err) {
    console.error("[VERIFY_PAYMENT]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
