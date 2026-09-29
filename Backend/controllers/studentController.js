// FILE: controllers/studentController.js
// This file holds the real logic for each API action (add, list, update, delete).
// Flow: Route -> (Controller) -> Model -> MongoDB, then the controller sends the response.

const Student = require("../models/Student");

// HTTP status codes we use in this file:
//   200 = OK (request worked)
//   201 = Created (a new record was saved)
//   400 = Bad request (the user sent wrong or missing data)
//   404 = Not found (no student with that id)
//   500 = Server error (something broke on our side)

// One helper that converts any error into a proper response,
// so we don't repeat the same code in every function.
const handleError = (error, res) => {
  // Code 11000 = MongoDB's "duplicate key" error, i.e. the roll number already exists.
  if (error.code === 11000) {
    return res
      .status(400)
      .json({ message: "This roll number is already registered" });
  }

  // ValidationError = a "required", "enum" or "match" rule from the schema failed.
  if (error.name === "ValidationError") {
    const messages = Object.values(error.errors).map((e) => e.message);
    return res.status(400).json({ message: messages.join(", ") });
  }

  // CastError = the :id in the URL is not a valid MongoDB id.
  if (error.name === "CastError") {
    return res.status(400).json({ message: "Invalid student id" });
  }

  // Anything else is an unexpected problem.
  console.error(error);
  res.status(500).json({ message: "Server error, please try again" });
};

// POST /api/students -> add a new student
const createStudent = async (req, res) => {
  // async/await: talking to the database takes time. "await" pauses THIS function
  // until the database answers, without freezing the whole server.
  // try/catch: if anything inside try fails, the code jumps to catch instead of crashing.
  try {
    // req.body is the JSON the frontend sent (thanks to express.json()).
    const student = await Student.create(req.body);

    // 201 = Created. res.json() sends the data back to the frontend as JSON.
    res.status(201).json({ message: "Student registered successfully", student });
  } catch (error) {
    handleError(error, res);
  }
};

// GET /api/students -> get all students
const getStudents = async (req, res) => {
  try {
    // find() with no filter returns every student.
    // sort({ createdAt: -1 }) puts the newest student first.
    const students = await Student.find().sort({ createdAt: -1 });
    res.status(200).json(students);
  } catch (error) {
    handleError(error, res);
  }
};

// PUT /api/students/:id -> update a student
const updateStudent = async (req, res) => {
  try {
    // req.params.id is the ":id" part of the URL.
    // Example: PUT /api/students/64f1... -> req.params.id = "64f1..."
    const { id } = req.params;

    // { new: true } -> give us the UPDATED student back (not the old one).
    // { runValidators: true } -> apply the schema rules on updates too.
    // (By default Mongoose skips them for updates.)
    const student = await Student.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    // If no student has this id, findByIdAndUpdate returns null.
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json({ message: "Student updated successfully", student });
  } catch (error) {
    handleError(error, res);
  }
};

// DELETE /api/students/:id -> delete a student
const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json({ message: "Student deleted successfully" });
  } catch (error) {
    handleError(error, res);
  }
};

module.exports = { createStudent, getStudents, updateStudent, deleteStudent };