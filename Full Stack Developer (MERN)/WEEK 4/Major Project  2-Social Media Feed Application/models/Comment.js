import mongoose from "mongoose";
const commentSchema = new mongoose.Schema({
  post: { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true, index: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  parent: { type: mongoose.Schema.Types.ObjectId, ref: "Comment", default: null },
  content: { type: String, required: true, maxlength: 2000 },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  status: { type: String, enum: ["active", "deleted", "flagged"], default: "active" }
}, { timestamps: true });
export default mongoose.model("Comment", commentSchema);
