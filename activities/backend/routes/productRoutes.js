import express from "express";
import {
  create,
  update,
} from "../controllers/productController.js";

const router = express.Router();

router.post("/create", create);
router.put("/update/:id", update);


export default router;