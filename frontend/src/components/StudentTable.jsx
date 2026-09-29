// FILE: components/StudentTable.jsx
// Only shows the list of students in a table. It gets the data from App.jsx as props
// and does not talk to the backend itself.
// Flow: MongoDB -> Backend -> App.jsx (state) -> (Table) -> your screen

function StudentTable({ students, loading, selectedId, onView, onEdit, onDelete }) {
  if (loading) {
    return <p className="info-text">Loading students...</p>;
  }

  if (students.length === 0) {
    return <p className="info-text">No students registered yet.</p>;
  }

  return (
    // table-wrapper lets the table scroll sideways on small screens.
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>Roll No</th>
            <th>Name</th>
            <th>Class</th>
            <th>DOB</th>
            <th>Gender</th>
            <th>Guardian</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Address</th>
            <th>Registered On</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* map() creates one <tr> per student.
              "key" must be unique so React can track each row. MongoDB's _id is perfect.
              The row gets the class "selected-row" only when its id matches selectedId. */}
          {students.map((student) => (
            <tr
              key={student._id}
              className={student._id === selectedId ? "selected-row" : ""}
            >
              <td>{student.rollNumber}</td>
              <td>{student.fullName}</td>
              <td>{student.grade}</td>
              <td>
                {student.dateOfBirth
                  ? new Date(student.dateOfBirth).toLocaleDateString()
                  : "-"}
              </td>
              <td>{student.gender || "-"}</td>
              <td>{student.guardianName || "-"}</td>
              <td>{student.phone || "-"}</td>
              <td>{student.email || "-"}</td>
              <td>{student.address || "-"}</td>
              <td>{new Date(student.createdAt).toLocaleDateString()}</td>
              <td className="actions">
                <button className="btn btn-small btn-view" onClick={() => onView(student._id)}>
                  View
                </button>
                <button className="btn btn-small btn-edit" onClick={() => onEdit(student)}>
                  Edit
                </button>
                <button
                  className="btn btn-small btn-delete"
                  onClick={() => onDelete(student._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StudentTable;