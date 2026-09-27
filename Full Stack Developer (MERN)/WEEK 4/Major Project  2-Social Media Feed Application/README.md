🌐 SOCIALHUB — Social Media Feed Application

> A modern, full-stack social media platform built using the MERN Stack with authentication, social feeds, posts, likes, comments, follow system, notifications, real-time messaging, media uploads, AI integration, and an administrative dashboard.

---

## 📌 Project Information

| Information | Details |
|---|---|
| **Project Name** | SOCIALHUB |
| **Project Type** | Social Media Feed Application |
| **Development Type** | Full-Stack Web Application |
| **Frontend** | React.js + Vite |
| **Backend** | Node.js + Express.js |
| **Database** | MongoDB |
| **ODM** | Mongoose |
| **Authentication** | JWT + bcrypt |
| **Real-Time Communication** | Socket.IO |
| **File Uploads** | Multer |
| **AI Integration** | Configurable AI API |
| **Developer** | Suman D H |
| **Internship Organization** | Skill Nexis |
| **Internship Domain** | Full Stack Developer Intern (MERN Stack) |

---

# 🎓 Internship Information

This project was developed as part of the **Skill Nexis Online Internship Program**.

The internship offer letter identifies **Suman D H** as the intern and specifies the domain as **Full Stack Developer Intern (MERN Stack)**. The internship is described as an online internship beginning on **28/08/2026** and ending on **09/10/2026**.

The offer letter states that the internship involves working on assigned projects and completing tasks within deadlines, with the aim of enhancing practical knowledge and hands-on experience.

## Internship Details

| Field | Details |
|---|---|
| **Organization** | Skill Nexis |
| **Intern Name** | Suman D H |
| **Internship Type** | Online Internship |
| **Domain** | Full Stack Developer Intern (MERN Stack) |
| **Offer Letter Date** | 28/08/2026 |
| **Start Date** | 28/08/2026 |
| **End Date** | 09/10/2026 |
| **Internship ID** | Not provided in the offer letter |

The offer letter is signed by **Rakesh Soni, AICTE & MSME REG., Founder & Program Head**.

---

# 📄 Offer Letter

The internship offer letter was issued by **Skill Nexis** to **Suman D H** for the **Full Stack Developer Intern (MERN Stack)** domain.

### Offer Letter Information

```text
Organization       : Skill Nexis
Candidate          : Suman D H
Internship Type    : Online Internship
Domain             : Full Stack Developer Intern (MERN Stack)
Offer Letter Date  : 28/08/2026
Start Date         : 28/08/2026
End Date           : 09/10/2026
Internship ID      : Not provided
Authorized Signatory
Rakesh Soni
AICTE & MSME REG.
Founder & Program Head
```

---

## 🚀 Project Overview

SOCIALHUB is a full-stack social media application developed using the MERN Stack.

The application provides a platform where users can create accounts, manage profiles, publish posts, interact with other users, follow people, communicate in real time, receive notifications, upload media, and access AI-powered functionality.

The project also contains an administrative dashboard for platform management.

## 🎯 Project Objectives

The main objectives of SOCIALHUB are:

- Build a complete MERN Stack application.
- Implement secure user authentication.
- Create a dynamic social media feed.
- Implement post creation and management.
- Implement likes and comments.
- Implement user following.
- Implement real-time notifications.
- Implement real-time messaging.
- Implement media upload functionality.
- Integrate configurable AI functionality.
- Create an administrative dashboard.
- Practice REST API development.
- Practice MongoDB database management.
- Build a responsive React user interface.
- Demonstrate full-stack development skills.

## ✨ Key Features

### 🔐 1. User Authentication

SOCIALHUB provides a complete authentication system.

**Features**
- User registration
- User login
- JWT authentication
- Password hashing
- bcrypt password protection
- Protected routes
- Authorization middleware
- Logout
- Session management

**Authentication Flow**
```
Register
   ↓
User Account Created
   ↓
Login
   ↓
JWT Token
   ↓
Authenticated Requests
   ↓
Protected Application Features
```

### 👤 2. User Profiles

Users can create and manage their profiles.

**Profile Features**
- Profile creation
- Profile editing
- Profile picture
- Username
- Full name
- Biography
- Followers
- Following
- User posts
- Follow / Unfollow

