import { Router } from "express";
import { auth } from "../middleware/auth.js";
import Report from "../models/Report.js";
import { success } from "../utils/apiResponse.js";
const router = Router();
router.post("/", auth, async (req, res, next) => { try { const report = await Report.create({ reporter: req.user._id, targetType: req.body.targetType, targetId: req.body.targetId, reason: req.body.reason, details: req.body.details }); return success(res, report, "Report submitted", 201); } catch (e) { next(e); } });
export default router;
