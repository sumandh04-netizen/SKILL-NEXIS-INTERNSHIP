import mongoose from "mongoose";
const schema = new mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  media: { url: String, type: String },
  text: String,
  privacy: { type: String, enum: ["public", "followers", "close_friends"], default: "public" },
  viewers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  expiresAt: { type: Date, required: true, index: { expires: 0 } }
}, { timestamps: true });
export default mongoose.model("Story", schema);
