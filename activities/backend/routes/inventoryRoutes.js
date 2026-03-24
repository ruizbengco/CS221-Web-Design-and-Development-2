import express from "express";
import { create, update } from "../controllers/inventoryController.js";

const router = express.Router();

router.post("/create", create);
router.put("/update/:id", update); //query string

export default router;
