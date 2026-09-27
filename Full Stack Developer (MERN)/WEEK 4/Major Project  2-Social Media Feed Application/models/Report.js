import mongoose from "mongoose";
const schema = new mongoose.Schema({
  reporter: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  targetType: { type: String, enum: ["user", "post", "comment", "message"] },
  targetId: mongoose.Schema.Types.ObjectId,
  reason: { type: String, enum: ["spam", "harassment", "hate", "scam", "impersonation", "inappropriate", "other"] },
  details: String,
  status: { type: String, enum: ["open", "reviewing", "resolved", "dismissed"], default: "open" }
}, { timestamps: true });
export default mongoose.model("Report", schema);
