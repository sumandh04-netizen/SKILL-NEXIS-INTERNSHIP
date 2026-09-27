import { Router } from "express";
import { auth } from "../middleware/auth.js";
import { conversations, createConversation, messages } from "../controllers/messageController.js";
const router = Router();
router.get("/conversations", auth, conversations);
router.post("/conversations", auth, createConversation);
router.get("/conversations/:id/messages", auth, messages);
export default router;
