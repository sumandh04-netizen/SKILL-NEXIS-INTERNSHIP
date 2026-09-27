import Product from "../models/Product.js";

export async function listProducts(req, res) {
  const {
    search = "",
    category,
    brand,
    minPrice,
    maxPrice,
    rating,
    sort = "relevance",
    page = 1,
    limit = 12
  } = req.query;

  const query = {};
  if (search) {
    query.$or = [
      { name: new RegExp(search, "i") },
      { brand: new RegExp(search, "i") },
      { category: new RegExp(search, "i") },
      { description: new RegExp(search, "i") }
    ];
  }
  if (category) query.category = category;
  if (brand) query.brand = brand;
  if (minPrice) query.price = { ...(query.price || {}), $gte: Number(minPrice) };
  if (maxPrice) query.price = { ...(query.price || {}), $lte: Number(maxPrice) };
  if (rating) query.rating = { $gte: Number(rating) };

  const sortMap = {
    newest: { createdAt: -1 },
    "price-low": { price: 1 },
    "price-high": { price: -1 },
    rating: { rating: -1 },
    popularity: { numReviews: -1 },
    relevance: { featured: -1, createdAt: -1 }
  };

  const pageNum = Math.max(1, Number(page));
  const limitNum = Math.min(50, Math.max(1, Number(limit)));
  const total = await Product.countDocuments(query);
  const products = await Product.find(query)
    .sort(sortMap[sort] || sortMap.relevance)
    .skip((pageNum - 1) * limitNum)
    .limit(limitNum);

  res.json({ products, total, page: pageNum, pages: Math.ceil(total / limitNum) });
}

export async function getProduct(req, res) {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: "Product not found" });
  res.json(product);
}

export async function createProduct(req, res) {
  const data = { ...req.body };
  if (req.file) data.images = [`/uploads/${req.file.filename}`];
  if (typeof data.tags === "string") data.tags = data.tags.split(",").map(s => s.trim()).filter(Boolean);
  const product = await Product.create(data);
  res.status(201).json(product);
}

export async function updateProduct(req, res) {
  const data = { ...req.body };
  if (req.file) data.images = [`/uploads/${req.file.filename}`];
  if (typeof data.tags === "string") data.tags = data.tags.split(",").map(s => s.trim()).filter(Boolean);
  const product = await Product.findByIdAndUpdate(req.params.id, data, { new: true, runValidators: true });
  if (!product) return res.status(404).json({ message: "Product not found" });
  res.json(product);
}

export async function deleteProduct(req, res) {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) return res.status(404).json({ message: "Product not found" });
  res.json({ message: "Product deleted" });
}
