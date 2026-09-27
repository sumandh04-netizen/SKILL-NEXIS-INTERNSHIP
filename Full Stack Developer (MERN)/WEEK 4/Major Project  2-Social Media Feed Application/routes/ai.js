import { Router } from "express";
import { auth } from "../middleware/auth.js";
import { chatAI, task, analyzeImage, history } from "../controllers/aiController.js";
const router = Router();
router.get("/conversations", auth, history);
router.post("/chat", auth, chatAI);
router.post("/task", auth, task);
router.post("/image-analysis", auth, analyzeImage);
export default router;
