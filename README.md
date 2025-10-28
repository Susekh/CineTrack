# 🎬 Favorite Movies & TV Shows Web App

A full-stack web application for managing your favorite movies and TV shows. Built with **React (Vite + TypeScript + TailwindCSS + Zod)** on the frontend and **Node.js (Express + MySQL + Prisma + Zod + TypeScript)** on the backend.

---

## 🚀 Features

- ➕ Add, edit, and delete movies or TV shows.
- 📜 Infinite scroll table for viewing entries.
- 🔍 View detailed info like title, director, budget, duration, year/time, etc.
- ⚙️ Backend with full CRUD APIs and validation.
- 🔐 User authentication (login/logout).
- 💎 Responsive, modern, and dark-themed UI inspired by Letterboxd.

---

## 🧩 Tech Stack

### Frontend
- React (Vite + TypeScript)
- TailwindCSS
- Shadcn UI
- Axios for API requests
- React Router for navigation

### Backend
- Node.js + Express
- MySQL Database
- Prisma ORM
- Zod for schema validation
- JWT-based authentication

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/Susekh/CineTrack.git
cd CineTrack
```

### 2️⃣ Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in the backend folder with the following variables:
```env
DATABASE_URL="mysql://user:password@localhost:3306/moviesdb"
JWT_SECRET="your_jwt_secret_here"
PORT=5000
```

Then run migrations and start the server:
```bash
npx prisma migrate dev --name init
npm run dev
```

Backend runs on **http://localhost:5000**.

---

### 3️⃣ Frontend Setup
```bash
cd ../frontend
npm install
npm run dev
```

Frontend runs on **http://localhost:5173**.

---

🌐 API Endpoints

| Method | Endpoint         | Description              |
| ------ | ---------------- | ------------------------ |
| GET    | `/entry`         | Fetch paginated entries  |
| POST   | `/entry`         | Add new entry            |
| PUT    | `/entry/:id`     | Update an entry          |
| DELETE | `/entry/:id`     | Delete an entry          |
| POST   | `/auth/login`    | Login user               |
| POST   | `/auth/register` | Register user            |
| GET    | `/auth/me`       | Get current user session |


---

## 🧩 DB Diagram

![DB diagram](./dbdiagram.png)

## 📸 Sample Screens

![Home Page](./home.png)

![Dashboard](./dashboard.png)

---

**⭐ Don't forget to star the repo if you like it!**
