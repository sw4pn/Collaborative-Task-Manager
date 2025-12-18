# 🧑‍💻 Collaborative Task Manager

A full-stack, production-ready collaborative task management application built as part of a Full-Stack Engineering Assessment.
The app allows users to securely create, assign, track, and collaborate on tasks with **real-time updates**.

## 🚀 Live Demo

- **Frontend**: _<TODO: add frontend_url>_
- **Backend API**: _<TODO: add backend_url>_

---

## ✨ Features

- **Authentication & Authorization**

  - Secure registration & login
  - Password hashing (bcrypt)
  - JWT-based authentication
  - Protected routes with session validation

- **Task Management (CRUD)**

  - Create, update, delete tasks
  - Assign tasks to users
  - Task priorities & statuses
  - Authorization enforced (creator-only updates)

- **Real-Time Collaboration**

  - Live task updates using **Socket.io**
  - Instant notifications on task assignment

- **Dashboard & Filtering**

  - Assigned tasks
  - Created tasks
  - Overdue tasks
  - Filter by status & priority
  - Sort by due date

- **Bonus**
  - Audit logging for task updates
  - Dockerized full-stack setup
  - Unit tests for critical business logic

---

### 🗄️ Database Choice

**PostgreSQL** was chosen over MongoDB for this application because:

- The domain is **highly relational** (Users ↔ Tasks ↔ Assignments ↔ Audit Logs)
- Strong **foreign key constraints** ensure data integrity
- Native **ENUM support** aligns well with task priority and status

## 🏗️ Tech Stack

**Frontend**

- React + TypeScript (Vite)
- Tailwind CSS
- React Query
- Socket.io Client

**Backend**

- Node.js + Express (TypeScript)
- PostgreSQL
- Prisma ORM
- Socket.io
- Zod (DTO validation)
- Jest (unit testing)

---

## 🐳 Run with Docker (Recommended)

### 1️⃣ Start all services

```bash
docker compose up --build
```

- Frontend → http://localhost:3000

- Backend → http://localhost:8000

### 2️⃣ Initialize database (first run only)

```bash
docker exec -it task_manager_backend npm run db:init
```

## ⚙️ Run Manually (Without Docker)

### Backend

```bash
cd backend
npm install
cp .env.example .env
npx prisma migrate dev
npm run dev

```

### Frontend

```bash
cd frontend
npm install
cp .env.example .env
npm run dev

```

## 🔌 API Overview

```bash
POST   /auth/register
POST   /auth/login

GET    /users/profile
PUT    /users/profile

POST   /tasks
GET    /tasks
GET    /tasks/:id
PUT    /tasks/:id
DELETE /tasks/:id

```

## 🧪 Testing

```bash
cd backend
npm test

```
