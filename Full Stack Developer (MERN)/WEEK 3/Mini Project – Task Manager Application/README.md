# Mini Project – Task Manager Application

A complete full-stack **Task Manager Application** developed as part of the **Full Stack Developer Intern (MERN Stack)** internship at **Skill Nexis**.

The application allows users to register, log in securely, create and manage tasks, filter tasks, and view task statistics through a modern React dashboard.

---

## 📌 Internship Information

| Details               | Information                              |
| --------------------- | ---------------------------------------- |
| **Organization**      | Skill Nexis                              |
| **Intern**            | Suman D H                                |
| **Internship Domain** | Full Stack Developer Intern (MERN Stack) |
| **Internship Type**   | Online Internship                        |
| **Start Date**        | 28/08/2026                               |
| **End Date**          | 09/10/2026                               |

According to the internship offer letter, the internship includes assigned projects/tasks with deadlines and provides practical knowledge and hands-on experience.

### 📄 Internship Offer Letter

The original offer letter should be included in the GitHub project in the following location:

```text
docs/
└── Internship_Offer_Letter.pdf
```

**Offer Letter Details:**

* Date of Offer Letter: **28/08/2026**
* Intern: **Suman D H**
* Subject: **Offer For Internship**
* Domain: **Full Stack Developer Intern (MERN Stack)**
* Internship Period: **28/08/2026 – 09/10/2026**
* Organization: **Skill Nexis**

---

# 📋 Project Overview

## Mini Project: Task Manager Application

The **Task Manager Application** is a full-stack web application designed to provide an easy way for authenticated users to manage their daily tasks.

The project contains:

* React frontend
* Express.js backend
* Node.js server
* MongoDB database
* JWT authentication
* Password encryption
* Task CRUD operations
* Task filtering
* User profile
* Dashboard statistics

---

# 🎯 Project Objective

The main objective of this project is to develop a complete task-tracking application and gain practical experience in connecting the frontend, backend, and database.

```text
React Frontend
       ↓
Axios API Requests
       ↓
Express.js REST API
       ↓
Node.js
       ↓
MongoDB
```

---

# 🎓 Learning Outcome

Students gain end-to-end experience in connecting:

* Frontend
* Backend
* REST APIs
* Authentication
* Database

The project provides practical experience with full-stack application development.

---

# 🛠️ Technologies Used

## Frontend

* React.js
* Vite
* Axios
* React Router DOM
* JavaScript
* HTML5
* CSS3

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JSON Web Token (JWT)
* bcryptjs
* CORS
* dotenv

## Development Tools

* Visual Studio Code
* MongoDB
* MongoDB Compass
* Postman
* Git
* GitHub

---

# ✨ Features

## 1. User Registration

New users can create an account using:

* Name
* Email
* Password

Passwords are encrypted using `bcryptjs` before being stored in the database.

---

## 2. User Login

Registered users can log in using their email and password.

After successful authentication, the backend generates a JWT token.

```text
User
 ↓
Login
 ↓
Validate Credentials
 ↓
Generate JWT
 ↓
Dashboard
```

---

## 3. Secure Authentication

The application uses **JWT-based authentication**.

Protected API requests use:

```http
Authorization: Bearer <JWT_TOKEN>
```

Only authenticated users can access their task data.

---

## 4. Create Tasks

Users can create new tasks with:

* Title
* Description
* Status
* Priority
* Due Date

---

## 5. View Tasks

Users can view their tasks on the dashboard.

Tasks are associated with the currently logged-in user.

---

## 6. Update Tasks

Users can edit existing tasks and update:

* Title
* Description
* Status
* Priority
* Due Date

---

## 7. Delete Tasks

Users can delete tasks that are no longer required.

---

## 8. Task Status

The application supports three task statuses:

```text
Pending
In Progress
Completed
```

---

## 9. Task Priority

The application supports three priority levels:

```text
Low
Medium
High
```

---

## 10. Task Filtering

Users can filter tasks according to their status:

```text
All
Pending
In Progress
Completed
```

---

## 11. User Profile

The dashboard displays:

* User name
* Email address
* Profile initial
* Welcome message
* Logout option

---

## 12. Dashboard Statistics

The dashboard displays:

```text
Total Tasks
Pending Tasks
In Progress Tasks
Completed Tasks
```

---

# 📁 Project Structure

```text
task-manager/
│
├── backend/
│   │
│   ├── middleware/
│   │   └── auth.js
│   │
│   ├── models/
│   │   ├── User.js
│   │   └── Task.js
│   │
│   ├── routes/
│   │   ├── auth.js
│   │   └── tasks.js
│   │
│   ├── .env
│   ├── server.js
│   ├── package.json
│   └── package-lock.json
│
├── frontend/
│   │
│   ├── src/
│   │   ├── pages/
│   │   │   ├── LoginPage.jsx
│   │   │   ├── RegisterPage.jsx
│   │   │   └── Dashboard.jsx
│   │   │
│   │   ├── api.js
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── index.css
│   │
│   ├── package.json
│   ├── package-lock.json
│   └── vite.config.js
│
├── docs/
│   └── Internship_Offer_Letter.pdf
│
└── README.md
```

---

# 🗄️ Database

The application uses **MongoDB** for storing users and tasks.

Database:

```text
task_manager
```

Collections:

```text
users
tasks
```

---

## User Model

Example:

```json
{
  "name": "Suman D H",
  "email": "suman@example.com",
  "password": "hashed-password"
}
```

---

## Task Model

Example:

