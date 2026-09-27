# 🛍️ SHOPLOOP — Premium Full-Stack E-Commerce Application

A modern, responsive, premium e-commerce web application built using the **MERN Stack** as part of the **Skill Nexis Full Stack Developer Intern (MERN Stack)** internship.

SHOPLOOP provides a complete online-shopping experience with authentication, product browsing, search and filtering, cart management, wishlist, product reviews, checkout, orders, image uploads, notifications, admin management, responsive design, and dark mode.

---
## 📌 Project Information

| Item | Details |
|---|---|
| **Project Name** | SHOPLOOP |
| **Project Type** | Full-Stack E-Commerce Application |
| **Development Stack** | MERN Stack |
| **Frontend** | React.js + Vite |
| **Backend** | Node.js + Express.js |
| **Database** | MongoDB |
| **Authentication** | JWT + bcrypt |
| **Image Upload** | Multer |
| **UI Styling** | Tailwind CSS |
| **Author** | Suman D H |
| **Internship Organization** | Skill Nexis |
| **Internship Domain** | Full Stack Developer Intern (MERN Stack) |
| **Internship Start Date** | 28/08/2026 |
| **Internship End Date** | 09/10/2026 |
| **Internship ID** | Not provided in the offer letter |

---

# 📜 Internship Offer Letter

The attached Skill Nexis internship offer letter is the source for the internship details included in this README.

According to the offer letter:

- **Candidate:** Suman D H
- **Organization:** Skill Nexis
- **Internship:** Online internship
- **Domain:** Full Stack Developer Intern (MERN Stack)
- **Commencement Date:** 28/08/2026
- **End Date:** 09/10/2026
- **Issuer:** Rakesh Soni
- **Designation:** AICTE & MSME REG., Founder & Program Head

The offer letter states that the internship involves assigned projects and completing tasks within deadlines, with the purpose of enhancing practical knowledge and hands-on experience. fileciteturn0file0L5-L16

The letter is dated **28/08/2026** and is addressed to **Suman D H**. fileciteturn0file0L2-L7

The closing identifies **Rakesh Soni, AICTE & MSME REG., Founder & Program Head**. fileciteturn0file0L17-L20

---

# 🎯 Project Objective

The objective of SHOPLOOP is to develop a practical, production-style e-commerce application using modern full-stack development technologies.

The project demonstrates:

- Frontend development with React
- REST API development with Express
- Server-side development with Node.js
- MongoDB database integration
- JWT-based authentication
- Secure password hashing
- Product management
- Shopping cart functionality
- Wishlist functionality
- Order management
- Product reviews
- Image uploading
- Admin management
- Responsive UI/UX
- Dark/light theme support
- API validation and error handling

---

# 🚀 Main Features

## 👤 User Authentication

- User registration
- User login
- JWT authentication
- Password hashing using bcrypt
- Protected routes
- User profile
- Authentication state management
- Logout functionality

## 🛒 Shopping Cart

- Add products to cart
- Remove products
- Increase/decrease quantity
- Cart total calculation
- Stock-aware cart controls
- Buy Now functionality
- Cart persistence

## ❤️ Wishlist

- Add products to wishlist
- Remove products from wishlist
- Wishlist state management
- Wishlist buttons on product cards

## 🔎 Product Discovery

- Product search
- Category filtering
- Brand filtering
- Sorting
- Product details
- Product ratings
- Product reviews
- Discount display
- Stock status

## 📦 Orders

- Checkout
- Order creation
- Order history
- Order details
- Order status
- Product quantity tracking
- Total amount calculation

## ⭐ Reviews

- Product ratings
- Written reviews
- Review display
- Average rating
- Number of reviews

## 🖼️ Image Upload

The application supports product image uploading through the backend using **Multer**.

Image functionality includes:

- Upload product images
- Store uploaded image information
- Display product images
- Preview product images
- Product-card image display
- Product image zoom effect

## 👨‍💼 Admin Features

