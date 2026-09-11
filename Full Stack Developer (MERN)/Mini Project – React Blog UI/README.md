# Mini Project – React Blog UI

## 📌 Internship Information

This mini project was completed as part of my **Full Stack Developer Internship (MERN Stack)** at **Skill Nexis**.

The internship offer letter confirms an **online internship** in the domain of **Full Stack Developer Intern (MERN Stack)**. The internship period is from **28/08/2026 to 09/10/2026**.

| Details               | Information                              |
| --------------------- | ---------------------------------------- |
| **Intern Name**       | Suman D H                                |
| **Organization**      | Skill Nexis                              |
| **Internship Domain** | Full Stack Developer Intern (MERN Stack) |
| **Internship Type**   | Online Internship                        |
| **Start Date**        | 28/08/2026                               |
| **End Date**          | 09/10/2026                               |
| **Project**           | React Blog UI                            |

---

# 📖 Project Overview

The **React Blog UI** is a small frontend web application developed using **React.js**.

The project displays blog posts dynamically from a **JSON file** and provides users with **search and category filter functionality**.

This project demonstrates practical knowledge of:

* React components
* JSX
* Props
* State
* JSON data
* Dynamic rendering
* Search functionality
* Filter functionality
* Responsive design

---

# 🎯 Project Objective

The main objectives of this project are:

* To develop a blog interface using React.js.
* To display blog posts dynamically from a JSON file.
* To create reusable React components.
* To implement search functionality.
* To implement category-based filtering.
* To use React props and state.
* To handle user interactions.
* To create a responsive and user-friendly interface.

---

# 🛠️ Technologies Used

| Technology | Purpose                       |
| ---------- | ----------------------------- |
| React.js   | Building the user interface   |
| JavaScript | Application logic             |
| JSX        | Creating React components     |
| CSS3       | Styling and responsive design |
| JSON       | Storing blog post data        |
| Vite       | Development environment       |
| Node.js    | Running the project           |
| npm        | Package management            |

---

# ✨ Features

## 1. Blog Post Display

Blog posts are displayed using reusable **Blog Card** components.

Each blog post can contain:

* Title
* Description
* Author
* Category
* Date
* Image

---

## 2. JSON Data

Blog information is stored in a JSON file.

Example:

```json
[
  {
    "id": 1,
    "title": "Introduction to React",
    "category": "React",
    "author": "Suman",
    "date": "2026-09-01",
    "description": "Learn the basics of React.js and component-based development."
  },
  {
    "id": 2,
    "title": "Understanding JavaScript",
    "category": "JavaScript",
    "author": "Suman",
    "date": "2026-09-03",
    "description": "Learn important concepts of JavaScript programming."
  }
]
```

---

# 🔍 Search Functionality

The application provides a search bar that allows users to search for blog posts.

The search input is managed using React state.

```jsx
const [search, setSearch] = useState("");
```

Posts are filtered based on the entered search text.

```jsx
const filteredPosts = posts.filter((post) =>
  post.title.toLowerCase().includes(search.toLowerCase())
);
```

### Example

If the user searches:

```text
React
```

The application displays matching posts such as:

```text
Introduction to React
React Hooks
React Components
```

---

# 🏷️ Category Filter

Users can filter blog posts based on their category.

Example categories:

* All
* React
* JavaScript
* HTML
* CSS
* Web Development

React state is used to store the selected category.

```jsx
const [category, setCategory] = useState("All");
```

Only posts belonging to the selected category are displayed.

---

# ⚛️ React Components

The project can be organized using reusable components.

## Header

Displays the blog title and navigation.

## BlogCard

Displays individual blog post information.

## SearchBar

Provides the search input.

## Filter

Provides category filtering options.

## Footer

Displays footer information.

---

# 📦 Props

Props are used to pass blog information from the parent component to the `BlogCard` component.

Example:

```jsx
<BlogCard
  title={post.title}
  description={post.description}
  category={post.category}
/>
```

This allows the same component to display different blog posts.

---

# 📊 State

React state is used to manage dynamic information.

Example:

```jsx
const [search, setSearch] = useState("");
const [category, setCategory] = useState("All");
```

State is used for:

* Search input
* Category selection
* Dynamic filtering
* User interactions

---

# 🔄 Dynamic Rendering

The project uses JavaScript's `map()` method to dynamically display blog cards.

```jsx
posts.map((post) => (
  <BlogCard
    key={post.id}
    {...post}
  />
));
```

The `filter()` method is used to search and filter blog posts.

```jsx
posts.filter((post) => ...)
```

---

# 📁 Project Structure

```text
react-blog-ui/
│
├── public/
│
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── BlogCard.jsx
│   │   ├── SearchBar.jsx
│   │   ├── Filter.jsx
│   │   └── Footer.jsx
│   │
│   ├── data/
│   │   └── posts.json
│   │
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
│
├── package.json
├── vite.config.js
└── README.md
```

---

# ⚙️ Working Process

The application works in the following sequence:

```text
Start React Application
        ↓
Load App Component
        ↓
Read Blog Data from JSON
        ↓
Display Blog Posts
        ↓
User Enters Search Text
        ↓
Filter Blog Posts
        ↓
User Selects Category
        ↓
Apply Category Filter
        ↓
Display Matching Posts
        ↓
Update UI Dynamically
```

---

