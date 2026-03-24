import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "User already exists." });

    const user = await User.create({ username, email, password });
    res.status(201).json({ message: "User registration successful." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const passwordMatched = await bcrypt.compare(password, user.password);

    if (user && passwordMatched) {
      const token = jwt.sign(
        {
          id: user._id,
          role: user.role,
          name: user.username,
          email: user.email,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1d" },
      );
      res.status(200).json({
        user: {
          _id: user._id,
          username: user.username,
          email: user.email,
          role: user.role,
        },
        token,
      });
    } else {
      res.status(401).json({ message: "Invalid email or password." });
    }
  } catch (error) {
    (res.status(500), json({ message: error.message }));
  }
};

export const logout = (req, res) => {
  res.status(200).json({ message: "User logged out." });
};
