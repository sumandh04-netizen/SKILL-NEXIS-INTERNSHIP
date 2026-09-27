import jwt from "jsonwebtoken";

/**
 * Authentication middleware
 *
 * Checks for a valid JWT in:
 * Authorization: Bearer <token>
 *
 * On success:
 *   req.user = decoded JWT payload
 *
 * On failure:
 *   Returns HTTP 401
 */
export function auth(req, res, next) {
  try {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
      return res.status(401).json({
        message: "Authentication required",
      });
    }

    if (!authorizationHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Authentication required",
      });
    }

    const token = authorizationHeader.slice(7).trim();

    if (!token) {
      return res.status(401).json({
        message: "Authentication required",
      });
    }

    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is not configured in environment variables.");

      return res.status(500).json({
        message: "Server authentication configuration error",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        message: "Token has expired",
      });
    }

    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        message: "Invalid token",
      });
    }

    console.error("Authentication middleware error:", error);

    return res.status(401).json({
      message: "Authentication failed",
    });
  }
}

/**
 * Optional authentication middleware.
 *
 * Unlike auth(), this middleware does not reject
 * requests when a token is missing.
 *
 * If a valid token exists, req.user is populated.
 * Otherwise, the request continues without authentication.
 */
export function optionalAuth(req, res, next) {
  try {
    const authorizationHeader = req.headers.authorization;

    if (
      authorizationHeader &&
      authorizationHeader.startsWith("Bearer ")
    ) {
      const token = authorizationHeader.slice(7).trim();

      if (token && process.env.JWT_SECRET) {
        try {
          req.user = jwt.verify(token, process.env.JWT_SECRET);
        } catch {
          req.user = null;
        }
      }
    }

    next();
  } catch (error) {
    console.error("Optional authentication error:", error);

    req.user = null;

    next();
  }
}

/**
 * Admin authorization middleware.
 *
 * This should normally be used after auth():
 *
 * router.delete("/...", auth, admin, handler)
 */
export function admin(req, res, next) {
  if (!req.user) {
    return res.status(401).json({
      message: "Authentication required",
    });
  }

  if (
    req.user.role !== "admin" &&
    req.user.isAdmin !== true
  ) {
    return res.status(403).json({
      message: "Admin access required",
    });
  }

  next();
}