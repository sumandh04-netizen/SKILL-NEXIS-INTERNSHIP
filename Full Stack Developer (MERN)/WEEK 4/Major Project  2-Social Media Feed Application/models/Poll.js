import mongoose from "mongoose";
const schema = new mongoose.Schema({
  post: { type: mongoose.Schema.Types.ObjectId, ref: "Post", unique: true },
  question: String,
  options: [{ text: String, votes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }] }],
  expiresAt: Date
}, { timestamps: true });
export default mongoose.model("Poll", schema);
