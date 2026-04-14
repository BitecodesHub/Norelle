"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { couponSchema, type CouponInput } from "@/lib/validations";
import toast from "react-hot-toast";

export default function NewCouponPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, watch, formState: { errors } } = useForm<CouponInput>({
    resolver: zodResolver(couponSchema),
    defaultValues: { discountType: "PERCENTAGE", maxUses: 100, minOrderAmount: 0 },
  });

  const discountType = watch("discountType");

  const onSubmit = async (data: CouponInput) => {
    setLoading(true);
    try {
      const res = await fetch("/api/coupons", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Failed to create coupon");
      toast.success(`Coupon ${data.code} created!`);
      router.push("/salesman");
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Error creating coupon");
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-cream placeholder-cream/30 font-sans text-sm focus:outline-none focus:border-gold/50 transition-colors";
  const labelClass = "block text-xs text-cream/50 font-sans uppercase tracking-widest mb-2";

  return (
    <div className="min-h-screen bg-noir max-w-2xl mx-auto px-6 py-10">
      <div className="flex items-center gap-4 mb-10">
        <Link href="/salesman" className="text-cream/50 hover:text-cream transition-colors"><ArrowLeft className="w-5 h-5" /></Link>
        <div>
          <h1 className="font-serif text-3xl text-cream">Create Coupon</h1>
          <p className="text-cream/40 font-sans text-sm mt-1">Configure discount rules for your coupon code</p>
        </div>
      </div>

      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={handleSubmit(onSubmit)}
        className="glass-card rounded-2xl p-8 space-y-6"
      >
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <label className={labelClass}>Coupon Code</label>
            <input {...register("code")} placeholder="e.g. YASH20" className={inputClass}
              style={{ textTransform: "uppercase" }} />
            {errors.code && <p className="text-red-400 text-xs font-sans mt-1">{errors.code.message}</p>}
          </div>

          <div>
            <label className={labelClass}>Discount Type</label>
            <select {...register("discountType")} className={inputClass + " cursor-pointer"}>
              <option value="PERCENTAGE">Percentage (%)</option>
              <option value="FLAT">Flat Amount (₹)</option>
            </select>
          </div>

          <div>
            <label className={labelClass}>{discountType === "PERCENTAGE" ? "Discount %" : "Discount ₹"}</label>
            <input {...register("discountValue", { valueAsNumber: true })} type="number" min="1" placeholder={discountType === "PERCENTAGE" ? "e.g. 20" : "e.g. 200"} className={inputClass} />
            {errors.discountValue && <p className="text-red-400 text-xs font-sans mt-1">{errors.discountValue.message}</p>}
          </div>

          <div>
            <label className={labelClass}>Min Order Amount (₹)</label>
            <input {...register("minOrderAmount", { valueAsNumber: true })} type="number" min="0" placeholder="0" className={inputClass} />
          </div>

          <div>
            <label className={labelClass}>Max Uses</label>
            <input {...register("maxUses", { valueAsNumber: true })} type="number" min="1" placeholder="100" className={inputClass} />
          </div>

          <div>
            <label className={labelClass}>Valid From</label>
            <input {...register("validFrom")} type="date" className={inputClass} />
            {errors.validFrom && <p className="text-red-400 text-xs font-sans mt-1">{errors.validFrom.message}</p>}
          </div>

          <div>
            <label className={labelClass}>Valid Until</label>
            <input {...register("validUntil")} type="date" className={inputClass} />
            {errors.validUntil && <p className="text-red-400 text-xs font-sans mt-1">{errors.validUntil.message}</p>}
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          type="submit"
          disabled={loading}
          className="w-full py-4 bg-gold hover:bg-gold-light text-noir font-sans text-sm tracking-widest uppercase font-medium rounded-xl transition-all disabled:opacity-60 hover:shadow-gold-glow"
        >
          {loading ? "Creating…" : "Create Coupon"}
        </motion.button>
      </motion.form>
    </div>
  );
}