### 📰 3. Social Media Feed

The main feed provides a social media experience.

**Feed Features**
- Create posts
- Text posts
- Image posts
- Media posts
- View posts
- Post timestamps
- User avatars
- Like posts
- Comment on posts
- Share content
- Delete own posts
- Interaction counters

### ❤️ 4. Likes

Users can interact with posts using likes.

**Features**
- Like a post
- Unlike a post
- Display like count
- Update interaction state

### 💬 5. Comments

Users can interact with posts through comments.

**Features**
- Add comments
- View comments
- Delete own comments
- Display comment count
- Post interaction

### 👥 6. Follow System

The application supports a social following system.

**Features**
- Follow users
- Unfollow users
- Followers list
- Following list
- Follow notifications
- Personalized social connections

**Flow**
```
User A
  │
  │ Follow
  ▼
User B
  │
  ▼
Follow Relationship
  │
  ▼
Notification
```

### 🔔 7. Notifications

The notification system provides updates about social interactions.

Notifications can be generated for:
- Likes
- Comments
- Follows
- Other supported activities

Real-time notification functionality uses Socket.IO.

### 💬 8. Real-Time Messaging

SOCIALHUB supports real-time communication.

**Messaging Features**
- User-to-user messaging
- Conversations
- Real-time messages
- Message timestamps
- Online status
- Socket.IO communication

**Messaging Flow**
```
User A
   │
   │ Message
   ▼
Socket.IO Server
   │
   ▼
User B
```

### 📸 9. Media Upload

Media uploads are handled by Multer on the backend.

**Upload Features**
- Profile image upload
- Post image upload
- Image preview
- File validation
- File-size restrictions
- Server-side file handling

Example upload structure:
```
backend/
└── uploads/
    ├── profile-images/
    └── posts/
```

### 🤖 10. AI Integration

SOCIALHUB contains a configurable AI integration layer.

AI configuration is controlled through environment variables.

```
AI_API_KEY=
AI_MODEL=
AI_BASE_URL=
```

Potential AI functionality includes:
- AI assistant
- Post-writing assistance
- Content suggestions
- Smart text generation
- AI-powered social features

AI credentials should be stored in environment variables and should never be committed to GitHub.

### 👨‍💼 11. Admin Dashboard

SOCIALHUB includes an administrative dashboard.

**Admin Features**
- View total users
- View total posts
- View open reports
- View users
- Manage user status
- Suspend users
- Restore users
- Monitor platform activity

**Dashboard Metrics**
```
┌─────────────────┐
│   Total Users   │
└─────────────────┘

┌─────────────────┐
│      Posts      │
└─────────────────┘

┌─────────────────┐
│  Open Reports   │
└─────────────────┘
```

## 🏗️ System Architecture

```
                         ┌───────────────────┐
                         │       USER        │
                         └─────────┬─────────┘
                                   │
                                   ▼
                         ┌───────────────────┐
                         │  React Frontend   │
                         │      + Vite       │
                         └─────────┬─────────┘
                                   │
                         Axios / Socket.IO
                                   │
                                   ▼
                         ┌───────────────────┐
                         │ Express.js Server │
                         │    Node.js API    │
                         └─────────┬─────────┘
                                   │
              ┌────────────────────┼────────────────────┐
              │                    │                    │
              ▼                    ▼                    ▼
       ┌─────────────┐      ┌─────────────┐      ┌─────────────┐
       │   Auth      │      │ Social APIs │      │ Admin APIs  │
       └─────────────┘      └─────────────┘      └─────────────┘
              │                    │                    │
              └────────────────────┼────────────────────┘
                                   │
                                   ▼
                         ┌───────────────────┐
                         │      MongoDB      │
                         │     Mongoose      │
                         └───────────────────┘
```

## 🔄 Application Flow

```
User
 │
 ▼
Register / Login
 │
 ▼
Authentication
 │
 ▼
Home Feed
 │
 ├── Create Post
 ├── Like Post
 ├── Comment
 ├── Follow User
 ├── View Notifications
 ├── Send Messages
 └── Manage Profile
 │
 ▼
MongoDB
```

## 🛠️ Technology Stack

