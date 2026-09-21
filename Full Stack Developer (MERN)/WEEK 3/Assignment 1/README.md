# Full Stack To-Do Application

A full-stack To-Do application developed as part of the **Full Stack Developer Intern (MERN Stack)** internship at **Skill Nexis**.

## Internship Information

| Detail | Information |
|---|---|
| Organization | Skill Nexis |
| Internship Domain | Full Stack Developer Intern (MERN Stack) |
| Internship Type | Online Internship |
| Start Date | 28/08/2026 |
| End Date | 09/10/2026 |
| Intern | Suman D H |

The internship offer letter states that the internship involves working on assigned projects and completing tasks within deadlines, with the aim of improving practical knowledge and hands-on experience.

## Project Overview

This project is a full-stack To-Do application that provides:

- User registration
- User login
- Password encryption
- JWT-based authentication
- Protected dashboard
- Add new tasks
- View tasks
- Update tasks
- Delete tasks
- MongoDB data storage
- React frontend
- Flask REST API backend

## Technologies Used

### Frontend
- React.js
- Vite
- JavaScript
- Axios
- React Router
- HTML5
- CSS3

### Backend
- Python
- Flask
- Flask-CORS
- Flask-Bcrypt
- PyJWT
- python-dotenv
- REST API

### Database
- MongoDB
- PyMongo

### Development Tools
- Visual Studio Code
- Git
- GitHub
- Postman

## Project Structure

```text
full-stack-todo/
│
├── backend/
│   ├── app.py
│   ├── requirements.txt
│   ├── .env
│   └── venv/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── TodoForm.jsx
│   │   │   └── TodoList.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── Dashboard.jsx
│   │   │
│   │   ├── api.js
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

## Backend API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | Check API status |
| POST | `/api/register` | Register a new user |
| POST | `/api/login` | Login user |
| GET | `/api/me` | Get authenticated user |
| POST | `/api/todos` | Create a task |
| GET | `/api/todos` | Get user's tasks |
| PUT | `/api/todos/<todo_id>` | Update a task |
| DELETE | `/api/todos/<todo_id>` | Delete a task |
| POST | `/api/logout` | Logout |

## Installation and Setup

### 1. Clone the repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd full-stack-todo
```

### 2. Backend Setup

Open a terminal:

```powershell
cd backend
python -m venv venv
```

Activate the virtual environment on Windows:

```powershell
venv\Scripts\activate
```

Install dependencies:

```powershell
pip install -r requirements.txt
```

Create a `.env` file inside the `backend` folder:

```env
MONGO_URI=mongodb://localhost:27017/
JWT_SECRET=your_super_secret_key
```

Start the Flask server:

```powershell
python app.py
```

Backend URL:

```text
http://127.0.0.1:5000
```

### 3. Frontend Setup

Open a second terminal:

```powershell
cd frontend
npm install
npm run dev
```

Vite will display the frontend URL, normally:

```text
http://localhost:5173/
```

If port 5173 is already in use, Vite may use another port such as:

```text
http://localhost:5174/
```

## MongoDB

Make sure MongoDB is installed and running before using registration and To-Do operations.

The default local database configuration is:

```text
mongodb://localhost:27017/
```

Database:

```text
todo_application
```

Collections:

```text
users
todos
```

## Authentication

The application uses JWT-based authentication.

1. A user registers with their credentials.
2. The password is securely hashed before being stored.
3. The user logs in.
4. The backend returns a JWT token.
5. The frontend stores the token.
6. Protected API requests send the token using the `Authorization` header.
7. The backend verifies the token before allowing protected operations.

Example header:

```text
Authorization: Bearer <JWT_TOKEN>
```

## Testing with Postman

The API can be tested using Postman.

Example registration request:

```text
POST http://127.0.0.1:5000/api/register
```

Example login request:

```text
POST http://127.0.0.1:5000/api/login
```

Example To-Do request:

```text
GET http://127.0.0.1:5000/api/todos
```

For protected endpoints, provide the JWT token in the Authorization header.

## Application Workflow

```text
User
  |
  v
React Frontend
  |
  v
Flask REST API
  |
  +----> JWT Authentication
  |
  +----> Password Hashing
  |
  v
MongoDB
  |
  v
User / To-Do Data
```

## Main Features

### User Registration
New users can create an account through the registration page.

### User Login
Registered users can log in using their credentials.

### Authentication
JWT authentication protects user-specific API endpoints.

### To-Do Management
Authenticated users can:

- Create tasks
- View tasks
- Update tasks
- Delete tasks

### Responsive Interface
The React frontend provides pages for registration, login, and the authenticated dashboard.

## Internship Assignment

This project demonstrates practical implementation of full-stack development concepts including:

- Frontend development
- REST API development
- Authentication
- Database integration
- CRUD operations
- API testing
- React routing
- Git and GitHub project management

## Internship Offer Letter

The uploaded internship offer letter is dated **28/08/2026** and is addressed to **Suman D H**. It offers an online internship with **Skill Nexis** for the domain **Full Stack Developer Intern (MERN Stack)**. The stated internship period is from **28/08/2026 to 09/10/2026**. The letter says the intern will work on assigned projects and complete tasks within deadlines to enhance practical knowledge and hands-on experience. 

The letter is signed by **Rakesh Soni, AICTE & MSME REG., Founder & Program Head**.

> **Offer Letter Reference:** Internship Offer Letter dated 28/08/2026, Skill Nexis. 

## Learning Outcomes

Through this project, the following practical skills are demonstrated:

- React application development
- Flask backend development
- REST API creation
- MongoDB integration
- JWT authentication
- Password security
- CRUD operations
- Frontend-backend integration
- API testing with Postman
- GitHub project organization

## Future Enhancements

Possible improvements include:

- Task due dates
- Task priorities
- Task categories
- Search and filtering
- Email verification
- Password reset
- User profile management
- Deployment using cloud services
- Automated testing

## Author

**Suman D H**

Full Stack Developer Intern  
Skill Nexis  
Internship Period: 28/08/2026 – 09/10/2026
