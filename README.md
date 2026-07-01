#  Backend Core Foundation

A production‑ready Node.js backend boilerplate with a complete authentication system, role‑based access control, file uploads, structured logging, error handling, and rate limiting – built with scalability and maintainability in mind.

##  Features

-  **Layered Architecture** – Routes → Controllers → Services → Repository (clean separation of concerns)
-  **Authentication & Authorization** – JWT-based auth with bcrypt password hashing and role‑based access (admin/user)
-  **Security** – Rate limiting (global + auth endpoints), CORS, environment‑based secrets validation
-  **File Upload** – Multer integration for profile pictures with file type and size validation
-  **Structured Logging** – Winston + Morgan for file‑based and console logging with log rotation
-  **Centralised Config** – Joi‑validated environment configuration with defaults
-  **Error Handling** – Custom error classes with a global error handler and consistent JSON responses
-  **MySQL Database** – Connection pooling with `mysql2` and parameterised queries
- **CORS Enabled** – Securely configured for frontend communication

##  Tech Stack

- **Runtime:** Node.js (v18+)
- **Framework:** Express.js
- **Database:** MySQL (with XAMPP / phpMyAdmin)
- **Authentication:** JSON Web Tokens (JWT), bcrypt
- **Validation:** Joi
- **File Uploads:** Multer
- **Logging:** Winston, Morgan
- **Security:** express-rate-limit, CORS
- **Language:** JavaScript (CommonJS)

##  Project Structure

backend/
├── src/
│ ├── config/
│ │ └── index.js # Centralised environment config with Joi validation
│ ├── modules/
│ │ └── user/ # User feature module
│ │ ├── user.routes.js # Route definitions (login, register, avatar, profile)
│ │ ├── user.controller.js # Request/response handling
│ │ ├── user.service.js # Business logic (auth, uploads)
│ │ └── user.repository.js # Database queries
│ ├── middleware/
│ │ ├── auth.js # JWT verification
│ │ ├── role.js # Role‑based access control
│ │ ├── errorHandler.js # Global error handling
│ │ └── rateLimiter.js # Rate limiting for security
│ ├── utils/
│ │ ├── AppError.js # Base custom error class
│ │ ├── errors.js # Specific error types (Validation, Unauthorized, etc.)
│ │ ├── logger.js # Winston logging configuration
│ │ └── upload.js # Multer configuration for file uploads
│ └── app.js # Express application entry point
├── uploads/ # Directory for uploaded profile images
├── logs/ # Log files (error.log, combined.log)
├── .env # Environment variables
└── package.json


##  Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MySQL (XAMPP recommended for local development)
- npm or yarn

### Installation

1. **Clone the repository**
   git clone https://github.com/your-username/backend-core-foundation.git
   npm install
   cp .env.example .env

   Create the database

## Open phpMyAdmin or your MySQL client.

Create a database (e.g., node_app) and run the following SQL to create the users table:

sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(20) DEFAULT 'user',
  avatar VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

npm run dev to start server

The server will run at http://localhost:5000.
Note: All protected endpoints require a valid JWT token in the Authorization: Bearer <token> header.

## Testing with Postman
Register: POST /api/users/register with JSON body { "email": "...", "password": "..." }

Login: POST /api/users/login with JSON body { "email": "...", "password": "..." }

Upload Avatar: PUT /api/users/avatar with form-data key "avatar" (file upload)

## Environment Variables
Variable	Description	Default
PORT	Server port	5000
NODE_ENV	Environment (development, staging, production)	development
JWT_SECRET	Secret key for JWT signing	Required
DB_HOST	MySQL host	localhost
DB_USER	MySQL username	root
DB_PASSWORD	MySQL password	(empty)
DB_NAME	MySQL database name	Required
BASE_URL	Base URL for constructing absolute image URLs	http://localhost:5000


   
