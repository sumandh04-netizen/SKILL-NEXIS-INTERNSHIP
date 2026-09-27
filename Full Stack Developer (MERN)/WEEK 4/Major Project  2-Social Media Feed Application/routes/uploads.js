import { Router } from "express";
import { auth } from "../middleware/auth.js";
import { upload } from "../middleware/upload.js";
import Media from "../models/Media.js";
import { success } from "../utils/apiResponse.js";
const router = Router();
router.post("/", auth, upload.array("files", 8), async (req, res, next) => {
  try { const media = await Media.insertMany((req.files || []).map((file) => ({ owner: req.user._id, url: `/uploads/${file.filename}`, type: file.mimetype.startsWith("video") ? "video" : "image", originalName: file.originalname, size: file.size, mimeType: file.mimetype }))); return success(res, media, "Files uploaded", 201); } catch (e) { next(e); }
});
export default router;
