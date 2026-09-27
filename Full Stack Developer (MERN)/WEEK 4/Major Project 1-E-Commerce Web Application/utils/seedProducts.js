import "dotenv/config";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { connectDB } from "../config/db.js";
import User from "../models/User.js";
import Product from "../models/Product.js";

const products = [
  ["AeroPods Pro", "Audio", "SoundMax", 24900, 29900, 17, 18, 4.8],
  ["Nova Smartwatch", "Wearables", "Nova", 5999, 9999, 40, 25, 4.6],
  ["Urban Runner X1", "Fashion", "Stride", 7999, 10995, 27, 14, 4.5],
  ["Voyager Backpack", "Travel", "TrailCo", 1999, 3499, 43, 40, 4.7],
  ["Studio Headphones", "Audio", "SoundMax", 28990, 39990, 28, 12, 4.8],
  ["Pixel Camera Mini", "Electronics", "PixelPro", 32999, 38999, 15, 9, 4.4],
  ["Everyday Hoodie", "Fashion", "UrbanClub", 1799, 2499, 28, 60, 4.3],
  ["Cloud Sneakers", "Fashion", "Stride", 5499, 7499, 27, 32, 4.6],
  ["Aura Desk Lamp", "Home", "Luma", 1499, 2299, 35, 80, 4.2],
  ["Flow Water Bottle", "Fitness", "Hydro", 899, 1299, 31, 100, 4.5],
  ["Creator Keyboard", "Electronics", "KeyLab", 6999, 8999, 22, 20, 4.7],
  ["Arc Wireless Mouse", "Electronics", "KeyLab", 2199, 2999, 27, 50, 4.4],
  ["Travel Organizer", "Travel", "TrailCo", 1299, 1799, 28, 45, 4.2],
  ["Minimal Wallet", "Fashion", "Carry", 999, 1499, 33, 70, 4.5],
  ["Glow Skincare Set", "Beauty", "PureGlow", 2499, 3299, 24, 35, 4.6],
  ["Satin Hair Dryer", "Beauty", "PureGlow", 3999, 5499, 27, 18, 4.4],
  ["Focus Notebook", "Books", "PaperMint", 499, 699, 29, 120, 4.8],
  ["Mechanical Pencil Set", "Books", "PaperMint", 349, 499, 30, 100, 4.5],
  ["Yoga Mat Pro", "Fitness", "Flex", 1899, 2499, 24, 50, 4.7],
  ["Smart LED Strip", "Home", "Luma", 1299, 1999, 35, 90, 4.4],
  ["Portable Projector", "Electronics", "VisionX", 8499, 11999, 29, 16, 4.3],
  ["Cloud Cushion", "Home", "SoftNest", 799, 1199, 33, 80, 4.6]
];

const imageFor = (category, index) => {
  const palettes = {
    Audio: ["#eef2ff", "#6366f1"],
    Electronics: ["#ecfeff", "#06b6d4"],
    Fashion: ["#fff1f2", "#fb7185"],
    Travel: ["#fff7ed", "#f97316"],
    Home: ["#f0fdf4", "#22c55e"],
    Fitness: ["#f5f3ff", "#8b5cf6"],
    Beauty: ["#fdf2f8", "#ec4899"],
    Books: ["#eff6ff", "#3b82f6"],
    Wearables: ["#f0f9ff", "#0ea5e9"]
  };
  const [bg, accent] = palettes[category] || ["#f8fafc", "#334155"];
  const label = encodeURIComponent(products[index][0]);
  return `https://placehold.co/900x900/${bg.replace("#","")}/${accent.replace("#","")}.png?text=${label}`;
};

async function run() {
  await connectDB();
  await Product.deleteMany({});
  await User.deleteMany({});

  const docs = products.map((p, i) => ({
    name: p[0],
    slug: p[0].toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    description: `Premium ${p[0]} designed for modern everyday use. Built around the SHOPLOOP visual language with reliable quality and a polished experience.`,
    brand: p[2],
    category: p[1],
    price: p[3],
    originalPrice: p[4],
    discount: p[5],
    stock: p[6],
    rating: p[7],
    numReviews: Math.floor(p[6] * 2 + 5),
    featured: i < 10,
    tags: [p[1].toLowerCase(), p[2].toLowerCase(), "trending"],
    images: [imageFor(p[1], i)],
    specifications: { Material: "Premium", Warranty: "1 Year", Country: "India" }
  }));

  await Product.insertMany(docs);

  const password = await bcrypt.hash("Admin@12345", 12);
  await User.create({
    name: "SHOPLOOP Admin",
    email: "admin@shoploop.local",
    password,
    role: "admin"
  });

  console.log("Seed completed.");
  console.log("Admin: admin@shoploop.local / Admin@12345");
  await mongoose.disconnect();
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
