import mongoose from "mongoose";
const schema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  url: String,
  type: String,
  originalName: String,
  size: Number,
  mimeType: String,
  thumbnail: String,
  altText: String
}, { timestamps: true });
export default mongoose.model("Media", schema);
