import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
    }, // e.g., “lucky-me-pancit-canton”
    description: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Product", productSchema);
