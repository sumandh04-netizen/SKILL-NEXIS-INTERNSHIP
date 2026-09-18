# User Authentication API

## Full Stack Developer Intern – MERN Stack

A full-stack User Authentication System developed as part of the **Full Stack Developer Intern (MERN Stack)** internship at **Skill Nexis**.

The project provides secure user registration, login, password encryption, JWT-based authentication, and protected user profile access through a web frontend and REST API.

---

## Internship Information

**Organization:** Skill Nexis
**Internship Domain:** Full Stack Developer Intern (MERN Stack)
**Internship Type:** Online Internship
**Internship Start Date:** 28/08/2026
**Internship End Date:** 09/10/2026

According to the internship offer letter, the internship involves working on assigned projects, completing tasks within deadlines, and gaining practical knowledge and hands-on experience.

**Offer Letter Date:** 28/08/2026
**Offer Letter Subject:** Offer For Internship
**Program Head:** Rakesh Soni
**Designation:** Founder & Program Head
**Registration:** AICTE & MSME REG.
-----------------------------------

# Project Overview

The **User Authentication API** is a secure authentication application that allows users to:

* Create a new account
* Login using email and password
* Store passwords securely using bcrypt hashing
* Generate JWT authentication tokens
* Access protected user profile information
* Logout from the frontend
* Communicate between frontend and backend using REST APIs
* Store user information in MongoDB

---

# Technologies Used

## Backend

* Python
* Flask
* Flask-CORS
* MongoDB
* PyMongo
* Flask-Bcrypt
* JWT / PyJWT
* Python-dotenv

## Frontend

* HTML5
* CSS3
* JavaScript
* Fetch API
* Local Storage

## Development Tools

* Visual Studio Code
* MongoDB
* Postman
* Git
* GitHub

---

# Project Architecture

```text
                    USER
                     |
                     v
             +---------------+
             |   Frontend    |
             | HTML/CSS/JS   |
             +---------------+
                     |
                     | REST API
                     v
             +---------------+
             | Flask Backend |
             |   app.py      |
             +---------------+
                     |
          +----------+----------+
          |                     |
          v                     v
     JWT Authentication      bcrypt
          |                 Password Hash
          |                     |
          +----------+----------+
                     |
                     v
             +---------------+
             |    MongoDB    |
             | authentication |
             |      _db      |
             +---------------+
```

---

# Project Structure

```text
user-authentication-api/
│
├── app.py
├── requirements.txt
├── .env
├── .env.example
├── .gitignore
├── README.md
│
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── postman/
│   └── User_Authentication_API.postman_collection.json
│
└── docs/
    └── API_TESTING.md
```

---

# Main Features

## 1. User Registration

Users can create an account by providing:

* Name
* Email
* Password

The password is never stored as plain text. It is converted into a secure bcrypt hash before being stored in MongoDB.

### API

```text
POST /register
```

### Request

```json
{
    "name": "Suman",
    "email": "suman@gmail.com",
    "password": "password123"
}
```

### Response

```json
{
    "message": "User registered successfully"
}
```

---

# 2. User Login

Registered users can login using their email and password.

### API

```text
POST /login
```

### Request

```json
{
    "email": "suman@gmail.com",
    "password": "password123"
}
```

### Response

```json
{
    "message": "Login successful",
    "token": "JWT_TOKEN"
}
```

The JWT token is stored in the browser's Local Storage by the frontend.

---

# 3. JWT Authentication

JSON Web Token is used to authenticate users.

After successful login:

```text
User
  |
  v
Login
  |
  v
Flask verifies password
  |
  v
JWT Token generated
  |
  v
Frontend stores token
```

For protected requests, the frontend sends:

```text
Authorization: Bearer JWT_TOKEN
```

---

# 4. Protected Profile

The profile endpoint can only be accessed with a valid JWT token.

### API

```text
GET /profile
```

### Header

```text
Authorization: Bearer YOUR_JWT_TOKEN
```

### Response

```json
{
    "message": "Access granted",
    "user": {
        "name": "Suman",
        "email": "suman@gmail.com"
    }
}
```

---

# 5. Logout

The frontend removes the JWT token from Local Storage when the user logs out.

```text
Logout
   |
   v
Remove JWT token
   |
   v
Return to Login
```

---

# API Endpoints

| Method | Endpoint    | Description              |
| ------ | ----------- | ------------------------ |
| GET    | `/`         | Check API status         |
| POST   | `/register` | Register a new user      |
| POST   | `/login`    | Login user               |
| GET    | `/profile`  | Access protected profile |
| POST   | `/logout`   | Logout                   |

