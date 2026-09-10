# Assignment 2 – React Components Practice

## 📌 Internship Information

This project was completed as part of my **Full Stack Developer Internship (MERN Stack)** at **Skill Nexis**.

According to the internship offer letter, the internship is an **online internship** in the domain of **Full Stack Developer Intern (MERN Stack)**. The internship period is from **28/08/2026 to 09/10/2026**, during which assigned projects and tasks are completed to gain practical knowledge and hands-on experience.

| Details               | Information                              |
| --------------------- | ---------------------------------------- |
| **Intern Name**       | Suman D H                                |
| **Organization**      | Skill Nexis                              |
| **Internship Domain** | Full Stack Developer Intern (MERN Stack) |
| **Internship Type**   | Online Internship                        |
| **Start Date**        | 28/08/2026                               |
| **End Date**          | 09/10/2026                               |
| **Assignment**        | React Components Practice                |

---

# 📖 Project Overview

The **React Components Practice** project is a frontend application developed using **React.js**.

The main purpose of this assignment is to understand **React component structure, reusable components, props, state, and dynamic rendering**.

The project implements five reusable React components:

1. Header
2. Footer
3. Card
4. Button
5. Form

---

# 🎯 Objective

The objectives of this assignment are:

* To understand React component-based architecture.
* To create reusable React components.
* To implement dynamic rendering using props.
* To manage dynamic data using state.
* To handle user events.
* To understand JSX syntax.
* To create an interactive React application.
* To gain practical frontend development experience.

---

# 🛠️ Technologies Used

| Technology | Purpose                       |
| ---------- | ----------------------------- |
| React.js   | Building user interface       |
| JavaScript | Application logic             |
| JSX        | Creating React components     |
| CSS3       | Styling and responsive design |
| Vite       | React development environment |
| Node.js    | Running the project           |
| npm        | Package management            |

---

# 🧩 React Components

## 1. Header Component

The **Header** component displays the application title and navigation elements.

### Features

* Application heading
* Navigation elements
* Reusable header structure

Example:

```jsx
<Header />
```

---

## 2. Footer Component

The **Footer** component displays information at the bottom of the application.

### Features

* Copyright information
* Footer content
* Reusable page structure

Example:

```jsx
<Footer />
```

---

## 3. Card Component

The **Card** component is used to display dynamic content using props.

Example:

```jsx
<Card
  title="React Development"
  description="Learning reusable React components"
/>
```

### Features

* Reusable card design
* Dynamic title
* Dynamic description
* Data passed using props

---

## 4. Button Component

The **Button** component provides a reusable button element.

Example:

```jsx
<Button
  text="Click Me"
  onClick={handleClick}
/>
```

### Features

* Dynamic button text
* Click event handling
* Reusable button design

---

## 5. Form Component

The **Form** component allows users to enter information.

React state is used to store and update the entered data.

Example:

```jsx
const [name, setName] = useState("");
```

### Features

* User input
* State management
* Form submission
* Event handling

---

# 🔄 Props

**Props** are used to pass data from a parent component to a child component.

Example:

```jsx
<Card
  title="React"
  description="Learning React components"
/>
```

Here:

* `title` is a prop.
* `description` is a prop.

This allows the same Card component to display different information.

---

# 📦 State

**State** stores information that can change while the application is running.

Example:

```jsx
const [name, setName] = useState("");
```

The state is updated when the user enters information:

```jsx
setName(event.target.value);
```

State is used for:

* Form input
* User interactions
* Dynamic content
* Button actions

---

# ⚡ Dynamic Rendering

Dynamic rendering is implemented using **props and state**.

For example, the same Card component can display different content:

```jsx
<Card
  title="HTML"
  description="Building web page structure"
/>

<Card
  title="CSS"
  description="Styling responsive websites"
/>

<Card
  title="React"
  description="Building interactive user interfaces"
/>
```

This demonstrates the reusability of React components.

---

