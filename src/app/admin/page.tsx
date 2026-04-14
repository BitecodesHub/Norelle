import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import connectDB from "@/lib/mongoose";
import Order from "@/models/Order";
import User from "@/models/User";
import Product from "@/models/Product";
import Link from "next/link";
import { Package, Users, ShoppingBag, TrendingUp, Plus, Settings } from "lucide-react";

export const metadata: Metadata = { title: "Admin Dashboard — Norelle" };

export default async function AdminDashboard() {
  const session = await auth();
  if (!session?.user || (session.user as { role?: string }).role !== "ADMIN") redirect("/");

  await connectDB();
  const [totalOrders, totalUsers, totalProducts, paidOrders] = await Promise.all([
    Order.countDocuments(),
    User.countDocuments(),
    Product.countDocuments(),
    Order.find({ paymentStatus: "PAID" }).select("finalTotal").lean(),
  ]);

  const totalRevenue = paidOrders.reduce((s, o) => s + ((o as { finalTotal?: number }).finalTotal ?? 0), 0);

  const stats = [
    { label: "Total Revenue", value: `₹${totalRevenue.toLocaleString("en-IN")}`, icon: TrendingUp, color: "text-gold" },
    { label: "Total Orders", value: totalOrders, icon: Package, color: "text-blue-400" },
    { label: "Products", value: totalProducts, icon: ShoppingBag, color: "text-purple-400" },
    { label: "Users", value: totalUsers, icon: Users, color: "text-green-400" },
  ];

  return (
    <div className="min-h-screen bg-parchment">
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <Link href="/" className="font-serif text-2xl tracking-widest text-cream">NORELLE</Link>
            <p className="text-xs text-gold font-sans tracking-widest uppercase mt-1">Admin Panel</p>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/admin/products/new" className="flex items-center gap-2 px-4 py-2.5 bg-gold text-noir rounded-xl font-sans text-sm font-medium hover:bg-gold-light transition-all">
              <Plus className="w-4 h-4" /> Add Product
            </Link>
            <Link href="/" className="text-mocha hover:text-cream transition-colors font-sans text-sm">← Back to Site</Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {stats.map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="bg-white border border-tan rounded-2xl p-6 shadow-card">
              <div className={`w-10 h-10 rounded-xl bg-charcoal flex items-center justify-center mb-4 ${color}`}>
                <Icon className="w-5 h-5" />
              </div>
              <p className={`font-serif text-3xl font-light ${color}`}>{value}</p>
              <p className="text-latte text-xs font-sans mt-1 tracking-wide">{label}</p>
            </div>
          ))}
        </div>

        {/* Navigation Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { href: "/admin/products", title: "Products", desc: "Add, edit, delete fragrances", icon: ShoppingBag },
            { href: "/admin/orders", title: "Orders", desc: "Manage & update order status", icon: Package },
            { href: "/admin/users", title: "Users & Salesman", desc: "Manage roles and accounts", icon: Users },
          ].map(({ href, title, desc, icon: Icon }) => (
            <Link key={href} href={href}
              className="bg-white border border-tan rounded-2xl p-6 hover:border-gold/40 hover:shadow-card-hover shadow-card transition-all duration-300 group">
              <Icon className="w-6 h-6 text-gold mb-4" />
              <h3 className="font-serif text-xl text-cream group-hover:text-gold transition-colors">{title}</h3>
              <p className="text-mocha font-sans text-sm mt-2">{desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
