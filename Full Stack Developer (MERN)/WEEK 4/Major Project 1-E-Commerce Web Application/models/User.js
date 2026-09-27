import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
  fullName: String,
  phone: String,
  line1: String,
  city: String,
  state: String,
  postalCode: String,
  country: { type: String, default: "India" }
}, { _id: false });

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true, select: false },
  role: { type: String, enum: ["user", "admin"], default: "user" },
  avatar: { type: String, default: "" },
  addresses: { type: [addressSchema], default: [] }
}, { timestamps: true });

export default mongoose.model("User", userSchema);
