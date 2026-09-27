import Review from "../models/Review.js";
import Product from "../models/Product.js";

export async function listReviews(req, res) {
  const reviews = await Review.find({ product: req.params.productId }).populate("user", "name avatar").sort({ createdAt: -1 });
  res.json(reviews);
}

export async function createReview(req, res) {
  const { rating, comment } = req.body;
  if (!rating || !comment) return res.status(400).json({ message: "Rating and comment are required" });
  const exists = await Review.findOne({ product: req.params.productId, user: req.user._id });
  if (exists) return res.status(409).json({ message: "You already reviewed this product" });

  const review = await Review.create({
    product: req.params.productId,
    user: req.user._id,
    rating: Number(rating),
    comment
  });

  const reviews = await Review.find({ product: req.params.productId });
  const product = await Product.findById(req.params.productId);
  product.numReviews = reviews.length;
  product.rating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
  await product.save();

  res.status(201).json(review);
}
