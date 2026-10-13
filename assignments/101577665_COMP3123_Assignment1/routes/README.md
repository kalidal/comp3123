# COMP 3123 — Assignment 1: Secure Backend RESTful API

## 1. Project Purpose

A secure RESTful backend API built with **Node.js**, **Express.js**, and **MongoDB using Mongoose**.

The application supports user registration, secure authentication using JSON Web Tokens (JWT), password hashing with `bcryptjs`, role-based authorization and data ownership enforcement, input validation, HTTP security headers, API rate limiting, local event logging, and health monitoring.

## 2. Technologies Used

- **Backend Runtime:** Node.js
- **Framework:** Express.js
- **Database & ODM:** MongoDB Atlas / Mongoose
- **Authentication:** JSON Web Tokens (`jsonwebtoken`)
- **Password Hashing:** `bcryptjs`
- **HTTP Security:** `helmet`
- **Rate Limiting:** `express-rate-limit`
- **Environment Configuration:** `dotenv`

## 3. Project Structure

The project follows a modular Express.js architecture, separating database models, routes, middleware, and application configuration.

```text
101577665_COMP3123_Assignment1/
├── models/
│   ├── User.js
│   └── Employee.js
├── routes/
│   ├── userRoutes.js
│   └── employeeRoutes.js
├── middleware/
│   └── auth.js
├── logs/
│   └── app.log
├── .env
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
└── server.js
```

*Note: The structure above reflects the expected project layout. Adjust it if your actual files or folders differ.*

## 4. Installation and Setup

### Step 1: Clone the Repository

```bash
git clone https://github.com/USERNAME/STUDENT#_COMP3123_Assignment1.git
cd STUDENT#_COMP3123_Assignment1
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Configure Environment Variables

Create a `.env` file in the project root directory using `.env.example` as a reference.

Add the following variables and replace the MongoDB URI and JWT secret with your own values:

```env
PORT=8088
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/comp3123_assignment1?retryWrites=true&w=majority
JWT_SECRET=replace_with_a_secure_random_secret
```

**Important:** Do not commit your `.env` file or expose your database credentials and JWT secret in a public repository. Ensure `.env` is included in `.gitignore`.

### Step 4: Start the Application

```bash
node server.js
```

The server will run on the port specified by the `PORT` environment variable. If configured as above, the local address will be:

`http://localhost:8088`

## 5. API Endpoint Documentation

### User APIs

Base path: `/api/v1/user`

| Method | Endpoint | Description | Expected Status |
|---|---|---|---|
| POST | `/api/v1/user/signup` | Register a new user | `201 Created`, `409 Conflict` |
| POST | `/api/v1/user/login` | Authenticate a user and receive a JWT | `200 OK` |

### Employee APIs

Base path: `/api/v1/emp`

**Authentication required:** Include a valid JWT in the `Authorization` header.

| Method | Endpoint | Description | Expected Status |
|---|---|---|---|
| GET | `/api/v1/emp/employees` | Retrieve employees owned by the authenticated user | `200 OK` |
| POST | `/api/v1/emp/employees` | Create an employee record | `201 Created` |
| GET | `/api/v1/emp/employees/:eid` | Retrieve a specific employee by ID | `200 OK` |
| PUT | `/api/v1/emp/employees/:eid` | Update a specific employee by ID | `200 OK` |
| DELETE | `/api/v1/emp/employees?eid=xxx` | Delete an employee using its ID as a query parameter | `204 No Content` |

**Note:** The employee update, retrieval, and deletion endpoints must enforce data ownership. Actual status codes may vary depending on validation failures, missing records, or authentication errors.

### System Health Check

| Method | Endpoint | Description | Expected Status |
|---|---|---|---|
| GET | `/health` | Check whether the server is running | `200 OK` |

## 6. Authentication and Authorization

### Authentication

After successfully logging in, the client receives a JSON Web Token (JWT). Include this token in the request header when accessing protected employee endpoints.

```http
Authorization: Bearer <jwt_token>
```

Replace `<jwt_token>` with the actual token returned by the login endpoint.

### Authorization and Data Ownership

Each employee record is associated with its owner through a user reference, such as a MongoDB `ObjectId`.

The server uses the authenticated user's identity to restrict access to employee records. Users should only be able to retrieve, create, update, or delete records according to the ownership rules implemented by the application.

Requests targeting records owned by another user can return `404 Not Found` to avoid revealing whether those records exist.

## 7. Security Implementations

- **Password Hashing:** Passwords are hashed using `bcryptjs` before being stored in the database. Plain-text passwords should never be returned in API responses.
- **HTTP Security Headers:** `Helmet` configures HTTP headers to help protect against common web vulnerabilities.
- **Rate Limiting:** `express-rate-limit` helps limit excessive requests to authentication endpoints. Requests exceeding the configured limit receive `429 Too Many Requests`.
- **Environment Variables:** Sensitive configuration values, including database credentials and JWT secrets, are stored in `.env` rather than hardcoded into application source files.
- **JWT Authentication:** Protected employee endpoints require a valid authentication token.
- **Data Ownership Enforcement:** Employee queries are restricted according to the authenticated user's identity.
- **Input Validation:** Incoming data should be validated before processing or saving it to the database.

## 8. Local Log Collection

The application is configured to record HTTP request information in `logs/app.log`.

Log entries may include:

- Request timestamps
- HTTP methods
- Requested endpoints
- Other relevant application events

Sensitive information, including passwords and authentication tokens, should not be written to application logs.

The log file is intended to help with debugging, monitoring, and reviewing application activity during development.

## 9. Important Notes

- Ensure MongoDB Atlas is configured to accept connections from your environment.
- Verify that all required environment variables are set before starting the server.
- Do not commit `.env`, database credentials, or other secrets to version control.
- Confirm that the documented endpoints and HTTP status codes match the actual implementation.
- Use a REST API client, such as Postman, to test registration, login, protected employee operations, validation, and error responses.
