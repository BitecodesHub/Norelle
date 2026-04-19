import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import connectDB from "@/lib/mongoose";
import Order from "@/models/Order";
import Link from "next/link";
import { ArrowLeft, Package } from "lucide-react";

export const metadata: Metadata = { title: "Manage Orders — Admin" };

const statusColor: Record<string, string> = {
  PROCESSING: "text-yellow-700 bg-yellow-50 border-yellow-200",
  SHIPPED: "text-blue-700 bg-blue-50 border-blue-200",
  DELIVERED: "text-green-700 bg-green-50 border-green-200",
  CANCELLED: "text-red-700 bg-red-50 border-red-200",
};

const paymentColor: Record<string, string> = {
  PAID: "text-green-700 bg-green-50 border-green-200",
  PENDING: "text-yellow-700 bg-yellow-50 border-yellow-200",
  FAILED: "text-red-700 bg-red-50 border-red-200",
  REFUNDED: "text-purple-700 bg-purple-50 border-purple-200",
};

export default async function AdminOrdersPage() {
  const session = await auth();
  if (!session?.user || (session.user as { role?: string }).role !== "ADMIN") redirect("/");

  await connectDB();
  const orders = await Order.find().sort({ createdAt: -1 }).lean();
  const data = JSON.parse(JSON.stringify(orders));

  return (
    <div className="min-h-screen bg-parchment max-w-7xl mx-auto px-6 py-10">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin" className="text-mocha hover:text-cream transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="font-serif text-3xl text-cream">Orders</h1>
        <span className="text-xs bg-charcoal text-mocha px-3 py-1 rounded-full font-sans border border-tan">
          {data.length}
        </span>
      </div>

      {data.length === 0 ? (
        <div className="text-center py-24 flex flex-col items-center gap-4">
          <Package className="w-20 h-20 text-tan" />
          <p className="font-serif text-2xl text-latte">No orders yet</p>
        </div>
      ) : (
        <div className="space-y-3">
          {data.map((order: Record<string, unknown>) => {
            const address = order.shippingAddress as Record<string, string> | undefined;
            return (
              <div key={String(order._id)} className="bg-white border border-tan rounded-2xl p-5 shadow-card">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <p className="text-xs text-latte font-sans">Order ID</p>
                    <p className="text-sm text-cream font-sans font-medium font-mono">{String(order._id)}</p>
                    {address && (
                      <p className="text-xs text-mocha font-sans">
                        {address.fullName} · {address.phone} · {address.city}
                      </p>
                    )}
                    <p className="text-xs text-latte font-sans">
                      {new Date(String(order.createdAt)).toLocaleDateString("en-IN", {
                        day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit",
                      })}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className={`text-xs px-3 py-1.5 rounded-full font-sans font-medium border ${paymentColor[String(order.paymentStatus)] ?? "text-mocha bg-charcoal border-tan"}`}>
                      {String(order.paymentStatus)}
                    </span>
                    <span className={`text-xs px-3 py-1.5 rounded-full font-sans font-medium border ${statusColor[String(order.orderStatus)] ?? "text-mocha bg-charcoal border-tan"}`}>
                      {String(order.orderStatus)}
                    </span>
                    <span className="font-serif text-xl text-gold">₹{Number(order.finalTotal).toLocaleString("en-IN")}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
