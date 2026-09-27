import { Router } from "express";
import { protect } from "../middleware/authMiddleware.js";
import { listReviews, createReview } from "../controllers/reviewController.js";

const router = Router();
router.get("/product/:productId", listReviews);
router.post("/product/:productId", protect, createReview);
export default router;
