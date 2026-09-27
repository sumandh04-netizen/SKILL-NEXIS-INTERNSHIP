# TASKFLOW — Project Management Dashboard

A modern, responsive project management dashboard built with the MERN Stack.

TASKFLOW helps teams organize projects, manage tasks, track progress, collaborate with team members, and visualize project analytics from a single workspace.

---

## 📌 Project Title

# TASKFLOW

### Project Type

Project Management Dashboard

### Development Stack

MERN Stack

- MongoDB
- Express.js
- React.js
- Node.js

---

# 📄 Internship Information

This project was developed as part of the internship assigned by Skill Nexis.

| Details | Information |
|---|---|
| Internship Organization | Skill Nexis |
| Internship Domain | Full Stack Developer Intern (MERN Stack) |
| Internship Type | Online Internship |
| Internship Start Date | 28/08/2026 |
| Internship End Date | 09/10/2026 |
| Intern Name | Suman D H |
| Project Title | TASKFLOW – Project Management Dashboard |

According to the internship offer letter, the internship is focused on Full Stack Developer Intern (MERN Stack) work and requires completing assigned projects and tasks within deadlines.

---

# 📨 Offer Letter

The internship offer letter was issued by Skill Nexis.

### Offer Letter Details

**Date:** 28/08/2026

**Candidate:** Suman D H

**Organization:** Skill Nexis

**Internship Domain:** Full Stack Developer Intern (MERN Stack)

**Internship Duration:** 28/08/2026 – 09/10/2026

The offer letter states that the internship is intended to enhance practical knowledge and hands-on experience through assigned projects and tasks.

### Offer Letter Authority

**Rakesh Soni**

AICTE & MSME REG.

Founder & Program Head

---

# 🎯 Project Overview

TASKFLOW is a complete project management dashboard designed to simplify project planning, task management, team collaboration, and progress tracking.

The application provides a centralized workspace where users can:

- Create and manage projects
- Create, update, and delete tasks
- Organize tasks using boards
- Move tasks between workflow stages
- Assign tasks to team members
- Set task priorities
- Track task progress
- Manage project members
- View project analytics
- Switch between light and dark themes
- Search tasks
- Use an AI Assistant interface
- Maintain persistent project and task data

---

# ✨ Main Features

## 1. Project Management

Users can create and manage multiple projects.

Each project can contain:

- Project name
- Project description
- Project color
- Project owner
- Project members
- Project tasks

---

## 2. Task Management

TASKFLOW provides complete task management functionality.

Users can:

- Create tasks
- Edit tasks
- Delete tasks
- Assign tasks
- Set task status
- Set task priority
- Set task type
- Set progress
- Add descriptions
- Set due dates
- Add tags
- Manage checklist items

---

## 3. Project Boards

TASKFLOW provides a visual Kanban-style project board.

Tasks can be organized into:

```text
TODO
   ↓
IN PROGRESS
   ↓
DONE
```

The board supports task cards and drag-and-drop workflow management.

---

## 4. Drag-and-Drop Functionality

The board allows users to move task cards between workflow columns.

Example:

```text
┌──────────────┐
│     TODO     │
│              │
│  Task Card   │
└──────────────┘
       │
       │ Drag
       ▼
┌──────────────┐
│ IN PROGRESS  │
│              │
│  Task Card   │
└──────────────┘
       │
       │ Complete
       ▼
┌──────────────┐
│     DONE     │
│              │
│  Task Card   │
└──────────────┘
```

This provides an intuitive way to manage the workflow of project tasks.

---

# 👥 Team Management

TASKFLOW provides team-oriented project management features.

Users can manage:

- Team members
- Project membership
- Task assignments
- Member workload
- Team activity

---

# 🔐 Authentication

TASKFLOW uses secure authentication.

Features include:

- User registration
- User login
- JWT authentication
- Password hashing
- Protected application routes
- Authenticated API requests
- Logout functionality

Passwords are never stored as plain text.

---

# 🛡️ Role-Based Access

The application supports access control for project operations.

Different operations can be restricted based on the user's role or ownership.

Examples:

- Project owner can update projects
- Project owner can delete projects
- Authorized project members can access project resources
- Authenticated users can manage their permitted tasks

