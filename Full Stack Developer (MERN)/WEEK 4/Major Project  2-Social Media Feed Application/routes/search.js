import { Router } from "express";
import { auth } from "../middleware/auth.js";
import { search } from "../controllers/searchController.js";
const router = Router();
router.get("/", auth, search);
export default router;
