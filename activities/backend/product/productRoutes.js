import express from "express";
import {
  create,
  update,
  getAll,
  getFeatured,
  toggleFeatured,
} from "./productController.js";

const router = express.Router();

// GET /api/product - List all products (with active filtering)
router.get("/", getAll);

// GET /api/product/featured - List featured products
router.get("/featured", getFeatured);

// POST /api/product/create - Create a new product
router.post("/create", create);

// PUT /api/product/update/:id - Update a product
router.put("/update/:id", update);

// POST /api/product/:id/feature - Toggle featured status
router.post("/:id/feature", toggleFeatured);

export default router;