- Admin authentication
- Product CRUD
- Add products
- Edit products
- Delete products
- Product image management
- Order management
- User management
- Dashboard statistics

---

# 🎨 UI/UX Design

SHOPLOOP follows a premium modern e-commerce visual style.

### Design Characteristics

- Responsive layout
- Mobile-friendly interface
- Desktop optimization
- Glassmorphism
- Rounded cards
- Soft shadows
- Smooth animations
- Product image zoom
- Hover effects
- Loading shimmer
- Toast notifications
- Dark mode
- Light mode

### Visual Theme

- Background: `#F8F9FA`
- Sale price: `#067D62`
- Sale badge: `#CC0C39`
- White product cards
- Black primary action buttons
- Pink/orange visual accents
- Blue/purple decorative gradients

---

# ✨ Premium Interaction Features

SHOPLOOP includes modern UI interactions such as:

- Product-card hover lift
- Product image zoom
- Button shine animation
- Cart animation
- Cart shake feedback
- Toast notifications
- Loading shimmer
- Smooth page transitions
- Responsive navigation
- Wishlist interaction
- Dark/light theme transition

---

# 🧠 Technology Stack

## Frontend

- React.js
- Vite
- React Router
- Tailwind CSS
- Framer Motion
- Axios
- Lucide React
- React Hot Toast

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token
- bcrypt
- Multer
- CORS
- dotenv

---

# 🏗️ Project Architecture

```text
SHOPLOOP/
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── .env
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   ├── utils/
│   │   └── seedProducts.js
│   ├── .env
│   ├── package.json
│   └── server.js
│
├── README.md
└── .gitignore
```

---

# ⚙️ Environment Configuration

## Backend `.env`

Create:

```text
backend/.env
```

Add:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/shoploop
JWT_SECRET=shoploop_super_secret_key_2026
CLIENT_URL=http://localhost:5173
```

> For deployment, use a strong private JWT secret and a production MongoDB connection string.

---

## Frontend `.env`

Create:

```text
frontend/.env
```

Add:

```env
VITE_API_URL=http://localhost:5000/api
```

---

# 📦 Installation

## 1. Clone the repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd SHOPLOOP
```

## 2. Install backend dependencies

```bash
cd backend
npm install
```

## 3. Install frontend dependencies

Open another terminal:

```bash
cd frontend
npm install
```

---

# 🗄️ MongoDB Setup

SHOPLOOP requires MongoDB.

For local MongoDB:

```text
mongodb://127.0.0.1:27017/shoploop
```

Make sure MongoDB is running before starting the backend.

---

# 🌱 Seed Product Data

From the backend directory:

```bash
npm run seed
```

This populates the database with sample product data.

---

# ▶️ Run the Backend

From:

```text
SHOPLOOP/backend
```

run:

```bash
npm run dev
```

Backend:

```text
http://localhost:5000
```

---

# ▶️ Run the Frontend

From:

```text
SHOPLOOP/frontend
```

run:

```bash
npm run dev
```

Frontend:

```text
http://localhost:5173
```

---

# 🔗 Application URLs

| Service | URL |
|---|---|
| Frontend | `http://localhost:5173` |
| Backend | `http://localhost:5000` |
| API | `http://localhost:5000/api` |

---

# 🔐 Authentication Flow

```text
User
  │
  ▼
Register / Login
  │
  ▼
Backend Authentication
  │
  ├── bcrypt password hashing
  │
  └── JWT token generation
          │
          ▼
      Authenticated User
          │
          ▼
      Protected APIs
```

---

# 🛍️ Shopping Flow

```text
Browse Products
       │
       ▼
Search / Filter
       │
       ▼
Product Details
       │
       ├── Add to Cart
       └── Add to Wishlist
               │
               ▼
             Cart
               │
               ▼
            Checkout
               │
               ▼
          Create Order
               │
               ▼
          Order History
```

---

# 🖼️ Product Image Flow

