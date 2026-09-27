import { Router } from "express";
import { protect } from "../middleware/authMiddleware.js";
import Notification from "../models/Notification.js";

const router = Router();
router.get("/", protect, async (req, res) => {
  res.json(await Notification.find({ user: req.user._id }).sort({ createdAt: -1 }).limit(50));
});
router.put("/:id/read", protect, async (req, res) => {
  const item = await Notification.findOneAndUpdate(
    { _id: req.params.id, user: req.user._id },
    { read: true },
    { new: true }
  );
  if (!item) return res.status(404).json({ message: "Notification not found" });
  res.json(item);
});
export default router;