# 🔁 Data Flow

```text
              posts.json
                  ↓
              React App
                  ↓
           State Management
             ↙          ↘
        Search          Category
             ↘          ↙
            Filtering
                 ↓
          Filtered Posts
                 ↓
            BlogCard
                 ↓
           User Interface
```

---

# 📱 Responsive Design

The React Blog UI is designed to work across different screen sizes.

### Desktop

```text
--------------------------------------------------
|                  REACT BLOG                    |
--------------------------------------------------
| Search Box                 Category Filter      |
--------------------------------------------------
| Blog Card | Blog Card | Blog Card | Blog Card |
--------------------------------------------------
```

### Mobile

```text
-------------------------
|      REACT BLOG       |
-------------------------
|      Search Box       |
-------------------------
|   Category Filter     |
-------------------------
|       Blog Card       |
-------------------------
|       Blog Card       |
-------------------------
```

CSS media queries are used to adjust the layout for mobile, tablet, and desktop screens.

---

# 💻 Installation

## Step 1 – Check Node.js

```bash
node -v
```

Check npm:

```bash
npm -v
```

---

## Step 2 – Create React Project

```bash
npm create vite@latest react-blog-ui
```

Select:

```text
Framework: React
Variant: JavaScript
```

---

## Step 3 – Open Project

```bash
cd react-blog-ui
```

---

## Step 4 – Install Dependencies

```bash
npm install
```

---

## Step 5 – Run the Application

```bash
npm run dev
```

Open the local development URL displayed in the terminal.

---

# 🎨 User Interface

The application includes:

* Blog header
* Navigation
* Search bar
* Category filter
* Blog cards
* Responsive layout
* Footer

The interface is designed to be simple, clean, and easy to use.

---

# 📚 React Concepts Used

This project demonstrates:

### Components

The interface is divided into reusable React components.

### JSX

Used to create the user interface inside JavaScript.

### Props

Used to pass blog data between components.

### State

Used to manage search text and selected categories.

### Event Handling

Used to handle search input and category selection.

### Array Methods

`map()` is used for rendering blog cards.

`filter()` is used for search and category filtering.

### JSON

Used as the source of blog post information.

---

# ✨ Advantages

* Simple and user-friendly interface
* Reusable React components
* Dynamic blog rendering
* JSON-based data
* Search functionality
* Category filtering
* Responsive design
* Easy to maintain
* Good practice for React fundamentals

---

# ⚠️ Limitations

* No backend database
* No user authentication
* Blog data is stored locally in JSON
* No admin panel
* No real-time publishing
* No comments system
* No user account management

---

# 🚀 Future Enhancements

The project can be improved by adding:

* Node.js backend
* Express.js
* MongoDB database
* User authentication
* Admin dashboard
* Create, edit, and delete blog posts
* Blog details page
* Comments
* Likes
* Pagination
* Dark mode
* Image upload
* REST API
* User profiles

---

# 🎓 Learning Outcomes

After completing this project, I gained practical knowledge of:

* React project structure
* Component-based development
* Reusable components
* JSX
* Props
* State management
* Event handling
* Dynamic rendering
* JSON data handling
* Search functionality
* Category filtering
* Responsive web design
* Frontend project organization

---

# 📌 Internship Learning

This project contributes to the practical learning objectives of my **Full Stack Developer Internship (MERN Stack)**.

The offer letter states that the internship involves working on assigned projects and completing tasks within deadlines, with the aim of enhancing practical knowledge and hands-on experience.

Through this project, I practiced frontend development using React.js and developed an understanding of reusable components and interactive user interfaces.

---

# 📄 Internship Offer Letter

The internship offer letter was issued by **Skill Nexis** and offers an **online internship** in the domain of **Full Stack Developer Intern (MERN Stack)**.

### Offer Letter Details

| Field               | Details                                  |
| ------------------- | ---------------------------------------- |
| **Name**            | Suman D H                                |
| **Organization**    | Skill Nexis                              |
| **Internship Type** | Online Internship                        |
| **Domain**          | Full Stack Developer Intern (MERN Stack) |
| **Start Date**      | 28/08/2026                               |
| **End Date**        | 09/10/2026                               |
| **Project**         | Mini Project – React Blog UI             |

The offer letter states that the internship period is intended to provide practical knowledge and hands-on experience through assigned projects and tasks.

---

# 📎 Offer Letter File

The internship offer letter can be kept in the project repository using the following structure:

```text
react-blog-ui/
│
├── docs/
│   └── Internship_Offer_Letter.pdf
│
├── src/
│
├── public/
│
├── package.json
│
└── README.md
```

**Note:** The offer letter contains personal information, so keep the PDF private or restrict repository access if the repository is public.

---

# 📌 Conclusion

The **React Blog UI** mini project provided practical experience in developing an interactive frontend application using React.js.

The project demonstrates **reusable components, props, state, JSON data, dynamic rendering, search functionality, category filtering, and responsive design**.

This project forms part of my practical work during the **Skill Nexis Full Stack Developer Internship (MERN Stack)** and helped strengthen my frontend development skills.

---

# 👨‍💻 Author

**Suman D H**

**Full Stack Developer Intern – MERN Stack**

**Skill Nexis**

**Internship Period:** 28/08/2026 – 09/10/2026

---

# 📄 License

This project was developed for **educational and internship purposes**.