```text
Admin
  │
  ▼
Select Product Image
  │
  ▼
Multer Upload
  │
  ▼
Backend Upload Storage
  │
  ▼
Product Image URL
  │
  ▼
MongoDB Product Record
  │
  ▼
React Product Card
  │
  ▼
Displayed Product Photograph
```

---

# 🧪 Testing

Recommended testing areas:

### Authentication

- Register user
- Login user
- Invalid password
- Duplicate email
- Protected route access

### Products

- Product listing
- Search
- Category filtering
- Product details
- Product image display
- Product stock

### Cart

- Add product
- Remove product
- Change quantity
- Calculate totals

### Wishlist

- Add product
- Remove product
- Persist wishlist

### Orders

- Checkout
- Create order
- View order history
- View order details

### Admin

- Admin login
- Create product
- Update product
- Delete product
- Upload product image
- Manage orders

---

# 🛡️ Security

The application implements security practices including:

- Password hashing with bcrypt
- JWT authentication
- Protected API routes
- Admin authorization
- Environment variables
- Input validation
- CORS configuration
- File upload validation
- Error handling

Do not commit real `.env` files or production secrets to GitHub.

---

# 📱 Responsive Design

SHOPLOOP is designed to work across:

- Desktop
- Laptop
- Tablet
- Mobile

The interface adapts navigation, product grids, cards, forms, and checkout components according to screen size.

---

# 📸 Output Screenshots

Add project screenshots to this section after running the application.

Recommended screenshots:

```text
docs/
├── home.png
├── products.png
├── product-details.png
├── login.png
├── register.png
├── cart.png
├── wishlist.png
├── checkout.png
├── orders.png
├── profile.png
└── admin-dashboard.png
```

Example:

```markdown
## 🏠 Home Page

![SHOPLOOP Home Page](docs/home.png)

## 🛍️ Product Listing

![Product Listing](docs/products.png)

## 📦 Product Details

![Product Details](docs/product-details.png)

## 🛒 Cart

![Shopping Cart](docs/cart.png)

## 👨‍💼 Admin Dashboard

![Admin Dashboard](docs/admin-dashboard.png)
```

---

# 📋 Internship Project Context

This project is developed as part of the **Skill Nexis online internship** in the **Full Stack Developer Intern (MERN Stack)** domain.

The offer letter states that the internship runs from **28/08/2026 to 09/10/2026** and involves assigned projects and tasks intended to provide practical, hands-on experience. fileciteturn0file0L8-L16

---

# 🎓 Learning Outcomes

Through SHOPLOOP, the following practical development areas are demonstrated:

- MERN stack architecture
- React component development
- React routing
- State management
- REST API development
- Express middleware
- MongoDB database operations
- Mongoose models
- JWT authentication
- Password security
- File uploads
- CRUD operations
- E-commerce workflows
- Responsive UI design
- API integration
- Error handling
- Git/GitHub workflow
- Project documentation

---

# 📚 Future Enhancements

Possible future improvements include:

- Online payment gateway integration
- Cloud image storage
- Real-time order notifications
- Advanced analytics
- Recommendation system
- AI shopping assistant
- Product recommendation engine
- Coupon management
- Multiple payment methods
- Delivery tracking
- Email notifications
- Progressive Web App support

---

# 🧑‍💻 Author

## Suman D H

**Full Stack Developer Intern (MERN Stack)**

Project: **SHOPLOOP**

Internship Organization: **Skill Nexis**

Internship Period:

```text
28/08/2026 – 09/10/2026
```

---

# 📄 Internship Offer Letter

The internship information in this README is based on the Skill Nexis offer letter supplied with the project documentation. The letter identifies the internship as an online **Full Stack Developer Intern (MERN Stack)** opportunity for Suman D H. fileciteturn0file0L5-L10

---

# 📜 License

This project was developed for educational and internship purposes.

---

# ⭐ Project

**SHOPLOOP — Premium Full-Stack E-Commerce Application**

Built with:

```text
MongoDB
Express.js
React.js
Node.js
```

**Developed by Suman D H during the Skill Nexis Full Stack Developer Intern (MERN Stack) internship.**
