# 🚀 CEOFactory Opportunity Management System - Backend API

A secure, scalable, and production-ready RESTful API built with **Node.js**, **Express.js**, **MySQL**, and **JWT Authentication**. This backend serves as the core engine of the CEOFactory Opportunity Management System, providing authentication, authorization, user management, and opportunity management capabilities through a clean and maintainable architecture.

---

# 📖 Overview

The CEOFactory Backend API is responsible for:

* User Registration & Authentication
* JWT-Based Authorization
* Secure Password Hashing
* Role-Based Access Control (RBAC)
* Opportunity CRUD Operations
* MySQL Database Management
* API Request Validation
* Protected Resource Access

The application follows a modular architecture with clear separation of concerns between routes, controllers, middleware, database configuration, and business logic.

---

# ✨ Key Features

## 🔐 Authentication & Security

* JWT-Based Authentication
* Secure Password Hashing using bcrypt
* Protected API Routes
* User Session Validation
* Token-Based Authorization
* Middleware-Driven Security Layer

---

## 👥 User Management

* User Registration
* User Login
* User Profile Retrieval
* Session Persistence
* Authentication State Verification

---

## 📊 Opportunity Management

* Create Opportunities
* Retrieve Opportunities
* Update Opportunities
* Delete Opportunities
* User-Specific Data Access
* Secure Ownership Validation

---

## 🗄️ Database Management

* MySQL Relational Database
* Connection Pooling
* Optimized Query Execution
* Scalable Data Architecture
* Structured Data Relationships

---

## ⚡ Production-Ready Architecture

* MVC-Inspired Structure
* Reusable Middleware
* Centralized Error Handling
* Environment-Based Configuration
* Modular Routing System
* Secure Configuration Management

---

# 🏗️ Project Architecture

```text
backend/
│
├── config/
│   └── db.js
│
├── controllers/
│   ├── authController.js
│   └── opportunityController.js
│
├── middleware/
│   └── authMiddleware.js
│
├── routes/
│   ├── authRoutes.js
│   └── opportunityRoutes.js
│
├── .env.example
├── package.json
├── server.js
└── README.md
```

---

# 📂 Folder Structure Explained

## config/

Contains application configuration files.

### db.js

Responsible for:

* Creating MySQL connection pool
* Managing database connections
* Optimizing query performance

---

## controllers/

Contains business logic.

### authController.js

Handles:

* User Registration
* User Login
* Profile Retrieval
* Token Generation

### opportunityController.js

Handles:

* Create Opportunity
* Fetch Opportunities
* Update Opportunity
* Delete Opportunity

---

## middleware/

Contains reusable request-processing logic.

### authMiddleware.js

Responsible for:

* JWT Verification
* User Authentication
* Route Protection
* Role-Based Access Control

---

## routes/

Contains API endpoint definitions.

### authRoutes.js

Authentication-related endpoints.

### opportunityRoutes.js

Opportunity management endpoints.

---

# 🔐 Authentication Flow

## Registration

```text
Client
   ↓
POST /api/auth/register
   ↓
Validate Input
   ↓
Hash Password
   ↓
Store User
   ↓
Return Success Response
```

---

## Login

```text
Client
   ↓
POST /api/auth/login
   ↓
Verify Credentials
   ↓
Generate JWT Token
   ↓
Return Token
```

---

## Protected Route Access

```text
Client Request
   ↓
Authorization Header
   ↓
JWT Verification
   ↓
User Validation
   ↓
Controller Execution
```

---

# 🌐 API Endpoints

## Authentication Routes

### Register User

```http
POST /api/auth/register
```

Request:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

Response:

```json
{
  "success": true,
  "message": "User registered successfully"
}
```

---

### Login User

```http
POST /api/auth/login
```

Request:

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

Response:

```json
{
  "token": "jwt_token_here",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

---

### Get Current User

```http
GET /api/auth/me
```

Headers:

```http
Authorization: Bearer <token>
```

Response:

```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com"
}
```

---

# 📊 Opportunity Endpoints

### Create Opportunity

```http
POST /api/opportunities
```

### Get All Opportunities

```http
GET /api/opportunities
```

### Get Opportunity By ID

```http
GET /api/opportunities/:id
```

### Update Opportunity

```http
PUT /api/opportunities/:id
```

### Delete Opportunity

```http
DELETE /api/opportunities/:id
```

All opportunity routes require a valid JWT token.

---

# 🗄️ Database Schema

## Users Table

```sql
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## Opportunities Table

```sql
CREATE TABLE opportunities (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    company VARCHAR(255),
    status VARCHAR(50),
    description TEXT,
    user_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
```

---

# ⚙️ Environment Variables

Create a `.env` file in the project root.

```env
PORT=5000

JWT_SECRET=your_super_secure_secret_key

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=ceofactory_db
```

---

# 🚀 Local Development Setup

## 1. Clone Repository

```bash
git clone https://github.com/your-username/opportunity_management_backend.git
```

---

## 2. Navigate to Backend

```bash
cd backend
```

---

## 3. Install Dependencies

```bash
npm install
```

---

## 4. Configure Environment Variables

Create:

```text
.env
```

Add required values.

---

## 5. Start Development Server

```bash
npm run dev
```

Server starts at:

```text
http://localhost:5000
```

---

# 📦 Production Deployment

## Backend Hosting

Recommended Platform:

* Render

### Build Command

```bash
npm install
```

### Start Command

```bash
npm start
```

### Required Environment Variables

```env
PORT
JWT_SECRET
DB_HOST
DB_USER
DB_PASSWORD
DB_NAME
```

---

# 🛡️ Security Best Practices

* Passwords hashed with bcrypt
* JWT Authentication
* Protected API Routes
* Environment Variable Protection
* Database Connection Pooling
* Authentication Middleware Enforcement
* User Ownership Validation
* Secure Request Processing

---

# 🔮 Future Improvements

* Refresh Token Support
* Email Verification
* Password Reset Functionality
* OAuth Authentication (Google/GitHub)
* API Rate Limiting
* Request Validation Middleware
* Audit Logging
* Admin Dashboard APIs
* Advanced Analytics

---

# 🛠️ Technology Stack

### Backend

* Node.js
* Express.js
* MongoDB
* JWT
* bcrypt
* dotenv

### Deployment

* Render
* MySQL Database

---

# 👨‍💻 Author

**Bittu Rajbanshi**

---

# 📄 License

This project was developed as part of the CEOFactory Full Stack Developer Assessment and is intended for educational, evaluation, and demonstration purposes.
