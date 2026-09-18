# Mini Project Notes App Backend and Frontend
# Smart Notes App

## Full Stack Web Development Internship Project

A full-stack Smart Notes application developed as part of the Full Stack Developer Internship.

The application provides secure user authentication, note management, rich-text editing, reminders, search, pinning, archiving, note locking, PDF uploads, drawing support, and dark/light mode.

---

# 📌 Project Overview

The Smart Notes App is a web-based note-taking application that allows users to create, manage, search, edit, organize, and securely store personal notes.

The backend is developed using Python Flask and MongoDB, while the frontend uses HTML5, CSS3, and JavaScript.

JWT authentication is used to secure protected APIs and Bcrypt is used for password hashing.

---

# 🎯 Internship Assignment

## Mini Project – Notes App Backend

The internship assignment is to:

- Develop a backend API for a notes-taking application.
- Implement CRUD operations.
- Secure routes using JWT authentication.
- Integrate a database for storing users and notes.
- Test APIs using Postman.

## Learning Outcomes

Students learn:

- Backend logic
- Database integration
- REST API development
- Authentication and authorization
- CRUD operations
- Real-world application development

---

# ✨ Features

## 👤 User Authentication

- User registration
- User login
- Password hashing using Bcrypt
- JWT-based authentication
- Protected note APIs

## 📝 Notes CRUD

Users can:

- Create notes
- View notes
- View individual notes
- Update notes
- Delete notes

## 📌 Pin Notes

Users can pin and unpin notes.

Pinned notes can be displayed at the top of the notes list.

## 📦 Archive / Restore

Users can:

- Archive notes
- Restore archived notes

## 🔄 Reorder Notes

Notes can be reordered using drag-and-drop functionality.

## ⏰ Reminders

Notes can contain reminder information.

## 🔒 Lock Notes

Individual notes can be protected with a lock password.

## 📄 PDF Upload

Users can upload PDF files and associate them with notes.

## ✏️ Drawing

The application supports saving drawing information with a note.

## 🌙 Dark / Light Mode

Users can switch between dark and light themes.

## 🔍 Search

Users can search through their notes.

## 📝 Rich Text

The editor supports features such as:

- Bold
- Italic
- Underline
- Strikethrough
- Headings
- Quote
- Code
- Highlight
- Text color
- Checklist

## 🎨 Note Colors

Notes can use different sticky-note colors:

- Yellow
- Pink
- Blue
- Green

## 📱 Responsive Interface

The frontend provides a user-friendly interface for managing notes.

---

# 🛠️ Technology Stack

| Technology | Purpose |
|---|---|
| Python | Backend programming |
| Flask | REST API framework |
| Flask-CORS | Cross-origin communication |
| MongoDB | Database |
| PyMongo | MongoDB integration |
| Flask-Bcrypt | Password hashing |
| PyJWT | JWT authentication |
| python-dotenv | Environment configuration |
| HTML5 | Frontend structure |
| CSS3 | Frontend design |
| JavaScript | Frontend functionality |
| Postman | API testing |
| Git | Version control |
| GitHub | Repository hosting |
| VS Code | Development |

---

# 📂 Project Structure

```text
notes-app/
│
├── app.py
├── requirements.txt
├── .env
├── .env.example
├── .gitignore
├── README.md
│
├── uploads/
│
└── frontend/
    ├── index.html
    ├── style.css
    └── script.js
