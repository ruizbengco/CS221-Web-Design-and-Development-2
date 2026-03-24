import express from "express";
import { createOrder, getMyOrders, getOrderById, cancelOrder } from "../controllers/orderController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// All order routes require authentication
router.use(protect);

// POST /api/orders - Create a new order
router.post("/", createOrder);

// GET /api/orders - Get current user's orders
router.get("/", getMyOrders);

// GET /api/orders/:id - Get a specific order
router.get("/:id", getOrderById);

// PUT /api/orders/:id/cancel - Cancel an order
router.put("/:id/cancel", cancelOrder);

export default router;
