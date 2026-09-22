const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Create uploads folder if it doesn't exist
const uploadDir = path.join(__dirname, "uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Serve uploaded images
app.use("/uploads", express.static(uploadDir));

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },

  filename: function (req, file, cb) {
    const uniqueName =
      Date.now() + "-" + file.originalname.replace(/\s+/g, "-");

    cb(null, uniqueName);
  }
});

// Allow only image files
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|webp/;

  const extension = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );

  const mimeType = allowedTypes.test(file.mimetype);

  if (extension && mimeType) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed"));
  }
};

// Multer configuration
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024
  }
});

// Home route
app.get("/", (req, res) => {
  res.json({
    message: "Image Upload API is running"
  });
});

// Image upload route
app.post("/api/upload", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      message: "Please select an image"
    });
  }

  res.status(200).json({
    message: "Image uploaded successfully",
    filename: req.file.filename,
    imageUrl: `http://localhost:${PORT}/uploads/${req.file.filename}`
  });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.message);

  res.status(400).json({
    message: err.message || "Upload failed"
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});