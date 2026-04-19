import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import connectDB from "@/lib/mongoose";
import Product from "@/models/Product";
import Link from "next/link";
import Image from "next/image";
import { Plus, Pencil, Trash2, ArrowLeft } from "lucide-react";
import AdminDeleteProduct from "@/components/admin/AdminDeleteProduct";

export const metadata: Metadata = { title: "Manage Products — Admin" };

export default async function AdminProductsPage() {
  const session = await auth();
  if (!session?.user || (session.user as { role?: string }).role !== "ADMIN") redirect("/");

  await connectDB();
  const products = await Product.find().sort({ createdAt: -1 }).lean();
  const data = JSON.parse(JSON.stringify(products));

  return (
    <div className="min-h-screen bg-parchment max-w-7xl mx-auto px-6 py-10">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link href="/admin" className="text-cream/50 hover:text-cream transition-colors"><ArrowLeft className="w-5 h-5" /></Link>
          <h1 className="font-serif text-3xl text-cream">Products</h1>
          <span className="text-xs bg-white/10 text-cream/60 px-3 py-1 rounded-full font-sans">{data.length}</span>
        </div>
        <Link href="/admin/products/new"
          className="flex items-center gap-2 px-5 py-2.5 bg-gold hover:bg-gold-light text-noir rounded-xl font-sans text-sm font-medium transition-all">
          <Plus className="w-4 h-4" /> New Product
        </Link>
      </div>

      <div className="space-y-3">
        {data.map((p: Record<string, unknown>) => (
          <div key={String(p._id)} className="glass-card rounded-2xl p-4 flex items-center gap-5">
            <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-charcoal-light flex-shrink-0">
              {(p.images as string[])?.[0] ? (
                <Image src={(p.images as string[])[0]} alt={String(p.title)} fill className="object-cover" />
              ) : (
                <div className="w-full h-full bg-charcoal-light" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-serif text-base text-cream truncate">{String(p.title)}</h3>
              <p className="text-xs text-cream/40 font-sans">{String(p.category)} · Stock: {String(p.stock)}</p>
            </div>
            <span className="font-serif text-lg text-gold">₹{Number(p.price).toLocaleString("en-IN")}</span>
            <div className="flex items-center gap-2">
              <Link href={`/admin/products/${String(p._id)}/edit`}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-cream/60 hover:text-cream transition-all">
                <Pencil className="w-4 h-4" />
              </Link>
              <AdminDeleteProduct productId={String(p._id)} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
