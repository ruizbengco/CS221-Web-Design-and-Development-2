import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./product/productRoutes.js";
import inventoryRoutes from "./routes/inventoryRoutes.js";

const app = express();
const PORT = 3000;
dotenv.config();

//get -> dispay name, var name="john"
//post -> logic, if username="john" password="123" success else failed
app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"],
  }),
);
app.use("/api/auth", authRoutes);
app.use("/api/product", productRoutes);
app.use("/api/inventory", inventoryRoutes);
//http://localhost:3000/api/auth/login
//http://localhost:3000/api/auth/register
//http://localhost:3000/api/auth/logout
//http://localhost:3000/api/product (GET, POST)
//http://localhost:3000/api/product/featured (GET)
//http://localhost:3000/api/product/:id/feature (POST)

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is Running on PORT: ${PORT}`);
});
