import express from "express";
import dotenv from "dotenv";
import connectDB from "../backEnd/config/db.js";

    const app = express();
    const PORT = 3000;

      dotenv.config();
      app.use(express.json());
      app.use('/api/auth', authroutes)

      app.listen(PORT, () => {
        // GET -> fetch, name var name = "name"
        // POST -> logic, if username = "name", password = "123" alert login success
        connectDB();
        console.log(`Server is Running on PORT: ${PORT}`);
      });
