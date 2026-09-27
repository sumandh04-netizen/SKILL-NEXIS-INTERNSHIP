import mongoose from "mongoose";
const schema = new mongoose.Schema({
  name: { type: String, unique: true, lowercase: true, index: true },
  postCount: { type: Number, default: 0 },
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
}, { timestamps: true });
export default mongoose.model("Hashtag", schema);
