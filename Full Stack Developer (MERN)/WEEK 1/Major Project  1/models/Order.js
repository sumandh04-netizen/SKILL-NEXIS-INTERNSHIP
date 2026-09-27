import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  name: String,
  image: String,
  price: Number,
  quantity: Number
}, { _id: false });

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  orderItems: { type: [itemSchema], required: true },
  shippingAddress: { type: Object, required: true },
  paymentMethod: { type: String, enum: ["COD", "DEMO_CARD"], default: "COD" },
  subtotal: Number,
  tax: Number,
  shippingFee: Number,
  discount: Number,
  total: Number,
  paymentStatus: { type: String, enum: ["Pending", "Paid", "Failed"], default: "Pending" },
  status: {
    type: String,
    enum: ["Pending", "Confirmed", "Processing", "Shipped", "Delivered", "Cancelled"],
    default: "Pending"
  }
}, { timestamps: true });

export default mongoose.model("Order", orderSchema);
