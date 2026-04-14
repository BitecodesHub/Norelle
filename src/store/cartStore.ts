"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  id: string;
  slug: string;
  title: string;
  image: string;
  price: number;
  quantity: number;
}

interface CouponState {
  code: string;
  discountType: "PERCENTAGE" | "FLAT";
  discountValue: number;
  minOrderAmount: number;
}

interface CartStore {
  items: CartItem[];
  coupon: CouponState | null;
  isOpen: boolean;

  addItem: (item: Omit<CartItem, "quantity"> & { quantity?: number }) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  applyCoupon: (coupon: CouponState) => void;
  removeCoupon: () => void;

  // Computed
  getSubTotal: () => number;
  getDiscount: () => number;
  getTotal: () => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      coupon: null,
      isOpen: false,

      addItem: (item) => {
        const existing = get().items.find((i) => i.id === item.id);
        if (existing) {
          set((s) => ({
            items: s.items.map((i) =>
              i.id === item.id
                ? { ...i, quantity: i.quantity + (item.quantity ?? 1) }
                : i
            ),
          }));
        } else {
          set((s) => ({
            items: [...s.items, { ...item, quantity: item.quantity ?? 1 }],
          }));
        }
        set({ isOpen: true });
      },

      removeItem: (id) =>
        set((s) => ({ items: s.items.filter((i) => i.id !== id) })),

      updateQuantity: (id, quantity) => {
        if (quantity < 1) {
          get().removeItem(id);
          return;
        }
        set((s) => ({
          items: s.items.map((i) => (i.id === id ? { ...i, quantity } : i)),
        }));
      },

      clearCart: () => set({ items: [], coupon: null }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),

      applyCoupon: (coupon) => set({ coupon }),
      removeCoupon: () => set({ coupon: null }),

      getSubTotal: () =>
        get().items.reduce((acc, i) => acc + i.price * i.quantity, 0),

      getDiscount: () => {
        const coupon = get().coupon;
        if (!coupon) return 0;
        const sub = get().getSubTotal();
        if (sub < coupon.minOrderAmount) return 0;
        if (coupon.discountType === "PERCENTAGE") {
          return Math.round((sub * coupon.discountValue) / 100);
        }
        return Math.min(coupon.discountValue, sub);
      },

      getTotal: () => {
        const sub = get().getSubTotal();
        const disc = get().getDiscount();
        return Math.max(0, sub - disc);
      },

      getItemCount: () => get().items.reduce((acc, i) => acc + i.quantity, 0),
    }),
    {
      name: "norelle-cart",
      partialize: (s) => ({ items: s.items, coupon: s.coupon }),
    }
  )
);
