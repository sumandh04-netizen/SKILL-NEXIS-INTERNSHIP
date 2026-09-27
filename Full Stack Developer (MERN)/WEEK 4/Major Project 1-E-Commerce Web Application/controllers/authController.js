import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { generateToken } from "../utils/generateToken.js";

export async function register(req, res) {
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.status(400).json({ message: "Name, email and password are required" });
  if (password.length < 6) return res.status(400).json({ message: "Password must contain at least 6 characters" });

  const existing = await User.findOne({ email });
  if (existing) return res.status(409).json({ message: "Email already registered" });

  const hashed = await bcrypt.hash(password, 12);
  const user = await User.create({ name, email, password: hashed });
  res.status(201).json({ token: generateToken(user), user: { id: user._id, name: user.name, email: user.email, role: user.role } });
}

export async function login(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: "Invalid email or password" });
  }
  res.json({ token: generateToken(user), user: { id: user._id, name: user.name, email: user.email, role: user.role } });
}

export async function me(req, res) {
  res.json({ user: req.user });
}
