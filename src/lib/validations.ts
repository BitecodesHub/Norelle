import { z } from "zod";

// Auth Schemas
export const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Must contain at least one uppercase letter")
    .regex(/[0-9]/, "Must contain at least one number")
    .regex(/[^a-zA-Z0-9]/, "Must contain at least one special character"),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

// Product Schema
export const productSchema = z.object({
  title: z.string().min(2, "Title too short"),
  slug: z.string().min(2).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Invalid slug"),
  description: z.string().min(10, "Description too short"),
  price: z.number().positive("Price must be positive"),
  comparePrice: z.number().positive().optional(),
  category: z.enum(["PERFUME", "ATTAR"]),
  stock: z.number().int().nonnegative(),
  notes: z.object({
    top: z.string(),
    heart: z.string(),
    base: z.string(),
  }),
  longevity: z.string(),
  ingredients: z.string(),
  featured: z.boolean().default(false),
});

// Coupon Schema
export const couponSchema = z.object({
  code: z
    .string()
    .min(4, "Code too short")
    .max(20, "Code too long")
    .toUpperCase()
    .regex(/^[A-Z0-9]+$/, "Only letters and numbers allowed"),
  discountType: z.enum(["PERCENTAGE", "FLAT"]),
  discountValue: z
    .number()
    .positive()
    .refine((v) => v <= 100, "Percentage cannot exceed 100"),
  minOrderAmount: z.number().nonnegative(),
  maxUses: z.number().int().positive(),
  validFrom: z.string(),
  validUntil: z.string(),
});

// Checkout Address Schema
export const addressSchema = z.object({
  fullName: z.string().min(2, "Full name required"),
  phone: z.string().regex(/^[6-9]\d{9}$/, "Enter a valid Indian mobile number"),
  addressLine1: z.string().min(5, "Address too short"),
  addressLine2: z.string().optional(),
  city: z.string().min(2, "City required"),
  state: z.string().min(2, "State required"),
  pincode: z.string().regex(/^[1-9][0-9]{5}$/, "Enter valid 6-digit pincode"),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type ProductInput = z.infer<typeof productSchema>;
export type CouponInput = z.infer<typeof couponSchema>;
export type AddressInput = z.infer<typeof addressSchema>;
