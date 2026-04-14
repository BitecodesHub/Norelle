"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { Tag, CheckCircle, X } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { addressSchema, type AddressInput } from "@/lib/validations";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import toast from "react-hot-toast";

declare global {
  interface Window {
    Razorpay: new (options: Record<string, unknown>) => { open: () => void };
  }
}

export default function CheckoutPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const { items, coupon, getSubTotal, getDiscount, getTotal, applyCoupon, removeCoupon, clearCart } = useCartStore();
  const [couponCode, setCouponCode] = useState("");
  const [couponLoading, setCouponLoading] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<AddressInput>({
    resolver: zodResolver(addressSchema),
  });

  const validateCoupon = async () => {
    if (!couponCode.trim()) return;
    setCouponLoading(true);
    try {
      const res = await fetch("/api/coupons/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: couponCode.trim(), orderTotal: getSubTotal() }),
      });
      const data = await res.json();
      if (!res.ok) { toast.error(data.error); return; }
      applyCoupon({ code: data.code, discountType: data.discountType, discountValue: data.discountValue, minOrderAmount: data.minOrderAmount });
      toast.success(data.message);
    } catch { toast.error("Failed to apply coupon"); }
    finally { setCouponLoading(false); }
  };

  const loadRazorpay = () => new Promise<boolean>((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });

  const onSubmit = async (address: AddressInput) => {
    if (items.length === 0) { toast.error("Your cart is empty"); return; }
    setPaymentLoading(true);

    try {
      const loaded = await loadRazorpay();
      if (!loaded) { toast.error("Payment gateway failed to load. Check internet connection."); return; }

      // Create Razorpay order
      const orderRes = await fetch("/api/razorpay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: (session?.user as { id?: string })?.id,
          items: items.map((i) => ({ productId: i.id, title: i.title, image: i.image, price: i.price, quantity: i.quantity })),
          shippingAddress: address,
          couponCode: coupon?.code ?? null,
          subTotal: getSubTotal(),
          discountAmount: getDiscount(),
          finalTotal: getTotal(),
        }),
      });

      const orderData = await orderRes.json();
      if (!orderRes.ok) { toast.error(orderData.error ?? "Failed to create order"); return; }

      // Open Razorpay
      const rzp = new window.Razorpay({
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Norelle",
        description: "Luxury Fragrances",
        order_id: orderData.razorpayOrderId,
        prefill: { name: address.fullName, contact: address.phone, email: session?.user?.email ?? "" },
        theme: { color: "#D4AF37" },
        handler: async (response: { razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string }) => {
          const verifyRes = await fetch("/api/razorpay", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
              orderId: orderData.orderId,
            }),
          });
          const verifyData = await verifyRes.json();
          if (verifyData.success) {
            clearCart();
            router.push(`/order-success?orderId=${verifyData.orderId}`);
          } else {
            toast.error("Payment verification failed. Contact support.");
          }
        },
        modal: { ondismiss: () => setPaymentLoading(false) },
      });
      rzp.open();
    } catch { toast.error("Something went wrong. Please try again."); }
    finally { setPaymentLoading(false); }
  };

  const fmt = (n: number) => `₹${n.toLocaleString("en-IN")}`;

  if (items.length === 0) {
    return (
      <>
        <Navbar />
        <main className="pt-32 min-h-screen bg-parchment flex flex-col items-center justify-center gap-4">
          <p className="font-serif text-2xl text-latte">Your cart is empty</p>
          <a href="/shop" className="px-6 py-3 bg-gold text-noir rounded-xl font-sans text-sm hover:bg-gold-light transition-colors">Shop Now</a>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="pt-24 min-h-screen bg-parchment">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-serif text-4xl text-cream mb-10">Checkout</motion.h1>

          <div className="grid lg:grid-cols-5 gap-10">
            {/* Left — Address form */}
            <div className="lg:col-span-3 space-y-6">
              <div className="bg-white border border-tan rounded-2xl p-6 shadow-card">
                <h2 className="font-serif text-xl text-cream mb-6">Shipping Address</h2>
                <form id="checkout-form" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  {[
                    { name: "fullName" as const, label: "Full Name", type: "text", col: 2 },
                    { name: "phone" as const, label: "Phone Number", type: "tel", col: 1 },
                    { name: "addressLine1" as const, label: "Address Line 1", type: "text", col: 2 },
                    { name: "addressLine2" as const, label: "Address Line 2 (Optional)", type: "text", col: 2 },
                    { name: "city" as const, label: "City", type: "text", col: 1 },
                    { name: "state" as const, label: "State", type: "text", col: 1 },
                    { name: "pincode" as const, label: "Pincode", type: "text", col: 1 },
                  ].map(({ name, label, type, col }) => (
                    <div key={name} className={col === 2 ? "col-span-2" : ""}>
                      <input
                        {...register(name)}
                        type={type}
                        placeholder={label}
                        className="w-full px-4 py-3 bg-charcoal border border-tan rounded-xl text-cream placeholder-latte font-sans text-sm focus:outline-none focus:border-gold/50 transition-colors"
                      />
                      {errors[name] && <p className="text-red-500 text-xs font-sans mt-1 ml-1">{errors[name]?.message}</p>}
                    </div>
                  ))}
                </form>
              </div>
            </div>

            {/* Right — Order summary */}
            <div className="lg:col-span-2 space-y-4">
              {/* Items */}
              <div className="bg-white border border-tan rounded-2xl p-6 space-y-3 shadow-card">
                <h2 className="font-serif text-xl text-cream mb-2">Order Summary</h2>
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between items-center text-sm font-sans">
                    <span className="text-mocha truncate max-w-[160px]">{item.title} × {item.quantity}</span>
                    <span className="text-cream font-medium">{fmt(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>

              {/* Coupon */}
              <div className="bg-white border border-tan rounded-2xl p-6 shadow-card">
                <h3 className="font-serif text-base text-cream mb-3 flex items-center gap-2"><Tag className="w-4 h-4 text-gold" />Have a Coupon?</h3>
                {coupon ? (
                  <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-xl px-4 py-3">
                    <div>
                      <p className="text-green-700 font-sans text-sm font-medium">{coupon.code}</p>
                      <p className="text-green-600 text-xs font-sans">— {fmt(getDiscount())} saved</p>
                    </div>
                    <button onClick={removeCoupon} className="text-latte hover:text-red-500 transition-colors"><X className="w-4 h-4" /></button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <input
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                      placeholder="ENTER CODE"
                      className="flex-1 px-4 py-2.5 bg-charcoal border border-tan rounded-xl text-cream placeholder-latte font-sans text-sm focus:outline-none focus:border-gold/50 transition-colors"
                      onKeyDown={(e) => e.key === "Enter" && validateCoupon()}
                    />
                    <button
                      onClick={validateCoupon}
                      disabled={couponLoading || !couponCode}
                      className="px-4 py-2.5 bg-gold hover:bg-gold-light text-noir rounded-xl font-sans text-xs font-semibold transition-all disabled:opacity-50"
                    >
                      {couponLoading ? "…" : "Apply"}
                    </button>
                  </div>
                )}
              </div>

              {/* Totals + Pay */}
              <div className="bg-white border border-tan rounded-2xl p-6 space-y-3 shadow-card">
                <div className="flex justify-between text-sm font-sans text-mocha">
                  <span>Subtotal</span><span>{fmt(getSubTotal())}</span>
                </div>
                {getDiscount() > 0 && (
                  <div className="flex justify-between text-sm font-sans text-green-600">
                    <span>Discount</span><span>— {fmt(getDiscount())}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm font-sans text-mocha">
                  <span>Shipping</span><span className="text-green-600 font-medium">Free</span>
                </div>
                <div className="h-px bg-tan" />
                <div className="flex justify-between font-serif text-xl text-cream">
                  <span>Total</span><span className="text-gold">{fmt(getTotal())}</span>
                </div>

                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  form="checkout-form"
                  type="submit"
                  disabled={paymentLoading}
                  className="w-full py-4 mt-2 bg-gold hover:bg-gold-light text-noir font-sans text-sm tracking-widest uppercase font-semibold rounded-xl transition-all duration-300 hover:shadow-gold-glow disabled:opacity-60"
                >
                  {paymentLoading ? "Processing…" : `Pay ${fmt(getTotal())}`}
                </motion.button>
                <p className="text-xs text-latte text-center font-sans">Secure payment via Razorpay 🔒</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
