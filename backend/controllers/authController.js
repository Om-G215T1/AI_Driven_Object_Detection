import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// 🔐 Generate Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

// 🚀 REGISTER
export const register = async (req, res) => {
  try {
    const { username, password } = req.body;

    // ❌ Validation
    if (!username || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    // ❌ Check existing user
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // 🔐 Hash password
    const hashed = await bcrypt.hash(password, 10);

    // ✅ Create user
    const user = await User.create({
      username,
      password: hashed,
    });

    // 🎯 Return token (NOT password)
    res.status(201).json({
      token: generateToken(user._id),
      user: {
        id: user._id,
        username: user.username,
      },
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 🚀 LOGIN
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // ❌ Validation
    if (!username || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // 🔐 Compare password
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({ message: "Wrong password" });
    }

    // 🎯 Return token
    res.json({
      token: generateToken(user._id),
      user: {
        id: user._id,
        username: user.username,
      },
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};