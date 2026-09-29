// FILE: components/StudentForm.jsx
// The registration form. It checks the input, then gives the data to App.jsx,
// which sends it to the backend.
// Flow: (Form) -> App.jsx -> studentApi.js -> Backend -> MongoDB

import { useState, useEffect } from "react";

// An empty form. We reuse it to reset the form after a successful save.
const emptyForm = {
  fullName: "",
  rollNumber: "",
  grade: "",
  dateOfBirth: "",
  gender: "",
  guardianName: "",
  phone: "",
  email: "",
  address: "",
};

function StudentForm({ onSubmit, editingStudent, onCancelEdit }) {
  const [formData, setFormData] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  // When the user clicks "Edit" in the table, editingStudent changes.
  // This effect then copies that student's data into the form fields.
  useEffect(() => {
    if (editingStudent) {
      setFormData({
        fullName: editingStudent.fullName || "",
        rollNumber: editingStudent.rollNumber || "",
        grade: editingStudent.grade || "",
        // The database gives "2010-05-20T00:00:00.000Z". The date input needs "2010-05-20".
        dateOfBirth: editingStudent.dateOfBirth
          ? editingStudent.dateOfBirth.slice(0, 10)
          : "",
        gender: editingStudent.gender || "",
        guardianName: editingStudent.guardianName || "",
        phone: editingStudent.phone || "",
        email: editingStudent.email || "",
        address: editingStudent.address || "",
      });
    } else {
      setFormData(emptyForm);
    }
    setErrors({});
  }, [editingStudent]);

  // Controlled inputs: each input's value comes from React state (value={formData.xxx}),
  // and every keystroke updates that state through onChange.
  // So React always knows what is typed in the form.
  const handleChange = (e) => {
    // e.target.name is the input's name (e.g. "fullName"), e.target.value is what was typed.
    // [name]: value updates only that one field and keeps the others the same.
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Basic checks BEFORE sending anything to the backend.
  // (The backend checks again. Never trust only the frontend.)
  const validate = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.rollNumber.trim()) newErrors.rollNumber = "Roll number is required";
    if (!formData.grade.trim()) newErrors.grade = "Class / grade is required";

    if (formData.email && !/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }
    if (formData.phone && !/^[0-9+\-\s]{7,15}$/.test(formData.phone)) {
      newErrors.phone = "Enter a valid phone number (7-15 digits)";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    // A form normally reloads the whole page when submitted. This stops that.
    e.preventDefault();

    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return; // stop if anything is wrong

    setSubmitting(true);
    const success = await onSubmit(formData);
    setSubmitting(false);

    // Clear the form only if the backend saved it. On an error (e.g. duplicate
    // roll number) we keep the typed data so the user can fix it.
    if (success) setFormData(emptyForm);
  };

  return (
    // noValidate turns off the browser's own popups, so our messages are shown instead.
    <form className="form" onSubmit={handleSubmit} noValidate>
      <h2>{editingStudent ? "Edit Student" : "Register New Student"}</h2>

      <div className="form-grid">
        <div className="field">
          <label htmlFor="fullName">Full Name *</label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="e.g. Rahul Kumar"
          />
          {errors.fullName && <span className="field-error">{errors.fullName}</span>}
        </div>

        <div className="field">
          <label htmlFor="rollNumber">Roll Number *</label>
          <input
            id="rollNumber"
            name="rollNumber"
            type="text"
            value={formData.rollNumber}
            onChange={handleChange}
            placeholder="e.g. 101"
          />
          {errors.rollNumber && <span className="field-error">{errors.rollNumber}</span>}
        </div>

        <div className="field">
          <label htmlFor="grade">Class / Grade *</label>
          <input
            id="grade"
            name="grade"
            type="text"
            value={formData.grade}
            onChange={handleChange}
            placeholder="e.g. 8-A"
          />
          {errors.grade && <span className="field-error">{errors.grade}</span>}
        </div>

        <div className="field">
          <label htmlFor="dateOfBirth">Date of Birth</label>
          <input
            id="dateOfBirth"
            name="dateOfBirth"
            type="date"
            value={formData.dateOfBirth}
            onChange={handleChange}
          />
        </div>

        <div className="field">
          <label htmlFor="gender">Gender</label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
          >
            <option value="">-- Select --</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="field">
          <label htmlFor="guardianName">Parent / Guardian Name</label>
          <input
            id="guardianName"
            name="guardianName"
            type="text"
            value={formData.guardianName}
            onChange={handleChange}
          />
        </div>

        <div className="field">
          <label htmlFor="phone">Phone Number</label>
          <input
            id="phone"
            name="phone"
            type="text"
            value={formData.phone}
            onChange={handleChange}
            placeholder="e.g. 9876543210"
          />
          {errors.phone && <span className="field-error">{errors.phone}</span>}
        </div>

        <div className="field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="e.g. parent@example.com"
          />
          {errors.email && <span className="field-error">{errors.email}</span>}
        </div>

        <div className="field full-width">
          <label htmlFor="address">Address</label>
          <textarea
            id="address"
            name="address"
            rows="2"
            value={formData.address}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="form-buttons">
        <button type="submit" className="btn btn-primary" disabled={submitting}>
          {submitting ? "Saving..." : editingStudent ? "Update Student" : "Register Student"}
        </button>

        {editingStudent && (
          <button type="button" className="btn btn-secondary" onClick={onCancelEdit}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default StudentForm;