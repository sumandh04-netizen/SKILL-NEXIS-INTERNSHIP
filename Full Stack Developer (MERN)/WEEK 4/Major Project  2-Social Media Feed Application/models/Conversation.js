import mongoose from "mongoose";
const conversationSchema = new mongoose.Schema({
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }],
  name: String,
  isGroup: { type: Boolean, default: false },
  lastMessage: { type: mongoose.Schema.Types.ObjectId, ref: "Message" }
}, { timestamps: true });
conversationSchema.index({ participants: 1 });
export default mongoose.model("Conversation", conversationSchema);
