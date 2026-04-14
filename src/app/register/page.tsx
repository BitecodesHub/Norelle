"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";
import { registerSchema, type RegisterInput } from "@/lib/validations";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const router = useRouter();
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterInput) => {
    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Registration failed");
      toast.success("Account created! Please sign in.");
      router.push("/login");
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-parchment flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(212,175,55,0.06)_0%,_transparent_70%)] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative w-full max-w-md"
      >
        <div className="text-center mb-10">
          <Link href="/" className="font-serif text-3xl tracking-[0.4em] text-cream">NORELLE</Link>
          <p className="text-latte font-sans text-sm mt-2 tracking-widest uppercase">Create Account</p>
        </div>

        <div className="bg-white border border-tan rounded-2xl p-8 space-y-4 shadow-card">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-latte" />
                <input {...register("name")} placeholder="Full name"
                  className="w-full pl-11 pr-4 py-3.5 bg-charcoal border border-tan rounded-xl text-cream placeholder-latte font-sans text-sm focus:outline-none focus:border-gold/60 transition-colors" />
              </div>
              {errors.name && <p className="text-red-500 text-xs font-sans mt-1 ml-1">{errors.name.message}</p>}
            </div>

            <div>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-latte" />
                <input {...register("email")} type="email" placeholder="Email address"
                  className="w-full pl-11 pr-4 py-3.5 bg-charcoal border border-tan rounded-xl text-cream placeholder-latte font-sans text-sm focus:outline-none focus:border-gold/60 transition-colors" />
              </div>
              {errors.email && <p className="text-red-500 text-xs font-sans mt-1 ml-1">{errors.email.message}</p>}
            </div>

            <div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-latte" />
                <input {...register("password")} type={showPass ? "text" : "password"} placeholder="Password (min 8 chars)"
                  className="w-full pl-11 pr-12 py-3.5 bg-charcoal border border-tan rounded-xl text-cream placeholder-latte font-sans text-sm focus:outline-none focus:border-gold/60 transition-colors" />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-latte hover:text-mocha transition-colors">
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-xs font-sans mt-1 ml-1">{errors.password.message}</p>}
            </div>

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              type="submit" disabled={loading}
              className="w-full py-4 bg-gold hover:bg-gold-light text-noir font-sans text-sm tracking-widest uppercase font-medium rounded-xl transition-all duration-300 disabled:opacity-60 hover:shadow-gold-glow"
            >
              {loading ? "Creating account…" : "Create Account"}
            </motion.button>
          </form>
        </div>

        <p className="text-center text-sm text-latte font-sans mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-gold hover:text-gold-dark transition-colors font-medium">Sign in</Link>
        </p>
      </motion.div>
    </div>
  );
}
