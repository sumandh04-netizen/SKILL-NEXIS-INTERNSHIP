import mongoose from "mongoose";
const schema = new mongoose.Schema({
  requester: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  target: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  status: { type: String, enum: ["pending", "accepted", "rejected"], default: "pending" }
}, { timestamps: true });
schema.index({ requester: 1, target: 1 }, { unique: true });
export default mongoose.model("FollowRequest", schema);
