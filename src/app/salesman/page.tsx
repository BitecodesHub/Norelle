import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import connectDB from "@/lib/mongoose";
import Coupon from "@/models/Coupon";
import Link from "next/link";
import { ArrowLeft, Plus, Tag } from "lucide-react";

export const metadata: Metadata = { title: "Salesman Dashboard — Norelle" };

export default async function SalesmanDashboard() {
  const session = await auth();
  const role = (session?.user as { role?: string })?.role;
  if (!session?.user || (role !== "SALESMAN" && role !== "ADMIN")) redirect("/");

  await connectDB();
  const userId = (session.user as { id?: string }).id;
  const myCoupons = await Coupon.find(
    role === "ADMIN" ? {} : { createdBy: userId }
  ).sort({ createdAt: -1 }).lean();

  const data = JSON.parse(JSON.stringify(myCoupons));

  return (
    <div className="min-h-screen bg-noir max-w-5xl mx-auto px-6 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <Link href="/" className="font-serif text-2xl tracking-widest text-cream">NORELLE</Link>
          <p className="text-xs text-gold font-sans tracking-widest uppercase mt-1">Salesman Panel</p>
        </div>
        <Link href="/" className="text-cream/50 hover:text-cream text-sm font-sans">← Back to Site</Link>
      </div>

      <div className="flex items-center justify-between mb-6">
        <h1 className="font-serif text-3xl text-cream">My Coupons</h1>
        <Link href="/salesman/coupons/new"
          className="flex items-center gap-2 px-5 py-2.5 bg-gold hover:bg-gold-light text-noir rounded-xl font-sans text-sm font-medium transition-all">
          <Plus className="w-4 h-4" /> Create Coupon
        </Link>
      </div>

      <div className="space-y-3">
        {data.length === 0 ? (
          <div className="text-center py-16 flex flex-col items-center gap-3">
            <Tag className="w-14 h-14 text-cream/10" />
            <p className="font-serif text-xl text-cream/40">No coupons created yet</p>
            <Link href="/salesman/coupons/new" className="px-5 py-2.5 bg-gold text-noir rounded-xl text-sm font-sans">Create First Coupon</Link>
          </div>
        ) : (
          data.map((c: Record<string, unknown>) => {
            const isExpired = new Date() > new Date(String(c.validUntil));
            const isExhausted = Number(c.timesUsed) >= Number(c.maxUses);
            const status = !c.isActive ? "Inactive" : isExpired ? "Expired" : isExhausted ? "Exhausted" : "Active";
            const statusStyle: Record<string, string> = {
              Active: "text-green-400 bg-green-400/10",
              Expired: "text-red-400 bg-red-400/10",
              Exhausted: "text-orange-400 bg-orange-400/10",
              Inactive: "text-cream/40 bg-white/5",
            };

            return (
              <div key={String(c._id)} className="glass-card rounded-2xl p-5 flex flex-wrap items-center gap-4 justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="font-serif text-xl text-gold tracking-widest">{String(c.code)}</span>
                    <span className={`text-xs px-2.5 py-1 rounded-full font-sans font-medium ${statusStyle[status]}`}>{status}</span>
                  </div>
                  <p className="text-xs text-cream/40 font-sans mt-1">
                    {String(c.discountType) === "PERCENTAGE" ? `${c.discountValue}% off` : `₹${c.discountValue} off`}
                    {Number(c.minOrderAmount) > 0 && ` · Min ₹${Number(c.minOrderAmount).toLocaleString("en-IN")}`}
                    {` · Used ${c.timesUsed}/${c.maxUses}`}
                  </p>
                </div>
                <div className="text-xs text-cream/30 font-sans">
                  <p>Valid: {new Date(String(c.validFrom)).toLocaleDateString("en-IN")} — {new Date(String(c.validUntil)).toLocaleDateString("en-IN")}</p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