```json
{
  "title": "Complete Full Stack Project",
  "description": "Finish the Task Manager application",
  "status": "In Progress",
  "priority": "High",
  "dueDate": "2026-10-01",
  "user": "USER_ID"
}
```

---

# 🔐 Authentication Flow

```text
                 REGISTER
                    ↓
             Password Hashing
                    ↓
                 MongoDB
                    ↓
                  LOGIN
                    ↓
          Verify Email & Password
                    ↓
               Generate JWT
                    ↓
                Dashboard
                    ↓
          Protected API Requests
```

---

# 🔗 API Endpoints

## Authentication APIs

### Register

```http
POST /api/auth/register
```

Request:

```json
{
  "name": "Suman D H",
  "email": "suman@example.com",
  "password": "password123"
}
```

---

### Login

```http
POST /api/auth/login
```

Request:

```json
{
  "email": "suman@example.com",
  "password": "password123"
}
```

---

# Task APIs

### Get All Tasks

```http
GET /api/tasks
```

---

### Filter Tasks

```http
GET /api/tasks?status=Completed
```

---

### Create Task

```http
POST /api/tasks
```

---

### Update Task

```http
PUT /api/tasks/:id
```

---

### Delete Task

```http
DELETE /api/tasks/:id
```

---

# ⚙️ Installation

## Prerequisites

Install the following software:

* Node.js
* npm
* MongoDB
* MongoDB Compass
* Visual Studio Code
* Git

---

# 1. Clone the Repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
```

Go to the project:

```bash
cd task-manager
```

---

# 2. Backend Setup

Open a terminal:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

---

## Backend Environment Variables

Create:

```text
backend/.env
```

Add:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/task_manager
JWT_SECRET=your_super_secret_key
```

---

## Start Backend

```bash
node server.js
```

Backend:

```text
http://localhost:5000
```

---

# 3. Frontend Setup

Open another terminal:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the frontend:

```bash
npm run dev
```

Frontend:

```text
http://localhost:5173
```

---

# 🧪 Testing with Postman

The APIs can be tested using Postman.

Recommended testing order:

```text
1. Register User
       ↓
2. Login User
       ↓
3. Get JWT Token
       ↓
4. Create Task
       ↓
5. Get Tasks
       ↓
6. Filter Tasks
       ↓
7. Update Task
       ↓
8. Delete Task
```

---

# 🔄 Application Workflow

```text
             ┌───────────────┐
             │    Register   │
             └───────┬───────┘
                     ↓
             ┌───────────────┐
             │     Login     │
             └───────┬───────┘
                     ↓
             ┌───────────────┐
             │   JWT Token   │
             └───────┬───────┘
                     ↓
             ┌───────────────┐
             │   Dashboard   │
             └───────┬───────┘
                     ↓
          ┌──────────────────────┐
          │    Task Management   │
          └──────────┬───────────┘
                     ↓
       ┌─────────────┼─────────────┐
       ↓             ↓             ↓
    Create         Update        Delete
       ↓             ↓             ↓
       └─────────────┼─────────────┘
                     ↓
              ┌─────────────┐
              │   MongoDB   │
              └─────────────┘
```

---

# 📝 Sample Tasks

| Task                        | Status      | Priority |
| --------------------------- | ----------- | -------- |
| Complete Full Stack Project | In Progress | High     |
| Study React.js              | Pending     | Medium   |
| Test REST API               | Completed   | Medium   |
| Upload Project to GitHub    | Pending     | High     |
| Prepare Internship Report   | Pending     | High     |

---

# 🖥️ Screenshots

Recommended screenshots for the GitHub repository:

```text
screenshots/
│
├── register.png
├── login.png
├── dashboard.png
├── add-task.png
├── edit-task.png
├── task-filter.png
└── profile.png
```

Example:

```markdown
![Dashboard](screenshots/dashboard.png)
```

---

# 🧰 Troubleshooting

## MongoDB Connection Error

Make sure MongoDB is running.

Check `.env`:

```env
MONGO_URI=mongodb://127.0.0.1:27017/task_manager
```

---

## Backend Error

Run:

```bash
cd backend
npm install
node server.js
```

Make sure the backend `package.json` is valid.

---

## Frontend Error

Run:

```bash
cd frontend
npm install
npm run dev
```

---

## CORS Error

Make sure the backend contains:

```js
const cors = require("cors");

app.use(cors());
```

---

# 📚 Learning Outcomes

By completing this project, the student gains practical experience in:

* React.js
* React Router
* Node.js
* Express.js
* REST API development
* MongoDB
* Mongoose
* CRUD operations
* JWT authentication
* Password hashing
* Axios
* Task filtering
* Frontend-backend integration
* Environment variables
* Git
* GitHub

---

# 🚀 Future Enhancements

Possible future enhancements include:

* Task search
* Priority filtering
* Due-date sorting
* Task notifications
* Password reset
* Profile editing
* Dark mode
* Pagination
* Admin dashboard
* Automated testing
* Cloud deployment

---

# 👨‍💻 Author

**Suman D H**

**Full Stack Developer Intern**

**Organization:** Skill Nexis

**Domain:** Full Stack Developer Intern (MERN Stack)

---

# 📄 Internship Documentation

This project is developed as part of the Skill Nexis internship.

The internship offer letter specifies:

```text
Organization:
Skill Nexis

Domain:
Full Stack Developer Intern (MERN Stack)

Internship Period:
28/08/2026 – 09/10/2026
```

The original offer letter should be placed in:

```text
docs/Internship_Offer_Letter.pdf
```

---

# 📜 License

This project was developed for **educational and internship purposes**.
