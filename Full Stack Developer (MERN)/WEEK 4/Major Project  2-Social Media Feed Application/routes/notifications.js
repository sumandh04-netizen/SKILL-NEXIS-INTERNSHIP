import { Router } from "express";
import { auth } from "../middleware/auth.js";
import { list, read, readAll } from "../controllers/notificationController.js";
const router = Router();
router.get("/", auth, list);
router.put("/:id/read", auth, read);
router.put("/read-all", auth, readAll);
export default router;
