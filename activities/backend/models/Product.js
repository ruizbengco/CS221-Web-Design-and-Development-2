import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
  name: { 
    type: String,
    required: true
  },
  slug: { 
    type: String, 
    unique: true, 
    lowercase: true 
  },	// e.g., “lucky-me-pancit-canton”
  description: { 
    type: String
  },
  price: { 
    type: Number, 
    required: true, 
    min: 0
  },
  category: {
    type: String,
    enum:[]	//add your categories
  },
  tags: [String],
  
  // Product details
  thumbnail: String,
  images: [String],
  
  // Inventory and Status
  stock: {
    type: Number,
    default: -1
  }, 	// -1 = unlimited, 0 = out of stock
  isFeatured: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  },
},
  { timestamps: true },
);



export default mongoose.model("Product", productSchema);