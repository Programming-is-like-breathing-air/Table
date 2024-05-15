const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json()); //req.body


const port = process.env.PORT || "5000";
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
  
app.listen(port, () => {
  console.log(`Server Running at ${port} 🚀`);
});
