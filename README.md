Task Manager CRUD Application

Project Overview

This project is a simple full-stack Task Manager (TODO application) built using Node.js, Express.js, SQLite, HTML, CSS, and JavaScript.

The application allows users to create, view, update, and delete tasks while storing them persistently in a database.

The goal of this project was to learn backend web development concepts such as REST APIs, CRUD operations, client-server communication, database persistence, and frontend-backend integration.

Features
* Create new tasks
* View all tasks
* Update task completion status
* Delete tasks
* Persistent SQLite database storage
* Search tasks
* Filter tasks by status (pending/completed)
* Basic form validation

Backend

* Node.js
* Express.js
* SQLite

Frontend

* HTML
* CSS
* JavaScript



Project Structure

task-manager/

├── client/

│   ├── index.html

│   ├── style.css

│   └── script.js

├── server/

│   └── server.js

├── package.json

├── README.md

└── .gitignore


Installation & Setup

1. Clone repository
2. Install dependencies
npm install
3. Run server
node ./server/server.js
4. Open client/index.html using Live Server
 API Endpoints

GET /tasks → Get all tasks

POST /tasks → Create task

PUT /tasks/:id → Update task

DELETE /tasks/:id → Delete task


Future Improvements

* Better UI styling
* A system with dates
* Time-constraints for certain tasks
* Task categories/tags
* Authentication system
* Improved validation
