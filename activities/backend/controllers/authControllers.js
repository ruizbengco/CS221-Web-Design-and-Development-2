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
    res.status(201).json({ message: "User registered successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const passwordMatched = await bcrypt.compare(password, user.password);

    if (user && passwordMatched) {
      const token = jwt.sign(
        {
          id: user._id,
          role: user.role,
          name: user.username,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1d" },
      );
      res.status(200).json({ _id: user._id, username: user.username, email: user.email, token });
    } else {
      return res.status(401).json({ message: "Invalid email or password." });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const logout = (req, res) => {
  res.status(200).json({ message: "Logged out successfully." });
};

// PUT /api/auth/profile - Update user profile
export const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { username, email } = req.body;

    // Check if username is already taken by another user
    const existingUser = await User.findOne({ 
      $and: [
        { _id: { $ne: userId } },
        { $or: [{ username }, { email }] }
      ]
    });
    
    if (existingUser) {
      if (existingUser.username === username) {
        return res.status(400).json({ message: "Username already taken." });
      }
      if (existingUser.email === email) {
        return res.status(400).json({ message: "Email already in use." });
      }
    }

    // Update the user
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { username, email },
      { new: true }
    ).select("-password");

    res.status(200).json({ 
      message: "Profile updated successfully.",
      user: updatedUser
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// PUT /api/auth/password - Change password
export const changePassword = async (req, res) => {
  try {
    const userId = req.user.id;
    const { currentPassword, newPassword } = req.body;

    // Get the user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Verify current password
    const passwordMatched = await bcrypt.compare(currentPassword, user.password);
    if (!passwordMatched) {
      return res.status(400).json({ message: "Current password is incorrect." });
    }

    // Update password
    user.password = newPassword;
    await user.save();

    res.status(200).json({ message: "Password changed successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
