# Skill Nexis Internship – Assignment 1
## To-Do List REST API

**Author:** Suman D H  
**Internship ID:** Not provided in the internship offer letter  
**Internship Organization:** Skill Nexis  
**Domain:** Full Stack Developer Intern (MERN Stack)  
**Assignment:** 1 – To-Do List REST API  
**Date:** 17/09/2026

### Internship details
According to the internship offer letter, the internship is with Skill Nexis in the Full Stack Developer Intern (MERN Stack) domain. The internship period stated in the letter is 28/08/2026 to 09/10/2026.

### Assignment requirements
- Create REST API endpoints for adding, updating, and deleting tasks.
- Use MongoDB for data storage.
- Use Postman for API testing.

### Implemented endpoints
| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/api/tasks` | Add a new task |
| GET | `/api/tasks` | Get all tasks |
| GET | `/api/tasks/:id` | Get one task |
| PUT | `/api/tasks/:id` | Update a task |
| DELETE | `/api/tasks/:id` | Delete a task |

### Technology stack
- Node.js
- Express.js
- MongoDB
- Mongoose
- Postman
- JavaScript

### Project structure
```text
ToDo_List_REST_API_Internship/
├── Assignment_1/
│   └── assignment.md
├── output_images/
│   └── README.md
├── source_code/
│   ├── controllers/
│   │   └── taskController.js
│   ├── models/
│   │   └── Task.js
│   ├── routes/
│   │   └── taskRoutes.js
│   └── server.js
├── tests/
│   └── postman_collection.json
├── .env.example
├── .gitignore
├── package.json
├── README.md
└── requirements.txt
```

### Prerequisites
Install Node.js and MongoDB locally, or use a MongoDB deployment. Postman is recommended for testing.

### Installation
```bash
git clone <YOUR-GITHUB-REPOSITORY-URL>
cd ToDo_List_REST_API_Internship
npm install
```

Create a `.env` file from `.env.example` and set your MongoDB connection string:
```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/todo_internship
```

### Run
```bash
npm start
```

Expected console output:
```text
MongoDB connected
Server running on http://localhost:5000
```

### Test with Postman
1. Start MongoDB.
2. Start the Node.js server.
3. Import `tests/postman_collection.json` into Postman.
4. Run **Create Task** first.
5. Copy the returned `_id` into the collection variable `taskId`.
6. Run Get, Update, and Delete requests.

### Example request
`POST http://localhost:5000/api/tasks`

```json
{
  "title": "Complete internship assignment",
  "description": "Build and test the To-Do REST API",
  "completed": false
}
```

### Example successful response
```json
{
  "_id": "YOUR_MONGODB_ID",
  "title": "Complete internship assignment",
  "description": "Build and test the To-Do REST API",
  "completed": false
}
```

### Output images
The `output_images` folder contains a placeholder README. After running the API in your own environment, add genuine screenshots from Postman and MongoDB there. Do not submit fabricated screenshots as test evidence.

### GitHub
```bash
git init
git add .
git commit -m "Complete Assignment 1 To-Do List REST API"
git branch -M main
git remote add origin <YOUR-GITHUB-REPOSITORY-URL>
git push -u origin main
```

### Note about Internship ID
The supplied internship offer letter does not contain an internship ID. The README therefore explicitly marks it as **Not provided** rather than inventing an ID.
