import express from "express";
import {
  create,
  update,
  getAll,
  getFeatured,
  toggleFeatured,
  getMyProducts,
} from "./productController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// GET /api/product - List all active products (public)
router.get("/", getAll);

// GET /api/product/featured - List featured products (public)
router.get("/featured", getFeatured);

// GET /api/product/my-products - Get products created by logged in user
router.get("/my-products", protect, getMyProducts);

// POST /api/product/create - Create a new product (protected)
router.post("/create", protect, create);

// PUT /api/product/update/:id - Update a product (protected - owner only)
router.put("/update/:id", protect, update);

// POST /api/product/:id/feature - Toggle featured status (owner or admin only)
router.post("/:id/feature", protect, toggleFeatured);

export default router;
