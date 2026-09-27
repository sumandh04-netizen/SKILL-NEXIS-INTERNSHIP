import mongoose from "mongoose";
const schema = new mongoose.Schema({
  recipient: { type: mongoose.Schema.Types.ObjectId, ref: "User", index: true },
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  type: { type: String, enum: ["like", "comment", "reply", "follow", "follow_request", "mention", "share", "message", "story_reaction", "recommendation"] },
  message: String,
  entityId: mongoose.Schema.Types.ObjectId,
  read: { type: Boolean, default: false }
}, { timestamps: true });
export default mongoose.model("Notification", schema);
