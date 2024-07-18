                   Task Management Application
Project Overview
Objective: Create a simple task management application with user authentication. 

Features:
User authentication (login/logout)
Create, update, delete, and view tasks
Manage personal tasks
Project Description

Create a simple task management application where users can create, update, delete, and view tasks. The application should have user authentication, allowing users to log in and manage their own tasks. The project will include a backend built with Node.js and Express, a frontend built with React.js, and a PostgreSQL database to store user and task data.

Technologies Used:
Backend: Node.js, Express
Frontend: React.js
Database: PostgreSQL
Prerequisites
Node.js
npm 
PostgreSQL


Installation
Clone Repository
bash
git clone <repository-url>

Backend Setup
Navigate to the server directory:
bash
cd <repository-name>/server

Install dependencies:
bash
npm install

Configure environment variables:
bash

DATABASE_URL=postgres://user:password@host:port/dbname
JWT_SECRET=your_jwt_secret

Set up the database:
npm run migrate
npm run seed
Start the server:
bash
npm start

client side
Add task
The AddTask component allows users to add new tasks by submitting a form, which sends a POST request to the server with the task details.
The component utilizes Axios for HTTP requests and retrieves the authentication token from localStorage to include in the request headers.

Dashboard
The Dashboard component fetches and displays a list of tasks, enabling users to edit or delete tasks via respective buttons.
It handles the task state management, including updating tasks through a PUT request and deleting tasks through a DELETE request, using Axios for HTTP operations.

Header
The Header component provides navigation links for the main sections of the application, including the Dashboard, Add Task, Login, and Register pages.
It uses React Router's Link component to enable client-side navigation and includes styling through the Header.css file.

Login
The Login component allows users to authenticate by entering their username and password, sending these credentials to the server for verification via a POST request.
Upon successful login, the component stores the received authToken in localStorage and redirects the user to the home page using the useNavigate hook from React Router.

server side
Task controller
The task management API endpoints include creating, retrieving, updating, and deleting tasks, with each operation authenticated via JWT.
These endpoints interact with a PostgreSQL database, using uuid for unique task IDs and leveraging SQL queries for CRUD operations.

User authentication controller
The authentication API endpoints include user registration and login, using bcrypt for password hashing and JWT for token generation.
During registration, the system checks for existing usernames, hashes passwords, and stores them in a PostgreSQL database, while the login process verifies credentials and issues a JWT upon successful authentication.

database
The PostgreSQL database connection is configured using environment variables and managed with the pg library, ensuring secure and dynamic database connection settings.
A connection pool is established to manage multiple database connections efficiently, with a confirmation log message displayed upon successful connection.


Dashboard Image
![Screenshot (53)](https://github.com/user-attachments/assets/6488cf98-8595-4782-846b-6259f610c3cb)

register image
![Screenshot (51)](https://github.com/user-attachments/assets/dac55c11-1f07-46d6-892a-c48cdc16dce9)

log in
![Screenshot (50)](https://github.com/user-attachments/assets/80417716-10d3-47e9-92a0-bb8f4f6d2915)

add tasks
![Screenshot (52)](https://github.com/user-attachments/assets/48b72032-e4f4-4ae3-b730-c07004128925)