### Frontend

| Technology | Purpose |
|---|---|
| React.js | User interface |
| Vite | Frontend development/build tool |
| React Router | Application routing |
| Axios | API communication |
| Context API | Application state |
| Socket.IO Client | Real-time communication |
| Lucide React | Icons |
| CSS3 | Styling |
| Responsive UI | Mobile/tablet/desktop support |

### Backend

| Technology | Purpose |
|---|---|
| Node.js | Server runtime |
| Express.js | REST API |
| MongoDB | Database |
| Mongoose | MongoDB ODM |
| JWT | Authentication |
| bcrypt | Password hashing |
| Socket.IO | Real-time communication |
| Multer | File uploads |
| dotenv | Environment configuration |
| Helmet | Security headers |
| CORS | Cross-origin requests |
| Express Rate Limit | API rate limiting |
| Morgan | HTTP request logging |

## 🗂️ Complete Project Structure

```
SOCIALHUB/
│
├── frontend/
│   │
│   ├── public/
│   │
│   ├── src/
│   │   │
│   │   ├── assets/
│   │   │
│   │   ├── components/
│   │   │
│   │   ├── context/
│   │   │
│   │   ├── pages/
│   │   │
│   │   ├── services/
│   │   │
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   │
│   ├── config/
│   │
│   ├── controllers/
│   │
│   ├── middleware/
│   │
│   ├── models/
│   │
│   ├── routes/
│   │
│   ├── services/
│   │
│   ├── utils/
│   │
│   ├── uploads/
│   │
│   ├── .env
│   ├── package.json
│   └── server.js
│
├── docs/
│   ├── login.png
│   ├── register.png
│   ├── home.png
│   ├── profile.png
│   ├── create-post.png
│   ├── notifications.png
│   ├── messages.png
│   └── admin-dashboard.png
│
├── .gitignore
└── README.md
```

## 🗄️ Database Design

SOCIALHUB uses MongoDB with Mongoose.

**Database**
```
socialhub
```

**Main Collections**
- users
- posts
- comments
- notifications
- messages
- conversations
- reports

**Users**

Stores user account and profile information.

```
User
├── name
├── username
├── email
├── password
├── profileImage
├── bio
├── followers
├── following
├── role
└── status
```

**Posts**

Stores social media posts.

```
Post
├── author
├── content
├── media
├── likes
├── comments
└── createdAt
```

**Comments**

Stores comments associated with posts.

```
Comment
├── post
├── user
├── content
└── createdAt
```

## 🔌 REST API Structure

The backend provides REST APIs for the major application features.

```
/api/auth
/api/users
/api/posts
/api/comments
/api/notifications
/api/messages
/api/admin
/api/upload
```

### 🔐 Authentication API

Typical authentication operations include:

```
POST /api/auth/register
POST /api/auth/login
```

Authentication uses JWT tokens for protected requests.

### 👤 User API

User functionality is organized under:

```
/api/users
```

Examples include operations related to:
- User profiles
- Profile updates
- Followers
- Following
- User search

### 📰 Posts API

Post functionality is organized under:

```
/api/posts
```

Features include:
- Create post
- Get posts
- Update supported post data
- Delete post
- Like/unlike
- Post interactions

### 💬 Comments API

Comment functionality is organized under:

```
/api/comments
```

Features include:
- Create comment
- Get comments
- Delete comment

### 🔔 Notifications API

Notifications are handled through:

```
/api/notifications
```

### 💬 Messages API

Messaging functionality is handled through:

```
/api/messages
```

Real-time messaging is supported through Socket.IO.

### 👨‍💼 Admin API

Administrative functionality is handled through:

```
/api/admin
```

Admin operations include:
- Dashboard statistics
- User management
- User status management
- Platform administration

### 📤 Upload API

Media upload functionality is handled through:

```
/api/upload
```

Multer is used to process uploaded files.

## ⚙️ Environment Configuration

Create the following file:

```
backend/.env
```

Example configuration:

```
PORT=5000

MONGO_URI=mongodb://127.0.0.1:27017/socialhub

JWT_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_refresh_secret

CLIENT_URL=http://localhost:5173

AI_API_KEY=
AI_MODEL=
AI_BASE_URL=

UPLOAD_DIR=uploads
MAX_FILE_SIZE=10485760
```

