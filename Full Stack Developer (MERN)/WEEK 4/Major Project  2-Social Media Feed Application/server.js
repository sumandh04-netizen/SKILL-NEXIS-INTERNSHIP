import http from "http";
import { Server } from "socket.io";
import app from "./app.js";
import { connectDB } from "./config/db.js";
import { env } from "./config/env.js";
import { setupSockets } from "./sockets/index.js";

async function startServer() {
  try {
    await connectDB();
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    console.error(
      "Start MongoDB or update backend/.env before using authenticated API features.",
    );
    process.exitCode = 1;
    return;
  }

  const server = http.createServer(app);
  const io = new Server(server, {
    cors: {
      origin: env.clientUrl,
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
      credentials: true,
    },
  });

  app.set("io", io);
  setupSockets(io);

  server.listen(env.port, () => {
    console.log(`SocialHub backend running at http://localhost:${env.port}`);
    console.log(`Health check: http://localhost:${env.port}/api/health`);
  });
}

startServer();
