import mongoose from "mongoose";
const messageSchema = new mongoose.Schema({
  conversation: { type: mongoose.Schema.Types.ObjectId, ref: "Conversation", index: true },
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  content: { type: String, default: "", maxlength: 5000 },
  attachments: [{ url: String, type: String, name: String }],
  replyTo: { type: mongoose.Schema.Types.ObjectId, ref: "Message", default: null },
  reactions: [{ user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, type: String }],
  readBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  edited: { type: Boolean, default: false },
  deleted: { type: Boolean, default: false }
}, { timestamps: true });
export default mongoose.model("Message", messageSchema);