**Important:** Replace example secrets with secure values when deploying the application.

## 🚫 Environment Security

Never commit the following to GitHub:
- .env
- .env.local
- API keys
- JWT secrets
- Database passwords
- Private credentials

Recommended `.gitignore`:

```
node_modules/
.env
.env.local
.env.*.local
dist/
build/
coverage/
*.log
uploads/*
```

## 📦 Installation

### Step 1 — Clone Repository

```
git clone YOUR_GITHUB_REPOSITORY_URL
```

Enter the project:

```
cd socialhub
```

### ⚙️ Step 2 — Backend Installation

Navigate to the backend:

```
cd backend
```

Install dependencies:

```
npm install
```

Create:

```
backend/.env
```

Configure the required environment variables.

Start the backend:

```
npm run dev
```

If the project uses the normal Node start command:

```
npm start
```

Backend:

```
http://localhost:5000
```

### 🎨 Step 3 — Frontend Installation

Open a second terminal.

Navigate to:

```
cd frontend
```

Install dependencies:

```
npm install
```

Start the frontend:

```
npm run dev
```

Frontend:

```
http://localhost:5173
```

## 🍃 MongoDB Setup

SOCIALHUB requires MongoDB.

Default local database URL:

```
mongodb://127.0.0.1:27017/socialhub
```

### Windows

Check the MongoDB service:

```
Get-Service MongoDB
```

Start MongoDB:

```
Start-Service MongoDB
```

After MongoDB is running, start the backend.

## ▶️ Running the Complete Application

Three components should be available:

```
┌─────────────────────────────┐
│ MongoDB                     │
│ localhost:27017             │
└──────────────┬──────────────┘
               │
               ▼
┌─────────────────────────────┐
│ Node.js / Express Backend   │
│ localhost:5000              │
└──────────────┬──────────────┘
               │
               ▼
┌─────────────────────────────┐
│ React / Vite Frontend       │
│ localhost:5173              │
└─────────────────────────────┘
```

## 🧪 Testing

API testing can be performed using:
- Postman
- Browser
- React frontend

**Authentication Test**
```
1. Register
      ↓
2. Login
      ↓
3. Receive JWT
      ↓
4. Store authentication state
      ↓
5. Access protected API
```

**Social Feature Test**
```
Login
  ↓
Create Post
  ↓
View Feed
  ↓
Like Post
  ↓
Comment
  ↓
Follow User
  ↓
Receive Notification
```

**Messaging Test**
```
Login User A
      ↓
Open Conversation
      ↓
Send Message
      ↓
Socket.IO
      ↓
User B Receives Message
```

## 📸 Screenshots

Add screenshots to the docs folder.

Recommended structure:

```
docs/
│
├── login.png
├── register.png
├── home.png
├── profile.png
├── create-post.png
├── notifications.png
├── messages.png
└── admin-dashboard.png
```

**Login**
```
![Login Page](docs/login.png)
```

**Registration**
```
![Registration Page](docs/register.png)
```

**Home Feed**
```
![Home Feed](docs/home.png)
```

**Profile**
```
![User Profile](docs/profile.png)
```

**Create Post**
```
![Create Post](docs/create-post.png)
```

**Notifications**
```
![Notifications](docs/notifications.png)
```

**Messages**
```
![Messages](docs/messages.png)
```

**Admin Dashboard**
```
![Admin Dashboard](docs/admin-dashboard.png)
```

## 🖥️ User Interface

SOCIALHUB is designed to provide a responsive interface for:
- Desktop
- Laptop
- Tablet
- Mobile

The UI contains:
- Navigation
- Feed
- Profile pages
- Post cards
- Authentication pages
- Notification interface
- Messaging interface
- Admin dashboard
- Responsive layouts

## 🔒 Security Features

SOCIALHUB includes multiple security mechanisms.

**Authentication**
- JWT authentication
- Password hashing
- Protected routes
- Authorization middleware

**Server Security**
- Helmet
- CORS
- Rate limiting
- Environment variables
- Input validation

**Upload Security**
- File validation
- File-size limits
- Controlled upload directories

## ⚡ Real-Time Architecture

