import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, trim: true, lowercase: true, minlength: 3 },
  fullName: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  passwordHash: { type: String, required: true },
  avatar: { type: String, default: "" },
  coverImage: { type: String, default: "" },
  bio: { type: String, default: "" },
  location: { type: String, default: "" },
  website: { type: String, default: "" },
  role: { type: String, enum: ["user", "moderator", "admin"], default: "user" },
  status: { type: String, enum: ["active", "suspended", "deactivated"], default: "active" },
  privacy: { type: String, enum: ["public", "private"], default: "public" },
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  blocked: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  lastSeen: { type: Date, default: Date.now }
}, { timestamps: true });

userSchema.index({ username: 1 });
userSchema.index({ fullName: "text", username: "text", bio: "text" });
export default mongoose.model("User", userSchema);
