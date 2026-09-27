import bcrypt from "bcrypt";
import { connectDB } from "./config/db.js";
import User from "./models/User.js";
import Post from "./models/Post.js";
import Hashtag from "./models/Hashtag.js";
await connectDB();
await Promise.all([User.deleteMany({}), Post.deleteMany({}), Hashtag.deleteMany({})]);
const passwordHash = await bcrypt.hash("SocialHub123!", 12);
const users = await User.insertMany([
  { username: "suman", fullName: "Suman D H", email: "suman@example.com", passwordHash, bio: "Full Stack Developer | MERN Stack", role: "admin" },
  { username: "alex", fullName: "Alex Carter", email: "alex@example.com", passwordHash, bio: "Frontend developer" },
  { username: "sarah", fullName: "Sarah Wilson", email: "sarah@example.com", passwordHash, bio: "Designer and creator" },
  { username: "mike", fullName: "Mike Johnson", email: "mike@example.com", passwordHash, bio: "Technology enthusiast" },
  { username: "priya", fullName: "Priya Sharma", email: "priya@example.com", passwordHash, bio: "Product builder" },
  { username: "rahul", fullName: "Rahul Kumar", email: "rahul@example.com", passwordHash, bio: "JavaScript developer" },
  { username: "ananya", fullName: "Ananya Singh", email: "ananya@example.com", passwordHash, bio: "UI/UX learner" },
  { username: "vikash", fullName: "Vikash Gupta", email: "vikash@example.com", passwordHash, bio: "Cloud and DevOps" },
  { username: "teamproject", fullName: "Team Project", email: "team@example.com", passwordHash, bio: "Community account" },
  { username: "travel", fullName: "Travel Stories", email: "travel@example.com", passwordHash, bio: "Exploring the world" }
]);
const posts = [];
for (let i = 0; i < 22; i += 1) {
  const author = users[i % users.length];
  const content = [
    "Building something amazing with the MERN Stack! 🚀 #webdev #mern #coding",
    "Learning React patterns and improving my frontend workflow. #react #javascript",
    "A peaceful weekend exploring new places. #travel #nature",
    "Sharing a UI idea for a modern social experience. #design #ux"
  ][i % 4];
  posts.push({ author: author._id, content, hashtags: [...content.matchAll(/#([\w-]+)/g)].map((m) => m[1]), type: "text" });
}
await Post.insertMany(posts);
console.log("Seed complete. Demo password: SocialHub123!");
process.exit(0);
