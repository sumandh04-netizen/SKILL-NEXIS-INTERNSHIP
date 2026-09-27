import { Router } from "express";
import { protect } from "../middleware/authMiddleware.js";
import User from "../models/User.js";

const router = Router();
router.get("/profile", protect, async (req, res) => {
  res.json(req.user);
});
router.put("/profile", protect, async (req, res) => {
  const { name, avatar, addresses } = req.body;
  const user = await User.findByIdAndUpdate(
    req.user._id,
    { ...(name !== undefined && { name }), ...(avatar !== undefined && { avatar }), ...(addresses !== undefined && { addresses }) },
    { new: true }
  ).select("-password");
  res.json(user);
});
export default router;
