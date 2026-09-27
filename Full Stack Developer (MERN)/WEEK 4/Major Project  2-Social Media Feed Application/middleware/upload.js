import multer from "multer";
import path from "path";
import fs from "fs";
import { env } from "../config/env.js";

const directory = path.resolve(process.cwd(), env.uploadDir);
fs.mkdirSync(directory, { recursive: true });

const storage = multer.diskStorage({
  destination: directory,
  filename: (req, file, cb) => {
    const safe = file.originalname.replace(/[^a-zA-Z0-9._-]/g, "_");
    cb(null, `${Date.now()}-${safe}`);
  }
});

const allowed = new Set(["image/jpeg", "image/png", "image/webp", "image/gif", "video/mp4", "video/webm"]);

export const upload = multer({
  storage,
  limits: { fileSize: env.maxFileSize },
  fileFilter: (req, file, cb) => cb(null, allowed.has(file.mimetype))
});
