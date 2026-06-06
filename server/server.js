const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// DATABASE

const db = new sqlite3.Database("./tasks.db", (err) => {
  if (err) {
    console.log("Database connection failed");
  } else {
    console.log("Connected to SQLite database");
  }
});


db.run(`
CREATE TABLE IF NOT EXISTS tasks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'pending',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)
`);


// GET ALL TASKS


app.get("/tasks", (req, res) => {
  const { search, status } = req.query;

  let query = "SELECT * FROM tasks WHERE 1=1";
  let values = [];

  if (search) {
    query += " AND title LIKE ?";
    values.push(`%${search}%`);
  }

  if (status) {
    query += " AND status = ?";
    values.push(status);
  }

  query += " ORDER BY created_at DESC";

  db.all(query, values, (err, rows) => {
    if (err) {
      return res.status(500).json({
        error: "Failed to fetch tasks"
      });
    }

    res.json(rows);
  });
});


// GET ONE TASK


app.get("/tasks/:id", (req, res) => {
  const id = req.params.id;

  db.get(
    "SELECT * FROM tasks WHERE id = ?",
    [id],
    (err, row) => {
      if (err) {
        return res.status(500).json({
          error: "Database error"
        });
      }

      if (!row) {
        return res.status(404).json({
          error: "Task not found"
        });
      }

      res.json(row);
    }
  );
});


// CREATE TASK


app.post("/tasks", (req, res) => {
  const { title, description } = req.body;

  // Validation brownie point
  if (!title || title.trim() === "") {
    return res.status(400).json({
      error: "Task title is required"
    });
  }

  db.run(
    `
    INSERT INTO tasks (title, description)
    VALUES (?, ?)
    `,
    [title, description || ""],
    function (err) {
      if (err) {
        return res.status(500).json({
          error: "Failed to create task"
        });
      }

      res.status(201).json({
        message: "Task created",
        id: this.lastID
      });
    }
  );
});


// UPDATE TASK


app.put("/tasks/:id", (req, res) => {
  const id = req.params.id;
  const { title, description, status } = req.body;

  if (!title || title.trim() === "") {
    return res.status(400).json({
      error: "Title cannot be empty"
    });
  }

  db.run(
    `
    UPDATE tasks
    SET title = ?, description = ?, status = ?
    WHERE id = ?
    `,
    [
      title,
      description,
      status || "pending",
      id
    ],
    function (err) {
      if (err) {
        return res.status(500).json({
          error: "Failed to update task"
        });
      }

      if (this.changes === 0) {
        return res.status(404).json({
          error: "Task not found"
        });
      }

      res.json({
        message: "Task updated"
      });
    }
  );
});


// DELETE TASK


app.delete("/tasks/:id", (req, res) => {
  const id = req.params.id;

  db.run(
    "DELETE FROM tasks WHERE id = ?",
    [id],
    function (err) {
      if (err) {
        return res.status(500).json({
          error: "Failed to delete task"
        });
      }

      if (this.changes === 0) {
        return res.status(404).json({
          error: "Task not found"
        });
      }

      res.json({
        message: "Task deleted"
      });
    }
  );
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});