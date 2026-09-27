import User from "../models/User.js";
import Product from "../models/Product.js";
import Order from "../models/Order.js";

export async function dashboard(req, res) {
  const [users, products, orders] = await Promise.all([
    User.countDocuments(),
    Product.countDocuments(),
    Order.countDocuments()
  ]);
  const revenueAgg = await Order.aggregate([
    { $match: { status: { $ne: "Cancelled" } } },
    { $group: { _id: null, revenue: { $sum: "$total" } } }
  ]);
  const revenue = revenueAgg[0]?.revenue || 0;
  res.json({ users, products, orders, revenue });
}

export async function users(req, res) {
  res.json(await User.find().select("-password").sort({ createdAt: -1 }));
}

export async function orders(req, res) {
  res.json(await Order.find().populate("user", "name email").sort({ createdAt: -1 }));
}

export async function products(req, res) {
  res.json(await Product.find().sort({ createdAt: -1 }));
}

export async function updateOrderStatus(req, res) {
  const { status, paymentStatus } = req.body;
  const order = await Order.findByIdAndUpdate(
    req.params.id,
    { ...(status && { status }), ...(paymentStatus && { paymentStatus }) },
    { new: true }
  );
  if (!order) return res.status(404).json({ message: "Order not found" });
  res.json(order);
}
