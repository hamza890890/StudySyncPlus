### StudySync+

StudySync+ is a full-stack web application designed to help students and self-learners organize their study tasks, track progress, and stay motivated. With built-in task management and daily motivational quotes, StudySync+ makes consistent learning both productive and inspiring.

## Project Overview
## Purpose

Many students struggle to maintain focus and consistency while studying independently. StudySync+ addresses this by providing a structured task management system along with daily motivational content to encourage consistent learning habits.

## Intended Users

Students

Online learners

Anyone aiming to improve their study habits

## Core Features

User authentication (register, log in, log out) using JSON Web Tokens (JWT)

Create, view, complete, and delete study tasks

Display motivational quotes retrieved from the ZenQuotes API

Persistent data storage using PostgreSQL

Fully functional REST API built with Express

Basic responsive layout using React

## Technologies and Tools

| Layer          | Stack                                                |
|----------------|------------------------------------------------------|
| **Frontend**   | React, React Router, Axios                           |
| **Backend**    | Node.js, Express                                    |
| **Database**   | PostgreSQL (hosted on Neon)                          |
| **External API**| ZenQuotes API                                      |
| **Authentication** | JSON Web Token (JWT)                             |
| **Deployment** | Frontend: Vercel, Backend: Render                    |

---

## Database Schema

### Users Table

| Column         | Type               | Description                            |
|----------------|--------------------|----------------------------------------|
| `id`           | `SERIAL PRIMARY KEY`| Unique user ID                        |
| `username`     | `VARCHAR`          | User’s chosen display name            |
| `email`        | `VARCHAR`          | User’s email address                  |
| `password_hash`| `VARCHAR`          | Encrypted user password               |

### Tasks Table

| Column         | Type               | Description                            |
|----------------|--------------------|----------------------------------------|
| `id`           | `SERIAL PRIMARY KEY`| Unique task ID                        |
| `user_id`      | `INT`              | References `Users.id`                 |
| `title`        | `VARCHAR`          | Task title                            |
| `description`  | `TEXT`             | Task details                          |
| `completed`    | `BOOLEAN`          | Task completion status                |

---

## API Endpoints

### Authentication

| Method | Endpoint        | Description                       |
|--------|-----------------|-----------------------------------|
| `POST` | `/auth/register` | Register a new user               |
| `POST` | `/auth/login`    | Log in and receive a JWT          |

### Tasks

| Method | Endpoint          | Description                           |
|--------|-------------------|---------------------------------------|
| `GET`  | `/tasks`          | Get all tasks for the logged-in user |
| `POST` | `/tasks`          | Create a new task                    |
| `PUT`  | `/tasks/:id`      | Toggle or update completion status   |
| `DELETE`| `/tasks/:id`     | Delete a task                        |

---

### External API

| Method | Endpoint      | Description                           |
|--------|---------------|---------------------------------------|
| `GET`  | `/zenquotes`  | Fetch a random quote                  |
## Deployment

Frontend hosted on Vercel

Backend hosted on Render

PostgreSQL database hosted on Neon

## Deployed Application

Frontend:

https://study-sync-plus.vercel.app

Backend:

https://studysyncplus.onrender.com

## Demo Video (MVP Demo) 

YouTube demo link:
https://youtu.be/v8L5gMcQrz0

## Demo Video (Final Term Project - Deployed Application) 

YouTube demo link:

## Setup Instructions (Local Development)
1. Clone the Repository
```bash
git clone https://github.com/hamza890890/StudySyncPlus.git
cd StudySyncPlus
```
3. Install Dependencies
Backend:
```bash
cd server
npm install
```
Frontend:
```bash
cd ../client
npm install
```
3. Configure Environment Variables
```bash
server/.env
DATABASE_URL=your_neon_connection_string
JWT_SECRET=your_secret_key
```
```bash
client/.env
VITE_API_BASE_URL=http://localhost:5000/api
```
4. Run the Backend
```bash
cd server
npm run dev
```
6. Run the Frontend
```bash
cd client
npm run dev
```
## Design Choices
### Why React?

React provided a simple way to manage UI state and combine components into a cohesive interface. React Router made page navigation intuitive, and Vite offered fast development builds.

### Why Express?

Express is lightweight, flexible, and ideal for small-to-medium projects. It allowed clean routing and easy integration with middleware like JWT authentication and CORS.

### Why PostgreSQL (Neon)?

A relational database aligns well with structured user + task relationships. Neon offers fast, free cloud-hosted PostgreSQL with SSL support, perfect for student projects.

### Why Vercel + Render?

Vercel: optimized for static frontend hosting

Render: free tier for Node.js APIs
Together, they provide a complete deployment environment with minimal setup.

## Reflection Write-Up
### What Was Most Challenging?

The most difficult part of development was deployment — specifically an issue where the backend kept returning generic “Error registering user” alerts. The console showed CORS errors, 404 errors, and misleading messages like:
```bash
Cannot GET /api/auth/register
```

This made it seem like the route didn't exist, but the real issue was:

Render Environment Variable Bug

The DATABASE_URL was stored with quotes, like:
```bash
'DATABASE_URL'='postgres://...'
```

Render treated the ' characters literally, which broke PostgreSQL connections internally.
Every register or login attempt failed before Express could handle the route.

Once the quotes were removed, the backend connected correctly and all routes immediately started functioning.

### What Am I Proud Of?

Successfully deploying a full-stack app using three separate services

Debugging real-world issues involving CORS, database connections, and route handling

Building a clean UI and functional REST API

Securing authentication using JWT

### What I Learned

Deployment debugging is often much harder than local debugging

CORS errors frequently hide deeper issues

Environment variables must be formatted precisely

Directly testing backend routes (/test-db, Postman, curl) is crucial

How to structure a full-stack application from backend to frontend

How to integrate external APIs into real applications
## Future Enhancements 

These features were planned for future versions of StudySync+ if I had more time:

Study analytics dashboard

Daily reminder notifications

Task categories or labels

Social study groups or friend system

Dark mode toggle

Detailed task editing (title and description)

License

This project is licensed under the MIT License.

## Acknowledgments

ZenQuotes.io for motivational quote data

Render, Vercel, and Neon for hosting services
