import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("DB connection failed:", error.message);
    process.exit(1);
  }
};

export default connectDB;
backend/controllers/authController.js
import User from "./models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (await User.findOne({ username }))
      return res.status(400).json({ message: "User already exists" });

    await User.create({
      username,
      password: await bcrypt.hash(password, 10)
    });

    res.status(201).json({
      message: "User registered successfully"
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      if (await bcrypt.compare(password, user.password)) {
        const token = jwt.sign(
          { id: user._id },
          process.env.SECRET_KEY,
          { expiresIn: "1d" }
        );

        res.status(200).json({
          message: "Login successful",
          token
        });
      } else {
        res.status(401).json({ message: "Invalid credentials" });
      }
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const logoutUser = (req, res) => {
  res.status(200).json({
    message: "Logout successful"
  });
};