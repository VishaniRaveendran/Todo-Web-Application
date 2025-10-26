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

      const allowedOrigins = ["http://localhost:3000", "http://localhost:3001"];
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
    process.exit(1);
  }
}

// Start server
async function startServer() {
  await initializeDatabase();

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer().catch(console.error);
