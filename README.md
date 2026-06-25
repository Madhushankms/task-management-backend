# Task Management System — Backend

A RESTful API built with Node.js, Express, TypeScript, Prisma ORM, and MySQL.

## Tech Stack

- **Runtime**: Node.js 20.x
- **Framework**: Express.js
- **Language**: TypeScript
- **ORM**: Prisma 7.x
- **Database**: MySQL 8.x
- **Authentication**: JWT
- **Password Hashing**: bcryptjs

## Project Structure

```
src/
├── config/         → database and environment configuration
├── controllers/    → business logic
├── middleware/     → auth, role, error, validation handlers
├── routes/         → API endpoint definitions
├── validators/     → input validation rules
├── types/          → TypeScript type declarations
├── utils/          → helper functions
├── constants/      → app wide constants
├── server.ts       → express app setup
└── index.ts        → entry point
```

## Prerequisites

- Node.js 20.x
- MySQL 8.x
- npm

## API Endpoints

### Authentication

| Method | Endpoint             | Access | Description       |
| ------ | -------------------- | ------ | ----------------- |
| POST   | `/api/auth/register` | Public | Register new user |
| POST   | `/api/auth/login`    | Public | Login user        |

### Tasks

| Method | Endpoint         | Access | Description     |
| ------ | ---------------- | ------ | --------------- |
| GET    | `/api/tasks`     | Auth   | Get all tasks   |
| POST   | `/api/tasks`     | Auth   | Create new task |
| GET    | `/api/tasks/:id` | Auth   | Get task by ID  |
| PUT    | `/api/tasks/:id` | Auth   | Update task     |
| DELETE | `/api/tasks/:id` | Auth   | Delete task     |

### Users

| Method | Endpoint             | Access | Description     |
| ------ | -------------------- | ------ | --------------- |
| GET    | `/api/users/profile` | Auth   | Get own profile |
| GET    | `/api/users`         | Admin  | Get all users   |
| GET    | `/api/users/:id`     | Admin  | Get user by ID  |
| DELETE | `/api/users/:id`     | Admin  | Delete user     |

## Query Parameters (Tasks)

| Parameter  | Type   | Description                                      |
| ---------- | ------ | ------------------------------------------------ |
| `search`   | string | Search by task title                             |
| `priority` | string | Filter by priority (Low/Medium/High)             |
| `status`   | string | Filter by status (Open/In_Progress/Testing/Done) |

### Example

```
GET /api/tasks?priority=High&status=Open&search=Login
```

## Authentication

All protected routes require JWT token in header:

```
Authorization: Bearer <token>
```

## Role Based Access

| Role  | Permissions                                   |
| ----- | --------------------------------------------- |
| Admin | Full access to all tasks and users            |
| User  | Access to own created and assigned tasks only |

## Scripts

```bash
npm run dev           # Start development server
npm run build         # Build for production
```
