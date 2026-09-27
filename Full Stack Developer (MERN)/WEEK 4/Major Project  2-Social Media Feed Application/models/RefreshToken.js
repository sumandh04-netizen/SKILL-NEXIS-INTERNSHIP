import mongoose from "mongoose";
const schema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", index: true },
  token: { type: String, unique: true },
  expiresAt: { type: Date, index: { expires: 0 } }
}, { timestamps: true });
export default mongoose.model("RefreshToken", schema);
