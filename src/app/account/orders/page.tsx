import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import connectDB from "@/lib/mongoose";
import Order from "@/models/Order";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { Package } from "lucide-react";

export const metadata: Metadata = { title: "My Orders" };

export default async function AccountOrdersPage() {
  const session = await auth();
  if (!session?.user) redirect("/login?callbackUrl=/account/orders");

  await connectDB();
  const orders = await Order.find({ user: (session.user as { id?: string }).id })
    .sort({ createdAt: -1 })
    .lean();
  const data = JSON.parse(JSON.stringify(orders));

  const statusColor: Record<string, string> = {
    PROCESSING: "text-yellow-700 bg-yellow-50 border-yellow-200",
    SHIPPED: "text-blue-700 bg-blue-50 border-blue-200",
    DELIVERED: "text-green-700 bg-green-50 border-green-200",
    CANCELLED: "text-red-700 bg-red-50 border-red-200",
  };

  return (
    <>
      <Navbar />
      <main className="pt-24 min-h-screen bg-parchment max-w-4xl mx-auto px-6 py-12">
        <h1 className="font-serif text-4xl text-cream mb-10">My Orders</h1>
        {data.length === 0 ? (
          <div className="text-center py-24 flex flex-col items-center gap-4">
            <Package className="w-20 h-20 text-tan" />
            <p className="font-serif text-2xl text-latte">No orders yet</p>
            <Link href="/shop" className="px-6 py-3 bg-gold text-noir rounded-xl font-sans text-sm hover:bg-gold-light transition-colors">Shop Now</Link>
          </div>
        ) : (
          <div className="space-y-4">
            {data.map((order: Record<string, unknown>) => (
              <div key={String(order._id)} className="bg-white border border-tan rounded-2xl p-6 shadow-card">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <p className="text-xs text-latte font-sans">Order ID</p>
                    <p className="text-sm text-cream font-sans font-medium">{String(order._id)}</p>
                    <p className="text-xs text-latte font-sans mt-1">
                      {new Date(String(order.createdAt)).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`text-xs px-3 py-1.5 rounded-full font-sans font-medium border ${statusColor[String(order.orderStatus)] ?? "text-mocha bg-charcoal border-tan"}`}>
                      {String(order.orderStatus)}
                    </span>
                    <span className="font-serif text-xl text-gold">₹{Number(order.finalTotal).toLocaleString("en-IN")}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
