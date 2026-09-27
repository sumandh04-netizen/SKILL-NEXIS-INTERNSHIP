import { Router } from "express";
import { protect } from "../middleware/authMiddleware.js";

const router = Router();
router.use(protect);

// Wishlist is maintained client-side in this starter to keep guest shopping seamless.
router.get("/", (req, res) => res.json({ items: [] }));
router.post("/", (req, res) => res.json({ message: "Wishlist item accepted", item: req.body }));
export default router;
