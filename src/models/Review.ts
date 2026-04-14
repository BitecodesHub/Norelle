import mongoose, { Document, Schema, Types } from "mongoose";

export interface IReview extends Document {
  product: Types.ObjectId;
  user: Types.ObjectId;
  userName: string;
  rating: number;
  comment: string;
  verified: boolean;
  createdAt: Date;
}

const ReviewSchema = new Schema<IReview>(
  {
    product: { type: Schema.Types.ObjectId, ref: "Product", required: true, index: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    userName: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true, trim: true },
    verified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Prevent duplicate reviews
ReviewSchema.index({ product: 1, user: 1 }, { unique: true });

const Review =
  mongoose.models.Review || mongoose.model<IReview>("Review", ReviewSchema);
export default Review;
