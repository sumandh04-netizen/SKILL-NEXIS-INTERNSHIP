import User from "../models/User.js";
import Post from "../models/Post.js";
import Report from "../models/Report.js";
import { success, failure } from "../utils/apiResponse.js";
export async function dashboard(req, res, next) { try { const [users, posts, reports] = await Promise.all([User.countDocuments(), Post.countDocuments({ status: "active" }), Report.countDocuments({ status: "open" })]); return success(res, { users, posts, reports }); } catch (e) { next(e); } }
export async function users(req, res, next) { try { const items = await User.find().select("-passwordHash").sort({ createdAt: -1 }).limit(100); return success(res, items); } catch (e) { next(e); } }
export async function updateUser(req, res, next) { try { const user = await User.findByIdAndUpdate(req.params.id, { status: req.body.status, role: req.body.role }, { new: true }).select("-passwordHash"); if (!user) return failure(res, "User not found", 404); return success(res, user, "User updated"); } catch (e) { next(e); } }
export async function reports(req, res, next) { try { const items = await Report.find().sort({ createdAt: -1 }).limit(100).populate("reporter", "username fullName"); return success(res, items); } catch (e) { next(e); } }
export async function resolveReport(req, res, next) { try { const report = await Report.findByIdAndUpdate(req.params.id, { status: req.body.status || "resolved" }, { new: true }); return success(res, report, "Report updated"); } catch (e) { next(e); } }