Socket.IO provides real-time communication.

```
             ┌───────────────┐
             │ React Client  │
             └───────┬───────┘
                     │
                Socket.IO
                     │
                     ▼
             ┌───────────────┐
             │ Socket Server │
             └───────┬───────┘
                     │
                Socket.IO
                     │
                     ▼
             ┌───────────────┐
             │ React Client  │
             └───────────────┘
```

Used for features such as:
- Messaging
- Notifications
- Online status
- Real-time interactions

## 🤖 AI Architecture

The application keeps AI configuration separate from the main application.

```
React Frontend
      │
      ▼
Express Backend
      │
      ▼
AI Service Layer
      │
      ▼
Configured AI Provider
```

Environment configuration:

```
AI_API_KEY=
AI_MODEL=
AI_BASE_URL=
```

This approach allows the AI provider configuration to be changed without changing the core application architecture.

## 📊 Admin Architecture

```
Admin Login
     │
     ▼
JWT Authentication
     │
     ▼
Admin Authorization
     │
     ▼
Admin Dashboard
     │
     ├── Users
     ├── Posts
     ├── Reports
     └── User Status
```

## 🧭 Main Application Pages

The application can contain the following pages:
- Login
- Register
- Home
- Explore
- Profile
- Create Post
- Notifications
- Messages
- Search
- Settings
- Admin Dashboard

## 🔄 Typical User Journey

```
                 ┌───────────┐
                 │  Register │
                 └─────┬─────┘
                       │
                       ▼
                 ┌───────────┐
                 │   Login   │
                 └─────┬─────┘
                       │
                       ▼
                 ┌───────────┐
                 │ Home Feed │
                 └─────┬─────┘
                       │
          ┌────────────┼────────────┐
          │            │            │
          ▼            ▼            ▼
      Create Post   Follow User   Messages
          │            │            │
          ▼            ▼            ▼
        Likes      Notifications  Real-Time
          │
          ▼
      Comments
```

## 📈 Future Enhancements

Potential future enhancements include:
- Advanced AI assistant
- AI-powered content recommendations
- Stories
- Reels
- Hashtags
- Trending topics
- Group communities
- Voice calling
- Video calling
- Push notifications
- Cloud media storage
- Advanced moderation
- Advanced analytics
- Progressive Web App
- Mobile application
- Improved recommendation system

## 🐛 Troubleshooting

### 1. Frontend Shows a Blank Page

Stop the Vite server:

```
Ctrl + C
```

Then restart:

```
npm run dev
```

Check the browser developer console for:
- JSX syntax errors
- Import errors
- API errors
- Missing modules

### 2. MongoDB Connection Error

Check MongoDB:

```
Get-Service MongoDB
```

Start it:

```
Start-Service MongoDB
```

Verify:

```
MONGO_URI=mongodb://127.0.0.1:27017/socialhub
```

### 3. MONGO_URI is not configured

Make sure the following file exists:

```
backend/.env
```

And contains:

```
MONGO_URI=mongodb://127.0.0.1:27017/socialhub
```

Restart the backend after changing `.env`.

### 4. ECONNREFUSED 127.0.0.1:27017

This generally means the MongoDB server is not accepting connections at the configured address and port.

Start MongoDB:

```
Start-Service MongoDB
```

Then restart the backend.

### 5. Frontend Cannot Connect to Backend

Verify the backend is running:

```
http://localhost:5000
```

Verify the frontend is running:

```
http://localhost:5173
```

Check the frontend API configuration and confirm it points to the backend.

### 6. npm install Problems

Delete the existing dependency directory and lock file if necessary:

```
rm -rf node_modules package-lock.json
```

On Windows PowerShell:

```
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
```

Then:

```
npm install
```

## 🚀 Production Build

### Frontend

Navigate to frontend:

```
cd frontend
```

Build:

```
npm run build
```

Production files will be generated in:

```
frontend/dist
```

## 🌍 Deployment Preparation

Before deployment:
- Configure production MongoDB.
- Configure production environment variables.
- Set the production frontend URL.
- Set the production backend URL.
- Configure CORS.
- Configure secure JWT secrets.
- Configure media storage.
- Configure the AI provider if required.
- Build the React frontend.
- Start the production backend.

