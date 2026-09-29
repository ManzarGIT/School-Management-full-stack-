# School Management - Student Registration

A full stack app to register students. React form -> Express API -> MongoDB.

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