# 📁 Project Structure

```text
react-components-practice/
│
├── public/
│
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── Card.jsx
│   │   ├── Button.jsx
│   │   └── Form.jsx
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

The application works through the following steps:

```text
Start React Application
        ↓
Load App Component
        ↓
Import Reusable Components
        ↓
Render Header
        ↓
Render Cards using Props
        ↓
Render Buttons
        ↓
Handle Button Events
        ↓
Render Form
        ↓
Manage Form Data using State
        ↓
Render Footer
        ↓
Display Updated UI
```

---

# 🔁 Component Flow

```text
                    App
                     |
        +------------+------------+
        |            |            |
      Header       Content      Footer
                     |
              +------+------+
              |             |
            Cards          Form
              |
           Button
```

---

# 💻 Installation and Setup

## Step 1 – Check Node.js

Check whether Node.js is installed:

```bash
node -v
```

Check npm:

```bash
npm -v
```

---

## Step 2 – Create React Project

Create a React project using Vite:

```bash
npm create vite@latest react-components-practice
```

Select:

```text
Framework: React
Variant: JavaScript
```

---

## Step 3 – Open Project

```bash
cd react-components-practice
```

---

## Step 4 – Install Dependencies

```bash
npm install
```

---

## Step 5 – Run Application

```bash
npm run dev
```

Open the local URL displayed in the terminal.

---

# ✨ Key Features

* ✅ Reusable React components
* ✅ Header component
* ✅ Footer component
* ✅ Card component
* ✅ Button component
* ✅ Form component
* ✅ Props implementation
* ✅ State management
* ✅ Dynamic rendering
* ✅ Event handling
* ✅ Form handling
* ✅ Component-based architecture
* ✅ Responsive user interface

---

# 🧪 Example Code

## Card Component

```jsx
function Card({ title, description }) {
  return (
    <div className="card">
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
}

export default Card;
```

## Button Component

```jsx
function Button({ text, onClick }) {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  );
}

export default Button;
```

## Form Component

```jsx
import { useState } from "react";

function Form() {
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Hello ${name}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your name"
      />

      <button type="submit">
        Submit
      </button>
    </form>
  );
}

export default Form;
```

---

# 📚 React Concepts Learned

Through this assignment, the following React concepts were practiced:

### Components

Breaking the user interface into smaller reusable parts.

### JSX

Writing HTML-like syntax inside JavaScript.

### Props

Passing data from parent components to child components.

### State

Managing data that changes during application execution.

### Event Handling

Handling user actions such as button clicks and form submission.

### Reusability

Using the same component multiple times with different data.

### Dynamic Rendering

Updating the user interface based on props and state.

---

# 🚀 Future Enhancements

The project can be extended by adding:

* React Router
* Advanced form validation
* More reusable components
* Dark mode
* API integration
* Backend integration
* Database connectivity
* User authentication
* Responsive navigation menu
* Toast notifications

---

# 🎓 Learning Outcomes

After completing this assignment, I gained practical understanding of:

* React application structure
* Component-based development
* Reusable components
* Props
* State management
* Event handling
* Controlled forms
* Dynamic rendering
* JSX
* React project organization
* Frontend development principles

The internship itself is intended to enhance practical knowledge and hands-on experience through assigned projects and tasks.

---

# 📌 Conclusion

The **React Components Practice** project helped me understand the fundamentals of React.js and component-based frontend development.

By developing **Header, Footer, Card, Button, and Form** components, I gained practical experience in creating reusable UI elements.

The implementation of **props and state** helped me understand dynamic rendering, data flow, and user interaction in React applications.

This assignment provides a strong foundation for developing larger **React and MERN Stack applications** as part of my Full Stack Developer internship.

---

# 👨‍💻 Author

**Suman D H**

**Full Stack Developer Intern – MERN Stack**

**Skill Nexis**

**Internship Period:** 28/08/2026 – 09/10/2026

---

