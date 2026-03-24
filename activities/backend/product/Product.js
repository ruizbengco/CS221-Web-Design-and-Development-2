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
    }, // e.g., "lucky-me-pancit-canton"
    description: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    // Image URL for the product
    image: {
      type: String,
      default: "",
    },
    // Category for grouping products
    category: {
      type: String,
      default: "general",
    },
    // Number of items in stock
    stock: {
      type: Number,
      default: 0,
      min: 0,
    },
    // Is the product active/visible? (default: true)
    isActive: {
      type: Boolean,
      default: true,
    },
    // Is this a featured product? (default: false)
    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Product", productSchema);
