// FILE: components/StudentCard.jsx
// Shows the full details of ONE student in a rounded card.
// It only displays data given by App.jsx and does not talk to the backend.
// Flow: MongoDB -> Backend -> App.jsx (state) -> (Card) -> your screen

function StudentCard({ student, onClose }) {
  // Turns "2011-05-20T00:00:00.000Z" into a readable date.
  // If the value is empty we show "-" instead of "Invalid Date".
  const formatDate = (value) =>
    value ? new Date(value).toLocaleDateString() : "-";

  // The first letter of the name is shown inside the round avatar circle.
  const initial = student.fullName ? student.fullName.charAt(0).toUpperCase() : "?";

  return (
    <div className="student-card">
      <button className="card-close" onClick={onClose} aria-label="Close details">
        ✕
      </button>

      <div className="card-header">
        <div className="card-avatar">{initial}</div>
        <div>
          <h3 className="card-name">{student.fullName}</h3>
          <p className="card-sub">
            Roll No: {student.rollNumber} &nbsp;|&nbsp; Class: {student.grade}
          </p>
        </div>
      </div>

      <div className="card-body">
        <div className="card-item">
          <span className="card-label">Date of Birth</span>
          <span className="card-value">{formatDate(student.dateOfBirth)}</span>
        </div>
        <div className="card-item">
          <span className="card-label">Gender</span>
          <span className="card-value">{student.gender || "-"}</span>
        </div>
        <div className="card-item">
          <span className="card-label">Parent / Guardian</span>
          <span className="card-value">{student.guardianName || "-"}</span>
        </div>
        <div className="card-item">
          <span className="card-label">Phone</span>
          <span className="card-value">{student.phone || "-"}</span>
        </div>
        <div className="card-item">
          <span className="card-label">Email</span>
          <span className="card-value">{student.email || "-"}</span>
        </div>
        <div className="card-item">
          <span className="card-label">Registered On</span>
          <span className="card-value">{formatDate(student.createdAt)}</span>
        </div>
        <div className="card-item card-item-full">
          <span className="card-label">Address</span>
          <span className="card-value">{student.address || "-"}</span>
        </div>
      </div>
    </div>
  );
}

export default StudentCard;