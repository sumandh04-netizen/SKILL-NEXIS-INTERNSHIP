import mongoose from "mongoose";
const schema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", index: true },
  title: { type: String, default: "New conversation" }
}, { timestamps: true });
export default mongoose.model("AIConversation", schema);
