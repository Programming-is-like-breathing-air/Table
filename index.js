const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());
//Create a task
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
//Get task from status
app.get("/api/task/status/:status", async (req, res) => {
  const { status } = req.params;
  try {
    const tasks = await prisma.task.findMany({
      where: { status },
    });
    res.json(tasks);
  } catch (err) {
    console.error(err.message);
  }
});
//Get task from priority
app.get("/api/task/priority/:priority", async (req, res) => {
  const { priority } = req.params;
  try {
    const tasks = await prisma.task.findMany({
      where: { priority },
    });
    res.json(tasks);
  } catch (err) {
    console.error(err.message);
  }
});

// Update a Task
app.put("/api/task/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, status, label, priority } = req.body;

    // Use Prisma to update the task, dynamically setting only provided fields
    const data = {};
    if (title) data.title = title;
    if (status) data.status = status;
    if (label) data.label = label;
    if (priority) data.priority = priority;

    if (Object.keys(data).length === 0) {
      res.json("No updates provided.");
      return;
    }

    // Execute the update using Prisma
    const updateTask = await prisma.task.update({
      where: { id: id },
      data: data
    });

    res.json("Task was updated!");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});



// Delete a Task
app.delete("/api/task/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deleteTask = await prisma.task.delete({
      where: { id: id },
    });
    res.json("Task was deleted!");
  } catch (err) {
    console.error(err.message);
    if (err.code === 'P2025') { // Prisma error code for record not found
      res.status(404).json("Task not found.");
    } else {
      res.status(500).send("Server error");
    }
  }
});


// Start Server
app.listen(5000, (err)  => {
  if (err) throw err;
  console.log('> Ready on http://localhost:5000');
});