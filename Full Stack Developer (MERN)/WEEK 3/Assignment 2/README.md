Assignment 2: Image Upload Feature

A full-stack image upload application developed as part of the Full Stack Developer Intern (MERN Stack) internship at Skill Nexis.

Internship Information

Detail

Information

Organization

Skill Nexis

Internship Domain

Full Stack Developer Intern (MERN Stack)

Internship Type

Online Internship

Intern

Suman D H

Start Date

28/08/2026

End Date

09/10/2026

The internship offer letter states that the internship involves assigned projects and tasks to be completed within deadlines, with the aim of enhancing practical knowledge and hands-on experience.

Assignment Requirements

Create a file upload endpoint using Multer.

Integrate the upload functionality with React.

Preview the selected image before uploading.

Display the uploaded image after successful upload.

Project Overview

The application allows a user to select an image, preview it in React, upload it to an Express.js backend using Multer, store it in the server's uploads folder, and display the uploaded image.

Technologies Used

Frontend

React.js

Vite

JavaScript

HTML5

CSS3

Backend

Node.js

Express.js

Multer

CORS

Tools

Visual Studio Code

Git

GitHub

Command Prompt

Web Browser

Project Structure

image-upload/
│
├── backend/
│   ├── node_modules/
│   ├── uploads/
│   │   └── uploaded images
│   ├── server.js
│   ├── package.json
│   └── package-lock.json
│
├── frontend/
│   ├── node_modules/
│   ├── public/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   ├── package.json
│   ├── package-lock.json
│   └── vite.config.js
│
└── README.md

Application Flow

User selects image
       |
       v
React Frontend
       |
       | FormData
       v
Express.js API
       |
       v
Multer
       |
       v
backend/uploads/
       |
       v
Uploaded Image URL
       |
       v
React displays uploaded image

Backend Setup

cd backend
npm init -y
npm install express multer cors
mkdir uploads

Backend API

Upload Endpoint

POST /api/upload

Local URL:

http://localhost:5000/api/upload

The image must be sent using the form-data field:

image

Supported Image Types

JPG

JPEG

PNG

GIF

WEBP

Maximum file size:

5 MB

Running the Backend

cd "C:\Users\suman\Desktop\React\FULL STACK WEB DEVELOPMENT (MERN)\image-upload\backend"
node server.js

Expected:

Server running on http://localhost:5000

Test:

http://localhost:5000/

Expected response:

{
  "message": "Image Upload API is running"
}

Frontend Setup

cd "C:\Users\suman\Desktop\React\FULL STACK WEB DEVELOPMENT (MERN)\image-upload\frontend"
npm install
npm run dev

Vite will display the local URL, normally:

http://localhost:5173/

Main Features

1. Select Image

The user selects an image from the computer.

2. Image Preview

React previews the selected image before upload using:

URL.createObjectURL(file)

3. Upload Image

The selected image is sent using FormData:

const formData = new FormData();
formData.append("image", selectedFile);

4. Multer Processing

Multer receives the image and stores it in:

backend/uploads/

5. Display Uploaded Image

The backend returns the uploaded image URL, which React uses to display the image.

Testing

Backend Test

Open:

http://localhost:5000/

Expected:

{
  "message": "Image Upload API is running"
}

Frontend Test

Open the Vite URL and:

Click Choose File.

Select an image.

Verify Image Preview.

Click Upload Image.

Verify the success message.

Verify the uploaded image is displayed.

Check backend/uploads/ for the uploaded file.

Expected Interface

+---------------------------------------+
|       Image Upload Application        |
|                                       |
|   Upload and preview your image       |
|                                       |
|          [ Choose File ]              |
|                                       |
|            Image Preview              |
|                                       |
|        +-------------------+          |
|        |      IMAGE        |          |
|        +-------------------+          |
|                                       |
|          [ Upload Image ]             |
|                                       |
|      Image uploaded successfully      |
|                                       |
|           Uploaded Image              |
|        +-------------------+          |
|        |      IMAGE        |          |
|        +-------------------+          |
+---------------------------------------+

Learning Outcomes

This assignment demonstrates practical experience with:

React file handling

Image preview

FormData

REST API integration

Express.js

Multer

File storage

CORS

Node.js

Frontend-backend communication

GitHub documentation

Internship Offer Letter

The uploaded internship offer letter is dated 28/08/2026 and is addressed to Suman D H. It offers an online internship with Skill Nexis in the domain of Full Stack Developer Intern (MERN Stack), commencing 28/08/2026 and ending 09/10/2026. The letter states that the intern will work on assigned projects and complete tasks within deadlines to enhance practical knowledge and hands-on experience.

The offer letter is signed by Rakesh Soni, AICTE & MSME REG., Founder & Program Head.

Offer Letter Documentation

Keep the original internship offer letter with the project documentation when submitting the internship work.

Offer Letter: Skill Nexis — Internship Offer Letter dated 28/08/2026.

Author

Suman D H

Full Stack Developer Intern
Skill Nexis
Internship Period: 28/08/2026 – 09/10/2026

Conclusion

The Image Upload Feature demonstrates how a React frontend communicates with an Express.js backend to upload images using Multer. The application provides image selection, client-side preview, server-side upload, file storage, and display of the uploaded image.
