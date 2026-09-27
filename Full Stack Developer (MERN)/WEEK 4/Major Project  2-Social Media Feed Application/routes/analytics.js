import { Router } from "express";
import { auth } from "../middleware/auth.js";
import { overview } from "../controllers/analyticsController.js";
const router = Router();
router.get("/", auth, overview);
export default router;
