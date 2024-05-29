const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json()); //req.body


const port = process.env.PORT || "5000";
//Create a task
app.post("/api/task", async (req, res) => {
    try {
      const { id,title, status, label, priority } = req.body;
      const newTask = await pool.query(
        'INSERT INTO "Task" (id, title, status, label, priority) VALUES($1, $2, $3, $4, $5) RETURNING *',
        [id,title, status, label, priority]
      );
      res.json(newTask.rows[0]);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  });
// Get all task
  app.get('/api/task', async (req, res) => {
    try {
      const allTasks = await pool.query('SELECT * FROM "Task"');
      res.json(allTasks.rows);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  });
  // Get task from id
  app.get("/api/task/id/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const TaskId = await pool.query('SELECT * FROM "Task" WHERE id = $1', [id]);
      res.json(TaskId.rows);
    } catch (err) {
      console.error(err.message);
    }
  });
  // Get task from status
  app.get("/api/task/status/:status", async (req, res) => {
    try {
      const { status } = req.params;
      const TaskStatus = await pool.query('SELECT * FROM "Task" WHERE status = $1', [status]);
      res.json(TaskStatus.rows);
    } catch (err) {
      console.error(err.message);
    }
  });
  //Get task from priority
  app.get("/api/task/priority/:priority", async (req, res) => {
    try {
      const { priority } = req.params;
      const TaskPriority = await pool.query('SELECT * FROM "Task" WHERE priority = $1', [priority]);
      console.log(priority.rows);
      res.json(TaskPriority.rows);
    } catch (err) {
      console.error(err.message);
    }
  });
    // Get task from title
    app.get("/api/task/title/:title", async (req, res) => {
      try {
        const { title } = req.params;
        const TaskTitle = await pool.query('SELECT * FROM "Task" WHERE title LIKE $1', [`%${title}%`]);
        res.json(TaskTitle.rows);
      } catch (err) {
        console.error(err.message);
      }
    });
    //Update task
    app.put("/api/task/update/:id", async (req, res) => {
      try {
        const { id } = req.params;
        const { title, status, label, priority } = req.body;
    
        // Build the update query dynamically based on provided fields
        let updates = [];
        const params = [];
        let paramIndex = 1;
    
        if (title) {
          updates.push(`title = $${paramIndex}`);
          params.push(title);
          paramIndex++;
        }
        if (status) {
          updates.push(`status = $${paramIndex}`);
          params.push(status);
          paramIndex++;
        }
        if (label) {
          updates.push(`label = $${paramIndex}`);
          params.push(label);
          paramIndex++;
        }
        if (priority) {
          updates.push(`priority = $${paramIndex}`);
          params.push(priority);
          paramIndex++;
        }
    
        if (updates.length === 0) {
          res.json("No updates provided.");
          return;
        }
    
        const updateQuery = `UPDATE "Task" SET ${updates.join(', ')} WHERE id = $${paramIndex}`;
        params.push(id);
    
        // Execute the update query
        const updateTask = await pool.query(updateQuery, params);
    
        res.json("Task was updated!");
      } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
      }
    });
    //Delete a task
    app.delete("/api/task/delete/:id", async (req, res) => {
      try {
        const { id } = req.params;
        const deleteTask = await pool.query('DELETE FROM "Task" WHERE id = $1', [
          id
        ]);
    
        if (deleteTask.rowCount === 0) {
          res.status(404).json("Task not found.");
        } else {
          res.json("Task was deleted!");
        }
      } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
      }
    });
    
app.listen(port, () => {
  console.log(`Server Running at ${port} 🚀`);
});
