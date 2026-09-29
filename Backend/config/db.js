// FILE: config/db.js
// This file connects our app to MongoDB using Mongoose.
// It is used once, at startup, by server.js. Everything that reaches
// MongoDB later (Model) uses this same connection.

const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // The connection string reads like this:
    //   mongodb://          -> the protocol MongoDB uses
    //   127.0.0.1:27017     -> your own computer, and MongoDB's default port
    //   /school_db          -> the database name. MongoDB creates it automatically
    //                          the first time we save data, so no manual setup.
    // We use 127.0.0.1 instead of "localhost" because on newer Node versions
    // "localhost" can resolve to an IPv6 address and fail to connect.
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
  } catch (error) {
    // If MongoDB is not running there is no point in starting the server.
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;