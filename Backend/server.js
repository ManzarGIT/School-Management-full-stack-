// FILE: server.js
// This is the entry point of the backend. It starts Express, adds middleware,
// connects to MongoDB and hands every /api/students request to the router.
// Flow: Frontend -> (server.js) -> Route -> Controller -> Model -> MongoDB

// Load the values from .env into process.env (PORT, MONGO_URI).
// This must run BEFORE we read process.env anywhere.
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const studentRoutes = require("./routes/studentRoutes");

const app = express();

// CORS: the frontend runs on http://localhost:5173 and the backend on
// http://localhost:5000. Browsers treat different ports as different "origins"
// and BLOCK requests between them unless the backend says "this origin is allowed".
// cors() adds that permission. Without it you see a "CORS error" in the browser console.
app.use(cors({ origin: "http://localhost:5173" }));

// express.json() reads the JSON that the frontend sends and puts it in req.body.
// Without this line, req.body would be undefined.
app.use(express.json());

// Every URL starting with /api/students goes to studentRoutes.
app.use("/api/students", studentRoutes);

// Simple health check so you can open http://localhost:5000 in the browser.
app.get("/", (req, res) => {
  res.json({ message: "School API is running" });
});

// Error handler for a broken JSON body (for example, bad JSON typed in Postman).
// Express recognises an error handler because it has 4 parameters.
app.use((err, req, res, next) => {
  if (err.type === "entity.parse.failed") {
    return res.status(400).json({ message: "Invalid JSON in request body" });
  }
  res.status(500).json({ message: "Something went wrong on the server" });
});

const PORT = process.env.PORT || 5000;

// Start listening for requests only AFTER the database is connected.
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});