### StudySync+

StudySync+ is a full-stack web application designed to help students and self-learners organize their study tasks, track progress, and stay motivated. With built-in task management and daily motivational quotes, StudySync+ makes consistent learning both productive and inspiring.

## Project Overview
## Purpose

Many students struggle to maintain focus and consistency while studying independently. StudySync+ addresses this by providing a structured task management system along with daily motivational content to encourage consistent learning habits.

Intended Users

Students

Online learners

Anyone aiming to improve their study habits

Core Features

User authentication (register, log in, log out) using JSON Web Tokens (JWT)

Create, view, complete, and delete study tasks

Display motivational quotes retrieved from the ZenQuotes API

Persistent data storage using PostgreSQL

Fully functional REST API built with Express

Basic responsive layout using React

## Technologies and Tools
Layer	Stack
Frontend	React, React Router, Axios
Backend	Node.js, Express
Database	PostgreSQL (hosted on Neon)
External API	ZenQuotes API
Authentication	JSON Web Token (JWT)
Deployment	Frontend: Vercel, Backend: Render
Database Schema
Users Table
Column	Type	Description
id	SERIAL PRIMARY KEY	Unique user ID
username	VARCHAR	User’s chosen display name
email	VARCHAR	User’s email address
password_hash	VARCHAR	Encrypted user password
Tasks Table
Column	Type	Description
id	SERIAL PRIMARY KEY	Unique task ID
user_id	INT	References Users.id
title	VARCHAR	Task title
description	TEXT	Task details
completed	BOOLEAN	Task completion status
API Endpoints
Authentication
Method	Endpoint	Description
POST	/auth/register	Register a new user
POST	/auth/login	Log in and receive a JWT
Tasks
Method	Endpoint	Description
GET	/tasks	Get all tasks for logged-in user
POST	/tasks	Create a new task
PUT	/tasks/:id	Toggle or update completion status
DELETE	/tasks/:id	Delete a task
External API
Method	Endpoint	Description
GET	https://zenquotes.io/api/random
	Retrieve a random motivational quote
## Deployment

Frontend hosted on Vercel

Backend hosted on Render

PostgreSQL database hosted on Neon

## Demo Video

YouTube demo link:
[PLACEHOLDER – INSERT LINK HERE]

## Future Enhancements

These features are planned for future versions of StudySync+:

Study analytics dashboard

Daily reminder notifications

Task categories or labels

Social study groups or friend system

Dark mode toggle

Detailed task editing (title and description)

License

This project is licensed under the MIT License.

Acknowledgments

ZenQuotes.io for motivational quote data

Render, Vercel, and Neon for hosting services
