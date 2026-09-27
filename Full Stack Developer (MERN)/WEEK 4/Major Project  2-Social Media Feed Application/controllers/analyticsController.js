import User from "../models/User.js";
import Post from "../models/Post.js";
import Analytics from "../models/Analytics.js";
import { success } from "../utils/apiResponse.js";
export async function overview(req, res, next) { try { const [users, posts, daily] = await Promise.all([User.countDocuments(), Post.countDocuments({ status: "active" }), Analytics.find({ user: req.user._id }).sort({ date: -1 }).limit(30)]); return success(res, { users, posts, daily }); } catch (e) { next(e); } }
