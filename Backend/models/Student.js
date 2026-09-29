// FILE: models/Student.js
// This file defines what a Student looks like in MongoDB (the Schema)
// and gives us a Student object to read/write data (the Model).
// Flow: Controller -> (Model) -> MongoDB

const mongoose = require("mongoose");

// A Schema is a blueprint: which fields exist, their types and their rules.
const studentSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      // required: true means MongoDB will REFUSE to save a student without this field.
      // The text in the array is the error message we send back.
      required: [true, "Full name is required"],
      trim: true, // removes extra spaces at the start and end
    },
    rollNumber: {
      type: String,
      required: [true, "Roll number is required"],
      // unique: true creates a database index so that TWO students cannot have
      // the same roll number. On a duplicate, MongoDB throws an error with code 11000,
      // which our controller catches and turns into a friendly message.
      unique: true,
      trim: true,
    },
    grade: {
      type: String,
      required: [true, "Class / grade is required"],
      trim: true,
    },
    dateOfBirth: {
      type: Date,
    },
    gender: {
      type: String,
      // enum: only these values are allowed ("" means "not selected").
      enum: ["Male", "Female", "Other", ""],
    },
    guardianName: {
      type: String,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      // match checks the text against a simple email pattern.
      // If the field is empty, this check is skipped, so email stays optional.
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },
    address: {
      type: String,
      trim: true,
    },
  },
  {
    // timestamps: true makes Mongoose add "createdAt" and "updatedAt"
    // automatically. This is our "Created date (automatic)" field.
    timestamps: true,
  }
);

// mongoose.model("Student", ...) creates the Student model.
// MongoDB will store these documents in a collection named "students"
// (Mongoose lower-cases the name and adds an "s").
module.exports = mongoose.model("Student", studentSchema);