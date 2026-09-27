import mongoose from "mongoose";
const schema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", index: true },
  date: { type: Date, index: true },
  profileViews: { type: Number, default: 0 },
  impressions: { type: Number, default: 0 },
  reach: { type: Number, default: 0 },
  likes: { type: Number, default: 0 },
  comments: { type: Number, default: 0 },
  shares: { type: Number, default: 0 },
  followersGained: { type: Number, default: 0 },
  followersLost: { type: Number, default: 0 }
}, { timestamps: true });
export default mongoose.model("Analytics", schema);