---

# 💾 Data Persistence

TASKFLOW uses MongoDB for persistent data storage.

The following information can be persisted:

- Users
- Projects
- Tasks
- Task assignments
- Task status
- Task priorities
- Project membership
- Task progress
- Checklists

MongoDB allows project information and task data to remain available between application sessions.

---

# 📊 Analytics Dashboard

TASKFLOW provides analytics for project and task management.

Analytics can display information such as:

- Total projects
- Total tasks
- Completed tasks
- Team members
- Overall project progress
- Tasks by priority
- Tasks by status
- Tasks by team member
- Project progress

Charts are implemented using Recharts.

---

# 🤖 AI Assistant

TASKFLOW includes an AI Assistant workspace.

The AI Assistant interface provides:

- Chat interface
- Quick actions
- New conversation option
- Project-management assistance
- Task-related suggestions
- AI-style responses
- Clear conversation functionality

The interface can be extended later to connect with a real AI service through a secure backend API.

---

# 🎨 User Interface

TASKFLOW is designed with a modern SaaS-style interface.

The UI includes:

- Responsive dashboard
- Sidebar navigation
- Top navigation bar
- Cards
- Modals
- Task boards
- Charts
- Toast notifications
- Loading states
- Error states
- Empty states
- Dark mode
- Light mode

---

# 🌗 Theme Support

TASKFLOW supports:

- Light mode
- Dark mode

Users can switch themes from the sidebar or top navigation.

The selected theme is persisted locally.

---

# 🔎 Search

Users can search for tasks through the application header.

The search interface provides quick access to task-related information.

---

# 📱 Responsive Design

TASKFLOW is designed to work across different screen sizes.

Supported layouts include:

- Desktop
- Laptop
- Tablet
- Mobile

Responsive breakpoints are considered for:

```text
1920px
1440px
1280px
1024px
768px
480px
375px
```

---

# 🏗️ Technology Stack

## Frontend

- React.js
- React Router
- Axios
- Lucide React
- Recharts
- React Toastify
- Vite
- CSS

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- CORS
- Morgan
- dotenv

---

# 📁 Project Structure

```text
TASKFLOW/
│
├── backend/
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Project.js
│   │   └── Task.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── projects.js
│   │   ├── tasks.js
│   │   └── analytics.js
│   ├── .env
│   ├── .env.example
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Layout.jsx
│   │   │   ├── MetricCard.jsx
│   │   │   └── Modal.jsx
│   │   ├── context/
│   │   │   ├── AuthContext.jsx
│   │   │   └── ThemeContext.jsx
│   │   ├── pages/
│   │   │   ├── Auth.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Projects.jsx
│   │   │   ├── Board.jsx
│   │   │   ├── Tasks.jsx
│   │   │   ├── Team.jsx
│   │   │   ├── Analytics.jsx
│   │   │   ├── Settings.jsx
│   │   │   └── AIAssistant.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   └── vite.config.js
│
├── docs/
│   └── Internship_Offer_Letter.pdf
│
└── README.md
```

---

# 🔌 API Endpoints

## Authentication

```text
POST /api/auth/register
POST /api/auth/login
```

## Projects

```text
GET    /api/projects
GET    /api/projects/:id
POST   /api/projects
PUT    /api/projects/:id
DELETE /api/projects/:id
```

## Tasks

```text
GET    /api/tasks
GET    /api/tasks/:id
POST   /api/tasks
PUT    /api/tasks/:id
DELETE /api/tasks/:id
```

## Analytics

```text
GET /api/analytics
```

## Health Check

```text
GET /api/health
```

---

# ⚙️ Installation

## 1. Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd TASKFLOW
```

---

# 🔧 Backend Setup

```bash
cd backend
npm install
```

Create:

```text
backend/.env
```

Add:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/taskflow
CLIENT_URL=http://localhost:5173
JWT_SECRET=your-long-random-secret
```

Start the backend:

```bash
npm run dev
```

Backend:

```text
http://localhost:5000
```

Health check:

```text
http://localhost:5000/api/health
```

---

# 💻 Frontend Setup

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend:

```text
http://localhost:5173
```

---

# 🗄️ MongoDB

TASKFLOW uses MongoDB for data persistence.

