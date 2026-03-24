import Product from "./Product.js";
import mongoose from "mongoose";

// GET /api/product - List all active products
// Query param: ?includeInactive=true (for admin use)
export const getAll = async (req, res) => {
  try {
    // Check if request wants to include inactive products
    // If includeInactive is "true", show all products
    // Otherwise, only show active products (isActive: true)
    const includeInactive = req.query.includeInactive === "true";
    
    // Build the filter object based on query
    const filter = {};
    if (!includeInactive) {
      filter.isActive = true;
    }

    // Fetch products from database with the filter
    const products = await Product.find(filter);

    // Return the products array
    res.status(200).json({ products });
  } catch (error) {
    // If something goes wrong, return error message
    res.status(500).json({ message: error.message });
  }
};

// GET /api/product/featured - List only featured products
export const getFeatured = async (req, res) => {
  try {
    // Filter: isActive must be true AND isFeatured must be true
    const filter = {
      isActive: true,
      isFeatured: true,
    };

    // Fetch only featured products
    const products = await Product.find(filter);

    // Return featured products
    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST /api/product/:id/feature - Toggle featured status
export const toggleFeatured = async (req, res) => {
  try {
    // Get the product ID from the URL parameters
    const { id } = req.params;

    // Check if the ID is valid (is a valid MongoDB ObjectId)
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid product ID." });
    }

    // Find the product by ID
    const product = await Product.findById(id);

    // If product doesn't exist, return error
    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }

    // Toggle the isFeatured value (true becomes false, false becomes true)
    const newFeaturedStatus = !product.isFeatured;

    // Update the product's isFeatured field
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { isFeatured: newFeaturedStatus },
      { new: true } // Return the updated product
    );

    // Return success message with new status
    res.status(200).json({
      message: `Product is now ${newFeaturedStatus ? "featured" : "not featured"}.`,
      isFeatured: newFeaturedStatus,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const create = async (req, res) => {
  try {
    // Extract all fields from request body
    const { name, slug, description, price, image, category, stock } = req.body;

    // Search for product with same slug
    const productExists = await Product.findOne({ slug });
    if (productExists) {
      return res.status(400).json({ message: "Product already exists." });
    }

    // Create new product with all fields
    // isActive defaults to true, isFeatured defaults to false from schema
    const product = await Product.create({
      name,
      slug,
      description,
      price,
      image,
      category,
      stock,
    });

    // Return success message with created product
    res.status(201).json({
      message: "Product listing successful.",
      product,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const update = async (req, res) => {
  try {
    // Get product ID from URL parameters
    const { id } = req.params;

    // Extract all fields from request body
    const { name, slug, description, price, image, category, stock, isActive } = req.body;

    // Check if product exists
    const productExists = await Product.findById(id);
    if (!productExists) {
      return res.status(400).json({ message: "Product does not exist." });
    }

    // Build the update fields object
    const productFields = {
      name,
      slug,
      description,
      price,
      image,
      category,
      stock,
      isActive,
      updatedAt: new Date(),
    };

    // Update the product in database
    const product = await Product.findByIdAndUpdate(
      id,
      { $set: productFields },
      { new: true } // Return the updated product
    );

    res.status(200).json({
      message: "Product updated successfully.",
      product,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
