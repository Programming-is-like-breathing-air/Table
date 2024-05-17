const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());

app.post("/api/task", async (req, res) => {
  try {
    const { id, title, status, label, priority } = req.body;
    const newTask = await prisma.task.create({
      data: {
        id,
        title,
        status,
        label,
        priority
      }
    });
    res.json(newTask);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Get All Tasks
app.get("/api/task", async (req, res) => {
  try {
    const tasks = await prisma.task.findMany();
    res.json(tasks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Get a Task
app.get("/api/task/:id", async (req, res) => {
  try {
    const task = await prisma.task.findUnique({
      where: { id: req.params.id }
    });
    if (task) {
      res.json(task);
    } else {
      res.status(404).send("Task not found");
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Update a Task
app.put("/api/task/update/:id", async (req, res) => {
  try {
    const { title, status, label, priority } = req.body;
    const task = await prisma.task.update({
      where: { id: req.params.id },
      data: { title, status, label, priority }
    });
    res.json(task);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Delete a Task
app.delete("/api/task/delete/:id", async (req, res) => {
  try {
    const task = await prisma.task.delete({
      where: { id: req.params.id }
    });
    res.json({ message: "Task deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Start Server
app.listen(5000, (err)  => {
  if (err) throw err;
  console.log('> Ready on http://localhost:5000');
});