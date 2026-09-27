import mongoose from "mongoose";
const schema = new mongoose.Schema({
  poll: { type: mongoose.Schema.Types.ObjectId, ref: "Poll" },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  optionIndex: Number
}, { timestamps: true });
schema.index({ poll: 1, user: 1 }, { unique: true });
export default mongoose.model("PollVote", schema);
