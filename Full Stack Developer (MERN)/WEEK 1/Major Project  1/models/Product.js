import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  brand: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  originalPrice: { type: Number, required: true, min: 0 },
  discount: { type: Number, default: 0 },
  images: { type: [String], default: [] },
  stock: { type: Number, default: 0, min: 0 },
  rating: { type: Number, default: 0, min: 0, max: 5 },
  numReviews: { type: Number, default: 0 },
  featured: { type: Boolean, default: false },
  tags: { type: [String], default: [] },
  specifications: { type: Map, of: String, default: {} }
}, { timestamps: true });

export default mongoose.model("Product", productSchema);
