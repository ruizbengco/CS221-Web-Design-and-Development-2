import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";

    const app = express();
    const PORT = 3000;

      dotenv.config();
      app.use(express.json());
      app.use('/api/auth', authRoutes)

      app.listen(PORT, () => {
        // GET -> fetch, name var name = "name"
        // POST -> logic, if username = "name", password = "123" alert login success
        connectDB();
        console.log(`Server is Running on PORT: ${PORT}`);
      });
