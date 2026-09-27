import { Router } from "express";
import { register, login, refresh, logout } from "../controllers/authController.js";
import { auth } from "../middleware/auth.js";
const router = Router();
router.post("/register", register);
router.post("/login", login);
router.post("/refresh", refresh);
router.post("/logout", auth, logout);
export default router;