Never use development secrets in production.

## 📦 GitHub Preparation

Initialize Git:

```
git init
```

Check files:

```
git status
```

Add files:

```
git add .
```

Commit:

```
git commit -m "Initial SOCIALHUB implementation"
```

Add GitHub repository:

```
git remote add origin YOUR_GITHUB_REPOSITORY_URL
```

Rename branch:

```
git branch -M main
```

Push:

```
git push -u origin main
```

## 🚫 GitHub Security Checklist

Before pushing:
- [ ] .env is ignored
- [ ] API keys are removed
- [ ] Database passwords are removed
- [ ] JWT secrets are removed
- [ ] node_modules is ignored
- [ ] Build folders are ignored
- [ ] Private credentials are removed
- [ ] Uploads are handled appropriately

## 🧑‍💻 Development Workflow

```
Requirement
     ↓
UI/UX Design
     ↓
React Frontend
     ↓
REST API
     ↓
Express Backend
     ↓
MongoDB
     ↓
Authentication
     ↓
Real-Time Features
     ↓
Testing
     ↓
Bug Fixing
     ↓
Production Build
```

## 📚 Learning Outcomes

This project provides practical experience with:
- MERN Stack development
- React component architecture
- React routing
- REST APIs
- Express.js
- Node.js
- MongoDB
- Mongoose
- JWT authentication
- bcrypt
- Socket.IO
- Multer
- File uploads
- API integration
- AI integration
- State management
- Responsive UI development
- Admin dashboard development
- Git and GitHub
- Full-stack project architecture

## 📋 Internship Project Objective

As part of the Skill Nexis internship, this project demonstrates practical work in full-stack web development using the MERN Stack.

The offer letter describes the internship as involving assigned projects and tasks to be completed within deadlines, with the stated purpose of enhancing practical knowledge and hands-on experience.

## 📄 Internship Offer Letter Summary

| Item | Details |
|---|---|
| Organization | Skill Nexis |
| Candidate | Suman D H |
| Internship | Online Internship |
| Domain | Full Stack Developer Intern (MERN Stack) |
| Offer Date | 28/08/2026 |
| Start Date | 28/08/2026 |
| End Date | 09/10/2026 |
| Internship ID | Not provided in offer letter |

These details are taken from the supplied internship offer letter.

## 🏆 Project Highlights

```
✓ MERN Stack
✓ React + Vite
✓ Node.js + Express
✓ MongoDB + Mongoose
✓ JWT Authentication
✓ bcrypt Password Hashing
✓ Social Media Feed
✓ Posts
✓ Likes
✓ Comments
✓ Follow System
✓ Notifications
✓ Real-Time Messaging
✓ Socket.IO
✓ Media Uploads
✓ Multer
✓ AI Integration
✓ Admin Dashboard
✓ Security Middleware
✓ Responsive UI
```

## 👨‍💻 Developer

**Suman D H**

Full Stack Developer Intern (MERN Stack)

Skill Nexis Internship Program

## 🎓 Internship Organization

**Skill Nexis**

Internship Domain: Full Stack Developer Intern (MERN Stack)

Internship Period: 28/08/2026 – 09/10/2026

The supplied offer letter identifies Skill Nexis as the internship organization and Rakesh Soni as Founder & Program Head.

## 📜 License

This project is developed for educational, internship, learning, and demonstration purposes.

---

## ⭐ SOCIALHUB
### Social Media Feed Application

A full-stack social networking platform built using:

```
                 SOCIALHUB
                     │
        ┌────────────┼────────────┐
        │            │            │
     React        Express      MongoDB
        │            │            │
        └────────────┼────────────┘
                     │
                  Node.js
                     │
          ┌──────────┼──────────┐
          │          │          │
       JWT/Auth   Socket.IO   AI Layer
          │          │          │
          └──────────┼──────────┘
                     │
              Complete MERN
              Social Platform
```

## 🚀 Built With

MongoDB + Express.js + React.js + Node.js

Socket.IO + JWT + bcrypt + Multer + AI Integration

Developed by **Suman D H**
Skill Nexis — Full Stack Developer Intern (MERN Stack)

Internship Period: 28/08/2026 – 09/10/2026
