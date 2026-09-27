import User from "../models/User.js";
import Post from "../models/Post.js";
import FollowRequest from "../models/FollowRequest.js";
import { createNotification } from "../services/notificationService.js";
import { success, failure } from "../utils/apiResponse.js";

export async function me(req, res) { return success(res, req.user); }

export async function getProfile(req, res, next) {
  try {
    const user = await User.findOne({ username: req.params.username }).select("-passwordHash");
    if (!user) return failure(res, "User not found", 404);
    const posts = await Post.find({ author: user._id, status: "active" }).sort({ createdAt: -1 }).limit(20).populate("author", "username fullName avatar");
    return success(res, { user, posts });
  } catch (e) { next(e); }
}

export async function updateProfile(req, res, next) {
  try {
    const fields = ["fullName", "bio", "location", "website", "avatar", "coverImage", "privacy"];
    for (const field of fields) if (req.body[field] !== undefined) req.user[field] = req.body[field];
    await req.user.save();
    return success(res, req.user, "Profile updated");
  } catch (e) { next(e); }
}

export async function searchUsers(req, res, next) {
  try {
    const q = String(req.query.q || "").trim();
    if (!q) return success(res, []);
    const users = await User.find({ $or: [{ username: new RegExp(q, "i") }, { fullName: new RegExp(q, "i") }] }).select("username fullName avatar bio").limit(20);
    return success(res, users);
  } catch (e) { next(e); }
}

export async function follow(req, res, next) {
  try {
    if (req.user._id.toString() === req.params.id) return failure(res, "You cannot follow yourself");
    const target = await User.findById(req.params.id);
    if (!target) return failure(res, "User not found", 404);
    if (target.privacy === "private") {
      await FollowRequest.findOneAndUpdate({ requester: req.user._id, target: target._id }, { requester: req.user._id, target: target._id, status: "pending" }, { upsert: true });
      await createNotification({ recipient: target._id, sender: req.user._id, type: "follow_request", message: `${req.user.fullName} sent you a follow request` });
      return success(res, {}, "Follow request sent");
    }
    target.followers.addToSet(req.user._id);
    req.user.following.addToSet(target._id);
    await Promise.all([target.save(), req.user.save()]);
    await createNotification({ recipient: target._id, sender: req.user._id, type: "follow", message: `${req.user.fullName} started following you` });
    return success(res, {}, "Followed");
  } catch (e) { next(e); }
}

export async function unfollow(req, res, next) {
  try {
    await User.findByIdAndUpdate(req.params.id, { $pull: { followers: req.user._id } });
    await User.findByIdAndUpdate(req.user._id, { $pull: { following: req.params.id } });
    return success(res, {}, "Unfollowed");
  } catch (e) { next(e); }
}
