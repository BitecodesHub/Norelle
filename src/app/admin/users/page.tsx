import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import connectDB from "@/lib/mongoose";
import User from "@/models/User";
import Link from "next/link";
import { ArrowLeft, Users } from "lucide-react";

export const metadata: Metadata = { title: "Manage Users — Admin" };

const roleColor: Record<string, string> = {
  ADMIN: "text-gold bg-gold/10 border-gold/30",
  SALESMAN: "text-purple-700 bg-purple-50 border-purple-200",
  USER: "text-mocha bg-charcoal border-tan",
};

export default async function AdminUsersPage() {
  const session = await auth();
  if (!session?.user || (session.user as { role?: string }).role !== "ADMIN") redirect("/");

  await connectDB();
  const users = await User.find().sort({ createdAt: -1 }).select("-password").lean();
  const data = JSON.parse(JSON.stringify(users));

  return (
    <div className="min-h-screen bg-parchment max-w-7xl mx-auto px-6 py-10">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin" className="text-mocha hover:text-cream transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="font-serif text-3xl text-cream">Users & Salesman</h1>
        <span className="text-xs bg-charcoal text-mocha px-3 py-1 rounded-full font-sans border border-tan">
          {data.length}
        </span>
      </div>

      {data.length === 0 ? (
        <div className="text-center py-24 flex flex-col items-center gap-4">
          <Users className="w-20 h-20 text-tan" />
          <p className="font-serif text-2xl text-latte">No users yet</p>
        </div>
      ) : (
        <div className="space-y-3">
          {data.map((user: Record<string, unknown>) => (
            <div key={String(user._id)} className="bg-white border border-tan rounded-2xl p-4 flex items-center gap-5 shadow-card">
              <div className="w-10 h-10 rounded-full bg-charcoal border border-tan flex items-center justify-center flex-shrink-0">
                <span className="font-serif text-sm text-gold">
                  {String(user.name ?? "?")[0]?.toUpperCase()}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-sans text-sm text-cream font-medium truncate">{String(user.name)}</h3>
                <p className="text-xs text-latte font-sans truncate">{String(user.email)}</p>
                <p className="text-xs text-latte/60 font-sans mt-0.5">
                  Joined {new Date(String(user.createdAt)).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                </p>
              </div>
              <span className={`text-xs px-3 py-1.5 rounded-full font-sans font-medium border flex-shrink-0 ${roleColor[String(user.role)] ?? "text-mocha bg-charcoal border-tan"}`}>
                {String(user.role)}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
