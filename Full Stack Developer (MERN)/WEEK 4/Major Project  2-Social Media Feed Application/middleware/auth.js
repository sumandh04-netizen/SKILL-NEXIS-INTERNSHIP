import { verifyAccessToken } from "../utils/tokens.js";
import User from "../models/User.js";

export async function auth(req, res, next) {
  try {
    const header = req.headers.authorization || "";
    const token = header.startsWith("Bearer ") ? header.slice(7) : null;
    if (!token) return res.status(401).json({ success: false, message: "Authentication required" });
    const payload = verifyAccessToken(token);
    const user = await User.findById(payload.id).select("-passwordHash");
    if (!user || user.status === "suspended" || user.status === "deactivated") {
      return res.status(401).json({ success: false, message: "Account is unavailable" });
    }
    req.user = user;
    next();
  } catch {
    res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
}

export function roles(...allowed) {
  return (req, res, next) => {
    if (!req.user || !allowed.includes(req.user.role)) {
      return res.status(403).json({ success: false, message: "Forbidden" });
    }
    next();
  };
}
