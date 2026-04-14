import { Suspense } from "react";
import type { Metadata } from "next";
import OrderSuccessClient from "@/components/OrderSuccessClient";

export const metadata: Metadata = { title: "Order Placed Successfully" };

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-noir flex items-center justify-center"><p className="text-cream/40 font-sans">Loading…</p></div>}>
      <OrderSuccessClient />
    </Suspense>
  );
}
