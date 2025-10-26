// Entry point for Render deployment
// This file starts the backend service

const path = require("path");

// Check if we're in a production environment
if (process.env.NODE_ENV === "production") {
  // In production, start the backend
  console.log("Starting Todo Backend Service...");
  require("./backend/dist/index.js");
} else {
  console.log(
    "Development mode - please use npm run dev:backend or npm run dev:frontend"
  );
  process.exit(1);
}
