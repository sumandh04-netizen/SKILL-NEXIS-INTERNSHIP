import { Router } from "express";
import { protect } from "../middleware/authMiddleware.js";

const router = Router();
router.use(protect);

// Cart state is intentionally client-side for this demo.
// These endpoints provide a protected integration point for a future persistent cart.
router.get("/", (req, res) => res.json({ items: [] }));
router.post("/", (req, res) => res.json({ message: "Cart item accepted", item: req.body }));
export default router;
