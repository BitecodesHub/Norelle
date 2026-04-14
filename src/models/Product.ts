import mongoose, { Document, Schema } from "mongoose";

export interface IProductNote {
  top: string;
  heart: string;
  base: string;
}

export interface IProduct extends Document {
  title: string;
  slug: string;
  description: string;
  price: number;
  comparePrice?: number;
  images: string[];
  category: "EAU_DE_PARFUM" | "EAU_DE_TOILETTE" | "ATTAR" | "BODY_MIST";
  stock: number;
  notes: IProductNote;
  longevity: string;
  ingredients: string;
  featured: boolean;
  rating: number;
  reviewCount: number;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>(
  {
    title: { type: String, required: true, trim: true },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      index: true,
    },
    description: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    comparePrice: { type: Number, min: 0 },
    images: [{ type: String }],
    category: {
      type: String,
      enum: ["EAU_DE_PARFUM", "EAU_DE_TOILETTE", "ATTAR", "BODY_MIST"],
      required: true,
    },
    stock: { type: Number, default: 0, min: 0 },
    notes: {
      top: { type: String, default: "" },
      heart: { type: String, default: "" },
      base: { type: String, default: "" },
    },
    longevity: { type: String, default: "" },
    ingredients: { type: String, default: "" },
    featured: { type: Boolean, default: false },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    reviewCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Product =
  mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema);
export default Product;
