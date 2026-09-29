// FILE: routes/studentRoutes.js
// This file only decides WHICH controller function runs for WHICH URL + method.
// Flow: Frontend -> server.js -> (Route) -> Controller -> Model -> MongoDB

const express = require("express");
const {
  createStudent,
  getStudents,
  updateStudent,
  deleteStudent,
} = require("../controllers/studentController");

const router = express.Router();

// Routes vs controllers:
//   - The route says "when someone sends POST to /api/students, call createStudent".
//   - The controller (createStudent) contains the actual work.
// In server.js we mounted this router at "/api/students", so "/" here
// means "/api/students" and "/:id" means "/api/students/<some id>".
router.post("/", createStudent);
router.get("/", getStudents);
router.put("/:id", updateStudent);
router.delete("/:id", deleteStudent);

module.exports = router;