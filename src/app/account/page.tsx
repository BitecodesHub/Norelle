import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { Package, User, LogOut } from "lucide-react";

export const metadata: Metadata = { title: "My Account — Norelle" };

export default async function AccountPage() {
  const session = await auth();
  if (!session?.user) redirect("/login?callbackUrl=/account");

  const user = session.user as { name?: string; email?: string; role?: string; image?: string };

  return (
    <>
      <Navbar />
      <main className="pt-24 min-h-screen bg-parchment">
        <div className="max-w-2xl mx-auto px-6 py-12">
          {/* Header */}
          <div className="mb-10">
            <p className="text-[10px] tracking-[0.5em] text-gold uppercase font-sans mb-3">Account</p>
            <h1 className="font-serif text-4xl text-cream font-light">
              Welcome, {user.name?.split(" ")[0] ?? "there"}
            </h1>
            <p className="text-latte font-sans text-sm mt-2">{user.email}</p>
          </div>

          {/* Cards */}
          <div className="space-y-3">
            <Link
              href="/account/orders"
              className="flex items-center gap-5 bg-white border border-tan rounded-2xl p-6 hover:border-gold/40 hover:shadow-card-hover shadow-card transition-all duration-300 group"
            >
              <div className="w-11 h-11 rounded-xl bg-charcoal flex items-center justify-center flex-shrink-0">
                <Package className="w-5 h-5 text-gold" />
              </div>
              <div className="flex-1">
                <h2 className="font-serif text-lg text-cream group-hover:text-gold transition-colors">My Orders</h2>
                <p className="text-mocha font-sans text-sm mt-0.5">Track and view your order history</p>
              </div>
              <span className="text-latte/40 font-sans text-xs">→</span>
            </Link>

            <div className="flex items-center gap-5 bg-white border border-tan rounded-2xl p-6 shadow-card">
              <div className="w-11 h-11 rounded-xl bg-charcoal flex items-center justify-center flex-shrink-0">
                <User className="w-5 h-5 text-mocha" />
              </div>
              <div className="flex-1">
                <h2 className="font-serif text-lg text-cream">Profile</h2>
                <p className="text-mocha font-sans text-sm mt-0.5">{user.email}</p>
                {user.role && user.role !== "USER" && (
                  <span className="inline-block mt-1 text-[10px] font-sans text-gold bg-gold/10 border border-gold/20 px-2 py-0.5 rounded-full">
                    {user.role}
                  </span>
                )}
              </div>
            </div>

            <form action="/api/auth/signout" method="POST">
              <button
                type="submit"
                className="w-full flex items-center gap-5 bg-white border border-tan rounded-2xl p-6 hover:border-red-200 shadow-card transition-all duration-300 group text-left"
              >
                <div className="w-11 h-11 rounded-xl bg-charcoal flex items-center justify-center flex-shrink-0">
                  <LogOut className="w-5 h-5 text-latte group-hover:text-red-500 transition-colors" />
                </div>
                <div className="flex-1">
                  <h2 className="font-serif text-lg text-cream group-hover:text-red-500 transition-colors">Sign Out</h2>
                  <p className="text-mocha font-sans text-sm mt-0.5">Sign out of your account</p>
                </div>
              </button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
