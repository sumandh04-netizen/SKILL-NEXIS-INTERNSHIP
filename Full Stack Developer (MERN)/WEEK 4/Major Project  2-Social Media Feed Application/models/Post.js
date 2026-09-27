import mongoose from "mongoose";

const mediaSchema = new mongoose.Schema({
  url: String,
  type: { type: String, enum: ["image", "video"] },
  thumbnail: String,
  altText: String
}, { _id: false });

const postSchema = new mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
  content: { type: String, default: "", maxlength: 5000 },
  media: [mediaSchema],
  type: { type: String, enum: ["text", "image", "video", "poll", "link", "repost", "quote"], default: "text" },
  hashtags: [{ type: String, lowercase: true }],
  mentions: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  location: String,
  audience: { type: String, enum: ["public", "followers", "private"], default: "public" },
  commentsEnabled: { type: Boolean, default: true },
  reactions: [{ user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, type: { type: String, enum: ["like", "love", "haha", "wow", "sad", "angry"] } }],
  savedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  shares: { type: Number, default: 0 },
  hiddenBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  pinned: { type: Boolean, default: false },
  status: { type: String, enum: ["active", "deleted", "flagged"], default: "active" }
}, { timestamps: true });

postSchema.index({ createdAt: -1 });
postSchema.index({ hashtags: 1 });
postSchema.index({ content: "text" });
export default mongoose.model("Post", postSchema);
