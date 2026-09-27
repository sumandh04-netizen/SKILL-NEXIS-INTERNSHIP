import mongoose from "mongoose";
const schema = new mongoose.Schema({
  conversation: { type: mongoose.Schema.Types.ObjectId, ref: "AIConversation", index: true },
  role: { type: String, enum: ["user", "assistant", "system"] },
  content: String
}, { timestamps: true });
export default mongoose.model("AIMessage", schema);
