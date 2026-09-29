# School Management - Student Registration

A full stack app to register students. React form -> Express API -> MongoDB.


A full stack web application for managing student records. Users can register a new student through a form, view all students in a table, open a student's details in a card, and edit or delete records. The React frontend sends requests to a Node.js and Express REST API, which stores the data in MongoDB using Mongoose.

**Phase 1 features:** student registration form with validation, student list, details card, update and delete, and error handling for empty fields, duplicate roll numbers and server downtime.

## Tech stack
- Frontend: Vite + React + plain CSS
- Backend: Node.js + Express + Mongoose
- Database: MongoDB

## Run the backend
```bash
cd backend
npm install
```
Create a `.env` file in `backend` (copy the values from `.env.example`), then:
```bash
npx nodemon server.js
```

## Run the frontend
```bash
cd Frontend
npm install
npm run dev
```
Open http://localhost:5173

## API
- POST /api/students - add a student
- GET /api/students - get all students
- PUT /api/students/:id - update a student
- DELETE /api/students/:id - delete a student
