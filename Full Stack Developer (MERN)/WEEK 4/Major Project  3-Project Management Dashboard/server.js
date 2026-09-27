import "dotenv/config";

import express from "express";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";

import authRoutes from "./routes/auth.js";
import projectRoutes from "./routes/projects.js";
import taskRoutes from "./routes/tasks.js";
import analyticsRoutes from "./routes/analytics.js";

const app = express();

/* =========================================================
   CONFIGURATION
========================================================= */

const PORT = process.env.PORT || 5000;

const MONGO_URI =
  process.env.MONGO_URI ||
  "mongodb://127.0.0.1:27017/taskflow";

const CLIENT_URL =
  process.env.CLIENT_URL ||
  "http://localhost:5173";

const JWT_SECRET =
  process.env.JWT_SECRET;

/* =========================================================
   ENVIRONMENT VALIDATION
========================================================= */

if (!JWT_SECRET) {
  console.error("");
  console.error("=================================");
  console.error("❌ JWT_SECRET is not configured");
  console.error("=================================");
  console.error("");
  console.error(
    "Create a .env file inside the backend folder:"
  );
  console.error("");
  console.error("backend/.env");
  console.error("");
  console.error(
    "Then add:"
  );
  console.error("");
  console.error(
    "JWT_SECRET=your_strong_secret_key_here"
  );
  console.error("");

  process.exit(1);
}

/* =========================================================
   MIDDLEWARE
========================================================= */

app.use(
  cors({
    origin: CLIENT_URL,
    credentials: true,
  })
);

app.use(
  express.json({
    limit: "5mb",
  })
);

app.use(
  express.urlencoded({
    extended: true,
    limit: "5mb",
  })
);

app.use(morgan("dev"));

/* =========================================================
   HEALTH CHECK
========================================================= */

app.get("/api/health", (req, res) => {
  return res.json({
    ok: true,
    name: "TASKFLOW",
    message: "TASKFLOW backend is running",
    timestamp: new Date().toISOString(),
  });
});

/* =========================================================
   API ROUTES
========================================================= */

app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/projects",
  projectRoutes
);

app.use(
  "/api/tasks",
  taskRoutes
);

app.use(
  "/api/analytics",
  analyticsRoutes
);

/* =========================================================
   ROOT ROUTE
========================================================= */

app.get("/", (req, res) => {
  return res.json({
    name: "TASKFLOW",
    message: "TASKFLOW backend API",
    status: "running",
  });
});

/* =========================================================
   404 HANDLER
========================================================= */

app.use((req, res) => {
  return res.status(404).json({
    message: "API endpoint not found",
    path: req.originalUrl,
  });
});

/* =========================================================
   GLOBAL ERROR HANDLER
========================================================= */

app.use((error, req, res, next) => {
  console.error(
    "Unhandled server error:",
    error
  );

  if (res.headersSent) {
    return next(error);
  }

  return res.status(
    error.status || 500
  ).json({
    message:
      error.message ||
      "Internal server error",
  });
});

/* =========================================================
   DATABASE CONNECTION
========================================================= */

async function connectDatabase() {
  try {
    await mongoose.connect(
      MONGO_URI
    );

    console.log("");
    console.log("=================================");
    console.log("✅ MongoDB connected successfully");
    console.log("=================================");
    console.log("");
  } catch (error) {
    console.error("");
    console.error(
      "❌ MongoDB connection failed:"
    );
    console.error(error.message);
    console.error("");

    process.exit(1);
  }
}

/* =========================================================
   START SERVER
========================================================= */

async function startServer() {
  try {
    await connectDatabase();

    app.listen(
      PORT,
      () => {
        console.log(
          "================================="
        );

        console.log(
          "🚀 TASKFLOW Backend Started"
        );

        console.log(
          "================================="
        );

        console.log(
          `📡 Server: http://localhost:${PORT}`
        );

        console.log(
          `❤️ Health: http://localhost:${PORT}/api/health`
        );

        console.log(
          `🌐 Client: ${CLIENT_URL}`
        );

        console.log(
          "🔐 JWT_SECRET: configured"
        );

        console.log(
          "================================="
        );

        console.log("");
      }
    );
  } catch (error) {
    console.error(
      "❌ Failed to start TASKFLOW backend:",
      error
    );

    process.exit(1);
  }
}

/* =========================================================
   GRACEFUL SHUTDOWN
========================================================= */

process.on(
  "SIGINT",
  async () => {
    console.log(
      "\n🛑 Shutting down TASKFLOW..."
    );

    try {
      await mongoose.connection.close();

      console.log(
        "✅ MongoDB connection closed"
      );

      process.exit(0);
    } catch (error) {
      console.error(
        "❌ Shutdown error:",
        error
      );

      process.exit(1);
    }
  }
);

process.on(
  "SIGTERM",
  async () => {
    console.log(
      "\n🛑 SIGTERM received..."
    );

    try {
      await mongoose.connection.close();

      console.log(
        "✅ MongoDB connection closed"
      );

      process.exit(0);
    } catch (error) {
      console.error(
        "❌ Shutdown error:",
        error
      );

      process.exit(1);
    }
  }
);

/* =========================================================
   RUN SERVER
========================================================= */

startServer();