---

# Installation

## Step 1: Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

```bash
cd user-authentication-api
```

---

# Step 2: Create Virtual Environment

Windows:

```cmd
python -m venv venv
```

Activate:

```cmd
venv\Scripts\activate
```

If using PowerShell:

```powershell
.\venv\Scripts\Activate.ps1
```

---

# Step 3: Install Dependencies

```cmd
pip install -r requirements.txt
```

---

# Step 4: Configure Environment Variables

Create a `.env` file:

```env
MONGO_URI=mongodb://localhost:27017/
JWT_SECRET=my_super_secret_jwt_key_123456
```

Do not upload `.env` to GitHub.

The `.gitignore` file should contain:

```text
venv/
.venv/
__pycache__/
*.pyc
.env
.vscode/
.idea/
*.log
```

---

# Step 5: Start MongoDB

Make sure MongoDB is running on:

```text
mongodb://localhost:27017/
```

The application uses:

```text
Database: authentication_db
Collection: users
```

---

# Step 6: Start Flask Backend

From the main project directory:

```cmd
python app.py
```

Expected output:

```text
User Authentication API
Server: http://127.0.0.1:5000
MongoDB: authentication_db

MongoDB connected successfully!
 * Running on http://127.0.0.1:5000
```

---

# Step 7: Open Frontend

Open:

```text
frontend/index.html
```

You can use VS Code Live Server.

Right-click:

```text
index.html
```

and select:

```text
Open with Live Server
```

---

# Frontend Screens

The application contains:

### Registration Screen

```text
----------------------------------
       User Authentication

         Create Account

Name       [______________]

Email      [______________]

Password   [______________]

       [    Register    ]

Already have an account?
             Login
----------------------------------
```

### Login Screen

```text
----------------------------------
             Login

Email      [______________]

Password   [______________]

          [ Login ]

Don't have an account?
           Register
----------------------------------
```

### Profile Screen

```text
----------------------------------
           Welcome

Name       Suman
Email      suman@gmail.com

         Access granted

          [ Logout ]
----------------------------------
```

---

# Testing with Postman

The API can be tested using Postman.

## Register

```text
POST http://127.0.0.1:5000/register
```

Body:

```json
{
    "name": "Suman",
    "email": "suman@gmail.com",
    "password": "password123"
}
```

---

## Login

```text
POST http://127.0.0.1:5000/login
```

Body:

```json
{
    "email": "suman@gmail.com",
    "password": "password123"
}
```

Copy the JWT token from the response.

---

## Profile

```text
GET http://127.0.0.1:5000/profile
```

Add the header:

```text
Authorization: Bearer YOUR_TOKEN
```

Expected:

```json
{
    "message": "Access granted",
    "user": {
        "name": "Suman",
        "email": "suman@gmail.com"
    }
}
```

---

# Security Features

The project implements the following security mechanisms:

### Password Hashing

Passwords are encrypted using bcrypt hashing before storage.

```text
Plain Password
      |
      v
    bcrypt
      |
      v
Password Hash
      |
      v
    MongoDB
```

### JWT Authentication

JWT is used to protect private API routes.

```text
Login
  |
  v
Credentials Verified
  |
  v
JWT Generated
  |
  v
Protected API
```

### Environment Variables

Sensitive configuration such as the MongoDB connection string and JWT secret is stored in `.env`.

---

# Learning Outcomes

This project provides practical experience with:

* REST API development
* Flask framework
* MongoDB database operations
* CRUD-related database concepts
* Password hashing
* JWT authentication
* API security
* Frontend-backend integration
* JavaScript Fetch API
* Local Storage
* Postman API testing
* Git and GitHub
* Full-stack application development

---

# Internship Project Context

This project was developed in the context of the **Full Stack Developer Intern (MERN Stack)** internship offered by **Skill Nexis**. The offer letter identifies the internship as an online internship beginning **28/08/2026** and ending **09/10/2026**, with assigned projects and tasks intended to develop practical, hands-on experience.

---

# Future Enhancements

Possible future improvements include:

* Password reset functionality
* Email verification
* Refresh tokens
* User roles
* Admin dashboard
* User management
* Profile editing
* Password change
* Improved form validation
* React frontend
* Deployment to a cloud platform
* Automated testing

---

# Author

**Suman D H**

Full Stack Developer Intern
Skill Nexis

---

# Internship Duration

```text
Start Date : 28/08/2026
End Date   : 09/10/2026
Domain     : Full Stack Developer Intern (MERN Stack)
Mode       : Online Internship
```

---

# License

This project was developed for educational, internship, and practical learning purposes.
