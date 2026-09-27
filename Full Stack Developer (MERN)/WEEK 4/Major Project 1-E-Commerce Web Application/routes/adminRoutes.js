import { Router } from "express";
import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";
import { dashboard, users, orders, products, updateOrderStatus } from "../controllers/adminController.js";

const router = Router();
router.use(protect, adminOnly);
router.get("/dashboard", dashboard);
router.get("/users", users);
router.get("/orders", orders);
router.get("/products", products);
router.put("/orders/:id/status", updateOrderStatus);
export default router;
