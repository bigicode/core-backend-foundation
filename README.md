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

##  Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MySQL (XAMPP recommended for local development)
- npm or yarn

### Installation

1. **Clone the repository**
   git clone https://github.com/bigicode/core-backend-foundation.git
   npm install
   cp .env.example .env

   Create the database

## Open phpMyAdmin or your MySQL client.

Create a database (e.g., node_app) and run the following SQL to create the users table:

``sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(20) DEFAULT 'user',
  avatar VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);``

npm run dev to start server

The server will run at http://localhost:5000.
Note: All protected endpoints require a valid JWT token in the Authorization: Bearer <token> header.

## Testing with Postman
Register: POST /api/users/register with JSON body { "email": "...", "password": "..." }

Login: POST /api/users/login with JSON body { "email": "...", "password": "..." }

Upload Avatar: PUT /api/users/avatar with form-data key "avatar" (file upload)

## Environment Variables
Variable	Description	Default
``PORT	Server port	5000<br>
NODE_ENV	Environment (development, staging, production)	development<br>
JWT_SECRET	Secret key for JWT signing	Required<br>
DB_HOST	MySQL host	localhost<br>
DB_USER	MySQL username	root<br>
DB_PASSWORD	MySQL password	(empty)<br>
DB_NAME	MySQL database name	Required<br>
BASE_URL	Base URL for constructing absolute image URLs	http://localhost:5000``


   
