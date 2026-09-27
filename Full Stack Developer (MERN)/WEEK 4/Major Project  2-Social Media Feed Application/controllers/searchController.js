import Post from "../models/Post.js";
import User from "../models/User.js";
import Hashtag from "../models/Hashtag.js";
import { success } from "../utils/apiResponse.js";
export async function search(req, res, next) { try { const q = String(req.query.q || "").trim(); if (!q) return success(res, { users: [], posts: [], hashtags: [] }); const [users, posts, hashtags] = await Promise.all([User.find({ $or: [{ username: new RegExp(q, "i") }, { fullName: new RegExp(q, "i") }] }).select("username fullName avatar").limit(10), Post.find({ content: new RegExp(q, "i"), status: "active" }).limit(20).populate("author", "username fullName avatar"), Hashtag.find({ name: new RegExp(q.replace(/^#/, ""), "i") }).limit(10)]); return success(res, { users, posts, hashtags }); } catch (e) { next(e); } }
