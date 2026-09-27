import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = Router();

/**
 * Generate JWT token for authenticated users.
 */
function generateToken(user) {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not configured");
  }

  return jwt.sign(
    {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
}

/**
 * Create a safe user response.
 */
function getUserResponse(user) {
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    avatar: user.avatar || "",
  };
}

/**
 * POST /api/auth/register
 *
 * Register a new TASKFLOW user.
 */
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    /**
     * Validate required fields.
     */
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email and password are required",
      });
    }

    /**
     * Normalize input.
     */
    const normalizedName = name.trim();
    const normalizedEmail = email.trim().toLowerCase();

    /**
     * Validate name.
     */
    if (normalizedName.length < 2) {
      return res.status(400).json({
        message: "Name must be at least 2 characters",
      });
    }

    /**
     * Validate email format.
     */
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(normalizedEmail)) {
      return res.status(400).json({
        message: "Please provide a valid email address",
      });
    }

    /**
     * Validate password.
     */
    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters",
      });
    }

    /**
     * Check whether the email is already registered.
     */
    const existingUser = await User.findOne({
      email: normalizedEmail,
    });

    if (existingUser) {
      return res.status(409).json({
        message: "Email already registered",
      });
    }

    /**
     * Hash password before storing it.
     */
    const hashedPassword = await bcrypt.hash(
      password,
      12
    );

    /**
     * Create user.
     */
    const user = await User.create({
      name: normalizedName,
      email: normalizedEmail,
      password: hashedPassword,
    });

    /**
     * Generate authentication token.
     */
    const authToken = generateToken(user);

    return res.status(201).json({
      message: "Registration successful",
      token: authToken,
      user: getUserResponse(user),
    });
  } catch (error) {
    /**
     * Handle duplicate email race conditions.
     */
    if (error.code === 11000) {
      return res.status(409).json({
        message: "Email already registered",
      });
    }

    console.error(
      "Registration error:",
      error
    );

    return res.status(500).json({
      message:
        error.message ||
        "Registration failed",
    });
  }
});

/**
 * POST /api/auth/login
 *
 * Authenticate an existing TASKFLOW user.
 */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    /**
     * Validate required fields.
     */
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    /**
     * Normalize email.
     */
    const normalizedEmail = email
      .trim()
      .toLowerCase();

    /**
     * Find user.
     *
     * The User model uses select:false for passwords,
     * therefore explicitly request the password field.
     */
    const user = await User.findOne({
      email: normalizedEmail,
    }).select("+password");

    /**
     * Use the same generic message for invalid
     * email/password combinations.
     */
    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    /**
     * Compare submitted password with stored hash.
     */
    const passwordMatches =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!passwordMatches) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    /**
     * Generate JWT.
     */
    const authToken = generateToken(user);

    return res.json({
      message: "Login successful",
      token: authToken,
      user: getUserResponse(user),
    });
  } catch (error) {
    console.error(
      "Login error:",
      error
    );

    return res.status(500).json({
      message:
        error.message ||
        "Login failed",
    });
  }
});

export default router;
