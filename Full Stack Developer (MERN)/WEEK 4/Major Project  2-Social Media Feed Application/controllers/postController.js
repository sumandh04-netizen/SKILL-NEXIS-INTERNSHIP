import Post from "../models/Post.js";
import Comment from "../models/Comment.js";
import Bookmark from "../models/Bookmark.js";
import Hashtag from "../models/Hashtag.js";
import { createNotification } from "../services/notificationService.js";
import { success, failure } from "../utils/apiResponse.js";

function extractHashtags(text = "") { return [...new Set((text.match(/#[\w-]+/g) || []).map((x) => x.slice(1).toLowerCase()))]; }

export async function listPosts(req, res, next) {
  try {
    const page = Math.max(1, Number(req.query.page || 1));
    const limit = Math.min(30, Math.max(1, Number(req.query.limit || 10)));
    const filter = { status: "active", hiddenBy: { $ne: req.user._id } };
    if (req.query.hashtag) filter.hashtags = req.query.hashtag.toLowerCase();
    if (req.query.q) filter.$text = { $search: req.query.q };
    const posts = await Post.find(filter).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit).populate("author", "username fullName avatar").populate("mentions", "username fullName");
    return success(res, { posts, page, hasMore: posts.length === limit });
  } catch (e) { next(e); }
}

export async function createPost(req, res, next) {
  try {
    const { content = "", audience = "public", location = "", commentsEnabled = true, type = "text" } = req.body;
    const media = req.files?.map((file) => ({ url: `/uploads/${file.filename}`, type: file.mimetype.startsWith("video") ? "video" : "image", altText: "" })) || [];
    const hashtags = extractHashtags(content);
    const post = await Post.create({ author: req.user._id, content, audience, location, commentsEnabled, type: media.length ? (media[0].type === "video" ? "video" : "image") : type, media, hashtags });
    for (const tag of hashtags) await Hashtag.findOneAndUpdate({ name: tag }, { $set: { name: tag }, $inc: { postCount: 1 } }, { upsert: true });
    await post.populate("author", "username fullName avatar");
    return success(res, post, "Post published", 201);
  } catch (e) { next(e); }
}

export async function updatePost(req, res, next) {
  try {
    const post = await Post.findOne({ _id: req.params.id, author: req.user._id, status: "active" });
    if (!post) return failure(res, "Post not found", 404);
    const allowed = ["content", "audience", "location", "commentsEnabled", "pinned"];
    for (const field of allowed) if (req.body[field] !== undefined) post[field] = req.body[field];
    post.hashtags = extractHashtags(post.content);
    await post.save();
    return success(res, post, "Post updated");
  } catch (e) { next(e); }
}

export async function deletePost(req, res, next) {
  try { const post = await Post.findOneAndUpdate({ _id: req.params.id, author: req.user._id }, { status: "deleted" }, { new: true }); if (!post) return failure(res, "Post not found", 404); return success(res, {}, "Post deleted"); } catch (e) { next(e); }
}

export async function react(req, res, next) {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return failure(res, "Post not found", 404);
    const reaction = req.body.type || "like";
    post.reactions = post.reactions.filter((r) => r.user.toString() !== req.user._id.toString());
    if (reaction !== "none") post.reactions.push({ user: req.user._id, type: reaction });
    await post.save();
    if (reaction !== "none") await createNotification({ recipient: post.author, sender: req.user._id, type: "like", message: `${req.user.fullName} reacted to your post`, entityId: post._id, io: req.app.get("io") });
    return success(res, post.reactions, "Reaction updated");
  } catch (e) { next(e); }
}

export async function comment(req, res, next) {
  try {
    const post = await Post.findById(req.params.id);
    if (!post || !post.commentsEnabled) return failure(res, "Comments are disabled or post not found", 404);
    const comment = await Comment.create({ post: post._id, author: req.user._id, parent: req.body.parent || null, content: req.body.content });
    await comment.populate("author", "username fullName avatar");
    await createNotification({ recipient: post.author, sender: req.user._id, type: req.body.parent ? "reply" : "comment", message: `${req.user.fullName} commented on your post`, entityId: post._id, io: req.app.get("io") });
    return success(res, comment, "Comment added", 201);
  } catch (e) { next(e); }
}

export async function getComments(req, res, next) {
  try { const comments = await Comment.find({ post: req.params.id, status: "active" }).sort({ createdAt: 1 }).populate("author", "username fullName avatar"); return success(res, comments); } catch (e) { next(e); }
}

export async function bookmark(req, res, next) {
  try { const existing = await Bookmark.findOne({ user: req.user._id, post: req.params.id }); if (existing) { await existing.deleteOne(); return success(res, { saved: false }, "Removed from saved"); } await Bookmark.create({ user: req.user._id, post: req.params.id }); return success(res, { saved: true }, "Saved"); } catch (e) { next(e); }
}

export async function saved(req, res, next) {
  try { const items = await Bookmark.find({ user: req.user._id }).sort({ createdAt: -1 }).populate({ path: "post", populate: { path: "author", select: "username fullName avatar" } }); return success(res, items); } catch (e) { next(e); }
}
