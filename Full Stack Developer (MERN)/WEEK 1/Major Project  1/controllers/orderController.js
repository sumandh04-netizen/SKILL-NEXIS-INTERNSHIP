import Order from "../models/Order.js";
import Product from "../models/Product.js";
import Notification from "../models/Notification.js";

export async function createOrder(req, res) {
  const { orderItems, shippingAddress, paymentMethod = "COD", discount = 0 } = req.body;
  if (!Array.isArray(orderItems) || orderItems.length === 0) {
    return res.status(400).json({ message: "Order must contain products" });
  }

  let subtotal = 0;
  const normalized = [];

  for (const item of orderItems) {
    const product = await Product.findById(item.product);
    if (!product) return res.status(404).json({ message: "Product not found" });
    if (product.stock < item.quantity) return res.status(400).json({ message: `${product.name} is out of stock` });
    subtotal += product.price * item.quantity;
    normalized.push({
      product: product._id,
      name: product.name,
      image: product.images[0],
      price: product.price,
      quantity: item.quantity
    });
    product.stock -= item.quantity;
    await product.save();
  }

  const tax = Math.round(subtotal * 0.05);
  const shippingFee = subtotal >= 999 ? 0 : 79;
  const total = Math.max(0, subtotal + tax + shippingFee - Number(discount || 0));

  const order = await Order.create({
    user: req.user._id,
    orderItems: normalized,
    shippingAddress,
    paymentMethod,
    subtotal,
    tax,
    shippingFee,
    discount: Number(discount || 0),
    total,
    paymentStatus: paymentMethod === "DEMO_CARD" ? "Paid" : "Pending"
  });

  await Notification.create({
    user: req.user._id,
    title: "Order placed",
    message: `Your SHOPLOOP order ${order._id.toString().slice(-8).toUpperCase()} was created.`,
    type: "order"
  });

  res.status(201).json(order);
}

export async function listOrders(req, res) {
  const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json(orders);
}

export async function getOrder(req, res) {
  const order = await Order.findOne({ _id: req.params.id, user: req.user._id });
  if (!order) return res.status(404).json({ message: "Order not found" });
  res.json(order);
}
