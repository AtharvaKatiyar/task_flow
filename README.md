# TaskFlow

TaskFlow is a full-stack task management platform built for the **Backend Developer (Intern) Project Assignment**. It demonstrates a scalable REST API with authentication, role-based access control, CRUD operations, validation, API documentation, and a basic React frontend for testing and interaction.

## Project Goal

This project was designed to match the assignment requirements:

- Secure user registration and login
- Password hashing and JWT authentication
- Role-based access control for `user` and `admin`
- CRUD APIs for a secondary entity (`tasks`)
- API versioning, validation, and centralized error handling
- Swagger-based API documentation
- PostgreSQL database integration
- React frontend for authentication and task management
- Optional infrastructure support with Redis and Docker

## Tech Stack

### Backend
- Node.js
- Express.js
- Prisma ORM
- PostgreSQL
- Redis
- JWT authentication
- Swagger documentation
- Docker

### Frontend
- React
- Vite
- React Router
- Axios

## Features

### Authentication
- Register new users
- Login with email and password
- Password hashing before storage
- JWT-based session handling
- Protected routes for authenticated users

### Authorization
- Role-based access control
- `user` and `admin` roles
- Middleware-based protection for sensitive routes

### Tasks Module
- Create tasks
- Read task lists and task details
- Update tasks
- Delete tasks
- Filter and paginate task results

### Security and Scalability
- Input validation and sanitization
- Centralized API error responses
- Modular folder structure for future features
- Redis support for caching/scalability
- Docker-based development setup

## Project Structure

```text
.
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── migrations/
│   ├── src/
│   │   ├── app.js
│   │   ├── server.js
│   │   ├── config/
│   │   ├── docs/
│   │   ├── middleware/
│   │   ├── modules/
│   │   │   ├── auth/
│   │   │   ├── task/
│   │   │   └── user/
│   │   ├── routes/
│   │   └── utils/
│   ├── Dockerfile
│   ├── package.json
│   └── prisma.config.ts
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── routes/
│   │   └── utils/
│   ├── package.json
│   └── vite.config.js
├── docker-compose.yml
└── README.md
```

## Backend Architecture

The backend follows a modular layered structure:

- **Routes**: define API endpoints
- **Controllers**: handle request/response logic
- **Services**: contain business logic
- **Middleware**: handle auth, roles, validation, caching, and error handling
- **Utils**: reusable helpers for responses, JWT, logging, and caching
- **Prisma**: manages database schema and migrations

### Main Backend Modules
- `auth` — register, login, me, JWT handling
- `user` — user management and role-based access
- `task` — CRUD and task filtering/pagination

## Frontend Overview

The frontend is a lightweight React UI built to demonstrate and test the backend APIs.

### Pages
- Login page
- Register page
- Protected dashboard

### Components
- Navigation bar
- Task form
- Task cards

### Frontend Responsibilities
- Authenticate users
- Store and send JWT securely via API calls
- Access protected routes
- Create, edit, delete, and list tasks
- Show API success and error messages

## API Documentation

Swagger documentation is available from the backend docs module.

- Open the Swagger UI after running the backend
- Import endpoints into Postman if needed for manual testing

## Environment Variables

Create a root `.env` file for local development.

```env
BACKEND_PORT=5000

POSTGRES_USER=taskflow_user
POSTGRES_PASSWORD=your_password_here
POSTGRES_DB=taskflow_db
POSTGRES_PORT=5434

REDIS_PORT=6381

DATABASE_URL="postgresql://taskflow_user:your_password_here@localhost:5434/taskflow_db?schema=public"
JWT_SECRET="your_jwt_secret_here"
REDIS_URL="redis://localhost:6381"

VITE_API_BASE_URL=http://localhost:5000/api/v1
```

## Local Development Setup

### Prerequisites
- Node.js 20+
- Docker and Docker Compose
- PostgreSQL and Redis if you want to run them outside Docker

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd taskflow
```

### 2. Start database services
This project uses Docker for PostgreSQL and Redis during local development.

```bash
docker-compose up -d
```

This starts:
- PostgreSQL on port `5434`
- Redis on port `6381`

### 3. Run backend locally
```bash
cd backend
npm install
npm run dev
```

The backend runs on:
- `http://localhost:5000`

### 4. Run frontend locally
```bash
cd frontend
npm install
npm run dev
```

The frontend runs on:
- `http://localhost:5173`

## How to Use the Project

### Authentication Flow
1. Open the frontend in your browser
2. Register a new account
3. Log in with your credentials
4. Access the protected dashboard

### Task Flow
1. Create a new task
2. Edit an existing task
3. Delete a task
4. Filter tasks by status
5. Navigate through paginated results

### Admin Flow
If your seeded or registered user has the `admin` role, you can extend the API to support elevated access for management operations.

## API Highlights

### Authentication
- `POST /api/v1/auth/register`
- `POST /api/v1/auth/login`
- `GET /api/v1/auth/me`

### Tasks
- `GET /api/v1/tasks`
- `POST /api/v1/tasks`
- `GET /api/v1/tasks/:id`
- `PUT /api/v1/tasks/:id`
- `DELETE /api/v1/tasks/:id`

## Scalability Notes

This project is structured to grow into a larger backend system.

### Current scalability choices
- Modular domain-based folder structure
- Centralized middleware for auth, validation, and errors
- Redis support for caching and future rate-limiting strategies
- Prisma migrations for safe schema evolution
- Docker support for consistent local infrastructure

### Future scaling ideas
- Split auth, tasks, and user management into separate services
- Add queue-based background jobs
- Add rate limiting and request tracing
- Move to managed Postgres and Redis for production
- Introduce CI/CD pipelines for automated deployment

## Security Practices

- Passwords are hashed before storage
- JWT protects private routes
- Role-based middleware restricts access
- Validation prevents invalid payloads
- Sensitive values are stored in environment variables
- `.env` is excluded from git

## Docker Notes

The current Docker setup is focused on infrastructure services only:
- PostgreSQL
- Redis

The backend is run locally during development to keep credentials out of containers and simplify the workflow.

## License

This project was created for educational and interview-assignment purposes.
