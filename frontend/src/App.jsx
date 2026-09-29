// FILE: App.jsx
// The main component. It keeps the list of students in state, loads them from the
// backend, and passes data + handler functions to the form and the table.
// Flow: (App.jsx) -> studentApi.js -> Backend -> MongoDB, then the result comes back to the screen.

// FILE: App.jsx
// The main component. It keeps the list of students in state, loads them from the
// backend, and passes data + handler functions to the form, the card and the table.
// Flow: (App.jsx) -> studentApi.js -> Backend -> MongoDB, then the result comes back to the screen.

import { useState, useEffect } from "react";
import StudentForm from "./components/StudentForm";
import StudentTable from "./components/StudentTable";
import StudentCard from "./components/StudentCard";
import {
  getStudents,
  createStudent,
  updateStudent,
  deleteStudent,
} from "./api/studentApi";
import "./App.css";

function App() {
  // useState gives us a variable + a function to change it.
  // When we call the setter (e.g. setStudents), React re-draws the screen with the new value.
  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null); // null = "adding", object = "editing"
  const [message, setMessage] = useState(null); // { type: "success" | "error", text: "..." }
  const [loading, setLoading] = useState(true);

  // Which student's card is open. null = no card.
  // We keep only ONE id here, so only ONE card can be open at a time.
  // Clicking "View" on another row simply replaces this id.
  const [selectedId, setSelectedId] = useState(null);

  // Instead of storing the whole student, we find it in the list by id.
  // Benefit: after an edit, the list reloads and the card shows the NEW data.
  // If the student was deleted, find() returns undefined and the card disappears.
  const selectedStudent = students.find((s) => s._id === selectedId);

  // Fetch the students from the backend and store them in state.
  const loadStudents = async () => {
    try {
      const data = await getStudents();
      setStudents(data);
    } catch (error) {
      setMessage({ type: "error", text: error.message });
    } finally {
      setLoading(false);
    }
  };

  // useEffect with an empty [] runs ONCE, when the page first opens.
  // That is where we load the existing students.
  // (In development, StrictMode runs it twice on purpose. That is normal.)
  useEffect(() => {
    loadStudents();
  }, []);

  // Called by the form when the user presses Register / Update.
  // It returns true on success and false on failure, so the form knows whether to clear itself.
  const handleSubmit = async (formData) => {
    try {
      if (editingStudent) {
        await updateStudent(editingStudent._id, formData);
        setMessage({ type: "success", text: "Student updated successfully" });
        setEditingStudent(null);
      } else {
        await createStudent(formData);
        setMessage({ type: "success", text: "Student registered successfully" });
      }

      // WHY we reload the list: the database now has the new student, but our
      // React state (students) still holds the OLD list. React does not know
      // the database changed, so we fetch again to update the table.
      await loadStudents();
      return true;
    } catch (error) {
      // error.message comes from our backend, e.g. "This roll number is already registered".
      setMessage({ type: "error", text: error.message });
      return false;
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this student?")) return;

    try {
      await deleteStudent(id);
      setMessage({ type: "success", text: "Student deleted successfully" });
      await loadStudents(); // refresh the table again
    } catch (error) {
      setMessage({ type: "error", text: error.message });
    }
  };

  const handleEdit = (student) => {
    setEditingStudent(student);
    setMessage(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="container">
      <h1>School Management - Student Registration</h1>

      {message && (
        <div className={`message ${message.type}`}>{message.text}</div>
      )}

      <StudentForm
        onSubmit={handleSubmit}
        editingStudent={editingStudent}
        onCancelEdit={() => setEditingStudent(null)}
      />

      {/* The card is drawn only when a student is selected.
          "&&" means: if the left side is empty (undefined), draw nothing. */}
      {selectedStudent && (
        <StudentCard
          student={selectedStudent}
          onClose={() => setSelectedId(null)}
        />
      )}

      <h2>Registered Students ({students.length})</h2>
      <StudentTable
        students={students}
        loading={loading}
        selectedId={selectedId}
        onView={setSelectedId}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default App;