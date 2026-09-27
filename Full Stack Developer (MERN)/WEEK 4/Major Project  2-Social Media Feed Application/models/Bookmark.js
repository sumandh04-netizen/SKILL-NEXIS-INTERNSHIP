import mongoose from "mongoose";
const schema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", index: true },
  post: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
  category: { type: String, default: "General" }
}, { timestamps: true });
schema.index({ user: 1, post: 1 }, { unique: true });
export default mongoose.model("Bookmark", schema);
