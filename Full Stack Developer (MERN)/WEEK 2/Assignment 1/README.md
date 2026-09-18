# Skill Nexis Internship – Assignment 1

# To-Do List REST API

**Author:** Suman D H  
**Internship ID:** Not provided in the internship offer letter  
**Internship Organization:** Skill Nexis  
**Domain:** Full Stack Developer Intern (MERN Stack)  
**Assignment:** 1 – To-Do List REST API  
**Date:** 17/09/2026  

---

## 📌 Internship Details

According to the internship offer letter, the internship is with **Skill Nexis** in the **Full Stack Developer Intern (MERN Stack)** domain.

The internship period stated in the offer letter is:

- **Start Date:** 28/08/2026
- **End Date:** 09/10/2026
- **Mode:** Online Internship

---

## 📋 Assignment Requirements

The objective of Assignment 1 is to develop a To-Do List REST API.

The requirements are:

- Create REST API endpoints for adding tasks.
- Create REST API endpoints for updating tasks.
- Create REST API endpoints for deleting tasks.
- Implement an endpoint for retrieving tasks.
- Use MongoDB for data storage.
- Use Postman for API testing.

---

# ✨ Features

The To-Do List REST API provides the following functionality:

- ➕ Create a new task
- 📋 Get all tasks
- 🔍 Get a single task
- ✏️ Update a task
- 🗑️ Delete a task
- 🗄️ MongoDB database storage
- 🔌 RESTful API architecture
- 🧪 Postman API testing
- ⚙️ Environment variable configuration

---

# 🔌 Implemented API Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/api/tasks` | Add a new task |
| GET | `/api/tasks` | Get all tasks |
| GET | `/api/tasks/:id` | Get one task |
| PUT | `/api/tasks/:id` | Update a task |
| DELETE | `/api/tasks/:id` | Delete a task |

---

# 🛠️ Technology Stack

| Technology | Purpose |
|---|---|
| Node.js | Backend runtime |
| Express.js | REST API framework |
| MongoDB | Database |
| Mongoose | MongoDB integration |
| JavaScript | Programming language |
| Postman | API testing |
| Git | Version control |
| GitHub | Repository hosting |
| VS Code | Development environment |

---

# 📂 Project Structure

```text
ToDo_List_REST_API_Internship/
│
├── Assignment_1/
│   └── assignment.md
│
├── output_images/
│   └── README.md
│
├── source_code/
│   ├── controllers/
│   │   └── taskController.js
│   │
│   ├── models/
│   │   └── Task.js
│   │
│   ├── routes/
│   │   └── taskRoutes.js
│   │
│   └── server.js
│
├── tests/
│   └── postman_collection.json
│
├── .env.example
├── .gitignore
├── package.json
├── README.md
└── requirements.txt
