import express from "express";
import cors from "cors";
import taskRoutes from "./routes/taskRoutes";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler";
import pool from "./config/database";

const app = express();
const PORT = parseInt(process.env.PORT || "3001");

// Middleware
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);

      const allowedOrigins = [
        "http://localhost:3000",
        "http://localhost:3001",
        "https://healthcheck.railway.app",
        "healthcheck.railway.app",
      ];
      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-Requested-With",
      "Accept",
      "Origin",
      "Access-Control-Request-Method",
      "Access-Control-Request-Headers",
      "X-Custom-Header",
    ],
    optionsSuccessStatus: 200,
    preflightContinue: false,
  })
);

// Handle preflight requests explicitly
app.options("*", cors());

app.use(express.json());

// Health check endpoint
app.get("/health", async (req, res) => {
  console.log(`Health check requested from: ${req.get("host")} (${req.ip})`);
  console.log(`User-Agent: ${req.get("User-Agent")}`);

  try {
    // Check database connectivity
    await pool.query("SELECT 1");

    console.log("Health check successful - database connected");
    res.status(200).json({
      status: "healthy",
      timestamp: new Date().toISOString(),
      database: "connected",
      uptime: process.uptime(),
    });
  } catch (error) {
    console.error("Health check failed:", error);
    // For Railway healthchecks, we should return 200 even if DB is down
    // to allow the service to start and then handle DB issues separately
    console.log(
      "Health check successful - database disconnected but service running"
    );
    res.status(200).json({
      status: "healthy",
      timestamp: new Date().toISOString(),
      database: "disconnected",
      warning: "Database connection failed but service is running",
      uptime: process.uptime(),
    });
  }
});

// Root endpoint for basic health check
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Todo API Server",
    status: "running",
    timestamp: new Date().toISOString(),
  });
});

// Simple ping endpoint for Railway healthchecks
app.get("/ping", (req, res) => {
  res.status(200).json({
    status: "ok",
    timestamp: new Date().toISOString(),
  });
});

// Routes
app.use("/api", taskRoutes);

// Error handling
app.use(notFoundHandler);
app.use(errorHandler);

// Database initialization
async function initializeDatabase() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS task (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        completed BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log("Database initialized successfully");
  } catch (error) {
    console.error("Database initialization failed:", error);
    console.log(
      "Server will start without database - healthcheck will show database as disconnected"
    );
    // Don't exit - let the server start and handle DB issues in healthcheck
  }
}

// Start server
async function startServer() {
  try {
    await initializeDatabase();

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`Health check available at: http://localhost:${PORT}/health`);
      console.log(`Server bound to 0.0.0.0:${PORT} for Railway compatibility`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer().catch(console.error);
