// FILE: api/studentApi.js
// All fetch() calls to the backend live here, so the components stay clean.
// Flow: Component -> (this file) -> fetch -> Backend Route -> Controller -> Model -> MongoDB

// The backend runs on port 5000, the frontend on 5173.
// Different ports = different origins, which is why the backend needs cors().
const API_URL = "http://localhost:5000/api/students";

// One shared helper so every request handles errors the same way.
async function request(url, options) {
  let response;

  try {
    response = await fetch(url, options);
  } catch (Error) {
    // fetch itself only fails when it cannot reach the server at all
    // (backend not running, wrong port, no internet).
    throw new Error("Cannot connect to the server. Is the backend running?");
  }

  // await response.json() reads the JSON body that the backend sent back.
  const data = await response.json().catch(() => ({}));

  // IMPORTANT: fetch does NOT throw an error for 400/404/500 responses.
  // We must check response.ok ourselves. It is true only for status 200-299.
  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
}

// GET all students
export function getStudents() {
  return request(API_URL);
}

// POST a new student
export function createStudent(studentData) {
  return request(API_URL, {
    method: "POST", // fetch uses GET by default, so we must say POST
    headers: { "Content-Type": "application/json" }, // tells the backend "the body is JSON"
    body: JSON.stringify(studentData), // turns the JS object into a JSON string
  });
}

// PUT (update) an existing student
export function updateStudent(id, studentData) {
  return request(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(studentData),
  });
}

// DELETE a student
export function deleteStudent(id) {
  return request(`${API_URL}/${id}`, { method: "DELETE" });
}