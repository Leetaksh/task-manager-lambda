Task Manager

About the Project

This project was built as part of Lambda's Core Selection learning phase under the Backend & Database track.

I chose this project because it involved learning both backend and frontend web development along with one of the query languages so, I felt I could learn the most from this projects, and truth be told back-end web development is an important skill for almost all software engineers so I thought it would be a good opportunity to start learning it.

Before starting this project, I had very limited experience with backend development (Although I did do quite a bit of front-end web development through Angela Yu's course on Udemy). Building this application helped me learn Express.js, HTTP requests, CRUD operations, SQLite, API testing, and Git.

The application allows users to create, view, update, delete, search, and filter tasks through a simple interface.

Features

- Create new tasks
- View all tasks
- View individual tasks
- Update existing tasks
- Delete tasks
- Search tasks by title
- Filter tasks by status
- Persistent storage using SQLite

Technologies Used

 Backend
- Node.js
- Express.js
- SQLite

 Frontend
- HTML
- CSS
- Vanilla JavaScript

 Tools
- Git & GitHub
- Thunder Client
- VS Code

 Project Structure

task-manager/
│
├── client/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── server/
│   ├── server.js
│   └── tasks.db
│
├── package.json
├── package-lock.json
└── README.md

Installation & Setup

1. Clone the repository


git clone <repository-url>


2. Open the project folder
cd task-manager

3. Install dependencies
npm install

 4. Start the backend server(In the terminal)
node ./server/server.js

If everything is working correctly, you should see:


Connected to SQLite database
Server running on port 3000


5. Run the frontend

Open `client/index.html` using the Live Server extension in VS Code.



API Endpoints

Get all tasks
GET /tasks

Get a specific task
GET /tasks/:id

Create a task
POST /tasks

Update a task
PUT /tasks/:id

Delete a task
DELETE /tasks/:id

Some of the concepts I learned while building this project include:

- REST API design
- HTTP request and response flow
- Express routing
- Middleware in Express
- CRUD operations
- SQLite database fundamentals
- Data persistence
- API testing using Thunder Client
- Basic Git and GitHub workflow

If I continue working on this project, I would like to:

- Add task categories or tags
- Improve the frontend UI
- Add user authentication
- Deploy the application online
- Add sorting options for tasks

Built by Leetaksh Dronavalli as part of Lambda Core Selection 2026-27.