Default local MongoDB connection:

```text
mongodb://127.0.0.1:27017/taskflow
```

Make sure MongoDB is running before starting the backend.

---

# 🔑 Environment Variables

## Backend

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/taskflow
CLIENT_URL=http://localhost:5173
JWT_SECRET=your-secret-key
```

Do not commit the real `.env` file containing secrets.

Use `.env.example` for sharing configuration structure.

---

# 🧪 Testing

The following functionality should be tested:

## Authentication

- User registration
- User login
- Invalid login
- Password validation
- Logout
- Protected routes

## Projects

- Create project
- View projects
- Open project
- Update project
- Delete project
- Project member access

## Tasks

- Create task
- Edit task
- Delete task
- Change status
- Change priority
- Change progress
- Set due date
- Assign task

## Board

- Display TODO tasks
- Display IN PROGRESS tasks
- Display DONE tasks
- Drag task cards
- Move tasks between columns
- Persist task status

## Analytics

- Display project count
- Display task count
- Display completed tasks
- Display member information
- Display charts
- Display project progress

## UI

- Responsive layout
- Light theme
- Dark theme
- Sidebar navigation
- Mobile navigation
- Toast notifications
- Loading states
- Error states
- Empty states

---

# 🎯 Project Objectives

The main objectives of TASKFLOW are:

1. Build a complete MERN Stack application.
2. Implement secure user authentication.
3. Create a project management dashboard.
4. Implement project and task CRUD operations.
5. Implement boards and task cards.
6. Provide drag-and-drop task management.
7. Implement role-based access control.
8. Persist application data using MongoDB.
9. Provide analytics and progress visualization.
10. Create a responsive and modern user interface.
11. Gain practical full-stack development experience.

---

# 👨‍💻 Developer

**Suman D H**

Full Stack Developer Intern

MERN Stack

### Project

**TASKFLOW – Project Management Dashboard**

---

# 📎 Internship Documents

The internship offer letter is included in the project documentation.

### 📄 Internship Offer Letter

**Organization:** Skill Nexis

**Intern:** Suman D H

**Domain:** Full Stack Developer Intern (MERN Stack)

**Internship Type:** Online Internship

**Start Date:** 28/08/2026

**End Date:** 09/10/2026

The offer letter states that the internship includes assigned projects and tasks intended to enhance practical knowledge and hands-on experience.

### 📂 Recommended File Location

```text
TASKFLOW/
└── docs/
    └── Internship_Offer_Letter.pdf
```

### 🔗 View Offer Letter

[View Internship Offer Letter](docs/Internship_Offer_Letter.pdf)

---

# 📂 Documentation

| Document | Description |
|---|---|
| `README.md` | TASKFLOW project documentation |
| `docs/Internship_Offer_Letter.pdf` | Skill Nexis internship offer letter |

---

# 🏢 Internship Details

| Details | Information |
|---|---|
| Organization | Skill Nexis |
| Candidate | Suman D H |
| Domain | Full Stack Developer Intern (MERN Stack) |
| Internship Type | Online Internship |
| Start Date | 28/08/2026 |
| End Date | 09/10/2026 |
| Project | TASKFLOW |
| Project Type | Project Management Dashboard |

### 📜 Offer Letter Authority

**Rakesh Soni**

AICTE & MSME REG.

Founder & Program Head

---

# 🚀 Project Status

TASKFLOW is structured as a full-stack MERN project management dashboard with authentication, project management, task management, boards, analytics, team-oriented functionality, theme support, and an AI Assistant interface.

---

# 📌 Notes

- Keep backend and frontend running in separate terminals during local development.
- Make sure MongoDB is running before starting the backend.
- Keep sensitive environment variables inside `.env`.
- Do not commit `.env` files containing secrets.
- Use `.env.example` when sharing environment configuration.
- Update `YOUR_GITHUB_REPOSITORY_URL` with the actual GitHub repository URL before publishing the README.

---

# 📜 License

This project was developed for internship and educational purposes.

---

# ⭐ TASKFLOW

**Project Management Dashboard — MERN Stack**

Developed by **Suman D H** as part of the **Skill Nexis Full Stack Developer Intern (MERN Stack)** internship.
