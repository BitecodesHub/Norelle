import mongoose, { Document, Schema, Types } from "mongoose";

export interface ICoupon extends Document {
  code: string;
  discountType: "PERCENTAGE" | "FLAT";
  discountValue: number;
  minOrderAmount: number;
  maxUses: number;
  timesUsed: number;
  validFrom: Date;
  validUntil: Date;
  createdBy: Types.ObjectId; // Salesman user ID
  isActive: boolean;
  createdAt: Date;
}

const CouponSchema = new Schema<ICoupon>(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
      index: true,
    },
    discountType: {
      type: String,
      enum: ["PERCENTAGE", "FLAT"],
      required: true,
    },
    discountValue: { type: Number, required: true, min: 0 },
    minOrderAmount: { type: Number, default: 0, min: 0 },
    maxUses: { type: Number, default: 100, min: 1 },
    timesUsed: { type: Number, default: 0, min: 0 },
    validFrom: { type: Date, required: true },
    validUntil: { type: Date, required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// Virtual: isExpired
CouponSchema.virtual("isExpired").get(function () {
  return new Date() > this.validUntil;
});

// Virtual: isExhausted
CouponSchema.virtual("isExhausted").get(function () {
  return this.timesUsed >= this.maxUses;
});

const Coupon =
  mongoose.models.Coupon || mongoose.model<ICoupon>("Coupon", CouponSchema);
export default Coupon;
